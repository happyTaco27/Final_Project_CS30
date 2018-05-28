// RnGMapThingy
// Xyre Abelanes
// 17 May, 2018

let grid;
let cellSize;
let rows;
let cols;
let floorTile;
let wallTile;
let blankSpace;
let loadLevel;
let gridSpace;
let stairTile1;
let stairTile2;
let stairTile3;
let stairTile4;
let randomizer;

function preload() {
  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLevel = loadStrings(blankSpace);

  floorTile = loadImage("images/Tile_5.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
  stairTile1 = loadImage("images/Tile_14.png");
  stairTile2 = loadImage("images/Tile_15.png");
  stairTile3 = loadImage("images/Tile_16.png");
  stairTile4 = loadImage("images/Tile_17.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = 32;
  cols = 14;
  cellSize = width / (rows * 1.1);
  gridSpace = createEmpty2dArray(rows, cols);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLevel[x][y];
      gridSpace[x][y] = tileType;
    }
  }
  randomizer = random(4)
  base = createMap();
  grid = terraform(base);
}

function draw() {
  background(255);
  displayGrid();
  displayObjects();
}

function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === 0) {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 'O') {
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function displayObjects() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (gridSpace[x][y] === 2 || gridSpace[x][y] === "2") {
        image(stairTile3, x * cellSize, y * cellSize, cellSize, cellSize);
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
  let maxTunnels = 25,
    maxLength = 8,
    map = arrayMaker('O', rows, cols),
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
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 0 && player === 0) {
        gridSpace[x][y] = 2;
        player = 1;
      }
      if (map[x][y] === 0) {
        if (x - 1 >= 0 && map[x - 1][y] === 'O') {
          map[x - 1][y] = 1;
        }
        if (x + 1 < rows && map[x + 1][y] === 'O') {
          map[x + 1][y] = 1;
        }
        if (y - 1 >= 0 && map[x][y - 1] === 'O') {
          map[x][y - 1] = 1;
        }
        if (y + 1 < cols && map[x][y + 1] === 'O') {
          map[x][y + 1] = 1;
        }
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y - 1] === 'O') {
          map[x - 1][y - 1] = 1;
        }
        if (x + 1 < rows && y + 1 < cols && map[x + 1][y + 1] === 'O') {
          map[x + 1][y + 1] = 1;
        }
        if (x - 1 >= 0 && y + 1 < cols && map[x - 1][y + 1] === 'O') {
          map[x - 1][y + 1] = 1;
        }
        if (x + 1 < rows && y - 1 >= 0 && map[x + 1][y - 1] === 'O') {
          map[x + 1][y - 1] = 1;
        }
      }
    }
  }
  return map;
}

function createEmpty2dArray(rows, cols) {
  let emptyGrid = [];
  for (let x = 0; x < rows; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < cols; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}
