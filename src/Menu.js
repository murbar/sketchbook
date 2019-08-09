import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  color: ${p => p.theme.colors.offWhite};
  flex: 0 0 26rem;
  padding: 0 2rem;
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;

export default function Menu() {
  return (
    <Styles>
      <h1>
        <Link to="/">Sketches</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/maze">Maze</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/color-picker">Color Picker</Link>
          </li>
          <li>
            <Link to="/import-export">Data import/export</Link>
          </li>
          <li>
            <Link to="/ui">UI Library</Link>
          </li>
          <li>
            <Link to="/message-queue">Message queue</Link>
          </li>
        </ul>
      </nav>
    </Styles>
  );
}
