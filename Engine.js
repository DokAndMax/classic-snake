export default class Engine {
  #snake;
  #map;
  #isMobile;
  #squareSize;

  constructor(gameField) {
    this.gameField = gameField;
    this.gameFieldContext = gameField.getContext('2d');

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.75;
    this.#isMobile = height > width;
    this.#squareSize = Math.ceil((this.#isMobile ? height : width) / 28);
    this.gameWidthSquares = Math.floor(width / this.#squareSize);
    this.gameHeightSquares = Math.floor(height / this.#squareSize);
    this.gameFieldWidth = this.gameWidthSquares * this.#squareSize;
    this.gameFieldHeight = this.gameHeightSquares * this.#squareSize;
  }

  tick() {
    //if (this.checkCollision()) return;
    this.clearGameField();
    this.#snake.moveForward();
    this.drawSnake();
    this.drawGrid();
  }

  setSnake(snake) {
    this.#snake = snake;
    snake.setGameSize(this.gameWidthSquares, this.gameHeightSquares);
  }

  setMap(map) {
    this.#map = map;
    map.setGameSize(this.gameWidthSquares, this.gameHeightSquares);
  }

  clearGameField() {
    this.gameFieldContext.clearRect(0, 0,
      this.gameFieldWidth, this.gameFieldHeight);
  }

  drawSnake() {
    for (const snakeEntity of this.#snake.getDrawing()) {
      this.gameFieldContext.beginPath();
      for (const [x, y] of snakeEntity)
        this.gameFieldContext.lineTo(x * this.#squareSize / 4,
          y * this.#squareSize / 4);
      this.gameFieldContext.fill();
    }
  }

  drawGrid() { // for debug
    this.gameFieldContext.beginPath();
    for (let i = 0; i <= Math.max(this.gameFieldWidth, this.gameFieldHeight); i += this.#squareSize) {
      this.gameFieldContext.moveTo(i, 0);
      this.gameFieldContext.lineTo(i, this.gameFieldHeight);
      this.gameFieldContext.moveTo(0, i);
      this.gameFieldContext.lineTo(this.gameFieldWidth, i);
    }
    this.gameFieldContext.stroke();
  }

  /*checkCollision() {
    let isCollision = false;
    const headPos = this.#snakeParts[0].pos;
    const apple = this.#snakeParts.apple;
    const applePos = apple.pos;
    if (applePos.x === headPos.x &&
      applePos.y === headPos.y) {
      this.#snake.increaseLength();
      document.dispatchEvent(new Event('appleEaten'));
    }

    let flag = false;
    do {
      flag = false;
      this.#snakeParts.forEach((snakePart, index) => {
        if ((applePos.x === snakePart.pos.x &&
          applePos.y === snakePart.pos.y)) {
          apple.randomizePos();
          flag = true;
        }

        if (index === 0) return;
        if (headPos.x === snakePart.pos.x &&
          headPos.y === snakePart.pos.y) {
          isCollision = true;
          document.dispatchEvent(new Event('collision'));
        }
      });
    } while (flag);

    return isCollision;
  }*/
}

