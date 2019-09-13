import React, { useState } from 'react';
import styled from 'styled-components';
import { getDaysOfWeek, getDaysInMonth, getMonthLabel, getYear } from './dateUtils';

const Styled = styled.div``;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 5rem 3rem repeat(${p => p.weeksInMonth}, 7rem);
`;

const LabelMonth = styled.div`
  background: #444;
  color: white;
  font-size: 2em;
  line-height: 1;
  align-self: stretch;
  height: 100%;
  grid-column: 1 / end;
  grid-row: 1;
`;

const LabelDayOfWeek = styled.div`
  background: #666;
  color: white;
  grid-column: ${p => p.col};
  grid-row: 2;
`;

const Day = styled.div`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  color: ${p => (p.isToday ? 'red' : 'inherit')};
`;

const now = new Date();

const isToday = date => {
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const Calendar = ({ month = now.getMonth(), year = now.getFullYear() }) => {
  const dayLabels = getDaysOfWeek('short');
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayDate = daysInMonth[0].date;
  const monthLabel = getMonthLabel(firstDayDate);
  const yearLabel = getYear(firstDayDate);
  const props = {
    weeksInMonth: 5
  };

  return (
    <CalendarContainer {...props}>
      <LabelMonth>
        {monthLabel} {yearLabel}
      </LabelMonth>

      {dayLabels.map((d, i) => {
        return (
          <LabelDayOfWeek key={i} col={i + 1}>
            {d}
          </LabelDayOfWeek>
        );
      })}

      {daysInMonth.map((d, i) => {
        return (
          <Day
            key={i}
            row={d.weekOfMonth + 2}
            col={d.dayOfWeek}
            isToday={isToday(d.date)}
          >
            {d.dayOfMonth}
          </Day>
        );
      })}
    </CalendarContainer>
  );
};

export default function Page() {
  const [focus, setFocus] = useState({
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear()
  });

  const focusPrevMonth = () => {
    setFocus(prev => {
      const year = prev.month === 0 ? prev.year - 1 : prev.year;
      const month = prev.month === 0 ? 12 : prev.month - 1;
      return { ...prev, year, month };
    });
  };

  const focusNextMonth = () => {
    setFocus(prev => {
      const year = prev.month === 12 ? prev.year + 1 : prev.year;
      const month = prev.month === 12 ? 0 : prev.month + 1;
      return { ...prev, year, month };
    });
  };

  const focusCurrentMonth = () => {
    setFocus(prev => ({ ...prev, year: now.getFullYear(), month: now.getMonth() }));
  };

  return (
    <Styled>
      <h1>Calendar</h1>
      <button onClick={focusPrevMonth}>{'<<'}</button>
      <button onClick={focusCurrentMonth}>Today</button>
      <button onClick={focusNextMonth}>{'>>'}</button>
      <Calendar {...focus} />
    </Styled>
  );
}
