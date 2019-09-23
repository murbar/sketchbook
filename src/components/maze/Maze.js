import React from 'react';
// import Map from 'components/maze/Map';
import Generator from 'components/maze/MazeGenerator';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';
// import mapData from 'components/maze/mapData.json';

export default function Maze() {
  useDocumentTitle('Maze Generator Algorithm');
  return (
    <div>
      {/* <Map mapData={mapData} /> */}
      <Generator />
    </div>
  );
}
