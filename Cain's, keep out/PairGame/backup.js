// Maze Game
// Xyre Abelanes
// April 16, 2018

let rows = 14;
let cols = 32;
let grid;
let cellSize;
let moveX;
let moveY;
let gridMode;
let testTile;
let mapLoad;
let mapData;
let commonTile;
let upperTile;
let lowerTile;
let player;

function preload() {
  mapLoad = "assets/Maps/TestMap.txt";
  mapData = loadStrings(mapLoad);

  commonTile = loadImage("images/Tile_5.png");
  upperTile = loadImage("images/Tile_8.png");
  lowerTile = loadImage("images/Tile_2.png");
  // player = loadImage("images/Object_7.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / cols;
  grid = createEmpty2dArray(cols, rows);
  moveX = 0;
  moveY = 1;
  gridMode = 1;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = mapData[x][y];
      grid[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  displayGrid();
  playerThing();
}

// disables window scrolling
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll);

//shows the grid(mazes)
function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 0 || grid[x][y] === "0") {
        image(commonTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        fill(255, 50, 50);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        image(upperTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 4 || grid[x][y] === "4") {
        image(lowerTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        fill(50);
      }
      noFill();
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

//The red square in the screen
function playerThing() {
  grid[moveX][moveY] = 2;
}

//just a mini cheat mode
// function mousePressed() {
//   let xCoord = floor(mouseX / cellSize);
//   let yCoord = floor(mouseY / cellSize);
//
//   if (grid[xCoord][yCoord] === 1 || grid[xCoord][yCoord] === "1") {
//     grid[xCoord][yCoord] = 0;
//   }
//   else if (grid[xCoord][yCoord] === 0 || grid[xCoord][yCoord] === "0") {
//     grid[xCoord][yCoord] = 1;
//   }
// }

// goes to the next maze after reaching the green square
// function nextLevel() {
//   gridMode += 1;
//   if (gridMode === 1) {
//     clearOutBodies();
//     moveX = 0;
//     moveY = 5;
//     grid = mazeGrid;
//   }
//   else if (gridMode === 2) {
//     clearOutBodies();
//     moveX = 8;
//     moveY = 26;
//     grid = mazeGrid2;
//   }
//   if (gridMode === 3) {
//     clearOutBodies();
//     moveX = 32;
//     moveY = 25;
//     grid = mazeGrid3;
//   }
// }

function keyPressed() {
  // Arrow keys are used to make the red square move in the screen, can't go through the black squares.
  if (keyCode === DOWN_ARROW && moveY < rows - 1 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX][moveY + 1] === 0 || grid[moveX][moveY + 1] === "0") {
      moveY += 1;
    }
    else if (grid[moveX][moveY + 1] === 1 || grid[moveX][moveY + 1] === "1") {
      moveY += 1;
      // nextLevel();
    }
  }
  else if (keyCode === UP_ARROW && moveY > 0 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX][moveY - 1] === 0 || grid[moveX][moveY - 1] === "0") {
      moveY -= 1;
    }
    else if (grid[moveX][moveY - 1] === 1 || grid[moveX][moveY - 1] === "1") {
      moveY -= 1;
      // nextLevel();
    }
  }
  if (keyCode === RIGHT_ARROW && moveX < cols - 1 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX + 1][moveY] === 0 || grid[moveX + 1][moveY] === "0") {
      moveX += 1;
    }
    else if (grid[moveX + 1][moveY] === 1 || grid[moveX + 1][moveY] === "1") {
      moveX += 1;
      // nextLevel();
    }
  }
  else if (keyCode === LEFT_ARROW && moveX > 0 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX - 1][moveY] === 0 || grid[moveX - 1][moveY] === "0") {
      moveX -= 1;
    }
    else if (grid[moveX - 1][moveY] === 1 || grid[moveX - 1][moveY] === "1") {
      moveX -= 1;
      // nextLevel();
    }
  }
}

//Just so there isn't two red squares in the screen
function clearOutBodies() {
  let theGrid = grid;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (theGrid[x][y] === 2) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
}

//Creates the base for the maze
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
