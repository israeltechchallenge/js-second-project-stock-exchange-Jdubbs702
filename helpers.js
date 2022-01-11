function grabElement(id) {
  const domElement = document.getElementById(id);
  if (domElement) return domElement;
  else throw new Error(`Couldn't grab an element with ID: ${id}`);
}

function updateResultInDom(domElem, value) {
  domElem.innerText = value;
}

async function fetchServer(input) {
  const fetchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`
  try {
    const response = await fetch(fetchURL);
    let data;
    data = await response.json();
    console.log(data)
    createlist(data);

  } catch (error) {
    console.error(error);
  }
}

function createlist(listObjects) {
  const ulList = grabElement("ulList");
  ulList.innerHTML = "";
  for (let object of listObjects) createLiElement(object, ulList);
}

function createLiElement(listObject, parent) {
  const { name, symbol } = listObject;
  const stringToCompose = [
    { type: "span", value: name },
    { type: "span", value: ` (${symbol})` },
  ];
  const wrapper = document.createElement("li");
  wrapper.classList.add("list-group-item", "list-item");
  const anchor = document.createElement("a");
  anchor.href = `/company.html?symbol=${symbol}`;

  for (const object of stringToCompose) {
    const domElement = document.createElement(object.type);
    updateResultInDom(domElement, object.value);
    anchor.append(domElement);
    wrapper.append(anchor);
  }
  parent.append(wrapper);
}
