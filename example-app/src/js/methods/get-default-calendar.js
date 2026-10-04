import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { calendarToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerGetDefaultCalendar() {
  document.querySelector('#get-default-calendar').addEventListener('click', async () => {
    const withoutFallback = await CapacitorCalendar.getDefaultCalendar();
    console.log('#getDefaultCalendar (useFallbackCalendar: false)', withoutFallback);

    const withFallback = await CapacitorCalendar.getDefaultCalendar({ useFallbackCalendar: true });
    console.log('#getDefaultCalendar (useFallbackCalendar: true)', withFallback);

    const calendar = withFallback.result ?? withoutFallback.result;
    if (calendar?.id) {
      setIdFieldOptions('calendar', [calendarToSelectItem(calendar)]);
    }
  });
}
