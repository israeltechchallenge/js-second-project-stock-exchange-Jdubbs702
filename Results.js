class SearchResult {
    constructor(element) {
        this.searchList = document.createElement("div");
        element.append(this.searchList);

        this.showLoading = () => {
            this.searchList.innerHTML = "";
            this.searchList.classList.add("spinner-border", "text-danger");
        }
        this.renderResults = (results, input) => {
            this.searchList.classList.remove("spinner-border", "text-danger");

            results.forEach(company => {
                const container = document.createElement("div");
                container.classList.add("list-group-item");

                const wrapper = document.createElement("div");
                wrapper.classList.add("row", "row-col-3", "align-items-center", "list-item", "g-0");

                const profileImg = document.createElement("img");
                profileImg.src = company.image;
                profileImg.style.width = "70px";
                profileImg.classList.add("img-fluid", "d-flex", "col", "col-md-auto", "list-profile-img", "g-0");

                const anchor = document.createElement("a");
                anchor.href = `/company.html?symbol=${company.symbol}`;
                anchor.innerText = company.companyName.toUpperCase();
                anchor.classList.add("col", "col-md-auto", "myAnchor");

                const change = document.createElement("span");
                let n = parseFloat(company.changesPercentage).toFixed(2)
                if (company.changesPercentage >= 0) {
                    change.innerHTML = `(+${n})`;
                    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "positive-change", "change-margin");
                }
                else {
                    change.innerHTML = `(${n})`;
                    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "negative-change", "change-margin");
                }

                let textToSearch = input;
                let textToHighlight = anchor;
                textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                let pattern = new RegExp(`${textToSearch}`, "gi");

                textToHighlight.innerHTML = textToHighlight.textContent.replace(pattern, match => `<mark class="highlight">${match}</mark>`)

                container.append(wrapper);
                wrapper.append(profileImg, anchor, change);
                this.searchList.append(container)
            })
        }
    }
}