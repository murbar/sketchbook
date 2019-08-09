import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function Expires({ children, delay = 1000 }) {
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  useEffect(() => {
    const setTimer = () => {
      timer.current = setTimeout(() => {
        setVisible(false);
        timer.current = null;
      }, delay);
    };

    setTimer();
    setVisible(true);

    return () => {
      clearTimeout(timer.current);
    };
  }, [delay]);

  return visible && <Styles>{children}</Styles>;
}
