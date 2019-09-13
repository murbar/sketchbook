import React from 'react';
import styled from 'styled-components';

const Styled = styled.div``;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 3rem 3rem repeat(${p => p.weeksInMonth}, 7rem);

  border: 1px solid blue;
`;

const CalendarLabelMonth = styled.div`
  display: grid;
`;

const Calendar = () => {
  const now = new Date();
  const props = {
    weeksInMonth: 5
  };

  return <CalendarContainer {...props}>a</CalendarContainer>;
};

export default function Page() {
  return (
    <Styled>
      <h1>Calendar</h1>
      <Calendar />
    </Styled>
  );
}
