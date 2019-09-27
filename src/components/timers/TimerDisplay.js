import React from 'react';
import styled from 'styled-components';
import { getTotalElapsed } from './timer';

const Styles = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 1rem;
`;

export default function TimerDisplay({ timer, actions }) {
  const totalElapsed = getTotalElapsed(timer);
  const elapsedDisplay = `${(totalElapsed / 1000).toFixed(1)}s`;
  const durationDisplay = `${timer.duration / 1000}s`;
  const { isCompleted } = timer;
  const showPause = !isCompleted && timer.isRunning;
  const showResume = !isCompleted && !timer.isRunning;

  const remove = () => actions.remove(timer.id);
  const pause = () => actions.pause(timer.id);
  const resume = () => actions.resume(timer.id);
  const reset = () => actions.reset(timer.id);

  return (
    <Styles>
      <strong>{isCompleted ? durationDisplay : elapsedDisplay}</strong>
      {isCompleted && 'Done!'}
      {showPause && <button onClick={pause}>Pause</button>}
      {showResume && (
        <button onClick={resume}>{totalElapsed > 0 ? 'Resume' : 'Start'}</button>
      )}
      {isCompleted && <button onClick={reset}>Reset</button>}
      <button onClick={remove}>X</button>
    </Styles>
  );
}
