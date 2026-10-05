import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getInputValue, injectMethodOptions } from '../utils/dom.js';
import { getRemindersListId, setReminderId } from '../utils/ids.js';
import optionsHtml from './create-reminder.options.html?raw';

export function registerCreateReminder() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#create-reminder').addEventListener('click', async () => {
    const startDate = Date.now();
    const dueDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;
    const listId = getRemindersListId();

    const result = await CapacitorCalendar.createReminder({
      alerts: [-60],
      dueDate,
      ...(listId ? { listId } : {}),
      notes: 'Created with @ebarooni/capacitor-calendar',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'weekly',
        interval: 1,
      },
      startDate,
      title: getInputValue('#create-reminder-title-input', 'Weekly grocery check'),
    });

    setReminderId(result.id);
    console.log('#createReminder', result);
  });
}
