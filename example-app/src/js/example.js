import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

window.testEcho = () => {
  CapacitorCalendar.listCalendars().then((calendars) => {
    console.log(calendars);
  });
};
