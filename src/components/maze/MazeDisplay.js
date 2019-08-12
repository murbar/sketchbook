import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Canvas from 'components/maze/Canvas';

const Styles = styled.div``;

export default function MazeDisplay({ grid }) {
  // useEffect(() => {
  //   // setup canvas
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   const rect = canvas.getBoundingClientRect();

  //   canvas.width = rect.width;
  //   const cellSize = canvas.width / COLS;
  //   canvas.height = cellSize * ROWS;
  //   scaleToDevicePixelRatio(canvas);

  // }, [grid]);

  return <Styles>display</Styles>;
}
