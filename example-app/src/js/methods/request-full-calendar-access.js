import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerRequestFullCalendarAccess() {
  document.querySelector('#request-full-calendar-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullCalendarAccess();
    console.log('#requestFullCalendarAccess', result);
  });
}
