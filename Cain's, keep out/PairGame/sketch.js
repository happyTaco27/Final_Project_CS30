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
let health;
let mana;
let activeItem;
let activeSpell;
let state = "homeScreen";


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

  barTexture = loadImage("assets/sprites/statusbar.png")
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
  if (state === "homeScreen") {
    displayHomeScreen();
  }

  if (state === "game") {
    displayGrid();
    displayObjects();
    borderThingy();
    playerThing();
    menuBar();
  }

}

function displayHomeScreen() {
  background(255);
  textSize(32);
  text("press Enter to start", windowWidth / 2 - 150, windowHeight / 2);
  if (keyCode === 13) {
    state = "game";
  }
}

function statusMenu() {
  background(255);

}

function menuBar() {
  fill(153, 102, 51);
  image(barTexture, 0, rows * 42, width, 6 * cellSize);
}

function healthPoints() {

}

function displayHealthPoints() {

}

function manaPoints() {

}

function displayManaPoints() {

}

function currentItem() {

}

function displayCurrentItem() {

}

function currentSpell() {

}

function displayCurrentSpell() {

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
