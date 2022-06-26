import GameRender from './Render.js';
import Snake from './Snake.js';
import { defaultMaps, GameMap } from './GameMap.js';
import { defineControls } from './controls.js';

const infoField = document.querySelector('.info-field');
const gameField = document.querySelector('.game-field');
const settings = {
  speed: 300,
  map: defaultMaps[0],
  gameIntervalID: 0,
  paused: false,
};
const gameRender = new GameRender(gameField);
let snake;

addEventListener('endGame', endGame);
window.addEventListener('resize', () => document.location.reload());
document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('.field').addEventListener('click', pauseGame);
document.querySelector('#continueGame').addEventListener('click', continueGame);
document.addEventListener('collision', endGame);
infoField.style.width = `${gameRender.gameFieldWidth + 6}px`;
gameField.addEventListener('click', e => e.stopPropagation());
gameField.setAttribute('width', `${gameRender.gameFieldWidth}`);
gameField.setAttribute('height', `${gameRender.gameFieldHeight}`);

function startGame() {
  endGame();
  snake = new Snake();
  defineControls(snake);
  gameRender.setMap(settings.map);
  gameRender.setSnake(snake);
  snake.initSnake(settings.map.snakeSpawnProperties);
  switchToElement('field');
  settings.intervalID = setInterval(() => {
    if (settings.paused) return;
    snake.moveForward();
    gameRender.tick();
  }, settings.speed);
}

function pauseGame() {
  settings.paused = true;
  switchToElement('menu');
}

function continueGame() {
  if (!settings.paused) return;
  settings.paused = false;
  switchToElement('field');
}

function endGame() {
  settings.paused = false;
  clearInterval(settings.intervalID);
  switchToElement('menu');
}

function switchToElement(elementClass) {
  const elementList = document.querySelectorAll('body>div');
  for (const element of elementList)
    element.classList.add('hidden');
  document.querySelector(`.${elementClass}`).classList.remove('hidden');
}

export { GameRender, Snake, GameMap };
