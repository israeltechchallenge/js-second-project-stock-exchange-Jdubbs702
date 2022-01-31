class SearchForm {
    constructor(domElement) {
        const inputGroupDiv = document.createElement("div");
        inputGroupDiv.classList.add("input-group");
        this.searchInput = document.createElement("input");
        this.searchInput.classList.add("form-control");
        this.searchInput.type = "text";
        this.searchInput.placeholder = "SHOW ME THE MONEY"
        const searchButton = document.createElement("button");
        searchButton.className = "btn btn-outline-danger button-css";
        searchButton.type = "submit";
        const searchSpinner = document.createElement("span");
        const buttonInnerText = document.createElement("span");
        buttonInnerText.classList.add("search-text-css");
        buttonInnerText.innerText = "Search";
        searchButton.append(searchSpinner, buttonInnerText);
        inputGroupDiv.append(this.searchInput, searchButton);
        domElement.append(inputGroupDiv);

        searchButton.onclick = () => this.performSearch();
        this.searchInput.onclick = () => this.searchInput.value = "";
        this.searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchButton.click();
            }
        });
    }

    onSearch(callback, showLoadingCallback, highlighterCallback) {
        this.onSearchCallback = callback;
        this.showLoading = showLoadingCallback;
    }

    async performSearch() {
        this.showLoading();
        const input = this.searchInput.value;
        const companies = await searchAndFetchProfile(input);
        console.log(companies)
        this.onSearchCallback(companies, input);
    }
}

