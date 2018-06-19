// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018
let moveX;
let moveY;
let enemyMoveX;
let enemyMoveY;
let rows = 32;
let cols = 14;
let grid;
let gridSpace;
let cellSize;
let testGrounds;
let blankSpace;
let highlightSpace;
let floorTile;
let wallTile;
let highlightTile;
let charTile;
let charFSide;
let charBSide;
let charLSide;
let charRSide;
let enemySkelly;
let isCharClicked;
let nextTurn;
let shouldChase;

function preload() {
  testGrounds = "assets/Levels/TestGrounds.txt";
  loadLines0 = loadStrings(testGrounds);

  blankSpace = "assets/Levels/BlankSpace.txt";
  loadLines1 = loadStrings(blankSpace);

  charFSide = loadImage("images/Front1.png");
  charBSide = loadImage("images/Back1.png");
  charLSide = loadImage("images/Left1.png");
  charRSide = loadImage("images/Right1.png");
  enemySkelly = loadImage("images/Skeleton.png");

  floorTile = loadImage("images/Tile_5.png");
  wallTile = loadImage("images/qubodup-light_wood.png");
  highlightTile = loadImage("images/tilehighlight.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (rows * 1.1);
  grid = createEmpty2dArray(rows, cols);
  gridSpace = createEmpty2dArray(rows, cols);
  // highlightSpace = createEmpty2dArray(rows, cols);
  moveX = 5;
  moveY = 13;
  enemyMoveX = 5;
  enemyMoveY = 1;
  charTile = charFSide;
  isCharClicked = false;
  nextTurn = false;
  shouldChase = false;
  strokeWeight(2);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tileType = loadLines0[x][y];
      grid[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  displayGrid();
  if (isCharClicked) {
    possibleMoveTiles(gridSpace);
  }
  displayObjects();
  borderThingy();
  playerThing();
  enemyThing();
  if (nextTurn) {
    enemyMove();
  }
}

// disables window scrolling
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll());

function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {

      if (grid[x][y] === "0") {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (grid[x][y] === "2") {
        fill(0);
        strok(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else {
        image(wallTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function displayObjects() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (gridSpace[x][y] === 2) {
        image(charTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
       else if (gridSpace[x][y] === 1) {
        fill(0, 100, 255, 50);
        stroke(30, 90, 210);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (gridSpace[x][y] === 3) {
        fill(255, 0, 255, 50);
        stroke(30, 90, 210);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (gridSpace[x][y] === 4) {
        image(enemySkelly, x * cellSize, y * cellSize, cellSize, cellSize);
      }

    }
  }
}

function possibleMoveTiles(map) {
  let otherMap = grid;
  //1 = can go to, 3 = can potentially attack or get attacked from
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 2) {
        //Left
        if (x - 1 >= 0 && otherMap[x - 1][y] === "0") {
          map[x - 1][y] = 1;
          if (x - 2 >= 0 && otherMap[x - 2][y] === "0") {
            map[x - 2][y] = 1;
            if (x - 3 >= 0 && otherMap[x - 3][y] === "0") {
              map[x - 3][y] = 3;
            }
            if (x - 2 >= 0 && y - 1 >= 0 && otherMap[x - 2][y - 1] === "0") {
              map[x - 2][y - 1] = 3;
            }
            if (x - 2 >= 0 && y + 1 < cols && otherMap[x - 2][y + 1] === "0") {
              map[x - 2][y + 1] = 3;
            }
          }
        }
        //Right
        if (x + 1 < rows && otherMap[x + 1][y] === "0") {
          map[x + 1][y] = 1;
          if (x + 2 < rows && otherMap[x + 2][y] === "0") {
            map[x + 2][y] = 1;
            if (x + 3 < rows && otherMap[x + 3][y] === "0") {
              map[x + 3][y] = 3;
            }
            if (x + 2 < rows && y - 1 >= 0 && otherMap[x + 2][y - 1] === "0") {
              map[x + 2][y - 1] = 3;
            }
            if (x + 2 < rows && y + 1 < cols && otherMap[x + 2][y + 1] === "0") {
              map[x + 2][y + 1] = 3;
            }
          }
        }
        //Up
        if (y - 1 >= 0 && otherMap[x][y - 1] === "0") {
          map[x][y - 1] = 1;
          if (y - 2 >= 0 && otherMap[x][y - 2] === "0") {
            map[x][y - 2] = 1;
            if (y - 3 >= 0 && otherMap[x][y - 3] === "0") {
              map[x][y - 3] = 3;
            }
            if (x + 1 < rows && y - 2 >= 0 && otherMap[x + 1][y - 2] === "0") {
              map[x + 1][y - 2] = 3;
            }
            if (x - 1 >= 0 && y - 2 >= 0 && otherMap[x - 1][y - 2] === "0") {
              map[x - 1][y - 2] = 3;
            }
          }
        }
        //Down
        if (y + 1 < cols && otherMap[x][y + 1] === "0") {
          map[x][y + 1] = 1;
          if (y + 2 < cols && otherMap[x][y + 2] === "0") {
            map[x][y + 2] = 1;
            if (y + 3 < cols && otherMap[x][y + 3] === "0") {
              map[x][y + 3] = 3;
            }
            if (x + 1 < rows && y + 2 < cols && otherMap[x + 1][y + 2] === "0") {
              map[x + 1][y + 2] = 3;
            }
            if (x - 1 >= 0 && y + 2 < cols && otherMap[x - 1][y + 2] === "0") {
              map[x - 1][y + 2] = 3;
            }
          }
        }
        //Up-Right
        if (x + 1 < rows && y - 1 >= 0 && otherMap[x + 1][y - 1] === "0") {
          map[x + 1][y - 1] = 1;
          if (x + 2 < rows && y - 1 >= 0 && otherMap[x + 2][y - 1] === "0") {
            map[x + 2][y - 1] = 3;
          }
          if (x + 1 < rows && y - 2 >= 0 && otherMap[x + 1][y - 2] === "0") {
            map[x + 1][y - 2] = 3;
          }
        }
        //Up-Left
        if (x - 1 >= 0 && y - 1 >= 0 && otherMap[x - 1][y - 1] === "0") {
          map[x - 1][y - 1] = 1;
          if (x - 2 >= 0 && y - 1 >= 0 && otherMap[x - 2][y - 1] === "0") {
            map[x - 2][y - 1] = 3;
          }
          if (x - 1 >= 0 && y - 2 >= 0 && otherMap[x - 1][y - 2] === "0") {
            map[x - 1][y - 2] = 3;
          }
        }
        //Down-Right
        if (x + 1 < rows && y + 1 < cols && otherMap[x + 1][y + 1] === "0") {
          map[x + 1][y + 1] = 1;
          if (x + 2 < rows && y + 1 < cols && otherMap[x + 2][y + 1] === "0") {
            map[x + 2][y + 1] = 3;
          }
          if (x + 1 < rows && y + 2 < cols && otherMap[x + 1][y + 2] === "0") {
            map[x + 1][y + 2] = 3;
          }
        }
        //Down-Left
        if (x - 1 >= 0 && y + 1 < cols && otherMap[x - 1][y + 1] === "0") {
          map[x - 1][y + 1] = 1;
          if (x - 2 >= 0 && y + 1 < cols && otherMap[x - 2][y + 1] === "0") {
            map[x - 2][y + 1] = 3;
          }
          if (x - 1 >= 0 && y + 2 < cols && otherMap[x - 1][y + 2] === "0") {
            map[x - 1][y + 2] = 3;
          }
        }
      }
    }
  }
  return map;
}

function enemyMove() {
  if (shouldChase) {
    //Right
    if (enemyMoveX + 1 < moveX) {
      if (grid[enemyMoveX + 1][enemyMoveY] === "0") {
      enemyMoveX++;
      }
      else if (grid[enemyMoveX + 1][enemyMoveY] === "1")
        if (enemyMoveY > moveY && grid[enemyMoveX][enemyMoveY - 1] === "0") {
          enemyMoveY--;
        }
        else if (enemyMoveY < moveY && grid[enemyMoveX][enemyMoveY + 1] === "0") {
          enemyMoveY++;
        }
        else {
          enemyMoveY = enemyMoveY + 0;
        }
    }
    //Left
    else if (enemyMoveX - 1 > moveX) {
      if (grid[enemyMoveX - 1][enemyMoveY] === "0") {
        enemyMoveX--;
      }
      else if (grid[enemyMoveX - 1][enemyMoveY] === "1")
        if (enemyMoveY > moveY && grid[enemyMoveX][enemyMoveY - 1] === "0") {
          enemyMoveY--;
        }
        else if (enemyMoveY < moveY && grid[enemyMoveX][enemyMoveY + 1] === "0") {
          enemyMoveY++;
        }
        else {
          enemyMoveY = enemyMoveY + 0;
        }
    }
    //Down
    else if (enemyMoveY + 1 < moveY) {
      if (grid[enemyMoveX][enemyMoveY + 1] === "0") {
        enemyMoveY++;
      }
      else if (grid[enemyMoveX][enemyMoveY + 1] === "1")
        if (enemyMoveX > moveX && grid[enemyMoveX - 1][enemyMoveY] === "0") {
          enemyMoveX--;
        }
        else if (enemyMoveY < moveY && grid[enemyMoveX + 1][enemyMoveY] === "0") {
          enemyMoveX++;
        }
        else {
          enemyMoveX = enemyMoveX + 0;
        }
    }
    //Up
    else if (enemyMoveY - 1 > moveY && grid[enemyMoveX][enemyMoveY - 1] === "0") {
      if (grid[enemyMoveX][enemyMoveY - 1] === "0") {
        enemyMoveY--;
      }
      else if (grid[enemyMoveX][enemyMoveY - 1] === "1")
        if (enemyMoveY > moveY && grid[enemyMoveX - 1][enemyMoveY] === "0") {
          enemyMoveX--;
        }
        else if (enemyMoveY < moveY && grid[enemyMoveX + 1][enemyMoveY] === "0") {
          enemyMoveX++;
        }
        else {
          enemyMoveX = enemyMoveX + 0;
        }
    }
  }
  clearOutBodies();
  nextTurn = false;
}

function playerThing() {
  gridSpace[moveX][moveY] = 2;
}

function enemyThing() {
  gridSpace[enemyMoveX][enemyMoveY] = 4;
}

class EnemyAI {
  constructor(x, y, array) {
    this.x = x;
    this.y = y;
  }

  move() {
    if (shouldChase) {
      //Right
      // if (this.x + 1 < moveX) {
      //   if (grid[enemyMoveX + 1][enemyMoveY] === "0") {
      //   enemyMoveX++;
      //   }
      //   else if (grid[enemyMoveX + 1][enemyMoveY] === "1")
      //     if (enemyMoveY > moveY && grid[enemyMoveX][enemyMoveY - 1] === "0") {
      //       enemyMoveY--;
      //     }
      //     else if (enemyMoveY < moveY && grid[enemyMoveX][enemyMoveY + 1] === "0") {
      //       enemyMoveY++;
      //     }
      //     else {
      //       enemyMoveY = enemyMoveY + 0;
      //     }
      // }
      //Left
      // else if (this.x - 1 > moveX) {
      //   if (grid[enemyMoveX - 1][enemyMoveY] === "0") {
      //     enemyMoveX--;
      //   }
      //   else if (grid[enemyMoveX - 1][enemyMoveY] === "1")
      //     if (enemyMoveY > moveY && grid[enemyMoveX][enemyMoveY - 1] === "0") {
      //       enemyMoveY--;
      //     }
      //     else if (enemyMoveY < moveY && grid[enemyMoveX][enemyMoveY + 1] === "0") {
      //       enemyMoveY++;
      //     }
      //     else {
      //       enemyMoveY = enemyMoveY + 0;
      //     }
      // }
      //Down
      else if (this.y + 1 < moveY) {
        if (grid[this.x][this.y + 1] === "0") {
          this.y++;
        }
        else if (grid[this.x][this.y + 1] === "1")
          if (this.x > moveX && grid[this.x - 1][this.y] === "0") {
            this.x--;
          }
          else if (this.y < moveY && grid[this.x + 1][this.y] === "0") {
            this.x++;
          }
          else {
            this.x = this.x + 0;
          }
      }
      //Up
      // else if (this.y - 1 > moveY) {
      //   if (grid[enemyMoveX][enemyMoveY - 1] === "0") {
      //     enemyMoveY--;
      //   }
      //   else if (grid[enemyMoveX][enemyMoveY - 1] === "1")
      //     if (enemyMoveY > moveY && grid[enemyMoveX - 1][enemyMoveY] === "0") {
      //       enemyMoveX--;
      //     }
      //     else if (enemyMoveY < moveY && grid[enemyMoveX + 1][enemyMoveY] === "0") {
      //       enemyMoveX++;
      //     }
      //     else {
      //       enemyMoveX = enemyMoveX + 0;
      //     }
      // }
  }
}

function borderThingy() {
  noFill();
  rect(0, 0, rows * cellSize, cols * cellSize);
}

function mouseClicked() {
  //Selecting Character
  if (floor(mouseY / cellSize) === moveY && floor(mouseX / cellSize) === moveX) {
    isCharClicked = !isCharClicked;
  }
  if (isCharClicked) {
    //Up-Right
    if (floor(mouseY / cellSize) < moveY &&
      floor(mouseX / cellSize) > moveX &&
      grid[moveX + 1][moveY - 1] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY--;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Up-Left
    else if (floor(mouseY / cellSize) < moveY &&
      floor(mouseX / cellSize) < moveX &&
      grid[moveX - 1][moveY - 1] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY--;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Down-Right
    else if (floor(mouseY / cellSize) > moveY &&
      floor(mouseX / cellSize) > moveX &&
      grid[moveX + 1][moveY + 1] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY++;
      moveX++;
      charTile = charRSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Down-Left
    else if (floor(mouseY / cellSize) > moveY &&
    floor(mouseX / cellSize) < moveX &&
    grid[moveX - 1][moveY + 1] === "0" &&
    gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY++;
      moveX--;
      charTile = charLSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Up
    else if (floor(mouseY / cellSize) < moveY &&
      grid[moveX][moveY - 1] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY = floor(mouseY / cellSize);
      charTile = charBSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Down
    else if (floor(mouseY / cellSize) > moveY &&
      grid[moveX][moveY + 1] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveY = floor(mouseY / cellSize);
      charTile = charFSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Left
    else if (floor(mouseX / cellSize) < moveX &&
      grid[moveX - 1][moveY] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveX = floor(mouseX / cellSize);
      charTile = charLSide;
      isCharClicked = false;
      nextTurn = true;
    }
    //Right
    else if (floor(mouseX / cellSize) > moveX &&
      grid[moveX + 1][moveY] === "0" &&
      gridSpace[floor(mouseX / cellSize)][floor(mouseY / cellSize)] === 1) {
      moveX = floor(mouseX / cellSize);
      charTile = charRSide;
      isCharClicked = false;
      nextTurn = true;
    }
  }
  if ((enemyMoveY + 3) >= moveY || (enemyMoveY - 3) <= moveY || (enemyMoveX + 3) >= moveX || (enemyMoveX - 3) <= moveX) {
    shouldChase = true;
  }
  if ((enemyMoveY + 3) < moveY || (enemyMoveY - 3) > moveY || (enemyMoveX + 3) < moveX || (enemyMoveX - 3) > moveX) {
    shouldChase = false;
  }
  possibleMoveTiles(gridSpace);
  clearOutBodies()
}

function clearOutBodies() {
  let theGrid = gridSpace;
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
      if (theGrid[x][y] === 4) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
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
