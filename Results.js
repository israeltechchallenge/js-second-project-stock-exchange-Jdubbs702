class SearchResult {
    constructor(element) {
        this.searchList = document.createElement("div");
        element.append(this.searchList);

        this.showLoading = () => {
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
                anchor.classList.add("d-flex", "col", "col-md-auto");

                const change = document.createElement("span");
                let n = parseFloat(company.changesPercentage).toFixed(2)
                if (company.changesPercentage >= 0) {
                    change.innerHTML = `(+${n})`;
                    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "positiveChange", "change-margin");
                }
                else {
                    change.innerHTML = `(${n})`;
                    change.classList.add("d-flex", "col", "col-md-auto", "g-0", "negativeChange", "change-margin");
                }
                container.append(wrapper);
                wrapper.append(profileImg, anchor, change);
                this.searchList.append(container)
            })
        }
    }
}