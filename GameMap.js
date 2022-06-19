class GameMap {
  name;
  device;
  #snakeSpawnProperties = {x: 0.1, y: 0.5, direction: GameMap.directions.right,};
  boundaries = [];

  constructor(name, device) {
    this.name = name;
    this.device = device;
  }

  addLine(from, to) {
    this.boundaries.push({
      from,
      to,
    });
  }

  get snakeSpawnProperties() {
    return this.convertToSquareCoords(this.#snakeSpawnProperties);
  }

  set snakeSpawnProperties(value) {
    this.#snakeSpawnProperties = value;
  }

  convertToSquareCoords(value) {
    return {
      ...value,
      x: Math.round(value.x * this.gameWidthSquares),
      y: Math.round(value.y * this.gameHeightSquares),
    };
  }

  initMap(renderArea) {
    this.renderArea = renderArea;
    this.gameWidthSquares = renderArea.length;
    this.gameHeightSquares = renderArea[0].length;
  }

  static directions = {
    up(obj) {
      obj.y++
    },
    down(obj) {
      obj.y--
    },
    left(obj) {
      obj.x--
    },
    right(obj) {
      obj.x++
    },
  }
}


let defaultMaps = [
  new GameMap("No maze", 'any'),
];

export {GameMap, defaultMaps};