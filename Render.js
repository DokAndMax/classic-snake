export default class GameRender {
    constructor(gameField) {
        this.gameField = gameField;
        this.gameFieldContext = gameField.getContext("2d");
        this.mobile = window.innerHeight > window.innerWidth;
        let width = window.innerWidth * 0.9;
        let height = window.innerHeight * 0.75;
        this.squareSize = Math.ceil((this.mobile ? height : width) / 29);
        this.gameFieldWidth = Math.ceil(width / this.squareSize) * this.squareSize;
        this.gameFieldHeight = Math.ceil(height / this.squareSize) * this.squareSize;
    }

    tick() {
        this.clearGameField();
        this.drawGrid();
    }

    clearGameField() {
        this.gameFieldContext.clearRect(0, 0, this.gameFieldWidth, this.gameFieldHeight);
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

