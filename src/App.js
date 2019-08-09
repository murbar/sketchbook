import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'components/Menu';
import About from 'components/About';
import Maze from 'components/maze/Maze';
import Games from 'components/games/Games';
import ColorPicker from 'components/color-picker/ColorPicker';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  main {
    padding: 1rem 2rem;
  }
`;

function App() {
  return (
    <Router>
      <Layout>
        <Menu />
        <main>
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/maze" component={Maze} />
            <Route path="/games" component={Games} />
            <Route path="/color-picker" component={ColorPicker} />
          </Switch>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
