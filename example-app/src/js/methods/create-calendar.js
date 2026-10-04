import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getInputValue } from '../utils/dom.js';
import { setCalendarId } from '../utils/ids.js';

export function registerCreateCalendar() {
  document.querySelector('#create-calendar').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createCalendar({
      accountName: 'plugin@example.com',
      ...optionalColorFromSelect('#create-calendar-color-select'),
      ownerAccount: 'plugin@example.com',
      title: getInputValue('#create-calendar-title-input', 'Plugin Test Calendar'),
    });

    setCalendarId(result.id);
    console.log('#createCalendar', result);
  });
}
