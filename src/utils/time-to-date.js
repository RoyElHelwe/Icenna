export const timeToDate = (date, time) => {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
};
