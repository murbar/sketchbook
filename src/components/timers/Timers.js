import React from 'react';
import styled from 'styled-components';
import TimerDisplay from './TimerDisplay';
import useLocalStorageState from 'shared-hooks/useLocalStorageState';
import {
  constructNewTimer,
  advanceTimer,
  pauseTimer,
  resumeTimer,
  resetTimer
} from './timer';
import useInterval from './useInterval';

const Styles = styled.div``;

export default function Timers() {
  const [timers, setTimers] = useLocalStorageState('timers', []);

  const add = (duration = null) => {
    setTimers(prev => [...prev, constructNewTimer(duration)]);
  };

  const remove = id => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const pause = id => {
    setTimers(prev => prev.map(t => (t.id === id ? pauseTimer(t) : t)));
  };
  const resume = id => {
    setTimers(prev => prev.map(t => (t.id === id ? resumeTimer(t) : t)));
  };

  const reset = id => {
    setTimers(prev => prev.map(t => (t.id === id ? resetTimer(t) : t)));
  };

  useInterval(() =>
    setTimers(prev => {
      const isNoOp = !prev.map(advanceTimer).some(c => c);
      // bail on re-render if no timers are running
      return isNoOp ? prev : [...prev];
    })
  );

  return (
    <Styles>
      <button onClick={() => add(5)}>New timer for 5 secs</button>
      <button onClick={add}>New open timer</button>
      <div>
        {timers.map(t => (
          <TimerDisplay
            key={t.id}
            timer={t}
            actions={{
              remove,
              pause,
              resume,
              reset
            }}
          />
        ))}
        <h2>Countdowns</h2>
      </div>
    </Styles>
  );
}
