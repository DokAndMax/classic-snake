class MapControl {
  name;
  device;
  #snakeSpawnProperties = {
    pos: { x: 0.5, y: 0.5 },
    angle: 0,
  };
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
      direction: this.#snakeSpawnProperties.direction,
      pos: {
        x: Math.round(this.#snakeSpawnProperties.pos.x * this.#gameWidth),
        y: Math.round(this.#snakeSpawnProperties.pos.y * this.#gameHeight),
      }
    };
  }

  set snakeSpawnProperties(value) {
    this.#snakeSpawnProperties = value;
  }

  drawMap() {

  }
}


const defaultMaps = [
  new MapControl('No maze', 'any'),
];

export { MapControl, defaultMaps };
