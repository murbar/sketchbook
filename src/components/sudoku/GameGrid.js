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
  position: relative;
  box-sizing: content-box;
  filter: ${p => (p.isPaused ? 'blur(0.75rem)' : 'none')};
`;

export default function GameGrid({
  cells,
  handleCellChange,
  startingValueIndexes,
  isPaused
}) {
  return (
    <Styles isPaused={isPaused}>
      {cells.map((value, index) => {
        return (
          <Cell
            key={index}
            handleCellChange={handleCellChange}
            index={index}
            value={value}
            isStartingValue={startingValueIndexes.includes(index)}
          />
        );
      })}
    </Styles>
  );
}

GameGrid.propTypes = {
  cells: PropTypes.array.isRequired
};
