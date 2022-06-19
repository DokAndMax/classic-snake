import {GameMap} from "./GameMap.js";

export default class Snake {
  direction = "";
  #length = 5;
  snakeParts = new Array(5);

  constructor(renderArea, map) {
    this.renderArea = renderArea;
    this.initSnake(map.snakeSpawnProperties)
  }

  set length(n) {
    if (this.snakeParts.length)
      this.snakeParts.push()
  }

  get length() {
    return this.#length
  }

  initSnake(snakeSpawnProperties) {
    for (let i = {...snakeSpawnProperties, i: 0}; i.i < this.length; i.direction(i), i.i++)
      this.renderArea[i.x][i.y] = new PartOfSnake("body");
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  moveForward() {
  }
}

class PartOfSnake {
  constructor(type) {
    this.direction = "right";
    this.posX = 0;
    this.posY = 0;
    this.type = "body";
  }
}