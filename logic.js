const myMarquee = grabElement("myMarquee");
const marquee = new Marquee(myMarquee);

marquee.makeMarquee();

const searchInput = grabElement("searchInput");
const searchButton = grabElement("searchButton");
const searchSpinner = grabElement("searchSpinner");

async function performSearch(e) {
  e.preventDefault();
  const input = searchInput.value;
  await fetchServer(input);
  createlist(data1);
  searchSpinner.classList.remove("spinner-border");
};



searchButton.addEventListener("click", () => {
  searchSpinner.classList.add("spinner-border");
});
searchButton.addEventListener("click", performSearch);
