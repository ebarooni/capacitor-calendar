import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getInputValue, injectMethodOptions } from '../utils/dom.js';
import { getCalendarId } from '../utils/ids.js';
import optionsHtml from './modify-calendar.options.html?raw';

export function registerModifyCalendar() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#modify-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.modifyCalendar({
      ...optionalColorFromSelect('#modify-calendar-color-select'),
      id: getCalendarId(),
      title: getInputValue('#modify-calendar-title-input', 'Updated Plugin Test Calendar'),
    });
    console.log('#modifyCalendar');
  });
}
