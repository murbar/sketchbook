import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import TimerDisplay from './TimerDisplay';
import useLocalStorageState from 'shared-hooks/useLocalStorageState';

const TICK_MS = 100;

const getNewTimer = (duration = null, start = false) => ({
  id: uuid(),
  createdAt: Date.now(),
  isRunning: start,
  startedAt: start ? Date.now() : null,
  elapsedBeforeStart: 0,
  elapsed: 0,
  duration: duration !== null ? duration * 1000 : duration,
  complete: false,
  completedCount: 0
});

const completeTimer = timer => {
  timer.isRunning = false;
  timer.startedAt = null;
  timer.complete = true;
  timer.completedCount += 1;
};

const updateTimer = timer => {
  if (timer.isRunning) {
    timer.elapsed = Date.now() - timer.startedAt;
    if (timer.elapsed + timer.elapsedBeforeStart >= timer.duration) {
      completeTimer(timer);
    }
    return true;
  }
  return false; // no-op
};

const Styles = styled.div``;

export default function Timers() {
  const [timers, setTimers] = useLocalStorageState('timers', []);

  const addTimer = (duration = 0) => {
    setTimers(prev => [...prev, getNewTimer(duration)]);
  };

  const removeTimer = id => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const pauseTimer = id => {
    setTimers(prev => {
      const t = prev.find(t => t.id === id);
      if (t) {
        t.isRunning = false;
        t.startedAt = null;
        t.elapsedBeforeStart += t.elapsed;
        t.elapsed = 0;
      }
      return [...prev];
    });
  };

  const resumeTimer = id => {
    setTimers(prev => {
      const t = prev.find(t => t.id === id);
      if (t) {
        t.isRunning = true;
        t.startedAt = Date.now();
      }
      return [...prev];
    });
  };

  const restartTimer = id => {
    setTimers(prev => {
      const t = prev.find(t => t.id === id);
      if (t) {
        t.complete = false;
        t.isRunning = true;
        t.startedAt = Date.now();
        t.elapsed = 0;
        t.elapsedBeforeStart = 0;
      }
      return [...prev];
    });
  };

  React.useEffect(() => {
    let expectedTime = Date.now() + TICK_MS;
    const tick = () => {
      const drift = Date.now() - expectedTime;
      if (drift > TICK_MS) {
        // drift was more than tick
      }
      setTimers(prev => {
        // bail on render if no timers are running
        const isNoOp = !prev.map(updateTimer).some(c => c);
        return isNoOp ? prev : [...prev];
      });
      expectedTime += TICK_MS;
      setTimeout(tick, Math.max(0, TICK_MS - drift)); // adjust for drift
    };

    const clock = setTimeout(tick, TICK_MS);
    return () => window.clearTimeout(clock);
  }, [setTimers, timers]);

  return (
    <Styles>
      <button onClick={() => addTimer(5)}>New timer for 5 secs</button>
      <button onClick={addTimer}>New open timer</button>
      <div>
        {timers.map(t => (
          <TimerDisplay
            key={t.id}
            timer={t}
            actions={{
              remove: removeTimer,
              pause: pauseTimer,
              resume: resumeTimer,
              restart: restartTimer
            }}
          />
        ))}
      </div>
    </Styles>
  );
}
