import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getTotalElapsed } from './timer';
import prettyMs from 'pretty-ms';

const pulseBorder = keyframes`
  from {
    border-color: deepSkyBlue;
  }
  to {
    border-color: white;
  }
`;

const Styles = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid white;
  ${p =>
    p.isCompleted &&
    css`
      border-color: mediumSpringGreen;
    `}
  ${p =>
    p.isRunning &&
    css`
      animation: ${pulseBorder} 1s alternate infinite;
    `}
`;

const Elapsed = styled.div`
  font-weight: bold;
`;

const getDisplayTime = ms => {
  if (!ms) return '0.0s';
  if (ms < 1000) return `0.${Math.floor(ms / 100)}s`;
  if (ms > 60000) return prettyMs(ms, { secondsDecimalDigits: 0 });
  return prettyMs(ms, { keepDecimalsOnWholeSeconds: true });
};

export default function TimerDisplay({ timer, actions }) {
  const totalElapsed = getTotalElapsed(timer);
  const elapsedDisplay = getDisplayTime(totalElapsed);
  const durationDisplay = getDisplayTime(timer.duration);
  const { isCompleted, isRunning } = timer;
  const showPause = !isCompleted && isRunning;
  const showResume = !isCompleted && !isRunning;

  const remove = () => actions.remove(timer.id);
  const pause = () => actions.pause(timer.id);
  const resume = () => actions.resume(timer.id);
  const reset = () => actions.reset(timer.id);

  return (
    <Styles {...{ isCompleted, isRunning }}>
      <Elapsed>
        {isCompleted ? durationDisplay : elapsedDisplay} {isCompleted && '✅'}
      </Elapsed>

      {showPause && <button onClick={pause}>Pause</button>}
      {showResume && (
        <button onClick={resume}>{totalElapsed > 0 ? 'Resume' : 'Start'}</button>
      )}
      {isCompleted && <button onClick={reset}>Reset</button>}
      <button onClick={remove}>X</button>
    </Styles>
  );
}
