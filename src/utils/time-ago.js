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
