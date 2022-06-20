class GameMap {
  name;
  device;
  #snakeSpawnProperties = {x: 0.1, y: 0.5, direction: GameMap.directions.right,};
  boundaries = [];
  #gameWidth;
  #gameHeight;

  constructor(name, device) {
    this.name = name;
    this.device = device;
  }

  setGameSize(width, height) {
    this.#gameWidth = width;
    this.#gameHeight = height;
  }

  addLine(from, to) {
    this.boundaries.push({
      from,
      to,
    });
  }

  get snakeSpawnProperties() {
    return {
      ...this.#snakeSpawnProperties,
      x: Math.round(this.#snakeSpawnProperties.x * this.#gameWidth),
      y: Math.round(this.#snakeSpawnProperties.y * this.#gameHeight),
    };
  }

  set snakeSpawnProperties(value) {
    this.#snakeSpawnProperties = value;
  }

  drawMap() {

  }

  static directions = {
    up(obj, ...mapEdge) {
      obj.y--;
      if (mapEdge.length && obj.y <= -1)
        obj.y = mapEdge[1] - 1;
    },
    down(obj, ...mapEdge) {
      obj.y++;
      if (mapEdge.length && obj.y >= mapEdge[1])
        obj.y = 0;
    },
    left(obj, ...mapEdge) {
      obj.x--;
      if (mapEdge.length && obj.x <= -1)
        obj.x = mapEdge[0] - 1;
    },
    right(obj, ...mapEdge) {
      obj.x++;
      if (mapEdge.length && obj.x >= mapEdge[0])
        obj.x = 0;
    },
  }
}


let defaultMaps = [
  new GameMap("No maze", 'any'),
];

export {GameMap, defaultMaps};