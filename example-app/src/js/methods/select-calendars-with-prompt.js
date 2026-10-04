import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getSelectCalendarsMultiple } from '../utils/dom.js';

export function registerSelectCalendarsWithPrompt() {
  document.querySelector('#select-calendars-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.selectCalendarsWithPrompt({
      multiple: getSelectCalendarsMultiple(),
    });
    console.log('#selectCalendarsWithPrompt', result);
  });
}
