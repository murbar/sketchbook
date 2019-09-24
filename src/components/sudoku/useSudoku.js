import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  initEmptyGridCells,
  getIndexes,
  getRandomElement,
  countCellsFilled
} from './lib/helpers';
import { generateGameCells } from './lib/generate';
import { checkValidInAll, checkIsSolved } from './lib/validate';
import { solvePuzzle } from './lib/solve';

function useLogging(data) {
  useEffect(() => {
    console.log(data);
  }, [data]);
}

export default function useSudoku(options) {
  options = {
    blank: false,
    hints: 3,
    difficulty: 1,
    ...options
  };
  const initialCells = useRef([]);
  const solvedCells = useRef([]);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState(options.difficulty);
  const [hintsRemaining, setHintsRemaining] = useState(options.hints);
  const [cells, setCells] = useState(initEmptyGridCells());
  const startingValueIndexes = getIndexes(initialCells.current, v => v !== 0);
  const isSolved = useMemo(() => checkIsSolved(cells), [cells]);
  const isFilledButUnsolved = useMemo(
    () => !isSolved && countCellsFilled(cells) === cells.length,
    [cells, isSolved]
  );

  // useLogging(cells);
  useLogging(startingValueIndexes);

  const setCell = (index, value) => {
    setCells(prev => {
      prev[index] = value;
      return [...prev];
    });
  };

  const getHint = () => {
    if (hintsRemaining > 0) {
      const emptyCells = getIndexes(cells, v => v === 0);
      const i = getRandomElement(emptyCells);
      setCell(i, solvedCells.current[i]);
      setHintsRemaining(prev => (prev -= 1));
    }
  };

  const addHints = (qty = 3) => {
    setHintsRemaining(prev => (prev += qty));
  };

  const solveGame = () => {
    // try/catch
    const solved = solvePuzzle(cells);
    setCells(solved);
  };

  const togglePaused = () => setIsPaused(prev => !prev);

  const checkValidCell = (value, index) => checkValidInAll(value, index, cells);

  const clearCells = () => {
    setCells(initEmptyGridCells());
    initialCells.current = [];
    solvedCells.current = [];
  };

  const initNewGame = useCallback(() => {
    const [initial, solved] = generateGameCells(difficulty);
    initialCells.current = [...initial];
    solvedCells.current = [...solved];
    setCells([...initial]);
    setHintsRemaining(options.hints);
  }, [difficulty, options.hints]);

  const resetGame = () => {
    if (initialCells.current.length > 0) {
      setCells([...initialCells.current]);
    }
    setHintsRemaining(options.hints);
  };

  useEffect(() => {
    if (!options.blank) initNewGame();
  }, [initNewGame, options.blank]);

  return {
    cells,
    startingValueIndexes,
    isSolved,
    isPaused,
    isFilledButUnsolved,
    hintsRemaining,
    difficulty,
    actions: {
      setDifficulty,
      setCell,
      checkValidCell,
      getHint,
      addHints,
      clearCells,
      initNewGame,
      resetGame,
      solveGame,
      togglePaused
    }
  };
}
