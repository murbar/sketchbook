import uuid from 'uuid/v4';

const sumItems = array => array.reduce((sum, i) => sum + i, 0);

export const constructNewTimer = (duration = null, start = false) => ({
  id: uuid(),
  createdAt: Date.now(),
  isRunning: start,
  startedAt: start ? Date.now() : null,
  previousElapsed: [],
  currentElapsed: 0,
  duration: duration !== null ? duration * 1000 : duration,
  isCompleted: false,
  completedCount: 0,
  label: '',
  tags: []
});

export const getTotalElapsed = timer => {
  return sumItems(timer.previousElapsed) + timer.currentElapsed;
};

export const completeTimer = timer => {
  timer.isRunning = false;
  timer.startedAt = null;
  timer.isCompleted = true;
  timer.completedCount += 1;
  return timer;
};

export const advanceTimer = timer => {
  if (timer.isRunning) {
    timer.currentElapsed = Date.now() - timer.startedAt;
    if (timer.duration && getTotalElapsed(timer) >= timer.duration) {
      completeTimer(timer);
    }
    return true; // notify caller the state of this instance has changed
  }
  return false; // no-op
};

export const pauseTimer = timer => {
  timer.isRunning = false;
  timer.startedAt = null;
  timer.previousElapsed.push(timer.currentElapsed);
  timer.currentElapsed = 0;
  return timer;
};

export const resumeTimer = timer => {
  timer.isRunning = true;
  timer.startedAt = Date.now();
  return timer;
};

export const resetTimer = timer => {
  timer.isCompleted = false;
  timer.isRunning = true;
  timer.startedAt = Date.now();
  timer.currentElapsed = 0;
  timer.previousElapsed = [];
  return timer;
};
