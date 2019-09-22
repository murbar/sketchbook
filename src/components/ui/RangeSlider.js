import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const { blue, offBlack } = theme.colors;

const Styles = styled.div`
  margin: 0;
  display: flex;
  padding: 0.5em 0;
  align-items: center;
  label {
    display: inline-block;
    user-select: none;
    margin-right: 1rem;
  }
  span {
    margin-left: 1rem;
    font-size: 1.25em;
    font-weight: bold;
  }
  input {
    appearance: none;
    width: 100%;
    height: 0.5em;
    background: white;
    outline: none;
    transition: all 300ms;
    border-radius: ${p => p.theme.borderRadius};
    border: 0.1rem solid ${offBlack};
    font-size: 1em;
  }
  input:hover {
    opacity: 1;
  }
  /* Chrome, Opera, Safari, Edge */
  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: ${p => p.theme.borderRadius};
    padding: 0.5em;
    background: ${blue};
    cursor: pointer;
    border: none;
  }
  /* Firefox */
  input::-moz-range-thumb {
    width: 1.5em;
    height: 1.5em;
    border-radius: ${p => p.theme.borderRadius};
    background: ${blue};
    cursor: pointer;
    border: none;
  }
`;

export default function RangeSlider({
  label,
  name,
  min = 1,
  max = 100,
  value,
  onChange,
  ...props
}) {
  return (
    <Styles>
      <label>{label}</label>
      <input
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        {...props}
      />
      <span>{value}</span>
    </Styles>
  );
}
