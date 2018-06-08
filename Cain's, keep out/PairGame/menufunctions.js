function menuBar() {
  fill(153, 102, 51);
  image(menuTexture, 0, rows * 44, width, 5 * cellSize);
}

function displayHomeScreen() {
  background(255);
  textSize(32);
  text("press Enter to start", windowWidth / 2 - 150, windowHeight / 2);
  if (keyCode === 13) {
    state = "game";
  }
}

function helpScreen() {
  push();
  background(255)
  text("Click on tiles to move the character", 10, 50);
  text("The amount of tiles your character can move in one turn is dependant on your stats", 10, 100);
  text("press H to access the help menu", 10, 150);
  text("Press I to access the status menu", 10, 200);
  text("Press ESC to exit menus", 10, 250);

  if (keyCode === 73) {
    pop();
  }
}

function statusMenu() {
  push();
  background(255);



  if (keyCode === 27) {
    pop();
  }
}
