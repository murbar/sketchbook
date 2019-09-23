import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const pages = [
  { path: '/maze', title: 'Maze' },
  { path: '/games', title: 'Games' },
  { path: '/color-picker', title: 'Color picker' },
  { path: '/import-export', title: 'Data import/export' },
  { path: '/ui', title: 'UI library' },
  { path: '/message-queue', title: 'Message queue' },
  { path: '/string-tweening', title: 'String tweening' },
  { path: '/chaining-perf', title: 'Chaining Vs reduce' },
  { path: '/canvas-circles', title: 'Canvas Circles' },
  { path: '/sudoku', title: 'Sudoku' },
  { path: '/calendar', title: 'Calendar' }
];

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
          {pages
            .sort((a, b) => (a.title > b.title ? 1 : -1))
            .map(p => (
              <li key={p.title}>
                <Link to={p.path}>{p.title}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </Styles>
  );
}
