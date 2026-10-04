import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getSelectCalendarsMultiple } from '../utils/dom.js';
import { calendarToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerSelectCalendarsWithPrompt() {
  document.querySelector('#select-calendars-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.selectCalendarsWithPrompt({
      multiple: getSelectCalendarsMultiple(),
    });
    setIdFieldOptions('calendar', result.result.map(calendarToSelectItem));
    console.log('#selectCalendarsWithPrompt', result);
  });
}
