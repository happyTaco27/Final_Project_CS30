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
    } while ((randomDirection[0] === -lastDirection[0] &&
        randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] &&
        randomDirection[1] === lastDirection[1]));
    let randomLength = ceil(random() * maxLength),
      tunnelLength = 0;

    while (tunnelLength < randomLength) {
      if (((currentRow === 0) && (randomDirection[0] === -1)) ||
        ((currentColumn === 0) && (randomDirection[1] === -1)) ||
        ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
        ((currentColumn === cols - 1) && (randomDirection[1] === 1))) {
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
