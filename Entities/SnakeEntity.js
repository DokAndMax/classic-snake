export default class SnakeEntity {
  #angleFrom;
  #angleTo;
  #isFat;
  #isCorner;
  #x;
  #y;

  constructor(x, y, angleFrom, angleTo, isFat) {
    this.#x = x;
    this.#y = y;
    this.#angleFrom = angleFrom;
    this.#angleTo = angleTo;
    this.#isFat = isFat;
  }

  set angleTo(value) {
    this.#angleTo = value;
    console.log(this.#angleFrom + ' ' + this.#angleTo);
    this.#isCorner = (this.#angleFrom - this.#angleTo) !== 0;
  }

  drawPart(skin) {
    const drwSkin = skin(this.#isFat, this.#isCorner);
    return drwSkin.map(([x, y]) => {
      let resX = x,
        resY = y;

      if (this.#angleTo >= 180)
        resY = -(resY - 2) + 2;
      if (this.#isCorner && (this.#angleTo + this.#angleFrom) === 270)
        resX = -(resX - 2) + 2;

      [resX, resY] = this.rotate(2, 2, resX, resY, this.#angleTo);

      resX += this.#x * 4;
      resY += this.#y * 4;

      return [resX, resY];
    });
  }

  rotate(cx, cy, x, y, angle) {
    const radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }
}
