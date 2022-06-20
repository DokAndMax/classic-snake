import {GameMap} from "./GameMap.js";

export default class Snake {
  direction;
  #length = 5;
  snakeParts = [];
  #gameWidth;
  #gameHeight;

  set length(n) {
    if (this.snakeParts.length)
      this.snakeParts.push()
  }

  get length() {
    return this.#length
  }

  initSnake(map) {
    this.direction = map.snakeSpawnProperties.direction;
    for (let obj = {...map.snakeSpawnProperties}, i = 0; i < this.length; this.direction(obj), i++)
      this.snakeParts.unshift(new PartOfSnake({x: obj.x, y: obj.y}, this.direction));
  }

  setGameSize(width, height) {
    this.#gameWidth = width;
    this.#gameHeight = height;
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  moveForward() {
    let intDirection;
    let nextDirection = this.direction;
    this.snakeParts.forEach((snakePart) => {
      intDirection = snakePart.direction;
      snakePart.direction = nextDirection;
      nextDirection = intDirection;
      snakePart.direction(snakePart.pos, this.#gameWidth, this.#gameHeight)
    });
  }
}

class PartOfSnake {
  #pos;
  direction;
  type = "body";

  constructor(pos, direction) {
    this.pos = pos;
    this.direction = direction;
  }

  set pos(obj) {
    this.#pos = obj;
  }

  get pos() {
    return this.#pos;
  }

  delete(context) {

  }
}