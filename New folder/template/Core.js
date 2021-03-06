let grid,rows,cols,gridSpace,cellSize;
let floorTile,wallTile,charTile,testGrounds,blankSpace;
let charFSide,charBSide,charLSide,charRSide;
let startTile,endTile,playerSpace,physicalSpace,highlightTile,highlightSpace,isCharClicked;
let moveX,moveY;
let playerBonus=[],buff=[];
let health,mana,softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let special,aiSpecial;
let d20;
let statBar;
let activeSpell,activeItem;
let loadLines0,loadLines1;
let barTexture;
let loadLevel;
let loadLevel1;
let isTurn;
let state = "homeScreen";
function preload() {
  // This loads in the grids
  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLevel = loadStrings(blankSpace);

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
  testGrounds = "assets/Levels/TestGrounds.txt";
  loadLines0 = loadStrings(testGrounds);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  isTurn=true;
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
      let tileType = loadLevel[x][y];
      gridSpace[x][y] = tileType;
    }
  }
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLevel1[x][y];
      playerSpace[x][y] = tileType;
    }
  }
  let base = createMap();
  grid = terraform(base);
  isCharClicked = false;
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
  if (state === "homeScreen") {
    displayHomeScreen();
  }
  if (state === "game") {
    displayGrid();
    displayObjects();
    borderThingy();
    playerThing();
    menuBar();


    if (keyCode === 73) {
      statusMenu();
    }
    if (keyCode === 72) {
      helpScreen();
    }
  }
  //Makes the Blue/Red tiles stop showing if variable is false
  if (isCharClicked) {
    possibleMoveTiles(playerSpace);
  }
  noscroll();
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
  background(255);
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
function menuBar() {
  fill(153, 102, 51);
  image(barTexture, 0, rows * 42, width, 6 * cellSize);
}
//Stops mouse scroll (though it isn't quite doing it)
function noscroll() {
  window.scrollTo(0, 0);
}
window.addEventListener("scroll", noscroll());
//Shows the base grid (background)
function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === 0) {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "O") {
        fill(0);
        stroke(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}
//Shows the things on top of the background (players, AI's, objects, etc)
function displayObjects() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (gridSpace[x][y] === "2") {
        image(startTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (playerSpace[x][y] === 2) {
        image(charTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (playerSpace[x][y] === 1) {
        fill(0, 100, 255, 50);
        stroke(30, 90, 210);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (playerSpace[x][y] === 3) {
        fill(255, 0, 255, 50);
        stroke(30, 90, 210);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}
//Blue tiles is where the character can go, while the Red tiles show the possibility of attack
function possibleMoveTiles(map) {
  let otherMap = grid;
  //1 = can go to, 3 = can potentially attack or get attacked from
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 2) {
        //Left
        if (x - 1 >= 0 && otherMap[x - 1][y] === 0) {
          map[x - 1][y] = 1;
          if (x - 2 >= 0 && otherMap[x - 2][y] === 0) {
            map[x - 2][y] = 1;
            if (x - 3 >= 0 && otherMap[x - 3][y] === 0) {
              map[x - 3][y] = 3;
            }
            if (x - 2 >= 0 && y - 1 >= 0 && otherMap[x - 2][y - 1] === 0) {
              map[x - 2][y - 1] = 3;
            }
            if (x - 2 >= 0 && y + 1 < cols && otherMap[x - 2][y + 1] === 0) {
              map[x - 2][y + 1] = 3;
            }
          }
        }
        //Right
        if (x + 1 < rows && otherMap[x + 1][y] === 0) {
          map[x + 1][y] = 1;
          if (x + 2 < rows && otherMap[x + 2][y] === 0) {
            map[x + 2][y] = 1;
            if (x + 3 < rows && otherMap[x + 3][y] === 0) {
              map[x + 3][y] = 3;
            }
            if (x + 2 < rows && y - 1 >= 0 && otherMap[x + 2][y - 1] === 0) {
              map[x + 2][y - 1] = 3;
            }
            if (x + 2 < rows && y + 1 < cols && otherMap[x + 2][y + 1] === 0) {
              map[x + 2][y + 1] = 3;
            }
          }
        }
        //Up
        if (y - 1 >= 0 && otherMap[x][y - 1] === 0) {
          map[x][y - 1] = 1;
          if (y - 2 >= 0 && otherMap[x][y - 2] === 0) {
            map[x][y - 2] = 1;
            if (y - 3 >= 0 && otherMap[x][y - 3] === 0) {
              map[x][y - 3] = 3;
            }
            if (x + 1 < rows && y - 2 >= 0 && otherMap[x + 1][y - 2] === 0) {
              map[x + 1][y - 2] = 3;
            }
            if (x - 1 >= 0 && y - 2 >= 0 && otherMap[x - 1][y - 2] === 0) {
              map[x - 1][y - 2] = 3;
            }
          }
        }
        //Down
        if (y + 1 < cols && otherMap[x][y + 1] === 0) {
          map[x][y + 1] = 1;
          if (y + 2 < cols && otherMap[x][y + 2] === 0) {
            map[x][y + 2] = 1;
            if (y + 3 < cols && otherMap[x][y + 3] === 0) {
              map[x][y + 3] = 3;
            }
            if (x + 1 < rows && y + 2 < cols && otherMap[x + 1][y + 2] === 0) {
              map[x + 1][y + 2] = 3;
            }
            if (x - 1 >= 0 && y + 2 < cols && otherMap[x - 1][y + 2] === 0) {
              map[x - 1][y + 2] = 3;
            }
          }
        }
        //Up-Right
        if (x + 1 < rows && y - 1 >= 0 && otherMap[x + 1][y - 1] === 0) {
          map[x + 1][y - 1] = 1;
          if (x + 2 < rows && y - 1 >= 0 && otherMap[x + 2][y - 1] === 0) {
            map[x + 2][y - 1] = 3;
          }
          if (x + 1 < rows && y - 2 >= 0 && otherMap[x + 1][y - 2] === 0) {
            map[x + 1][y - 2] = 3;
          }
        }
        //Up-Left
        if (x - 1 >= 0 && y - 1 >= 0 && otherMap[x - 1][y - 1] === 0) {
          map[x - 1][y - 1] = 1;
          if (x - 2 >= 0 && y - 1 >= 0 && otherMap[x - 2][y - 1] === 0) {
            map[x - 2][y - 1] = 3;
          }
          if (x - 1 >= 0 && y - 2 >= 0 && otherMap[x - 1][y - 2] === 0) {
            map[x - 1][y - 2] = 3;
          }
        }
        //Down-Right
        if (x + 1 < rows && y + 1 < cols && otherMap[x + 1][y + 1] === 0) {
          map[x + 1][y + 1] = 1;
          if (x + 2 < rows && y + 1 < cols && otherMap[x + 2][y + 1] === 0) {
            map[x + 2][y + 1] = 3;
          }
          if (x + 1 < rows && y + 2 < cols && otherMap[x + 1][y + 2] === 0) {
            map[x + 1][y + 2] = 3;
          }
        }
        //Down-Left
        if (x - 1 >= 0 && y + 1 < cols && otherMap[x - 1][y + 1] === 0) {
          map[x - 1][y + 1] = 1;
          if (x - 2 >= 0 && y + 1 < cols && otherMap[x - 2][y + 1] === 0) {
            map[x - 2][y + 1] = 3;
          }
          if (x - 1 >= 0 && y + 2 < cols && otherMap[x - 1][y + 2] === 0) {
            map[x - 1][y + 2] = 3;
          }
        }
      }
    }
  }
  return map;
}
//Makes the array for the random map genereator
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
//Randomly creates the map for the game
function createMap() {
  let maxTunnels = 50,
    maxLength = 8,
    map = arrayMaker("O", rows, cols),
    currentRow = floor(random() * rows),
    currentColumn = floor(random() * cols),
    directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ],
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
//Cleans up the random map and designates where the character and other objects will spawn
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
        if (x - 1 >= 0 && map[x - 1][y] === "O") {
          map[x - 1][y] = 1;
        }
        if (x + 1 < rows && map[x + 1][y] === "O") {
          map[x + 1][y] = 1;
        }
        if (y - 1 >= 0 && map[x][y - 1] === "O") {
          map[x][y - 1] = 1;
        }
        if (y + 1 < cols && map[x][y + 1] === "O") {
          map[x][y + 1] = 1;
        }
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y - 1] === "O") {
          map[x - 1][y - 1] = 1;
        }
        if (x + 1 < rows && y + 1 < cols && map[x + 1][y + 1] === "O") {
          map[x + 1][y + 1] = 1;
        }
        if (x - 1 >= 0 && y + 1 < cols && map[x - 1][y + 1] === "O") {
          map[x - 1][y + 1] = 1;
        }
        if (x + 1 < rows && y - 1 >= 0 && map[x + 1][y - 1] === "O") {
          map[x + 1][y - 1] = 1;
        }
      }
    }
  }
  return map;
}
//Creates an empty array
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
//for leveling up character
function levelUp(){
  let lvlUpD20=round(random(20));
  //As the name implies, for Character level up and core testing of Stats
  if(exp===expToLevelUp){
    lvl++;
    expToLevelUp=round(expToLevelUp*1.5);
    exp=0;
    if(round(lvl%3)===0){
      softSkillsPoints++;
    }
    print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
    print("S:",special[0]," P:",special[1]," E:",special[2]," C:",special[3]," I:",special[4]," A:",special[5]," L:",special[6]);
    print("Current Soft Skill Points:",softSkillsPoints);
  }
}
//This makes the stats for the character and AI (AI's stats are place-holder atm for testing)
function makingStats()  {
  for(let x=0;x<7;x++){
    //Player's stats
    special.push(round(random(20,5)));
    //AI stats
    aiSpecial.push(round(random(15,5)));
  }
}
//This checks what level each special trait is
function buffCheck(){
  for(let x=0;x<7;x++){
    if(special[x]<=5){
      buff.push("-");
    }
    else if(special[x]<=10){
      buff.push(" ");
    }
    else if(special[x]<=15){
      buff.push("+");
    }
    else if(special[x]<=19){
      buff.push("++");
    }
    else if(special[x]===20){
      buff.push("+++");
    }
  }
}
//This is triggered when an AI apears
function statCheck(){
  for(let x=0;x<7;x++){
    if(special[x]<aiSpecial[x]){
      playerBonus.push("Less");
    }
    else if(special[x]>aiSpecial[x]){
      playerBonus.push("Greater");
    }
    else{
      playerBonus.push("Even");
    }
  }
}
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
