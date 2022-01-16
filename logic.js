const searchInput = grabElement("searchInput");
const searchButton = grabElement("searchButton");

async function performSearch(e) {
  e.preventDefault();
  const input = searchInput.value;
  await fetchServer(input);
  createlist(data1);
};

searchButton.addEventListener("click", performSearch);

