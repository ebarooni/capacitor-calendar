import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getSelectCalendarsMultiple } from '../utils/dom.js';
import { calendarToSelectItem, populateResultSelect } from '../utils/result-selects.js';

export function registerSelectCalendarsWithPrompt() {
  document.querySelector('#select-calendars-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.selectCalendarsWithPrompt({
      multiple: getSelectCalendarsMultiple(),
    });
    populateResultSelect('#calendar-results-select', result.result.map(calendarToSelectItem));
    console.log('#selectCalendarsWithPrompt', result);
  });
}
