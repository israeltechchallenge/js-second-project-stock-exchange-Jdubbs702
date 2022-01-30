let symbol2;
const spinner = grabElement("thisChartRightHere");
const pageSpinner = grabElement("compContainer");
window.onload = async function () {//get symbol and fetch URL with symbol
    try {
        const url_string = (window.location.href);
        const url = new URL(url_string);
        let symbol = url.searchParams.get("symbol");
        symbol2 = symbol;//send symbol to global scope
        console.log(symbol);
        pageSpinner.classList.add("spinner-border")
        profileData = await getProfile(symbol);
        await createProfile(profileData);
        pageSpinner.classList.remove("spinner-border")
        chartIt();
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }
}

const xlabels = [];
const ylabels = [];
async function chartIt() {
    spinner.classList.add("spinner-border")
    await fetchHistory(symbol2);
    spinner.classList.remove("spinner-border")
    const ctx = document.getElementById('thisChartRightHere').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Stock Price History',
                data: ylabels,
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
    })
}