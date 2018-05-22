// RnGMapThingy
// Xyre Abelanes
// 17 May, 2018



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

}

function arrayMaker(num, dimensions) {
  let grid = [];
  for (let x = 0; x < dimensions; x++) {
    grid.push([]);
    for (let y = 0; y < dimensions; y++) {
      grid[x].push(num);
    }
  }
  return grid;
}

function createMap() {
  let dimensions = 5,
      maxTunnels = 3,
      maxLength = 3,
      map = arrayMaker(1, dimensions),
      currentRow = floor(random() * dimensions),
      currentColumn = floor(random() * dimensions),
      directions = [[-1,0],[1,0],[0,-1],[0,1]],
      lastDirection = [],
      randomDirection;

    while (maxTunnels && dimensions && maxLength) {
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
          ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
          ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
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
