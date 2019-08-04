import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import Menu from 'components/Menu';
import About from 'components/About';
import Maze from 'components/maze/Maze';
import Games from 'components/games/Games';

const Styles = styled.div`
  margin: 0 2rem;
`;

function App() {
  return (
    <Styles>
      <Router>
        <Header />
        <Menu />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/maze" component={Maze} />
          <Route path="/games" component={Games} />
        </Switch>
      </Router>
    </Styles>
  );
}

export default App;
