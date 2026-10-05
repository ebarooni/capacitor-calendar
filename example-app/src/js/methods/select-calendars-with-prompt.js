import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getSelectCalendarsMultiple, injectMethodOptions } from '../utils/dom.js';
import { calendarToSelectItem, setIdFieldOptions } from '../utils/ids.js';
import optionsHtml from './select-calendars-with-prompt.options.html?raw';

export function registerSelectCalendarsWithPrompt() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#select-calendars-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.selectCalendarsWithPrompt({
      multiple: getSelectCalendarsMultiple(),
    });
    setIdFieldOptions('calendar', result.result.map(calendarToSelectItem));
    console.log('#selectCalendarsWithPrompt', result);
  });
}
