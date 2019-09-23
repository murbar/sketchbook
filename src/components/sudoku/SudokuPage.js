import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styles = styled.div``;

const Board = styled.div`
  display: grid;
  grid-template-columns: [start] repeat(9, 1fr) [end];
  grid-template-rows: [top] repeat(9, 6rem) [bottom];
  width: 54rem;
  border: 2px solid #444;
  grid-gap: 1px;
  border-radius: 1rem;
  overflow: hidden;
  background: #444;
`;

const Cell = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  border: none;
  background: white;
  text-align: center;
  align-items: center;
  font-size: 2.75rem;
  font-weight: 500;
`;

const boardState = Array.from({ length: 81 }, () => Math.floor(Math.random() * 10));

export default function SudokuPage() {
  useDocumentTitle('Sudoku');

  return (
    <Styles>
      <h1>Sudoku</h1>
      <Board>
        {boardState.map(c => (
          <Cell value={c} />
        ))}
      </Board>
      <button>Hint</button>
      <button>Solve</button>
      <button>New</button>
      <button>Reset</button>
      <button>Pause</button>
      <h2>Time: 00:00</h2>
    </Styles>
  );
}
