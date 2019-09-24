import { useState, useEffect, useRef } from 'react';
import { solve, convertGridValuesToMatrix, generateGameGrid } from './gameLogic';

// class Cell {
//   constructor(value) {
//     this.value = value;
//     this.initial = value !== 0;
//     this.hint = false;
//     this.warn = false;
//   }

//   setValue(value) {
//     value = value === '' ? 0 : parseInt(value.toString().slice(0, 1), 10);
//     if (isNaN(value)) {
//       this.value = 0;
//     } else {
//       this.value = value;
//     }
//   }
// }

const buildEmptyArray = length => Array(length).fill(null);

const initEmptyGrid = () => buildEmptyArray(81).map(() => 0);

const convertGridArrayToMatrix = gridArray => {
  const valuesString = serializeGrid(gridArray);
  return convertGridValuesToMatrix(valuesString);
};

const serializeGrid = gridArray =>
  gridArray.reduce((serialized, cell) => serialized + cell, '');

const deserializeGrid = valuesString => [...valuesString].map(v => parseInt(v, 10));

function useLogging(data) {
  useEffect(() => {
    console.log(data);
  }, [data]);
}

export default function useSudoku(blank = false) {
  const [grid, setGrid] = useState(initEmptyGrid());
  const [isSolved, setIsSolved] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const gameInitialGrid = useRef([]);
  const gameSolvedGrid = useRef([]);

  // useLogging(grid);
  useLogging(gameInitialGrid.current);

  const setCell = (index, value) => {
    setGrid(prev => {
      prev[index] = value;
      return [...prev];
    });
  };

  const solveGame = () => {
    const gridMatrix = convertGridArrayToMatrix(grid);
    const solvedGridArray = solve(gridMatrix).flat();
    setGrid(solvedGridArray);
  };

  const validateGame = () => {};

  const clearGrid = () => setGrid(initEmptyGrid());

  const startNewGame = () => {
    const [initialGrid, solvedGrid] = generateGameGrid(difficulty);
    gameInitialGrid.current = [...initialGrid.flat()];
    gameSolvedGrid.current = [...solvedGrid.flat()];
    setGrid([...initialGrid.flat()]);
  };

  const resetGame = () => setGrid(deserializeGrid(gameInitialGrid.current));

  useEffect(() => {
    if (!blank) startNewGame();
  }, [blank]);

  const initialIndexes = gameInitialGrid.current
    .map((_, i) => i)
    .filter(i => grid[i] !== 0);

  return {
    grid,
    setCell,
    clearGrid,
    startNewGame,
    resetGame,
    solveGame,
    serialized: gameInitialGrid.current,
    initialIndexes
  };
}
