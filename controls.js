import { GameMap } from './main.js';

function qwerty(snake, event) {
  switch (event.key) {
  case 'ArrowUp':
    snake.changeDirection(GameMap.directions.up);
    break;
  case 'ArrowDown':
    snake.changeDirection(GameMap.directions.down);
    break;
  case 'ArrowLeft':
    snake.changeDirection(GameMap.directions.left);
    break;
  case 'ArrowRight':
    snake.changeDirection(GameMap.directions.right);
    break;
  }
}

const defineControls = snake => {
  window.addEventListener('keydown', qwerty.bind(null, snake));
};
const removeControls = () => {
  window.removeEventListener('keydown', qwerty);
};

export { defineControls, removeControls };
