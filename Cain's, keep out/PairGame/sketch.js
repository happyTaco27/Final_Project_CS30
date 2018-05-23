// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let rows = 14;
let cols = 32;
let grid;
let gridSpace;
let cellSize;
let testGrounds;
let blankSpace;
let floorTile;
let wallTile;
let charTile;
let charFSide;
let charBSide;
let charLSide;
let charRSide;

function preload() {
  testGrounds = "assets/Levels/TestGrounds.txt";
  loadLines0 = loadStrings(testGrounds);

  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLines1 = loadStrings(blankSpace);

  charFSide = loadImage("images/Front1.png");
  charBSide = loadImage("images/Back1.png");
  charLSide = loadImage("images/Left1.png");
  charRSide = loadImage("images/Right1.png");

  floorTile = loadImage("images/Tile_5.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (cols * 1.1);
  grid = createEmpty2dArray(cols, rows);
  gridSpace = createEmpty2dArray(cols, rows);
  moveX = 5;
  moveY = 13;
  charTile = charFSide;
  strokeWeight(2);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = loadLines0[x][y];
      grid[x][y] = tileType;
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = loadLines1[x][y];
      gridSpace[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  displayGrid();
  displayObjects();
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

      if (grid[x][y] === "0") {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }

      else if (grid[x][y] === "2") {
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function displayObjects() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (gridSpace[x][y] === 2 || gridSpace[x][y] === "2") {
        image(charTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function playerThing() {
  gridSpace[moveX][moveY] = "2";
}

function borderThingy() {
  noFill();
  rect(0, 0, cols * cellSize, rows * cellSize);
}

function mouseClicked() {
  //Up
  if (floor(mouseY / cellSize) < moveY && grid[moveX][moveY - 1] === "0") {
    moveY--;
    charTile = charBSide;
  }
  //Down
  else if (floor(mouseY / cellSize) > moveY && grid[moveX][moveY + 1] === "0") {
    moveY++;
    charTile = charFSide;
  }
  //Left
  if (floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY] === "0") {
    moveX--;
    charTile = charLSide;
  }
  //Right
  else if (floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY] === "0") {
    moveX++;
    charTile = charRSide;
  }
  clearOutBodies();
}

function clearOutBodies() {
  let theGrid = gridSpace;
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
