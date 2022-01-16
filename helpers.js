function grabElement(id) {
  const domElement = document.getElementById(id);
  if (domElement) return domElement;
  else throw new Error(`Couldn't grab an element with ID: ${id}`);
}

function updateResultInDom(domElem, value) {
  domElem.innerText = value;
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

function createlist(listObjects) {
  const ulList = grabElement("ulList");
  ulList.innerHTML = "";
  for (let object of listObjects) createLiElement(object, ulList);
}

async function createLiElement(listObject, parent) {
  const { name, symbol } = listObject;
  //await fetchProfile(symbol);
  // const{image} = profileData;
  // const stringToCompose2 = [
  //   { type:"img", value: image},
  // ];

  const stringToCompose = [
    { type: "span", value: name },
    { type: "span", value: ` (${symbol})` },
  ];
  const wrapper = document.createElement("li");
  wrapper.classList.add("list-group-item", "list-item");
  const anchor = document.createElement("a");
  anchor.href = `/company.html?symbol=${symbol}`;
  //const profileImg = document.createElement("img");

  // for (const object of stringToCompose2) {
  //   const domElement = document.createElement(object.type);
  //   updateResultInDom(domElement, object.value);
  //   wrapper.append(profileImg);
  // }

  for (const object of stringToCompose) {
    const domElement = document.createElement(object.type);
    updateResultInDom(domElement, object.value);
    anchor.append(domElement);
    wrapper.append(anchor);
  }

  parent.append(wrapper);
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
    createProfile(profileData);

  } catch (error) {
    console.error(error);
  }
}

function createProfile(responseObject){
  const {profile} = responseObject;

  const image = grabElement("image");
  image.src = "";
  image.src = profile.image;

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
  if(changeInPercentage >= 0){
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


async function fetchHistory(symbol){
   const fetchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  try {
    const response = await fetch(fetchURL);
    let data;
    data = await response.json();
    console.log(data);
    getArray(data);
  } catch (error) {
    console.error(error);
  }
}

function getArray(responseObject) {
  const {historical} = responseObject;
  console.log(historical);
  historical.sort((a, b) => (a.date > b.date) ? 1 : -1)
  for (var i=0; i < historical.length ; ++i)
    xlabels.push(historical[i]["date"]);
  for (var i=0; i < historical.length ; ++i)
    ylabels.push(historical[i]["close"]);
  console.log(xlabels);
}

