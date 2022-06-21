import {drawApple, drawBody, drawCornerBody} from "./snakeskins.js";

export default class GameRender {
  #snake;
  #snakeParts;
  #mapBoundaries;

  constructor(gameField) {
    this.gameField = gameField;
    this.gameFieldContext = gameField.getContext("2d");

    let width = window.innerWidth * 0.9;
    let height = window.innerHeight * 0.75;
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
    this.drawSquare();
    //this.drawGrid();
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
    this.gameFieldContext.clearRect(0, 0, this.gameFieldWidth, this.gameFieldHeight);
  }

  drawSquare() {
    for (let snakePart of this.#snakeParts) {
      drawBody(this.gameFieldContext, snakePart.pos.x, snakePart.pos.y, this.squareSize);
    }
    drawApple(this.gameFieldContext, this.#snakeParts.apple.pos.x, this.#snakeParts.apple.pos.y, this.squareSize);
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
    let headPos = this.#snakeParts[0].pos;
    let applePos = this.#snakeParts.apple.pos
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

