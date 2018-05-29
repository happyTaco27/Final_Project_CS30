// RnGMapThingy
// Xyre Abelanes
// 17 May, 2018

let grid;
let cellSize;
let rows;
let cols;
let floorTile;
let wallTile;
let blankSpace;
let loadLevel;
let loadLevel1;
let gridSpace;
let randomizer;
let startTile;
let endTile;
let moveX;
let moveY;
let charTile;
let charFSide;
let charBSide;
let charLSide;
let charRSide;
let playerSpace;
let physicalSpace;

function preload() {
  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLevel0 = loadStrings(blankSpace);

  physicalSpace = "assets/Levels/TestGrounds.txt";
  loadLevel1 = loadStrings(physicalSpace);

  charFSide = loadImage("images/Front1.png");
  charBSide = loadImage("images/Back1.png");
  charLSide = loadImage("images/Left1.png");
  charRSide = loadImage("images/Right1.png");

  floorTile = loadImage("images/floortile1.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
  startTile = loadImage("images/ladderup.png");
  endTile = loadImage("images/ladderdown.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = 32;
  cols = 14;
  cellSize = width / (rows * 1.1);
  gridSpace = createEmpty2dArray(rows, cols);
  playerSpace = createEmpty2dArray(rows, cols);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLevel0[x][y];
      gridSpace[x][y] = tileType;
    }
  }
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLevel1[x][y];
      playerSpace[x][y] = tileType;
    }
  }
  randomizer = random(4)
  base = createMap();
  grid = terraform(base);
  charTile = charFSide;
  strokeWeight(2);
}

function draw() {
  background(255);
  displayGrid();
  displayObjects();
  borderThingy();
  noscroll();
}
