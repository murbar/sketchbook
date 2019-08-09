import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  color: ${p => p.theme.colors.offWhite};
  flex: 0 0 26rem;
  padding: 0 1.5rem;
`;

export default function Menu() {
  return (
    <Styles>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/maze">Maze</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/color-picker">Color Picker</Link>
          </li>
        </ul>
      </nav>
    </Styles>
  );
}
