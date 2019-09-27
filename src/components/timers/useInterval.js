import { useEffect } from 'react';

// self-adjusting interval
// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript

const TICK_MS = 1000 / 60;

export default function useInterval(callback, intervalMs = TICK_MS) {
  useEffect(() => {
    let expectedTime = Date.now() + intervalMs;
    const tick = () => {
      const drift = Date.now() - expectedTime;
      callback();
      expectedTime += intervalMs;
      setTimeout(tick, Math.max(0, intervalMs - drift)); // adjust for drift
    };

    const interval = setTimeout(tick, intervalMs);
    return () => window.clearTimeout(interval);
  }, [callback, intervalMs]);
}
