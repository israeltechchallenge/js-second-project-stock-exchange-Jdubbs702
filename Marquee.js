class Marquee {
    constructor(element) {
        this.nasdaqArray = [];
        this.marqueeElement = document.createElement("div");
        this.domElement = element;
    }
    async fetchData() {
        fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=ab6a1123daae3cc55bfece5648bb601c`)
            .then(response => response.json())
            .then(data => {
                for (let object of data) {
                    if (object.exchangeShortName == "NASDAQ") {
                        this.nasdaqArray.push(object);
                    }
                }
            })
            .then(() => {
                let shuffled = this.nasdaqArray.sort(() => 0.5 - Math.random());
                const shuffledArray = shuffled.slice(0, 50);
                for (let object of shuffledArray) {
                    const { symbol, price } = object;

                    const symbolElement = document.createElement("span");
                    symbolElement.innerText = ` ${symbol} `;
                    symbolElement.style.marginLeft = "5px";

                    const priceElement = document.createElement("span");
                    priceElement.innerText = `($${price})`;
                    priceElement.classList.add("positive-change");

                    this.marqueeElement.append(symbolElement, priceElement);
                }
            })
            .catch(error => console.log(error.message))
    }
    async printData() {
        this.domElement.append(this.marqueeElement);
    }
    async init() {
        await this.fetchData();
        await this.printData();
    }
}
