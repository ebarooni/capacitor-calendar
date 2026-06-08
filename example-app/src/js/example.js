import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#check-all-permissions').addEventListener('click', async () => {
    const result = await CapacitorCalendar.checkAllPermissions();
    console.log('#checkAllPermissions', result);
  });

  document.querySelector('#list-calendars').addEventListener('click', async () => {
    const result = await CapacitorCalendar.listCalendars();
    console.log('#listCalendars', result);
  });

  document.querySelector('#request-full-calendar-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullCalendarAccess();
    console.log('#requestFullCalendarAccess', result);
  });
});
