let grid,rows,cols;
let moveX,moveY;
let playerBonus=[],buff=[];
let health,mana;
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let special,aiSpecial;
let d20;
let statBar;
let gridSpace,cellSize;
let floorTile,wallTile,charTile,testGrounds,blankSpace;
let charFSide,charBSide,charLSide,charRSide;
let activeSpell,activeItem;
let loadLines0,loadLines1;
let barTexture;
let loadLevel;
let loadLevel1;
let startTile;
let endTile;
let playerSpace;
let physicalSpace;
base = createMap();
grid = terraform(base);

function preload() {
  // This loads in the grids
  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLevel0 = loadStrings(blankSpace);

  physicalSpace = "assets/Levels/TestGrounds.txt";
  loadLevel1 = loadStrings(physicalSpace);

  // This loads in the character sprite
  charFSide = loadImage("images/Front1.png");
  charBSide = loadImage("images/Back1.png");
  charLSide = loadImage("images/Left1.png");
  charRSide = loadImage("images/Right1.png");

  // This loads in the map tiles
  floorTile = loadImage("images/floortile1.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
  startTile = loadImage("images/ladderup.png");
  endTile = loadImage("images/ladderdown.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting level
  lvl=1;
  //setting starting exp
  exp=0;
  //base level exp requirements
  expToLevelUp=10;
  //setting starting soft skill points
  softSkillsPoints=5;
  //Stats for Players
  special=[];
  //Stats for ai
  aiSpecial=[];
  //Setting move speed
  moveX = 5;
  moveY = 13;
  charTile = charFSide;
  // This is quite important as anything that uses (cols, rows) will break
  rows = 32;
  cols = 14;
  cellSize = width / (rows * 1.1);
  // This prepares empty grids
  gridSpace = createEmpty2dArray(rows, cols);
  playerSpace = createEmpty2dArray(rows, cols);
  // This puts in designated tile "roles" into the grids
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
  //In triggeredEvents.js
  makingStats();
  //In triggeredEvents.js
  statCheck();
  //In triggeredEvents.js
  buffCheck();

  //For debugging stats
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
}

function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === 0) {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "O") {
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function displayObjects() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (gridSpace[x][y] === 2 || gridSpace[x][y] === "2") {
        image(startTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (playerSpace[x][y] === 2 || playerSpace[x][y] === "2") {
        image(charTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function arrayMaker(num, xLength, yLength) {
  let grid = [];
  for (let x = 0; x < xLength; x++) {
    grid.push([]);
    for (let y = 0; y < yLength; y++) {
      grid[x].push(num);
    }
  }
  return grid;
}

function createMap() {
  let maxTunnels = 50,
    maxLength = 8,
    map = arrayMaker("O", rows, cols),
    currentRow = Math.floor(Math.random() * rows),
    currentColumn = Math.floor(Math.random() * cols),
    directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]],
    lastDirection = [],
    randomDirection;

  while (maxTunnels && maxLength && rows && cols) {
    do {
      randomDirection = directions[floor(random() * directions.length)];
    } while (randomDirection[0] === -lastDirection[0] &&
          randomDirection[1] === -lastDirection[1] ||
        randomDirection[0] === lastDirection[0] &&
          randomDirection[1] === lastDirection[1]);
    let randomLength = ceil(random() * maxLength),
      tunnelLength = 0;

    while (tunnelLength < randomLength) {
      if (currentRow === 0 && randomDirection[0] === -1 ||
          currentColumn === 0 && randomDirection[1] === -1 ||
          currentRow === rows - 1 && randomDirection[0] === 1 ||
          currentColumn === cols - 1 && randomDirection[1] === 1) {
        break;
      }
      else {
        map[currentRow][currentColumn] = 0;
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++;
      }
    }

    if (tunnelLength) {
      lastDirection = randomDirection;
      maxTunnels--;
    }
  }
  return map;
}

function terraform(map) {
  let player = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 0 && player === 0) {
        gridSpace[x][y] = "2";
        playerSpace[x][y] = 2;
        moveX = x;
        moveY = y;
        player = 1;
      }
      if (map[x][y] === 0) {
        if (x - 1 >= 0 && map[x - 1][y] === "0") {
          map[x - 1][y] = 1;
        }
        if (x + 1 < rows && map[x + 1][y] === "0") {
          map[x + 1][y] = 1;
        }
        if (y - 1 >= 0 && map[x][y - 1] === "0") {
          map[x][y - 1] = 1;
        }
        if (y + 1 < cols && map[x][y + 1] === "0") {
          map[x][y + 1] = 1;
        }
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y - 1] === "0") {
          map[x - 1][y - 1] = 1;
        }
        if (x + 1 < rows && y + 1 < cols && map[x + 1][y + 1] === "0") {
          map[x + 1][y + 1] = 1;
        }
        if (x - 1 >= 0 && y + 1 < cols && map[x - 1][y + 1] === "0") {
          map[x - 1][y + 1] = 1;
        }
        if (x + 1 < rows && y - 1 >= 0 && map[x + 1][y - 1] === "0") {
          map[x + 1][y - 1] = 1;
        }
      }
    }
  }
  return map;
}

function createEmpty2dArray(rows, cols) {
  let emptyGrid = [];
  for (let x = 0; x < rows; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < cols; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}
