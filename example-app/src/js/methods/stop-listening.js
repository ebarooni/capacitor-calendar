import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerStopListening() {
  document.querySelector('#stop-listening').addEventListener('click', async () => {
    await CapacitorCalendar.stopListening();
    await CapacitorCalendar.removeAllListeners();
    console.log('#stopListening');
  });
}
