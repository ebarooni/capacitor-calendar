import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerOpenReminders() {
  document.querySelector('#open-reminders').addEventListener('click', async () => {
    await CapacitorCalendar.openReminders();
    console.log('#openReminders');
  });
}
