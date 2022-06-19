import GameRender from "./Render.js";
import Snake from "./Snake.js";
import {defaultMaps} from "./GameMap.js";

const infoField = document.querySelector(".info-field");
const gameField = document.querySelector(".game-field");
const settings = {
  speed: 500,
  map: defaultMaps[0],
  gameIntervalID: 0,
};
const gameRender = new GameRender(gameField)
settings.map.initMap(gameRender.renderArea);
const snake = new Snake(gameRender.renderArea, settings.map);

window.addEventListener('resize', () => document.location.reload());
document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".field").addEventListener('click', pauseGame);
infoField.style.width = `${gameRender.gameFieldWidth + 10}px`;
gameField.addEventListener('click', (e) => e.stopPropagation());
gameField.setAttribute("width", `${gameRender.gameFieldWidth}`);
gameField.setAttribute("height", `${gameRender.gameFieldHeight}`);

function startGame(event) {
  switchToElement("field");
  settings.intervalID = setInterval(() => gameRender.tick(), settings.speed);
}

function pauseGame(event) {
  switchToElement("menu");
}

function switchToElement(elementClass) {
  let elementList = document.querySelectorAll("body>div");
  for (let element of elementList)
    element.classList.add("hidden");
  document.querySelector(`.${elementClass}`).classList.remove("hidden");
}