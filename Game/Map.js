// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018

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





function mouseClicked() {
  print("X: ",mouseX," Y: ",mouseY);
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
