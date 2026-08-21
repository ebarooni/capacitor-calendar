import { CapacitorCalendar, EventAvailability, EventSpan } from '@ebarooni/capacitor-calendar';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#check-all-permissions').addEventListener('click', async () => {
    const result = await CapacitorCalendar.checkAllPermissions();
    console.log('#checkAllPermissions', result);
  });

  document.querySelector('#create-event').addEventListener('click', async () => {
    const { result: calendars } = await CapacitorCalendar.listCalendars();
    const startDate = Date.now();
    const endDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;

    const result = await CapacitorCalendar.createEvent({
      alerts: [-1440, -60, 30],
      attendees: [{ email: 'guest@example.com', name: 'Alex Guest' }],
      availability: EventAvailability.BUSY,
      calendarId: pickNonHolidayCalendar(calendars)?.id,
      color: '#6750A4',
      commit: true,
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate,
      isAllDay: false,
      location: 'Conference Room A',
      organizer: 'organizer@example.com',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'daily',
        interval: 2,
      },
      startDate,
      title: 'Recurring standup',
      url: 'https://example.com/standup',
    });

    getEventIdInput().value = result.id;
    console.log('#createEvent', result);
  });

  document.querySelector('#create-event-with-prompt').addEventListener('click', async () => {
    const { result: calendars } = await CapacitorCalendar.listCalendars();
    const startDate = Date.now() + 24 * 60 * 60 * 1000;
    const endDate = startDate + 60 * 60 * 1000;

    const result = await CapacitorCalendar.createEventWithPrompt({
      alerts: [-1440, -60, 30],
      availability: EventAvailability.BUSY,
      calendarId: pickNonHolidayCalendar(calendars)?.id,
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate,
      invitees: ['guest@example.com', 'teammate@example.com'],
      isAllDay: false,
      location: 'Office',
      recurrence: {
        count: 4,
        frequency: 'weekly',
        interval: 1,
      },
      startDate,
      title: 'Planning session',
      url: 'https://example.com/planning',
    });

    if (result.id) {
      getEventIdInput().value = result.id;
    }
    console.log('#createEventWithPrompt', result);
  });

  document.querySelector('#create-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createRemindersList({
      color: 'orange',
      title: 'Groceries list',
    });

    getRemindersListIdInput().value = result.id;
    console.log('#createRemindersList', result);
  });

  document.querySelector('#delete-event').addEventListener('click', async () => {
    await CapacitorCalendar.deleteEvent({
      id: getEventIdInput().value,
      instanceDate: getEventInstanceDate(),
      span: getEventSpan(),
    });
  });

  document.querySelector('#delete-event-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventWithPrompt({
      id: getEventIdInput().value,
      instanceDate: getEventInstanceDate(),
      message: 'Are you sure you want to delete this event?',
      span: getEventSpan(),
      title: 'Delete event',
    });
    console.log('#deleteEventWithPrompt', result);
  });

  document.querySelector('#delete-events-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventsById({
      ids: [getEventIdInput().value],
      span: getEventSpan(),
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
      getEventInstanceDateInput().value = String(event.startDate);
    }
  });

  document.querySelector('#open-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.openCalendar({ date: Date.now() });
    console.log('#openCalendar');
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

function getEventInstanceDate() {
  const raw = getEventInstanceDateInput().value.trim();
  if (!raw) {
    return undefined;
  }
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function getEventInstanceDateInput() {
  return document.querySelector('#event-instance-date-input');
}

function getEventSpan() {
  const value = Number(document.querySelector('#event-span-select').value);
  return value === EventSpan.THIS_AND_FUTURE_EVENTS ? EventSpan.THIS_AND_FUTURE_EVENTS : EventSpan.THIS_EVENT;
}

function getRemindersListIdInput() {
  return document.querySelector('#reminders-list-id-input');
}

function pickNonHolidayCalendar(calendars) {
  return calendars.find((calendar) => {
    const labels = [calendar.internalTitle, calendar.title].filter(Boolean).join(' ').toLowerCase();
    return !/\bholidays?\b/.test(labels);
  });
}
