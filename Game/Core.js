let grid;
let rows = 14;
let cols = 32;
let moveX,moveY;
let playerBonus=[];
let health,mana;
let buff=[];
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let special;
let aiSpecial;
// let ifInventoryIsOpen=false;
let d20;
let counter;
let statBar;
let gridSpace;
let cellSize;
let testGrounds;
let blankSpace;
let floorTile,wallTile,charTile;
let charFSide,charBSide,charLSide,charRSide;
let activeSpell,activeItem;
let loadLines0,loadLines1;
let barTexture;

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

  barTexture = loadImage("assets/sprites/statusbar.png");
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
  //setting starting exp
  exp=0;
  //base level exp requirements
  expToLevelUp=10;
  //Stats for Players
  special=[];
  //Stats for ai
  aiSpecial=[];
  makingStats();
  statCheck();
  buffCheck();

  print("--------------------------------------------------------");
  print("Player's Stats:");
  print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
  print("S:",special[0],"(",buff[0],")"," P:",special[1],"(",buff[1],")"," E:",special[2],"(",buff[2],")"," C:",special[3],
    "(",buff[3],")"," I:",special[4],"(",buff[4],")"," A:",special[5],"(",buff[5],")"," L:",special[6],"(",buff[6],")");
  print("Soft Skill Point Remaining:",softSkillsPoints);
  print("--------------------------------------------------------");
  print("Ai's Stats:");
  print("S:",aiSpecial[0]," P:",aiSpecial[1]," E:",aiSpecial[2]," C:",aiSpecial[3],
    " I:",aiSpecial[4]," A:",aiSpecial[5]," L:",aiSpecial[6]);
  print("--------------------------------------------------------");
  print("Stat Check:");
  print("S:",playerBonus[0]);
  print("P:",playerBonus[1]);
  print("E:",playerBonus[2]);
  print("C:",playerBonus[3]);
  print("I:",playerBonus[4]);
  print("A:",playerBonus[5]);
  print("L:",playerBonus[6]);
  print("--------------------------------------------------------");
}
function draw() {
  background(255);
  levelUp();
  displayGrid();
  displayObjects();
  borderThingy();
  playerThing();
  menuBar();

  // if(mouseIsPressed){
  //   exp++;
  // }
}
