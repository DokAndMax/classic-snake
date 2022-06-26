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
      let newType = 'body';
      if (i === 0) newType = 'head';
      else if (i === this.#length - 1) newType = 'tail';
      else if (i === this.#length) newType = 'apple';
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
    this.snakeParts[0].direction = this.direction;
    this.snakeParts.forEach(snakePart => snakePart.direction());
    this.snakeParts[0].openMouth(this.snakeParts.apple);
    this.snakeParts.reduceRight((previousSnakePart, currentSnakePart) => {
      currentSnakePart.copyPropertiesTo(previousSnakePart);
      return currentSnakePart;
    });
  }


  increaseLength() {
    this.snakeParts[0].isFat = true;
    const last = this.snakeParts[this.#length - 1];
    const temp = last.copy('body');
    last.direction.opposite.call(last);
    this.snakeParts.splice(this.#length - 1, 0, temp);
    this.snakeParts.apple.randomizePos();
    this.#length++;
  }
}

class PartOfSnake {
  #type;
  get type() {
    return this.#type;
  }

  set type(value) {
    if (this.#type === 'tail')
      return;
    if (value === 'apple') this.randomizePos();
    this.#type = value;
  }

  constructor(pos, direction, type) {
    this.pos = pos;
    this.direction = direction;
    this.type = type;
    this.isFat = false;
  }

  randomizePos() {
    this.pos.x = Math.floor(Math.random() * this.pos.width);
    this.pos.y = Math.floor(Math.random() * this.pos.height);
  }

  copy(type = this.type) {
    const target = new PartOfSnake({
      x: this.pos.x,
      y: this.pos.y,
      width: this.pos.width,
      height: this.pos.height,
    }, this.direction, type);
    return target;
  }

  copyPropertiesTo(target) {
    const delta = this.direction.angle - target.direction.angle;
    if (delta !== 0)
      target.type = 'cornerBody';
    else
      target.type = 'body';
    target.flag = (delta === -90 || delta === 270);
    target.direction = this.direction;
    target.isFat = this.isFat;
    this.isFat = false;
    if (typeof target !== PartOfSnake) target.prototype = PartOfSnake;
  }

  openMouth(apple) {
    const obj = this.copy();
    obj.direction();
    this.type = 'mouth';
    if (apple.pos.x === obj.pos.x &&
      apple.pos.y === obj.pos.y)
      this.type = 'openMouth';
  }
}
