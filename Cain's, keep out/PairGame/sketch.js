// Pair Game
// Xyre Abelanes and Cain Rhode
// May 5th, 2018

let rows = 14;
let cols = 32;
let grid;
let cellSize;
let moveX;
let moveY;
let gridMode;
let testTile;
let mapLoadOne;
let mapLoadTwo;
let mapLoadThree;
let mapDataOne;
let mapDataTwo;
let mapDataThree;
let commonTile;
let upperTile;
let upperTileRightOpening;
let upperTileLeftOpening;
let upperTileRightCorner;
let upperTileLeftCorner;
let lowerTile;
let lowerTileRightOpening;
let lowerTileLeftOpening;
let lowerTileRightCorner;
let lowerTileLeftCorner;
let rightTile;
let leftTile;
let player;
let playerX;
let playerY;
let menuTexture;
let middleLevel;
let southLevel;
let westLevel;

//Xyre's Work
function preload() {
  mapLoadOne = "assets/Maps/MiddleLevel.txt";
  mapLoadTwo = "assets/Maps/WestLevel.txt";
  mapLoadThree = "assets/Maps/SouthLevel.txt";
  mapDataOne = loadStrings(mapLoadOne);
  mapDataTwo = loadStrings(mapLoadTwo);
  mapDataThree = loadStrings(mapLoadThree);

  menuTexture = loadImage("images/qubodup-light_wood.png");
  commonTile = loadImage("images/Tile_5.png");
  upperTile = loadImage("images/Tile_8.png");
  upperTileRightOpening = loadImage("images/Tile_11.png");
  upperTileLeftOpening = loadImage("images/Tile_10.png");
  upperTileRightCorner = loadImage("images/Tile_7.png");
  upperTileLeftCorner = loadImage("images/Tile_9.png");
  lowerTile = loadImage("images/Tile_2.png");
  lowerTileRightOpening = loadImage("images/Tile_13.png");
  lowerTileLeftOpening = loadImage("images/Tile_12.png");
  lowerTileRightCorner = loadImage("images/Tile_1.png");
  lowerTileLeftCorner = loadImage("images/Tile_3.png");
  rightTile = loadImage("images/Tile_4.png");
  leftTile = loadImage("images/Tile_6.png");
  player = loadImage("images/Object_7.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / cols;
  middleLevel = createEmpty2dArray(cols, rows);
  southLevel = createEmpty2dArray(cols, rows);
  westLevel = createEmpty2dArray(cols, rows);
  moveX = 1;
  moveY = 1;
  gridMode = 1;
  playerX = 50;
  playerY = 50;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = mapDataOne[x][y];
      middleLevel[x][y] = tileType;
    }
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = mapDataTwo[x][y];
      westLevel[x][y] = tileType;
    }
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = mapDataThree[x][y];
      southLevel[x][y] = tileType;
    }
  }
  grid = middleLevel;
}

function draw() {
  background(0, 200, 255);
  displayGrid();
  playerThing();
  menuBar();
  movePlayer();
}

//disables window scrolling (was previously made by Xyre)
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll);

