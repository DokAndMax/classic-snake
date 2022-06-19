export default class GameRender {
  constructor(gameField) {
    this.gameField = gameField;
    this.gameFieldContext = gameField.getContext("2d");

    let width = window.innerWidth * 0.9;
    let height = window.innerHeight * 0.75;
    this.isMobile = height > width;
    this.squareSize = Math.ceil((this.isMobile ? height : width) / 28);
    this.renderArea = [];
    this.gameWidthSquares = Math.floor(width / this.squareSize);
    this.gameHeightSquares = Math.floor(height / this.squareSize);
    this.gameFieldWidth = this.gameWidthSquares * this.squareSize;
    this.gameFieldHeight = this.gameHeightSquares * this.squareSize;
    for (let i = 0; i < this.gameWidthSquares; i++)
      this.renderArea[i] = new Array(this.gameHeightSquares);
  }

  tick() {
    this.clearGameField();
    this.drawSquare()
    this.drawGrid();

  }

  clearGameField() {
    this.gameFieldContext.clearRect(0, 0, this.gameFieldWidth, this.gameFieldHeight);
  }

  drawSquare() {
    this.gameFieldContext.beginPath();
    for (let [x, column] of this.renderArea.entries()) {
      for (let [y, element] of column.entries()) {
        if (!element)
          continue;
        this.gameFieldContext.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize);
      }
    }
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
}

