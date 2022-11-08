import SnakeEntity from '../Entities/SnakeEntity.js';
import { getSkin } from '../Resources./Skins.js';

export default class SnakeControl {
  #snake = [];
  #length = 7;

  #gameWidth;
  #gameHeight;

  #angleFrom = 0;
  #angleTo = 0;
  #isFat = false;
  #x = 0;
  #y = 0;

  setGameSize(width, height) {
    this.#gameWidth = width;
    this.#gameHeight = height;
  }

  initSnake() {
    this.#snake.unshift(new SnakeEntity(this.#x, this.#y, this.#angleFrom,
      this.#angleTo, this.#isFat));
  }

  changeDirection(angle) {
    if ((this.#angleTo % 180) === (angle % 180))
      return;

    this.#angleTo = angle;
  }

  moveForward() {
    if (this.#angleTo % 180)
      this.#angleTo === 90 ? this.#y-- : this.#y++;
    else
      this.#angleTo === 0 ? this.#x++ : this.#x--;

    if (this.#x <= -1)
      this.#x = this.#gameWidth - 1;
    else if (this.#x >= this.#gameWidth)
      this.#x = 0;
    if (this.#y <= -1)
      this.#y = this.#gameHeight - 1;
    else if (this.#y >= this.#gameHeight)
      this.#y = 0;

    this.#snake[0].angleTo = this.#angleTo;
    this.#angleFrom = this.#angleTo;

    this.#snake.unshift(new SnakeEntity(this.#x, this.#y, this.#angleFrom,
      this.#angleTo, this.#isFat));

    this.#isFat = false;
    if (this.#snake.length > this.#length)
      this.#snake.pop();
  }

  increaseLength() {
    this.#length++;
  }

  getDrawing() {
    return this.#snake.map((snakeEntity, i) => {
      let skin = null;
      if (i === 0)
        skin = getSkin.bind(null, 'mouth');
      else if (i === this.#snake.length - 1)
        skin = getSkin.bind(null, 'tail');
      else
        skin = getSkin.bind(null, 'body');

      return snakeEntity.drawPart(skin);
    });
  }

  checkCollision() {
  }
}
