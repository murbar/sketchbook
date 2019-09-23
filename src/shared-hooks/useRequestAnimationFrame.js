import { useEffect } from 'react';

const useRequestAnimationFrame = (callback = () => {}) => {
  useEffect(() => {
    const draw = () => {
      callback();
      window.requestAnimationFrame(draw);
    };

    let animation = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animation);
  }, [callback]);
};

export default useRequestAnimationFrame;
