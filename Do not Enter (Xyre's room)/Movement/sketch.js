// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let rows = 14;
let cols = 32;
let grid;
let cellSize;
let testGrounds;
let floorTile;
let wallTile;
let charFSide;

function preload() {
  testGrounds = "assets/Levels/TestGrounds.txt";
  loadLines = loadStrings(testGrounds);

  charFSide = loadImage("images/Front1.png");

  floorTile = loadImage("images/Tile_5.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (cols * 1.1);
  grid = createEmpty2dArray(cols, rows)
  moveX = 0;
  moveY = 0;
  strokeWeight(2);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = loadLines[x][y];
      grid[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  displayGrid();
  borderThingy();
  playerThing();
}

// disables window scrolling
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll);

function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 0 || grid[x][y] === "0") {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        image(charFSide, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        fill(0, 255, 50);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function playerThing() {
  grid[moveX][moveY] = "2";
}

function borderThingy() {
  noFill();
  rect(0, 0, cols * cellSize, rows * cellSize);
}

function mouseClicked() {
  //Up
  if (floor(mouseY / cellSize) < moveY && grid[moveX][moveY - 1] === "0") {
    moveY--;
  }
  //Down
  else if (floor(mouseY / cellSize) > moveY && grid[moveX][moveY + 1] === "0") {
    moveY++;
  }
  //Left
  if (floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY] === "0") {
    moveX--;
  }
  //Right
  else if (floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY] === "0") {
    moveX++;
  }
  clearOutBodies();
}

function clearOutBodies() {
  let theGrid = grid;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (theGrid[x][y] === "2") {
        theGrid[x][y] = "0";
      }
    }
  }
  return theGrid;
}

function createEmpty2dArray(cols, rows) {
  let emptyGrid = [];
  for (let x = 0; x < cols; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < rows; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}
