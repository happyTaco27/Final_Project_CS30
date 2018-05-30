// Movement Function for Final Project
// Xyre Abelanes
// 10 May, 2018

function playerThing() {
  playerSpace[moveX][moveY] = 2;
}

function borderThingy() {
  noFill();
  rect(0, 0, rows * cellSize, cols * cellSize);
}

function mouseClicked() {
  //Up
  if (floor(mouseY / cellSize) < moveY && grid[moveX][moveY - 1] === 0) {
    moveY--;
    charTile = charBSide;
  }
  //Down
  else if (floor(mouseY / cellSize) > moveY && grid[moveX][moveY + 1] === 0) {
    moveY++;
    charTile = charFSide;
  }
  //Left
  else if (floor(mouseX / cellSize) < moveX && grid[moveX - 1][moveY] === 0) {
    moveX--;
    charTile = charLSide;
  }
  //Right
  else if (floor(mouseX / cellSize) > moveX && grid[moveX + 1][moveY] === 0) {
    moveX++;
    charTile = charRSide;
  }
  clearOutBodies();
}

function clearOutBodies() {
  let theGrid = playerSpace;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (theGrid[x][y] === 2) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
}

function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll());


function displayGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === 0) {
        image(floorTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 'O') {
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
      // if (gridSpace[x][y] === 2 || gridSpace[x][y] === "2") {
      //   image(startTile, x * cellSize, y * cellSize, cellSize, cellSize);
      // }
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
    map = arrayMaker('O', rows, cols),
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
        if (x - 1 >= 0 && map[x - 1][y] === 'O') {
          map[x - 1][y] = 1;
        }
        if (x + 1 < rows && map[x + 1][y] === 'O') {
          map[x + 1][y] = 1;
        }
        if (y - 1 >= 0 && map[x][y - 1] === 'O') {
          map[x][y - 1] = 1;
        }
        if (y + 1 < cols && map[x][y + 1] === 'O') {
          map[x][y + 1] = 1;
        }
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y - 1] === 'O') {
          map[x - 1][y - 1] = 1;
        }
        if (x + 1 < rows && y + 1 < cols && map[x + 1][y + 1] === 'O') {
          map[x + 1][y + 1] = 1;
        }
        if (x - 1 >= 0 && y + 1 < cols && map[x - 1][y + 1] === 'O') {
          map[x - 1][y + 1] = 1;
        }
        if (x + 1 < rows && y - 1 >= 0 && map[x + 1][y - 1] === 'O') {
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
