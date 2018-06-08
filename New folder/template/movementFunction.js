// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018

// Whatever the number of the moveX and moveY variables are will determine the player's location
function playerThing() {
  playerSpace[moveX][moveY] = 2;
}

//Just sets out a nice border around th grid
function borderThingy() {
  noFill();
  stroke(0);
  rect(0, 0, rows * cellSize, cols * cellSize);
}

//Wherever you click, the character will move towards that direction
function mouseClicked() {
  //Selecting Character
  if (floor(mouseY / cellSize) === moveY && floor(mouseX / cellSize) === moveX) {
    isCharClicked = !isCharClicked;
  }
  if (isCharClicked) {
    //Up-Right
    if (floor(mouseY / cellSize) < moveY
    && floor(mouseX / cellSize) > moveX
    && grid[moveX + 1][moveY - 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY--;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
    }
    //Up-Left
    else if (floor(mouseY / cellSize) < moveY
    && floor(mouseX / cellSize) < moveX
    && grid[moveX - 1][moveY - 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY--;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
    }
    //Down-Right
    else if (floor(mouseY / cellSize) > moveY
    && floor(mouseX / cellSize) > moveX
    && grid[moveX + 1][moveY + 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY++;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
    }
    //Down-Left
    else if (floor(mouseY / cellSize) > moveY
    && floor(mouseX / cellSize) < moveX
    && grid[moveX - 1][moveY + 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY++;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
    }
    //Up
    else if (floor(mouseY / cellSize) < moveY
    && grid[moveX][moveY - 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY = floor(mouseY / cellSize);
      charTile = charBSide;
      isCharClicked = false;
    }
    //Down
    else if (floor(mouseY / cellSize) > moveY
    && grid[moveX][moveY + 1] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY = floor(mouseY / cellSize);
      charTile = charFSide;
      isCharClicked = false;
    }
    //Left
    else if (floor(mouseX / cellSize) < moveX
    && grid[moveX - 1][moveY] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveX = floor(mouseX / cellSize);
      charTile = charLSide;
      isCharClicked = false;
    }
    //Right
    else if (floor(mouseX / cellSize) > moveX
    && grid[moveX + 1][moveY] === 0
    && playerSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveX = floor(mouseX / cellSize);
      charTile = charRSide;
      isCharClicked = false;
    }
  }
  possibleMoveTiles(playerSpace);
  clearOutBodies();
}

//Refreshes the playerSpace so there won't be any duplicates
function clearOutBodies() {
  let theGrid = playerSpace;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (theGrid[x][y] === 2) {
        theGrid[x][y] = 0;
      }
      if (theGrid[x][y] === 1) {
        theGrid[x][y] = 0;
      }
      if (theGrid[x][y] === 3) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
}
