// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let rows = 32;
let cols = 14;
let grid;
let gridSpace;
let cellSize;
let testGrounds;
let blankSpace;
let highlightSpace;
let floorTile;
let wallTile;
let highlightTile;
let charTile;
let charFSide;
let charBSide;
let charLSide;
let charRSide;
let isCharClicked;

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
  highlightTile = loadImage("images/tilehighlight.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (rows * 1.1);
  grid = createEmpty2dArray(rows, cols);
  gridSpace = createEmpty2dArray(rows, cols);
  // highlightSpace = createEmpty2dArray(rows, cols);
  moveX = 5;
  moveY = 13;
  charTile = charFSide;
  isCharClicked = false;
  strokeWeight(2);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLines0[x][y];
      grid[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  displayGrid();
  displayObjects();
  borderThingy();
  playerThing();
  if (isCharClicked) {
    possibleMoveTiles(gridSpace);
  }
}

// disables window scrolling
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll());

function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {

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
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (gridSpace[x][y] === 2 || gridSpace[x][y] === "2") {
        image(charTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (gridSpace[x][y] === 1 || gridSpace[x][y] === "1") {
        fill(0, 100, 255, 50);
        stroke(30, 90, 210);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function possibleMoveTiles(map) {
  let otherMap = grid;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 2) {
        if (x - 1 >= 0 && otherMap[x - 1][y] === "0") {
          map[x - 1][y] = 1;
          if (x - 2 >= 0 && otherMap[x - 2][y] === "0") {
            map[x - 2][y] = 1;
          }
        }
        if (x + 1 < rows && otherMap[x + 1][y] === "0") {
          map[x + 1][y] = 1;
          if (x + 2 < rows && otherMap[x + 2][y] === "0") {
            map[x + 2][y] = 1;
          }
        }
        if (y - 1 >= 0 && otherMap[x][y - 1] === "0") {
          map[x][y - 1] = 1;
          if (y - 2 >= 0 && otherMap[x][y - 2] === "0") {
            map[x][y - 2] = 1;
          }
        }
        if (y + 1 < cols && otherMap[x][y + 1] === "0") {
          map[x][y + 1] = 1;
          if (y + 2 < cols && otherMap[x][y + 2] === "0") {
            map[x][y + 2] = 1;
          }
        }
        if (x - 1 >= 0 && y - 1 >= 0 && otherMap[x - 1][y - 1] === "0") {
          map[x - 1][y - 1] = 1;
        }
        if (x + 1 < rows && y + 1 < cols && otherMap[x + 1][y + 1] === "0") {
          map[x + 1][y + 1] = 1;
        }
        if (x - 1 >= 0 && y + 1 < cols && otherMap[x - 1][y + 1] === "0") {
          map[x - 1][y + 1] = 1;
        }
        if (x + 1 < rows && y - 1 >= 0 && otherMap[x + 1][y - 1] === "0") {
          map[x + 1][y - 1] = 1;
        }
      }
    }
  }
  return map;
}


function playerThing() {
  gridSpace[moveX][moveY] = 2;
}

function borderThingy() {
  noFill();
  rect(0, 0, rows * cellSize, cols * cellSize);
}

function mouseClicked() {
  //Selecting Character
  if (floor(mouseY / cellSize) === moveY && floor(mouseX / cellSize) === moveX) {
    isCharClicked = !isCharClicked;
  }
  if (isCharClicked) {
    //Up-Right
    if (floor(mouseY / cellSize) < moveY && floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY - 1] === "0") {
      moveY--;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
    }
    //Up-Left
    else if (floor(mouseY / cellSize) < moveY && floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY - 1] === "0") {
      moveY--;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
    }
    //Down-Right
    else if (floor(mouseY / cellSize) > moveY && floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY + 1] === "0") {
      moveY++;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
    }
    //Down-Left
    else if (floor(mouseY / cellSize) > moveY && floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY + 1] === "0") {
      moveY++;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
    }
    //Up
    else if (floor(mouseY / cellSize) < moveY && grid[moveX][moveY - 1] === "0") {
      moveY--;
      charTile = charBSide;
      isCharClicked = false;
    }
    //Down
    else if (floor(mouseY / cellSize) > moveY && grid[moveX][moveY + 1] === "0") {
      moveY++;
      charTile = charFSide;
      isCharClicked = false;
    }
    //Left
    else if (floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY] === "0") {
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
    }
    //Right
    else if (floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY] === "0") {
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
    }
  }
  possibleMoveTiles(gridSpace);
  clearOutBodies();
}

function clearOutBodies() {
  let theGrid = gridSpace;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (theGrid[x][y] === 2) {
        theGrid[x][y] = 0;
      }
      if (theGrid[x][y] === 1) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
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
