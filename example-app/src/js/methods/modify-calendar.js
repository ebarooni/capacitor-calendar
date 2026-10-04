import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getCalendarIdInput, getInputValue } from '../utils/dom.js';

export function registerModifyCalendar() {
  document.querySelector('#modify-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.modifyCalendar({
      ...optionalColorFromSelect('#modify-calendar-color-select'),
      id: getCalendarIdInput().value,
      title: getInputValue('#modify-calendar-title-input', 'Updated Plugin Test Calendar'),
    });
    console.log('#modifyCalendar');
  });
}
