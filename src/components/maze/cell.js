const getIndex = (row, col) => {
  if (row < 0 || col < 0 || row > COLS - 1 || col > ROWS - 1) return null;
  return row + col * COLS;
};

export default class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    this.visited = false;
  }

  checkNeighbors() {
    const { row, col } = this;
    const unvisited = [];
    const neighbors = {
      top: grid[getIndex(row, col - 1)],
      right: grid[getIndex(row + 1, col)],
      bottom: grid[getIndex(row, col + 1)],
      left: grid[getIndex(row - 1, col)]
    };
    for (const n of neighbors) {
      if (n && !n.visited) {
        unvisited.push(n);
      }
    }
  }

  draw(ctx, size) {
    const { row, col, walls, visited } = this;
    const [x, y] = [row * size, col * size];

    const wallCoords = {
      top: [x, y, x + size, y],
      right: [x + size, y, x + size, y + size],
      bottom: [x + size, y + size, x, y + size],
      left: [x, y + size, x, y]
    };

    for (const wall in walls) {
      const draw = !!walls[wall];
      if (draw) {
        const [x1, y1, x2, y2] = wallCoords[wall];
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    if (visited) {
      ctx.fillStyle = 'rgba(255, 0, 255, 0.4)';
      ctx.fillRect(x, y, size, size);
    }
  }
}
