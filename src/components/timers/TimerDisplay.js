import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function TimerDisplay({ timer, actions }) {
  const totalElapsed = timer.elapsedBeforeStart + timer.elapsed;
  const elapsedDisplay = (totalElapsed / 1000).toFixed(1);
  const durationDisplay = timer.duration / 1000;
  const complete = timer.complete;

  const pause = () => actions.pause(timer.id);

  const resume = () => actions.resume(timer.id);

  const remove = () => actions.remove(timer.id);

  const restart = () => actions.restart(timer.id);

  const showPause = !complete && timer.isRunning;
  const showResume = !complete && !timer.isRunning;

  return (
    <Styles>
      <strong>{complete ? durationDisplay : elapsedDisplay}</strong>
      {complete && 'Done!'}
      {showPause && <button onClick={pause}>Pause</button>}
      {showResume && (
        <button onClick={resume}>{totalElapsed > 0 ? 'Resume' : 'Start'}</button>
      )}
      <button onClick={remove}>X</button>
      {complete && <button onClick={restart}>Restart</button>}
    </Styles>
  );
}
