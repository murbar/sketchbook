import React from 'react';
import Map from 'components/maze/Map';
import Generator from 'components/maze/MazeGenerator';
import mapData from 'components/maze/mapData.json';

export default function Maze() {
  return (
    <div>
      {/* <Map mapData={mapData} /> */}
      <Generator />
    </div>
  );
}
