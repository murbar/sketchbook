import React, { useState } from 'react';
import styled from 'styled-components';
import { getDaysOfWeek, getDaysInMonth, getMonthLabel, getYear } from './dateUtils';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styled = styled.div``;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: [start] repeat(7, 1fr) [end];
  grid-template-rows: [top] 5rem 3rem repeat(${p => p.weeksInMonth}, 8rem) [bottom];
  border-radius: 0.5rem;
  background: #ccc;
  grid-gap: 2px;
  overflow: hidden;
  border: 2px solid #ccc;
`;

const LabelMonth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  font-weight: bold;
  align-self: stretch;
  height: 100%;
  grid-column: start / end;
  grid-row: top;
`;

const LabelDayOfWeek = styled.div`
  grid-column: ${p => p.col};
  grid-row: 2;
  padding: 0 0.5rem;
`;

const Day = styled.div`
  grid-column: ${p => p.col} / ${p => p.col};
  grid-row: ${p => p.row};
  position: relative;
  background: ${p => (p.isToday ? 'lightyellow' : 'white')};
  border-radius: 0.25rem;
`;

const DayNumber = styled.div`
  font-size: 0.8em;
  font-weight: bold;
  line-height: 1;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;

const now = new Date();

const isToday = date => {
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const Calendar = ({ month, year }) => {
  const dayLabels = getDaysOfWeek('short');
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayDate = daysInMonth[0].date;
  const weeksInMonth = daysInMonth[daysInMonth.length - 1].weekOfMonth;
  const monthLabel = getMonthLabel(firstDayDate);
  const yearLabel = getYear(firstDayDate);

  return (
    <CalendarContainer weeksInMonth={weeksInMonth}>
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
            <DayNumber>{d.dayOfMonth}</DayNumber>
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
      const month = prev.month === 0 ? 11 : prev.month - 1;
      return { ...prev, year, month };
    });
  };

  const focusNextMonth = () => {
    setFocus(prev => {
      const year = prev.month === 11 ? prev.year + 1 : prev.year;
      const month = prev.month === 11 ? 0 : prev.month + 1;
      return { ...prev, year, month };
    });
  };

  const focusCurrentMonth = () => {
    setFocus(prev => ({ ...prev, year: now.getFullYear(), month: now.getMonth() }));
  };

  useDocumentTitle('Calendar Widget');

  return (
    <Styled>
      <h1>Calendar</h1>
      <p>
        A calendar widget built <code>Date</code> can CSS grid. No libraries.
      </p>
      <h2>Possible enhancements</h2>
      <ul>
        <li>Add items to days</li>
        <li>Label item with color</li>
        <li>Filter items view by color</li>
        <li>Jump to any date</li>
        <li>Year, week, and day views</li>
        <li>Transition animations</li>
      </ul>
      <button onClick={focusPrevMonth}>{'<<'}</button>
      <button onClick={focusCurrentMonth}>•</button>
      <button onClick={focusNextMonth}>{'>>'}</button>

      <Calendar {...focus} />
    </Styled>
  );
}
