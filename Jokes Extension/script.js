
const jokePara = document.querySelector(".jokePara");
fetch("https://api.chucknorris.io/jokes/random").then(data => data.json())
    .then(jokeData => 
        jokePara.innerText = jokeData.value
        )

