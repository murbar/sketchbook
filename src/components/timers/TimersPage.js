import React from 'react';
import styled from 'styled-components';
import Timers from './Timers';

const Styles = styled.div``;

export default function TimersPage() {
  return (
    <Styles>
      <h1>Timers</h1>
      <Timers />
    </Styles>
  );
}
