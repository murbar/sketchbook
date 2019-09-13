export const getDaysOfWeek = (format = 'long') => {
  const now = new Date();
  const todayDayOfWeek = now.getDay();
  const week = Array(7)
    .fill(null)
    .map((_, i) => {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate() - (todayDayOfWeek - i));
      return i !== todayDayOfWeek ? dayDate : now;
    });
  return week.map(d => d.toLocaleString('en-us', { weekday: format }));
};

export const getMonthLabel = date => date.toLocaleString('en-us', { month: 'long' });

export const getYear = date => date.toLocaleString('en-us', { year: 'numeric' });

const getNow = () => {
  const now = new Date();
  return {
    date: now,
    month: now.getMonth(),
    year: now.getFullYear()
  };
};

const countDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export const countSpanningWeeks = (dayCount, firstDayOfWeek) => {
  if (firstDayOfWeek !== 1) {
    dayCount += firstDayOfWeek - 1;
  }
  return Math.ceil(dayCount / 7);
};

export const getWeekOfMonth = (dayOfMonth, firstOfMonthDayOfWeek) => {
  if (firstOfMonthDayOfWeek !== 1) {
    dayOfMonth += firstOfMonthDayOfWeek - 1;
  }
  return Math.ceil(dayOfMonth / 7);
};

export const getDaysInMonth = (month, year) => {
  const now = getNow();
  if (!month) month = now.month;
  if (!year) year = now.year;

  const daysCount = countDaysInMonth(month, year);
  const days = [];
  for (let day = 1; day <= daysCount; day++) {
    const date = new Date(year, month, day);
    days.push({
      date,
      dayOfMonth: day,
      dayOfWeek: date.getDay() + 1,
      dayOfWeekLabel: date.toLocaleString('en-us', { weekday: 'long' })
    });
  }
  const daysWithWeekNumber = days.map(d => ({
    ...d,
    weekOfMonth: getWeekOfMonth(d.dayOfMonth, days[0].dayOfWeek)
  }));
  return daysWithWeekNumber;
};
