import { skins } from './skins.js';

export default class GameRender {
  #snake;
  #snakeParts;
  #mapBoundaries;

  constructor(gameField) {
    this.gameField = gameField;
    this.gameFieldContext = gameField.getContext('2d');

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.75;
    this.isMobile = height > width;
    this.squareSize = Math.ceil((this.isMobile ? height : width) / 28);
    this.gameWidthSquares = Math.floor(width / this.squareSize);
    this.gameHeightSquares = Math.floor(height / this.squareSize);
    this.gameFieldWidth = this.gameWidthSquares * this.squareSize;
    this.gameFieldHeight = this.gameHeightSquares * this.squareSize;
  }

  tick() {
    if (this.checkCollision()) return;
    this.clearGameField();
    this.drawSnake();
    this.drawGrid();
  }

  setSnake(snake) {
    this.#snake = snake;
    this.#snakeParts = snake.snakeParts;
    snake.setGameSize(this.gameWidthSquares, this.gameHeightSquares);
  }

  setMap(map) {
    this.#mapBoundaries = map.boundaries;
    map.setGameSize(this.gameWidthSquares, this.gameHeightSquares);
  }

  clearGameField() {
    this.gameFieldContext.clearRect(0, 0,
      this.gameFieldWidth, this.gameFieldHeight);
  }

  drawSnake() {
    for (const snakePart of this.#snakeParts) {
      this.drawPart(snakePart);
    }
    this.drawPart(this.#snakeParts.apple);
  }

  drawPart(snakePart) {
    const x = snakePart.pos.x;
    const y = snakePart.pos.y;
    const dirn = snakePart.direction;
    const sqSize = this.squareSize;
    let angle = 0;
    if (dirn.name === 'down') angle = 90;
    if (dirn.name === 'up') angle = 270;
    angle *= (Math.PI / 180);

    const absLines = skins[snakePart.type].map(([sqx, sqy]) => {
      let xnew = 2 + (sqx - 2) * Math.cos(angle) - (sqy - 2) * Math.sin(angle);
      const ynew = 2 + (sqx - 2) * Math.sin(angle) + (sqy - 2) * Math.cos(angle);
      if (dirn.name === 'down' || dirn.name === 'left')
        xnew = -(xnew - 2) + 2;
      const absx = x * sqSize + (sqSize / 4 * xnew);
      const absy = y * sqSize + (sqSize / 4 * ynew);
      return [absx, absy];
    });
    this.gameFieldContext.beginPath();
    for (const [x, y] of absLines)
      this.gameFieldContext.lineTo(x, y);
    this.gameFieldContext.fill();
  }

  drawGrid() { // for debug
    this.gameFieldContext.beginPath();
    for (let i = 0; i <= Math.max(this.gameFieldWidth, this.gameFieldHeight); i += this.squareSize) {
      this.gameFieldContext.moveTo(i, 0);
      this.gameFieldContext.lineTo(i, this.gameFieldHeight);
      this.gameFieldContext.moveTo(0, i);
      this.gameFieldContext.lineTo(this.gameFieldWidth, i);
    }
    this.gameFieldContext.stroke();
  }

  checkCollision() {
    let isCollision = false;
    const headPos = this.#snakeParts[0].pos;
    const applePos = this.#snakeParts.apple.pos;
    if (applePos.x === headPos.x &&
      applePos.y === headPos.y) {
      this.#snake.incrementLength();
      return isCollision;
    }
    this.#snakeParts.forEach((snakePart, index) => {
      if (index === 0) return;
      if (headPos.x === snakePart.pos.x &&
        headPos.y === snakePart.pos.y) {
        isCollision = true;
        document.dispatchEvent(new Event('collision'));
      }
    });
    return isCollision;
  }
}

