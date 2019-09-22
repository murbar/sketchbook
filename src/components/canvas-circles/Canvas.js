import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useMousePosition from 'hooks/useMousePosition';
import useWindowResize from 'hooks/useWindowResize';
import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';

class Circle {
  constructor(x = 0, y = 0, dx = 0, dy = 0, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.initialRadius = radius;
    this.bgColor = `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random()})`;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.bgColor;
    ctx.fill();
  }

  update(ctx, mousePosition) {
    const [width, height] = getCanvasRect(ctx);

    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw(ctx);
  }
}

const scaleToDevicePixelRatio = canvas => {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width *= dpr;
  canvas.height *= dpr;
  ctx.scale(dpr, dpr);
};

const getCanvasRect = ctx => {
  const width = ctx.canvas.clientWidth;
  const height = ctx.canvas.clientHeight;
  return [width, height];
};

const makeCircles = (qty, rect) => {
  return Array(qty)
    .fill(null)
    .map(() => {
      const radius = Math.random() * 10 + 20;
      const x = Math.random() * (rect.width - radius * 2) + radius;
      const y = Math.random() * (rect.height - radius * 2) + radius;
      const dx = Math.random() * 3 - 1.5;
      const dy = Math.random() * 3 - 1.5;

      return new Circle(x, y, dx, dy, radius);
    });
};

const Styles = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

// let circles;

const initCanvas = canvas => {
  const rect = canvas.getBoundingClientRect();
  scaleToDevicePixelRatio(canvas);
  canvas.width = rect.width;
  canvas.height = rect.height;
};

export default function Canvas() {
  const canvasRef = useRef();
  const [circles, setCircles] = useState([]);
  // const mouse = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    initCanvas(canvas);
    setCircles(makeCircles(100, rect));
  }, []);

  useWindowResize(() => {
    initCanvas(canvasRef.current);
  });

  useRequestAnimationFrame(() => {
    const ctx = canvasRef.current.getContext('2d');
    const [width, height] = getCanvasRect(ctx);
    ctx.clearRect(0, 0, width, height);
    circles.forEach(c => c.update(ctx));
  });

  return <Styles ref={canvasRef} />;
}
