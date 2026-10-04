export function pickNonHolidayCalendar(calendars) {
  return calendars.find((calendar) => {
    const labels = [calendar.internalTitle, calendar.title].filter(Boolean).join(' ').toLowerCase();
    return !/\bholidays?\b/.test(labels);
  });
}
