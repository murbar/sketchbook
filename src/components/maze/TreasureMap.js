import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import P5Sketch from 'components/P5Sketch';

import mapData from 'mapData.json';

// https://thecodingtrain.com/CodingChallenges/051.1-astar.html
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_051_astar/P5

const Styles = styled.div`
  margin: 0 2rem;
`;

const parseCoordinates = coords => {
  return coords
    .slice(1, coords.length - 1)
    .split(',')
    .map(n => parseInt(n));
};

const normalizeNum = (n, nMax, nMin) => {
  return (n - nMin) / (nMax - nMin);
};

const getCoordsMaxMinXY = map => {
  let [minX, maxX, minY, maxY] = [1000, 0, 1000, 0];
  for (let roomId in map) {
    const room = map[roomId];
    const [x, y] = parseCoordinates(room.coords);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return [maxX, minX, maxY, minY];
};

const scaleCenter = (val, scale, range) => {
  const padding = ((1 - scale) / 2) * range;
  return val * scale + padding;
};

function sketch(p5) {
  const WIDTH = 1500;
  const HEIGHT = 1500;
  const [maxX, minX, maxY, minY] = getCoordsMaxMinXY(mapData);

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.background(220);
  };

  p5.draw = () => {
    const roomConnections = {};
    const roomCoords = {};

    // get coords & build connections
    for (let roomId in mapData) {
      roomId = parseInt(roomId);
      const room = mapData[roomId];

      // coords
      const [rawX, rawY] = parseCoordinates(room.coords);
      const [xNorm, yNorm] = [
        normalizeNum(rawX, maxX, minX) * WIDTH,
        (1 - normalizeNum(rawY, maxY, minY)) * HEIGHT
      ];
      const scale = 0.9;
      const xScaled = Math.ceil(scaleCenter(xNorm, scale, WIDTH));
      const yScaled = Math.ceil(scaleCenter(yNorm, scale, HEIGHT));
      roomCoords[roomId] = { x: xScaled, y: yScaled };

      // connections
      for (const neighbor in room.exits) {
        const neighborId = room.exits[neighbor];
        // store connections under room with smaller id to avoid dupes
        if (neighborId < roomId) {
          const existing = neighborId in roomConnections ? roomConnections[neighborId] : [];
          if (!existing.includes(roomId)) existing.push(roomId);
          roomConnections[neighborId] = existing;
        } else {
          const existing = roomId in roomConnections ? roomConnections[roomId] : [];
          if (!existing.includes(neighborId)) existing.push(neighborId);
          roomConnections[roomId] = existing;
        }
      }
    }

    // draw connections
    for (const roomId in roomConnections) {
      const connections = roomConnections[roomId];
      const thisRoomCoords = roomCoords[roomId];
      for (const c of connections) {
        const connectedRoomCoords = roomCoords[c];
        p5.stroke('coral');
        p5.strokeWeight(3);
        p5.line(thisRoomCoords.x, thisRoomCoords.y, connectedRoomCoords.x, connectedRoomCoords.y);
      }
    }

    // draw rooms
    for (const roomId in mapData) {
      const { x, y } = roomCoords[roomId];
      // dot
      p5.fill('coral');
      p5.noStroke();
      // p5.ellipse(x, y, 28, 28);
      p5.rect(x - 14, y - 14, 28, 28, 5);
      // label bg
      // p5.fill(220);
      // p5.rect(x - 10, y - 16, 20, 12);
      // label
      p5.fill(0);
      p5.textStyle(p5.BOLD);
      p5.textAlign(p5.CENTER);
      p5.text(roomId, x, y + 4);
    }
    p5.noLoop();
  };
}

function App() {
  return (
    <Styles>
      <Header />
      <p>Build with React & p5</p>
      <P5Sketch sketch={sketch} />
    </Styles>
  );
}

export default App;
