import { useEffect, useRef } from 'react';

const checkTypes = (callback, delay) => {
  if (!callback || typeof callback !== 'function') {
    throw new TypeError('Callback is required and must be a function');
  }
  if (delay !== null && typeof delay !== 'number') {
    throw new TypeError('Delay is required and must be an integer or null');
  }
};

export default function useInterval(callback, delay) {
  checkTypes(callback, delay);

  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