//Xyre and Cain worked on this
function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 0 || grid[x][y] === "0") {
        image(commonTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 1 || grid[x][y] === "1") {
        image(commonTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        image(upperTile, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 4 || grid[x][y] === "4") {
        image(lowerTile, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 5 || grid[x][y] === "5") {
        image(upperTileRightOpening, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 6 || grid[x][y] === "6") {
        image(upperTileLeftOpening, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "*") {
        image(upperTileRightCorner, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "#") {
        image(upperTileLeftCorner, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 7 || grid[x][y] === "7") {
        image(lowerTileRightOpening, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 8 || grid[x][y] === "8") {
        image(lowerTileLeftOpening, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "$") {
        image(lowerTileRightCorner, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "%") {
        image(lowerTileLeftCorner, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "|") {
        image(rightTile, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === ":") {
        image(leftTile, x * cellSize, y * cellSize, cellSize, cellSize);
        noFill();
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        fill(0, 200, 255);
      }
    }
  }
}

//The red square in the screen
// function playerThing() {
//   grid[moveX][moveY] = 2;
//
// }

function playerThing() {
  fill(225, 255, 0);
  image(player,playerX, playerY, cellSize, cellSize);
}

function menuBar() {
  fill(153, 102, 51);
  image(menuTexture, 0, rows * cellSize, width, 3 * cellSize);
}

//goes to the next level(map)
function nextLevel() {
  if (gridMode === 1) {
    playerX = width / 2;
    playerY = height - cellSize * 3;
    grid = mapDataOne;
  }
  else if (gridMode === 2) {
    playerX = width - cellSize;
    playerY = (height / 2) - 50
    grid = mapDataTwo;
  }
  if (gridMode === 3) {
    playerX = width / 2;
    playerY = 0
    grid = mapDataThree;
  }
  else if (gridMode === 4) {
    playerX = cellSize;
    playerY = (height / 2) - 50
    grid = mapDataOne;
  }
}

//Cain's work
function movePlayer() {
  let xCoord = floor(playerX / cellSize);
  let yCoord = floor(playerY / cellSize);
  if (playerX < width / 2) {
    xCoord = ceil(playerX / cellSize);}
  if (playerY < height / 2) {
    yCoord = ceil(playerY / cellSize);}

  if (keyIsDown(87) && yCoord > 0) {
    if (grid[xCoord][yCoord - 1] === "0") {
      playerY -= 5;
    }
    else if (grid[xCoord][yCoord - 1] === "1") {
      playerY -= 5;
      gridMode = 1;
      nextLevel();
    }
  }
  else if (keyIsDown(83) && yCoord < rows - 1) {
    if (grid[xCoord][yCoord + 1] === "0") {
      playerY += 5;
    }
    else if (grid[xCoord][yCoord + 1] === "1") {
      playerY += 5;
      gridMode = 3;
      nextLevel();
    }
  }
  else if (keyIsDown(65) && xCoord > 0) {
    if (grid[xCoord - 1][yCoord] === "0") {
      playerX -= 5;
    }
    else if (grid[xCoord - 1][yCoord] === "1") {
      playerX -= 5;
      gridMode = 2;
      nextLevel();
    }
  }
  else if (keyIsDown(68) && xCoord < cols - 1) {
    if (grid[xCoord + 1][yCoord] === "0") {
      playerX += 5;
    }
    else if (grid[xCoord + 1][yCoord] === "1") {
      playerX += 5;
      gridMode = 4;
      nextLevel();
    }
  }
}

// function keyPressed() {
//   if (grid[moveX][moveY] === 0){
//     if (keyPressed === "w" || keyPressed === "W" && moveY > 0) {
//       grid[moveX][moveY] = 0;
//       if (grid[moveX][moveY - 1] === 0 || grid[moveX][moveY - 1] === "0") {
//         moveY -= 1;
//       }
//       else if (grid[moveX][moveY - 1] === 1 || grid[moveX][moveY - 1] === "1") {
//         moveY -=1;
//         //next level
//       }
//     }
//     else if (keyPressed === "s" || keyPressed === "S" && moveY < rows - 1) {
//       grid[moveX][moveY] = 0;
//       if (grid[moveX][moveY + 1] === 0 || grid[moveX][moveY + 1] === "0") {
//         moveY += 1;
//       }
//       else if (grid[moveX][moveY + 1] === 1 || grid[moveX][moveY + 1] === "1") {
//         moveY += 1;
//         //next level
//       }
//     }
//     else if (keyPressed === "a" || keyPressed === "A" && moveX > 0) {
//       grid[moveX][moveY] = 0;
//       if (grid[moveX - 1][moveY] === 0 || grid[moveX - 1][moveY] === "0"){
//         moveX -= 1;
//       }
//       else if (grid[moveX - 1][moveY] === 1 || grid[moveX - 1][moveY] === "1") {
//         moveX -=1;
//         //next level
//       }
//     }
//     else if (keyPressed === "d" || keyPressed === "D" && moveX < cols - 1) {
//       grid[moveX][moveY] = 0;
//       if (grid[moveX + 1][moveY] === 0 || grid[moveX +1][moveY] === "0") {
//         moveX += 1;
//       }
//       else if (grid[moveX + 1][moveY] === 1 || grid[moveX + 1][moveY] === "1"){
//         moveX += 1;
//         //next level
//       }
//     }
//
//
//   }
// }

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
