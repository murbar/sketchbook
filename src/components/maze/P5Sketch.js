import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';

const p5Events = [
  'draw',
  'windowResized',
  'preload',
  'mouseClicked',
  'doubleClicked',
  'mouseMoved',
  'mousePressed',
  'mouseWheel',
  'mouseDragged',
  'mouseReleased',
  'keyPressed',
  'keyReleased',
  'keyTyped',
  'touchStarted',
  'touchMoved',
  'touchEnded',
  'deviceMoved',
  'deviceTurned',
  'deviceShaken'
];

export default function P5Sketch({ sketch, ...props }) {
  const canvasWrapperRef = useRef();
  const sketchRef = useRef();

  useEffect(() => {
    sketchRef.current = new p5(sketch, canvasWrapperRef.current);

    // setup event listeners... passed sketch instance when called
    p5Events.forEach(e => {
      if (props[e]) {
        sketchRef.current[e] = () => props[e](sketchRef.current);
      }
    });

    return () => sketchRef.current.remove();
  }, [sketch, props]);

  return <div ref={canvasWrapperRef} className={props.className || ''} />;
}

P5Sketch.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  sketch: PropTypes.func,
  windowResized: PropTypes.func,
  preload: PropTypes.func,
  mouseClicked: PropTypes.func,
  doubleClicked: PropTypes.func,
  mouseMoved: PropTypes.func,
  mousePressed: PropTypes.func,
  mouseWheel: PropTypes.func,
  mouseDragged: PropTypes.func,
  mouseReleased: PropTypes.func,
  keyPressed: PropTypes.func,
  keyReleased: PropTypes.func,
  keyTyped: PropTypes.func,
  touchStarted: PropTypes.func,
  touchMoved: PropTypes.func,
  touchEnded: PropTypes.func,
  deviceMoved: PropTypes.func,
  deviceTurned: PropTypes.func,
  deviceShaken: PropTypes.func
};
