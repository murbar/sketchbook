import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';
import GameGrid from './GameGrid';
import useSudoku from './useSudoku';

// highlight similar values on hover

const Styles = styled.div``;

export default function SudokuPage() {
  useDocumentTitle('Sudoku');
  const {
    grid,
    startNewGame,
    resetGame,
    clearGrid,
    setCell,
    solveGame,
    initialIndexes
  } = useSudoku();
  // console.log(grid);
  return (
    <Styles>
      <h1>Sudoku</h1>
      <GameGrid cells={grid} handleCellChange={setCell} initialIndexes={initialIndexes} />
      <button>Hint</button>
      <button onClick={solveGame}>Solve</button>
      <button onClick={startNewGame}>New</button>
      <button onClick={resetGame}>Reset</button>
      <button>Pause/Resume</button>
      <button onClick={clearGrid}>Clear</button>
      <h2>Time: 00:00</h2>
      <h2>Mode: play/solve</h2>
    </Styles>
  );
}
