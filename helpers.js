function grabElement(id) {
  const domElement = document.getElementById(id);
  if (domElement) return domElement;
  else throw new Error(`Couldn't grab an element with ID: ${id}`);
}

let data1;
async function fetchServer(input) {
  const fetchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`
  try {
    const response = await fetch(fetchURL);
    let data;
    data = await response.json();
    console.log(data)
    data1 = data;
  } catch (error) {
    console.error(error);
  }
}

function createlist(objectArray) {
  const ulList = grabElement("ulList");
  ulList.innerHTML = "";
  for (let object of objectArray) createLiElement(object, ulList);
}

async function createLiElement(listObject, parent) {
  const { name, symbol } = listObject;

  await fetchProfile(symbol);
  const { profile } = profileData;//from fetchProfile 
  const { image, changesPercentage } = profile;

  const container = document.createElement("div");
  container.classList.add("list-group-item");

  const wrapper = document.createElement("div");
  wrapper.classList.add("row", "row-col-3", "align-items-center", "list-item", "g-0");

  const profileImg = document.createElement("img");
  profileImg.src = image;
  profileImg.style.width = "70px";
  profileImg.classList.add("img-fluid", "d-flex", "col", "col-md-auto", "list-profile-img", "g-0");

  const anchor = document.createElement("a");
  anchor.href = `/company.html?symbol=${symbol}`;
  anchor.innerText = name.toUpperCase();
  anchor.classList.add("d-flex", "col", "col-md-auto");

  const change = document.createElement("span");
  let n = parseFloat(changesPercentage).toFixed(2)
  if (changesPercentage >= 0) {
    change.innerHTML = `(+${n})`;
    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "positiveChange", "change-margin");
  }
  else {
    change.innerHTML = `(${n})`;
    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "negativeChange", "change-margin");
  }
  container.append(wrapper);
  wrapper.append(profileImg, anchor, change);
  parent.append(container);
}

let profileData;
async function fetchProfile(query) {
  const fetchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${query}`
  try {
    const response = await fetch(fetchURL);
    let data;
    data = await response.json();
    console.log(data);
    profileData = data;
  } catch (error) {
    console.error(error);
  }
}

async function createProfile(responseObject) {
  const { profile } = responseObject;

  const image = grabElement("image");
  image.src = "";
  image.src = profile.image;
  image.style.height = "40px";

  const name = grabElement("name");
  name.innerHTML = "";
  name.innerHTML = profile.companyName;

  const link = grabElement("link");
  link.href = profile.website;

  const description = grabElement("description");
  description.innerHTML = "";
  description.innerHTML = profile.description;

  const price = grabElement("stockPrice");
  price.innerHTML = "";
  price.innerHTML = `Stock Price: $${profile.price}`;

  const change = grabElement("change");
  changeInPercentage = profile.changesPercentage
  n = parseFloat(changeInPercentage).toFixed(2)
  change.innerHTML = "";
  if (changeInPercentage >= 0) {
    changePercentAsString = `(+${n}%)`
    change.innerHTML = changePercentAsString;
    change.classList.add("positiveChange")
  }
  else {
    changePercentAsString = `(${n}%)`
    change.innerHTML = changePercentAsString;
    change.classList.add("negativeChange")
  }
}


async function fetchHistory(symbol) {
  const fetchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  try {
    const response = await fetch(fetchUrl);
    let data;
    data = await response.json();
    console.log(data);
    getArray(data);
  } catch (error) {
    console.error(error);
  }
}

function getArray(responseObject) {
  const { historical } = responseObject;
  console.log(historical);
  historical.sort((a, b) => (a.date > b.date) ? 1 : -1)
  for (var i = 0; i < historical.length; ++i)
    xlabels.push(historical[i]["date"]);
  for (var i = 0; i < historical.length; ++i)
    ylabels.push(historical[i]["close"]);
  console.log(xlabels);
}

let marqueeData;
async function fetchMarqueeData() {
  const fetchStockList = `https://financialmodelingprep.com/api/v3/stock/list?apikey=ab6a1123daae3cc55bfece5648bb601c`
  try {
    const response = await fetch(fetchStockList);
    let data;
    data = await response.json();
    marqueeData = data;
    console.log(marqueeData)
  } catch (error) {
    console.error(error);
  }
}

let nasdaqArray = [];
const marqueeElement = document.createElement("div");
const marquee = grabElement("myMarquee");
//const marquee2 = grabElement("marquee2");

async function createMarquee() {
  await createNasdaqArray();
  let shuffled = nasdaqArray.sort(() => 0.5 - Math.random());
  shuffledArray = shuffled.slice(0, 50);
  console.log(shuffledArray);
  for (let object of shuffledArray) {
    await createMArqueeElement(object);
  }
  console.log(marqueeElement);
  marquee.append(marqueeElement);
}
async function createMArqueeElement(shuffArrayObject) {
  const { symbol, price } = shuffArrayObject;

  const symbolElement = document.createElement("span");
  symbolElement.innerText = ` ${symbol} `;
  symbolElement.style.marginLeft = "5px";

  const priceElement = document.createElement("span");
  priceElement.innerText = `($${price})`;
  priceElement.classList.add("positiveChange");
  marqueeElement.append(symbolElement, priceElement);
}

async function createNasdaqArray() {
  await fetchMarqueeData();
  for (let object of marqueeData)
    if (object.exchangeShortName == "NASDAQ") {
      nasdaqArray.push(object);
    }
}

// function updateResultInDom(domElem, value) {
//   domElem.innerText = value;
// }
