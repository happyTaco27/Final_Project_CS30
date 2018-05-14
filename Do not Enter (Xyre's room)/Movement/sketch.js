// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let nextMoveX;
let nextMoveY;
let rows = 15;
let cols = 20;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (cols * 1.8);
  grid = createEmpty2dArray(cols, rows)
  moveX = 400;
  moveY = 200;
}

function draw() {
  background(255);
  displayGrid();
  fill(255, 0, 255);
  rect(moveX, moveY, 50, 50);
  if (mouseIsPressed) {
    isMoving();
  }
}

function isMoving() {
  //up
  if (moveY >= nextMoveY) {
    moveY -= 5;
  }
  //down
  else if (moveY <= nextMoveY) {
    moveY += 5;
  }
  //left
  if (moveX >= nextMoveX) {
    moveX -= 5;
  }
  //right
  else if (moveX <= nextMoveX) {
    moveX += 5;
  }
}

function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 0 || grid[x][y] === "0") {
        fill(240);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        fill(255, 50, 50);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        fill(0, 255, 50);
      }
      else {
        fill(50);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mouseClicked() {
  nextMoveX = mouseX;
  nextMoveY = mouseY;
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
