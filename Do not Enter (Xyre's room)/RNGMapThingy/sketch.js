// RnGMapThingy
// Xyre Abelanes
// 17 May, 2018




function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

}

arrayMaker(num, dimensions) {
  let grid = [];
  for (let x = 0; x < dimensions; x++) {
    grid.push([]);
    for (let y = 0; y < dimensions; y++) {
      grid[x].push(num);
    }
  }
  return grid;
}
