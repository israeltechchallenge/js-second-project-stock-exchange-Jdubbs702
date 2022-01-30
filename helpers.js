function grabElement(id) {
  const domElement = document.getElementById(id);
  if (domElement) return domElement;
  else throw new Error(`Couldn't grab an element with ID: ${id}`);
}

async function generalFetch(url) {
  try {
    const response = await fetch(url);
    let data;
    data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`

async function searchAndFetchProfile(query) {
  const companies = await generalFetch(`${baseUrl}search?query=${query}&limit=10&exchange=NASDAQ`);
  let companiesArray = [];
  for (company of companies) {
    if (company.symbol)
      companiesArray.push(await getProfile(company.symbol))
  }
  return companiesArray;
}

async function getProfile(symbol) {
  const data = await generalFetch(`${baseUrl}company/profile/${symbol}`)
  const profile = data.profile;
  profile.symbol = symbol;
  return profile;
}

async function createProfile(responseObject) {
  const image = grabElement("image");
  image.src = "";
  image.src = responseObject.image;
  image.style.height = "40px";

  const name = grabElement("name");
  name.innerHTML = "";
  name.innerHTML = responseObject.companyName;

  const link = grabElement("link");
  link.innerText = "Go to Website";
  link.href = responseObject.website;

  const description = grabElement("description");
  description.innerHTML = "";
  description.innerHTML = responseObject.description;

  const price = grabElement("stockPrice");
  price.innerHTML = "";
  price.innerHTML = `Stock Price: $${responseObject.price}`;

  const change = grabElement("change");
  changeInPercentage = responseObject.changesPercentage
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
    getArray(data);
  } catch (error) {
    console.error(error);
  }
}

function getArray(responseObject) {
  const { historical } = responseObject;
  historical.sort((a, b) => (a.date > b.date) ? 1 : -1)
  for (var i = 0; i < historical.length; ++i)
    xlabels.push(historical[i]["date"]);
  for (var i = 0; i < historical.length; ++i)
    ylabels.push(historical[i]["close"]);
}