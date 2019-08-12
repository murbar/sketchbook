import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import MazeDisplay from 'components/maze/MazeDisplay';
import Canvas from 'components/maze/Canvas';
// import Cell from 'components/maze/cell';

const ROWS = 48;
const COLS = 48;

const getIndex = (row, col) => {
  if (row < 0 || col < 0 || row > COLS - 1 || col > ROWS - 1) return null;
  // return row * COLS + col;
  return col + row * COLS;
};

class Cell {
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

  getUnvisitedNeighbor() {
    const { row, col } = this;
    const unvisited = [];
    const neighbors = {
      top: grid[getIndex(row, col - 1)],
      right: grid[getIndex(row + 1, col)],
      bottom: grid[getIndex(row, col + 1)],
      left: grid[getIndex(row - 1, col)]
    };

    for (const n in neighbors) {
      const cell = neighbors[n];
      if (cell && !cell.visited) {
        unvisited.push(cell);
      }
    }

    if (unvisited.length) {
      const random = Math.floor(Math.random() * unvisited.length);
      return unvisited[random];
    }

    return null;
  }

  removeWallBetween(neighbor) {
    const { row, col, walls } = this;
    const { row: row2, col: col2, walls: walls2 } = neighbor;
    const x = row - row2;
    const y = col - col2;
    if (x === 1) {
      walls.left = false;
      walls2.right = false;
    }
    if (x === -1) {
      walls.right = false;
      walls2.left = false;
    }
    if (y === 1) {
      walls.top = false;
      walls2.bottom = false;
    }
    if (y === -1) {
      walls.bottom = false;
      walls2.top = false;
    }
  }

  highlight(ctx, size) {
    const { row, col } = this;
    const [x, y] = [row * size, col * size];
    // ctx.clearRect(x, y, size, size);
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, size, size);
  }

  draw(ctx, size) {
    const { row, col, walls, visited } = this;
    const [x, y] = [row * size, col * size];
    // console.log(size);

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
        ctx.strokeStyle = 'aquamarine';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }

    if (visited) {
      // ctx.fillStyle = 'rgba(56, 176, 99, 0.5)';
      ctx.clearRect(x, y, size, size);
      ctx.fillRect(x, y, size, size);
    }
  }
}

const generateGrid = (nRows, nCols) => {
  const grid = [];
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      grid.push(new Cell(row, col));
    }
  }
  return grid;
};

const generateMaze = grid => {
  const stack = [];
  let currentCell = grid[Math.floor(Math.random() * grid.length)];

  while (true) {
    currentCell.visited = true;
    let nextCell = currentCell.getUnvisitedNeighbor();
    if (nextCell) {
      nextCell.visited = true;
      stack.push(currentCell);
      currentCell.removeWallBetween(nextCell);
      currentCell = nextCell;
    } else if (stack.length > 0) {
      currentCell = stack.pop();
    } else {
      break;
    }
  }

  return grid;
};

const grid = generateGrid(ROWS, COLS);
const stack = [];

let currentCell;

const setup = ctx => {
  currentCell = grid[Math.floor(Math.random() * grid.length)];
};

const draw = (ctx, setFrameRate) => {
  console.log('draw');
  const width = ctx.canvas.clientWidth;
  const height = ctx.canvas.clientHeight;
  const cellSize = width / ROWS;

  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, width, height);

  for (const cell of grid) {
    cell.draw(ctx, cellSize);
  }

  currentCell.visited = true;
  currentCell.highlight(ctx, cellSize);
  let nextCell = currentCell.getUnvisitedNeighbor();
  if (nextCell) {
    nextCell.visited = true;
    stack.push(currentCell);
    currentCell.removeWallBetween(nextCell);
    currentCell = nextCell;
  } else if (stack.length > 0) {
    currentCell = stack.pop();
  } else {
    setFrameRate(null);
  }
};

// second version where the grid object doesn't draw itself, is only the model
// const drawCompleted = (ctx, setFrameRate) => {
//   console.log('draw com');
//   const width = ctx.canvas.clientWidth;
//   const height = ctx.canvas.clientHeight;
//   const cellSize = width / ROWS;

//   ctx.fillStyle = '#222';
//   ctx.fillRect(0, 0, width, height);

//   const g = generateGrid(ROWS, COLS);
//   const maze = generateMaze(g);

//   for (const cell of maze) {
//     cell.draw(ctx, cellSize);
//   }
// };

const Styles = styled.div``;

export default function MazeGenerator() {
  return (
    <Styles>
      <Canvas setup={setup} draw={draw} interval={50} />

      {/* <Canvas setup={setup} draw={drawCompleted} /> */}
    </Styles>
  );
}
