import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'Menu';
import About from 'components/About';
import NotFound from 'components/NotFound';

const Maze = lazy(() => import('components/maze/Maze'));
const Games = lazy(() => import('components/games/Games'));
const UILibrary = lazy(() => import('components/ui/UILibrary'));
const ColorPicker = lazy(() => import('components/color-picker/ColorPicker'));
const DataImportExport = lazy(() => import('components/import-export/DataImportExport'));
const MessageQueue = lazy(() => import('components/message-queue/MessageQueue'));
const ChainVsReduce = lazy(() => import('components/perf/ChainVsReduce'));
const TweeningDemo = lazy(() => import('components/string-tweening/Demo'));

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
          <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
              <Route exact path="/" component={About} />
              <Route path="/maze" component={Maze} />
              <Route path="/games" component={Games} />
              <Route path="/color-picker" component={ColorPicker} />
              <Route path="/import-export" component={DataImportExport} />
              <Route path="/ui" component={UILibrary} />
              <Route path="/message-queue" component={MessageQueue} />
              <Route path="/string-tweening" component={TweeningDemo} />
              <Route path="/chaining-perf" component={ChainVsReduce} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
