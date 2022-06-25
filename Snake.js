import { skins } from './skins.js';

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

  initSnake(spawnProperties) {
    this.direction = spawnProperties.direction;
    const obj = { ...spawnProperties };
    obj.direction = this.direction.opposite;
    for (let i = 0; i <= this.#length; obj.direction(), i++) {
      let newType = skins.body;
      if (i === 0) newType = skins.head;
      else if (i === this.#length - 1) newType = skins.tail;
      else if (i === this.#length) newType = skins.apple;
      this.snakeParts.push(new PartOfSnake({
        x: obj.pos.x,
        y: obj.pos.y,
        width: this.#gameWidth,
        height: this.#gameHeight,
      }, this.direction, newType));
    }
    this.snakeParts.apple = this.snakeParts.pop();
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
    let nextSkin = skins.body;
    this.snakeParts[0].direction = this.direction;
    this.snakeParts.forEach((snakePart, i) => {
      //snakePart.isFat = true;
      if (i !== 0 && i !== this.#length - 1) {
        const delta = nextDirection.angle - snakePart.direction.angle;
        if (delta !== 0) {
          nextSkin = skins.cornerBody;
        }
        snakePart.flag = (delta === -90 || delta === 270);
        intSkin = snakePart.type;
        snakePart.type = nextSkin;
        nextSkin = intSkin;
      }
      snakePart.direction();
      intDirection = snakePart.direction;
      snakePart.direction = nextDirection;
      nextDirection = intDirection;
      if (i === 0) snakePart.openMouth(this.snakeParts.apple);
    });
  }

  incrementLength() {
    this.snakeParts[0].isFat = true;
    const last = this.snakeParts[this.#length - 1];
    const temp = last.copy();
    last.type = skins.body;
    temp.direction.opposite.call(temp);
    this.snakeParts.push(temp);
    this.snakeParts.apple.randomizePos();
    this.#length++;
  }
}

class PartOfSnake {
  constructor(pos, direction, type) {
    this.pos = pos;
    this.direction = direction;
    this.type = type;
    if (type === skins.apple) this.randomizePos();
  }

  randomizePos() {
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
    target.type = this.type;
    return target;
  }

  openMouth(apple) {
    const obj = this.copy();
    obj.direction();
    if (apple.pos.x === obj.pos.x &&
      apple.pos.y === obj.pos.y)
      this.type = skins.openMouth;
    else
      this.type = skins.head;
    return true;
  }
}
