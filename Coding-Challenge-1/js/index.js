// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

var queryText = document.getElementById("query");
document.getElementById("foodForm").addEventListener('submit', (e) => {
    e.preventDefault();
    searchAPI();
})

function displayResults(results) {
    console.log("results", results)
    const foodList = results.meals;
    for (let index = 0; index < foodList.length; index++) {
        const food = foodList[index];
        const instructions = Object.keys(food).filter(key => {
            if(String(key).slice(0 , 10) === "strMeasure")
                return key
        });
        console.log(instructions)
        const html = `
            <div>
                <span class="desc">Meal: ${food.strMeal}</span>
                ${instructions.forEach(element => {
                  return `<span>${food[element]}</span>`
                })}
                <span class="desc">Area: ${food.strArea}</span>
                <img src="${food.strMealThumb}"></img>
            </div>
        `;
        document.getElementById("results").insertAdjacentHTML("afterbegin", html);
    }
}

function searchAPI() {
    console.log(queryText.value)
    let food = {}
    food = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryText.value}`)
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