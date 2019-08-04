import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div``;

export default function Menu() {
  return (
    <Styles>
      Menu
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
      </ul>
    </Styles>
  );
}
