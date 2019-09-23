import React from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';

const Styles = styled.div``;

export default function CanvasCirclesPage() {
  useDocumentTitle('Circles with Canvas API');
  return (
    <Styles>
      <h1>Canvas Circles</h1>
      <Canvas />
    </Styles>
  );
}
