// RnGMapThingy
// Xyre Abelanes
// 17 May, 2018

let grid;
let cellSize;
let rows;
let cols;
let floorTile;
let wallTile;

function preload() {
  floorTile = loadImage("images/Tile_5.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = 32;
  cols = 14;
  cellSize = width / (rows * 1.1);
  base = createMap();
  grid = terraform(base);
}

function draw() {
  background(255);
  displayGrid();
}

function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === 0) {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}


function arrayMaker(num, xLength, yLength) {
  let grid = [];
  for (let x = 0; x < xLength; x++) {
    grid.push([]);
    for (let y = 0; y < yLength; y++) {
      grid[x].push(num);
    }
  }
  return grid;
}

function createMap() {
  let maxTunnels = 50,
    maxLength = 10,
    map = arrayMaker(1, rows, cols),
    currentRow = floor(random() * rows),
    currentColumn = floor(random() * cols),
    directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ],
    lastDirection = [],
    randomDirection;

  while (maxTunnels && maxLength && rows && cols) {
    do {
      randomDirection = directions[floor(random() * directions.length)];
    } while ((randomDirection[0] === -lastDirection[0] &&
        randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] &&
        randomDirection[1] === lastDirection[1]));
    let randomLength = ceil(random() * maxLength),
      tunnelLength = 0;

    while (tunnelLength < randomLength) {
      if (((currentRow === 0) && (randomDirection[0] === -1)) ||
        ((currentColumn === 0) && (randomDirection[1] === -1)) ||
        ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
        ((currentColumn === cols - 1) && (randomDirection[1] === 1))) {
        break;
      }
      else {
        map[currentRow][currentColumn] = 0;
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++;
      }
    }

    if (tunnelLength) {
      lastDirection = randomDirection;
      maxTunnels--;
    }
  }
  return map;
}

function terraform(map) {
  let player = 0;
  for (let x = 0; x < xLength; x++) {
    for (let y = 0; y < yLength; y++) {
      if (map[x][y] === 0 && player === 0) {
        map[x][y] = 2;
        player = 1;
      }
      else if (map[x][y] != 0 && map[x + 1][y] != 0 && map[x - 1][y] != 0 && map[x][y + 1] != 0 && map[x][y - 1] != 0) {
        map[x][y] = 'O'
      }
    }
  }
  return map;
}
