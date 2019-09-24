import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Styles = styled.div`
  --board-size: 54rem;
  --border-width: 0.3rem;
  --border-color: #444;

  display: grid;
  grid-template-columns: [start] repeat(9, calc(var(--board-size) / 9)) [end];
  grid-template-rows: [top] repeat(9, calc(var(--board-size) / 9)) [bottom];
  width: var(--board-size);
  border: var(--border-width) solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  /* background: var(--border-color); */
  position: relative;
  box-sizing: content-box;
`;

export default function GameGrid({ cells, handleCellChange, initialIndexes }) {
  return (
    <Styles>
      {cells.map((value, index) => {
        const initial = initialIndexes.includes(index);
        return (
          <Cell
            key={index}
            handleCellChange={handleCellChange}
            index={index}
            value={value}
            initial={initial}
          />
        );
      })}
    </Styles>
  );
}

GameGrid.propTypes = {
  cells: PropTypes.array.isRequired
};
