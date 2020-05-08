// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target)
    searchAPI(e.target.value);
})

function displayResults(results) {
    console.log(results)
    for (let index = 0; index < results.length; index++) {
        const food = results[index];
        document.getElementById("results").innerHTML = `
            <div>
                <span>${food.title}</span>
            </div>
        `;
    }
}

function searchAPI(value) {
    let food = {}
    food = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        .then((res) => {
            if(res.status != 200) {
                console.error("The query doesnt exist" + res.status);
                return;
            }
            return res.json().then(data => {
                displayResults(data);
            });
        })
    console.log(food);

}