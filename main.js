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
const gameRender = new GameRender(gameField);
const snake = new Snake();

addEventListener('endGame', endGame);
window.addEventListener('resize', () => document.location.reload());
document.querySelector("#startGame").addEventListener('click', startGame);
document.querySelector(".field").addEventListener('click', pauseGame);
infoField.style.width = `${gameRender.gameFieldWidth + 10}px`;
gameField.addEventListener('click', (e) => e.stopPropagation());
gameField.setAttribute("width", `${gameRender.gameFieldWidth}`);
gameField.setAttribute("height", `${gameRender.gameFieldHeight}`);

function startGame(event) {
  switchToElement("field");
  gameRender.setMap(settings.map);
  gameRender.setSnake(snake);
  snake.initSnake(settings.map)
  settings.intervalID = setInterval(() => {
    snake.moveForward();
    gameRender.tick();
  }, settings.speed);
}

function pauseGame(event) {
  switchToElement("menu");
}

function endGame(event) {

}

function switchToElement(elementClass) {
  let elementList = document.querySelectorAll("body>div");
  for (let element of elementList)
    element.classList.add("hidden");
  document.querySelector(`.${elementClass}`).classList.remove("hidden");
}