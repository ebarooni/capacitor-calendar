import { CapacitorCalendar, EventSpan } from '@ebarooni/capacitor-calendar';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#check-all-permissions').addEventListener('click', async () => {
    const result = await CapacitorCalendar.checkAllPermissions();
    console.log('#checkAllPermissions', result);
  });

  document.querySelector('#create-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createRemindersList({
      title: 'Groceries list',
      color: 'orange',
    });

    getRemindersListIdInput().value = result.id;
    console.log('#createRemindersList', result);
  });

  document.querySelector('#delete-event').addEventListener('click', async () => {
    await CapacitorCalendar.deleteEvent({
      id: getEventIdInput().value,
      span: EventSpan.THIS_AND_FUTURE_EVENTS,
    });
  });

  document.querySelector('#delete-event-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventWithPrompt({
      id: getEventIdInput().value,
      message: 'Are you sure you want to delete this event?',
      span: EventSpan.THIS_EVENT,
      title: 'Delete event',
    });
    console.log('#deleteEventWithPrompt', result);
  });

  document.querySelector('#delete-events-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventsById({
      ids: [getEventIdInput().value],
      span: EventSpan.THIS_EVENT,
    });
    console.log('#deleteEventsById', result);
  });

  document.querySelector('#delete-reminders-list').addEventListener('click', async () => {
    const id = getRemindersListIdInput().value;
    await CapacitorCalendar.deleteRemindersList({ id });
  });

  document.querySelector('#get-reminders-lists').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getRemindersLists();
    console.log('#getRemindersLists', result);
  });

  document.querySelector('#list-calendars').addEventListener('click', async () => {
    const result = await CapacitorCalendar.listCalendars();
    console.log('#listCalendars', result);
  });

  document.querySelector('#list-events-in-range').addEventListener('click', async () => {
    const now = new Date();
    const from = new Date();
    from.setMonth(now.getMonth() - 1);
    const to = new Date();
    to.setMonth(now.getMonth() + 1);

    const result = await CapacitorCalendar.listEventsInRange({
      from: from.getTime(),
      to: to.getTime(),
    });
    console.log('#listEventsInRange', result);

    const event = result.result[0];
    if (event) {
      getEventIdInput().value = event.id;
    }
  });

  document.querySelector('#request-full-calendar-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullCalendarAccess();
    console.log('#requestFullCalendarAccess', result);
  });

  document.querySelector('#request-full-reminders-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullRemindersAccess();
    console.log('#requestFullRemindersAccess', result);
  });

  document.querySelector('#update-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.updateRemindersList({
      color: 'indigo',
      id: getRemindersListIdInput().value,
      title: 'Updated Groceries list',
    });

    getRemindersListIdInput().value = result.id;
    console.log('#updateRemindersList', result);
  });
});

function getEventIdInput() {
  return document.querySelector('#event-id-input');
}

function getRemindersListIdInput() {
  return document.querySelector('#reminders-list-id-input');
}
