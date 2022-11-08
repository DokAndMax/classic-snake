import { settings, endGame, switchToElement } from '../main.js';

document.querySelector('#levels-menu-button')
  .addEventListener('click',
    () => switchToElement('levels-menu'));
document.querySelector('#back')
  .addEventListener('click',
    () => switchToElement('menu'));

const elements = document.getElementsByClassName('level');

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', setSpeed);
}

function setSpeed(e) {
  settings.speed = parseInt(e.target.innerText);
  endGame();
}
