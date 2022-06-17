document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".field").addEventListener('click', pauseGame);
document.querySelector(".game-field").addEventListener('click', (e) => e.stopPropagation());
window.addEventListener('resize', () => document. location. reload());

const gameField = document.querySelector(".game-field");
const menu = document.querySelector(".menu");
const field = document.querySelector(".field");
gameField.setAttribute("height",  (window.innerHeight * 0.75).toFixed(0));
gameField.setAttribute("width",  (window.innerWidth * 0.9).toFixed(0));
const settings = {
    speed: 500,
    maze: "",
};

function startGame(event) {
    switchToElement("field");
}

function pauseGame(event) {
    switchToElement("menu");
}

function switchToElement(elementClass) {
    let elementList = document.querySelectorAll("body>div");
    for(let element of elementList)
        element.classList.add("hidden");
    document.querySelector(`.${elementClass}`).classList.remove("hidden");
}