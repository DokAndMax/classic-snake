export default class Snake {
  direction;
  #length = 5;
  snakeParts = [];
  #gameWidth;
  #gameHeight;

  setGameSize(width, height) {
    this.#gameWidth = width;
    this.#gameHeight = height;
  }

  initSnake(map) {
    this.direction = map.snakeSpawnProperties.direction;
    for (let obj = {...map.snakeSpawnProperties}, i = 0; i < this.#length; obj.direction(), i++) {
      this.snakeParts.unshift(new PartOfSnake({
        x: obj.pos.x,
        y: obj.pos.y,
        width: this.#gameWidth,
        height: this.#gameHeight,
      }, this.direction));
    }
    this.snakeParts.apple = new PartOfSnake({
      width: this.#gameWidth,
      height: this.#gameHeight,
    });
  }

  changeDirection(direction) {
    let headDirection = this.snakeParts[0].direction;
    if (direction.name === headDirection.opposite.name)
      return;
    this.direction = direction;
  }

  moveForward() {
    let intDirection;
    let nextDirection = this.direction;
    this.snakeParts.forEach((snakePart) => {
      intDirection = snakePart.direction;
      snakePart.direction = nextDirection;
      nextDirection = intDirection;
      snakePart.direction()
    });
  }

  incrementLength() {
    let temp = this.snakeParts[this.#length - 1].copy();
    temp.direction.opposite.call(temp);
    this.snakeParts.push(temp);
    this.snakeParts.apple.randomizePos();
    this.#length++;
  }
}

class PartOfSnake {
  #type;

  constructor(pos, direction) {
    this.pos = pos;
    if (pos.x === undefined) {
      this.#type = 'apple';
      this.randomizePos()
    }
    this.direction = direction;
  }

  randomizePos() {
    if (this.#type !== 'apple') return;
    this.pos.x = Math.floor(Math.random() * this.pos.width);
    this.pos.y = Math.floor(Math.random() * this.pos.height);
  }

  copy() {
    return new PartOfSnake({
      x: this.pos.x,
      y: this.pos.y,
      width: this.pos.width,
      height: this.pos.height,
    }, this.direction);
  }
}