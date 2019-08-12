import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'Menu';
import About from 'components/About';
import NotFound from 'components/NotFound';
import Maze from 'components/maze/Maze';
import Games from 'components/games/Games';
import UILibrary from 'components/ui/UILibrary';
import ColorPicker from 'components/color-picker/ColorPicker';
import DataImportExport from 'components/import-export/DataImportExport';
import MessageQueue from 'components/message-queue/MessageQueue';
import StringTweening from 'components/string-tweening/StringTweening';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  main {
    padding: 1rem 3rem 4rem;
    flex: 1;
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
            <Route path="/import-export" component={DataImportExport} />
            <Route path="/ui" component={UILibrary} />
            <Route path="/message-queue" component={MessageQueue} />
            <Route path="/string-tweening" component={StringTweening} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
