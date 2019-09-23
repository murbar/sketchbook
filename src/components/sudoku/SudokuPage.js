import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';
import GameBoard from './GameBoard';
import useSudoku from './useSudoku';

const Styles = styled.div``;

export default function SudokuPage() {
  useDocumentTitle('Sudoku');
  const { board, startNewGame, resetGame, clearBoard, setCell } = useSudoku();

  return (
    <Styles>
      <h1>Sudoku</h1>
      <GameBoard state={board} handleCellChange={setCell} />
      <button>Hint</button>
      <button>Solve</button>
      <button onClick={startNewGame}>New</button>
      <button onClick={resetGame}>Reset</button>
      <button>Pause/Resume</button>
      <button onClick={clearBoard}>Clear</button>
      <h2>Time: 00:00</h2>
    </Styles>
  );
}
