export const timeAgo = (targetDate) => {
  if (isNaN(targetDate.getDate())) {
    return '';
  }

  const currentDate = new Date();
  const timeDiff = currentDate.valueOf() - targetDate.valueOf();
  const millisPerSecond = 1000;
  const millisPerMinute = 60 * millisPerSecond;
  const millisPerHour = 60 * millisPerMinute;
  const millisPerDay = 24 * millisPerHour;
  const millisPerWeek = 7 * millisPerDay;
  const millisPerMonth = 30 * millisPerDay;
  const millisPerYear = 365 * millisPerDay;

  let interval;
  if (timeDiff < millisPerMinute) {
    interval = Math.floor(timeDiff / millisPerSecond);

    return `${interval} ${interval === 1 ? 'second' : 'seconds'} ago`;
  } else if (timeDiff < millisPerHour) {
    interval = Math.floor(timeDiff / millisPerMinute);

    return `${interval} ${interval === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDiff < millisPerDay) {
    interval = Math.floor(timeDiff / millisPerHour);

    return `${interval} ${interval === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDiff < millisPerWeek) {
    interval = Math.floor(timeDiff / millisPerDay);

    return `${interval} ${interval === 1 ? 'day' : 'days'} ago`;
  } else if (timeDiff < millisPerMonth) {
    interval = Math.floor(timeDiff / millisPerWeek);

    return `${interval} ${interval === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDiff < millisPerYear) {
    interval = Math.floor(timeDiff / millisPerMonth);

    return `${interval} ${interval === 1 ? 'month' : 'months'} ago`;
  } else {
    interval = Math.floor(timeDiff / millisPerYear);

    return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
  }
};

export const timeToDate = (date, time) => {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
};

export const getDayDifference = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInDays = Math.round(Math.abs((end - start) / oneDay));

  return diffInDays;
};

export const getWeekDates = (startDate) => {
  const weekDates = [];
  const currentDate = new Date(startDate);

  const currentDay = currentDate.getDay();
  currentDate.setDate(currentDate.getDate() - currentDay);

  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
};

export const compareDatesByDatePart = (date1, date2) => {
  // Convert both dates to strings in "YYYY-MM-DD" format
  const dateString1 = date1.toISOString().split('T')[0];
  const dateString2 = date2.toISOString().split('T')[0];

  // Compare the date strings
  return dateString1.localeCompare(dateString2);
}