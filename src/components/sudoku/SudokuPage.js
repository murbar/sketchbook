import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styles = styled.div`
  --board-size: 54rem;
  --border-width: 0.3rem;
  --border-color: #444;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: [start] repeat(9, calc(var(--board-size) / 9)) [end];
  grid-template-rows: [top] repeat(9, calc(var(--board-size) / 9)) [bottom];
  width: var(--board-size);
  border: var(--border-width) solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  background: var(--border-color);
  position: relative;
  box-sizing: content-box;
`;

// :nth-child(n + 3):not(:nth-child(n + 8))
const Cell = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  border: none;
  background: white;
  text-align: center;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 500;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  &:nth-child(3n) {
    border-right: 3px solid var(--border-color);
  }
  &:nth-child(9n) {
    border-right: none;
  }
  &:nth-child(n + 19):nth-child(-n + 27),
  &:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 3px solid var(--border-color);
  }
  &:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom: none;
  }
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
