import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerCheckAllPermissions() {
  document.querySelector('#check-all-permissions').addEventListener('click', async () => {
    const result = await CapacitorCalendar.checkAllPermissions();
    console.log('#checkAllPermissions', result);
  });
}
