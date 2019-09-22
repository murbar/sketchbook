import { useEffect } from 'react';

const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const useWindowResize = (callback, debounceMs = 100) => {
  useEffect(() => {
    callback();
    const withDelay = debounce(callback, debounceMs);
    window.addEventListener('resize', withDelay);
    return () => window.removeEventListener('resize', withDelay);
  }, [callback, debounceMs]);
};

export default useWindowResize;
