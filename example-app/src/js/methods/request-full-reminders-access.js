import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerRequestFullRemindersAccess() {
  document.querySelector('#request-full-reminders-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullRemindersAccess();
    console.log('#requestFullRemindersAccess', result);
  });
}
