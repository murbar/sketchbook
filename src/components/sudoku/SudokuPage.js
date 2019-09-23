import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styles = styled.div``;

export default function SudokuPage() {
  useDocumentTitle('Sudoku');

  return (
    <Styles>
      <h1>Sudoku</h1>
    </Styles>
  );
}
