import { MapControl } from './Controls/MapControl.js';

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

const checkDirection = () => {
  if (Math.abs(touchstartX - touchendX) > Math.abs(touchstartY - touchendY)) {
    if (touchendX < touchstartX) return 'ArrowLeft';
    if (touchendX > touchstartX) return 'ArrowRight';
  } else {
    if (touchendY < touchstartY) return 'ArrowUp';
    if (touchendY > touchstartY) return 'ArrowDown';
  }
};

const controls = (snake, e) => {
  if (!e) e = { key: checkDirection() };
  switch (e.key) {
  case 'ArrowUp':
    snake.changeDirection(90);
    break;
  case 'ArrowDown':
    snake.changeDirection(270);
    break;
  case 'ArrowLeft':
    snake.changeDirection(180);
    break;
  case 'ArrowRight':
    snake.changeDirection(0);
    break;
  }
};

export const defineControls = snake => {
  const controlsWithSnake = (...args) => controls(snake, ...args);
  document.addEventListener('keydown', controlsWithSnake);
  document.addEventListener('touchstart', (e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  }));

  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    controlsWithSnake();
  });
};
