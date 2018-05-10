// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let nextMoveX;
let nextMoveY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  moveX = 400;
  moveY = 200;
  rectMode(CENTER);
}

function draw() {
  background(255);
  fill(255, 0, 255);
  rect(moveX, moveY, 50, 50);
}

function isMoving() {
  //up
  if (moveY > nextMoveY) {
    for (let i = moveY; i <= nextMoveY; i =- 1) {
      moveY -= 2;
    }
    // moveY -= 2;
  }
  //down
  else if (moveY < nextMoveY) {
    moveY += 2;
  }
  //left
  if (moveX > nextMoveX) {
    moveX -= 2;
  }
  //right
  else if (moveX < nextMoveX) {
    moveX += 2;
  }
}

function mouseClicked() {
  nextMoveX = mouseX;
  nextMoveY = mouseY;
  isMoving();
}
