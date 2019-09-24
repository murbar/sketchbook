import React from 'react';
import styled from 'styled-components';
import { GRID_SIZE, calcRowAndCol } from './lib/helpers';

const isArrowKey = key =>
  key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'ArrowLeft';

const calcDestinationIndex = (index, key) => {
  let destIndex = index;
  const maxIndex = GRID_SIZE ** 2 - 1;
  if (key === 'ArrowRight') {
    const i = destIndex + 1;
    destIndex = i <= maxIndex ? i : 0;
  }
  if (key === 'ArrowLeft') {
    const i = destIndex + -1;
    destIndex = i >= 0 ? i : maxIndex;
  }
  if (key === 'ArrowDown') {
    const i = destIndex + GRID_SIZE;
    destIndex = i < maxIndex ? i : maxIndex;
  }
  if (key === 'ArrowUp') {
    const i = destIndex - GRID_SIZE;
    destIndex = i > 0 ? i : 0;
  }
  return destIndex;
};

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  background: white;
  text-align: center;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 500;
  border-radius: 0;
  border: none;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  &:focus {
    outline: none;
    background: papayawhip;
  }
  &[disabled] {
    color: dodgerblue;
  }
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
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default function Cell({
  value,
  index,
  isStartingValue,
  handleCellChange,
  handleGridNavigate
}) {
  const handleChange = e => {
    let { value: newValue } = e.target;
    newValue = newValue === '' ? 0 : parseInt(newValue.toString().slice(0, 1), 10);
    if (isNaN(newValue)) return;
    handleCellChange(index, newValue);
  };

  const handleKeyDown = e => {
    const { key } = e;
    if (isArrowKey(key) || key === 'Enter') e.preventDefault();
    if (key === 'Enter') {
      handleGridNavigate(calcDestinationIndex(index, 'ArrowRight'));
    } else {
      handleGridNavigate(calcDestinationIndex(index, key));
    }
  };

  return (
    <Input
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={isStartingValue}
      maxLength="1"
      min="1"
      max="9"
      pattern="\d*"
      type="number"
      data-index={index}
    />
  );
}
