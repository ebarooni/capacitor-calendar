import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getCalendarIdInput } from '../utils/dom.js';

export function registerGetDefaultCalendar() {
  document.querySelector('#get-default-calendar').addEventListener('click', async () => {
    const withoutFallback = await CapacitorCalendar.getDefaultCalendar();
    console.log('#getDefaultCalendar (useFallbackCalendar: false)', withoutFallback);

    const withFallback = await CapacitorCalendar.getDefaultCalendar({ useFallbackCalendar: true });
    console.log('#getDefaultCalendar (useFallbackCalendar: true)', withFallback);

    const result = withFallback.result ?? withoutFallback.result;
    if (result?.id) {
      getCalendarIdInput().value = result.id;
    }
  });
}
