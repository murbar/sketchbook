import React, { useRef, useState, useEffect, useCallback } from 'react';
import useInterval from 'shared-hooks/useInterval';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const scaleToDevicePixelRatio = canvas => {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width *= dpr;
  canvas.height *= dpr;
  ctx.scale(dpr, dpr);
};

const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const Styles = styled.canvas`
  ${'' /* width: 100%; */}
  width: 960px;
`;

export default function Canvas({ setup, draw, interval = null }) {
  const canvasRef = useRef();
  const [frameRate, setFrameRate] = useState(interval);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const size = rect.width % 2 === 0 ? rect.width : rect.width - 1;
    canvas.width = size;
    canvas.height = size;
    setup(ctx);
    scaleToDevicePixelRatio(canvas);
  }, [setup]);

  useEffect(() => {
    init();

    const withDelay = debounce(init, 100);
    window.addEventListener('resize', withDelay);
    return () => window.removeEventListener('resize', withDelay);
  }, [init]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    draw(ctx, setFrameRate);
  }, [draw]);

  useInterval(() => {
    const ctx = canvasRef.current.getContext('2d');
    draw(ctx, setFrameRate);
  }, frameRate);

  return <Styles ref={canvasRef} />;
}

Canvas.propTypes = {
  setup: PropTypes.func.isRequired,
  draw: PropTypes.func.isRequired,
  interval: PropTypes.number
};
