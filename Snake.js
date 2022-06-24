export default class Snake {
  direction;
  #length = 7;
  snakeParts = [];
  #gameWidth;
  #gameHeight;

  setGameSize(width, height) {
    this.#gameWidth = width;
    this.#gameHeight = height;
  }

  initSnake(map) {
    this.direction = map.snakeSpawnProperties.direction;
    for (let obj = { ...map.snakeSpawnProperties }, i = 0; i < this.#length; obj.direction(), i++) {
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
    }, this.direction);
    this.snakeParts[0].type = 'head';
    this.snakeParts[this.#length - 1].type = 'tail';
  }

  changeDirection(direction) {
    const headDirection = this.snakeParts[0].direction;
    if (headDirection.opposite.name === direction.name)
      return;
    this.direction = direction;
  }

  moveForward() {
    let intDirection;
    let nextDirection = this.direction;
    let intSkin;
    let nextSkin = 'body';
    this.snakeParts[0].direction = this.direction;
    this.snakeParts.forEach((snakePart, i) => {
      if (i !== this.#length - 1 && i !== 0) {
        if (snakePart.direction.name !== nextDirection.name)
          nextSkin = 'cornerBody';
        intSkin = snakePart.type;
        snakePart.type = nextSkin;
        nextSkin = intSkin;
      }
      snakePart.direction();
      intDirection = snakePart.direction;
      snakePart.direction = nextDirection;
      nextDirection = intDirection;
    });
  }

  incrementLength() {
    const last = this.snakeParts[this.#length - 1];
    last.type = 'body';
    const temp = last.copy();
    temp.direction.opposite.call(temp);
    this.snakeParts.push(temp);
    this.snakeParts.apple.randomizePos();
    this.#length++;
  }
}

class PartOfSnake {
  constructor(pos, direction) {
    this.pos = pos;
    this.type = 'body';
    if (pos.x === undefined) {
      this.type = 'apple';
      this.randomizePos();
    }
    this.direction = direction;
  }

  randomizePos() {
    if (this.type !== 'apple') return;
    this.pos.x = Math.floor(Math.random() * this.pos.width);
    this.pos.y = Math.floor(Math.random() * this.pos.height);
  }

  copy() {
    const target = new PartOfSnake({
      x: this.pos.x,
      y: this.pos.y,
      width: this.pos.width,
      height: this.pos.height,
    }, this.direction);
    target.type = 'tail';
    return target;
  }
}
