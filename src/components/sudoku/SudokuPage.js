import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';
import GameGrid from './GameGrid';
import useSudoku from './useSudoku';

// highlight similar values on hover
// highlight when all of one value is filled and valid
// persist game to LS
// set difficulty

const Styles = styled.div``;

export default function SudokuPage() {
  useDocumentTitle('Sudoku');
  const {
    cells,
    startingValueIndexes,
    hintsRemaining,
    isSolved,
    isPaused,
    actions
  } = useSudoku();
  // console.log(grid);
  return (
    <Styles>
      <h1>Sudoku</h1>
      {isSolved && <h2>Solved! Good work.</h2>}
      <p>Hints remaining: {hintsRemaining}</p>
      <GameGrid
        cells={cells}
        isPaused={isPaused}
        handleCellChange={actions.setCell}
        startingValueIndexes={startingValueIndexes}
      />
      <button onClick={actions.getHint} disabled={hintsRemaining < 1}>
        Get Hint
      </button>
      <button onClick={actions.solveGame}>Solve</button>
      <button onClick={actions.initNewGame}>New</button>
      <button onClick={actions.resetGame}>Reset</button>
      <button onClick={actions.togglePaused}>{isPaused ? 'Resume' : 'Pause'}</button>
      <button onClick={actions.clearCells}>Clear</button>
      {/* <h2>Time: 00:00</h2> */}
      {/* <h2>Mode: play/solve</h2> */}
    </Styles>
  );
}
