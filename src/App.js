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
const Tweening = lazy(() => import('components/string-tweening/Demo'));
const Calendar = lazy(() => import('components/calendar/CalendarPage'));
const Timers = lazy(() => import('components/timers/TimersPage'));
const CanvasCircles = lazy(() => import('components/canvas-circles/CanvasCirclesPage'));

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  main {
    position: relative;
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
              <Route path="/string-tweening" component={Tweening} />
              <Route path="/chaining-perf" component={ChainVsReduce} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/timers" component={Timers} />
              <Route path="/canvas-circles" component={CanvasCircles} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
