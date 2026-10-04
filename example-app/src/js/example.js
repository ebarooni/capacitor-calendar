import { Capacitor } from '@capacitor/core';
import { CapacitorCalendar, EventAvailability, EventSpan } from '@ebarooni/capacitor-calendar';

const WEB_SUPPORTED_METHOD_IDS = new Set(['create-event', 'create-event-with-prompt']);

const COLOR_PRESETS = {
  calendar: [
    { value: '', label: 'Omit — do not pass color' },
    { value: 'blue', label: 'Named — blue (valid on iOS)' },
    { value: 'orange', label: 'Named — orange (valid on iOS)' },
    { value: 'indigo', label: 'Named — indigo (valid on iOS)' },
    { value: '#007AFF', label: 'Hex — #007AFF (valid)' },
    { value: '#0000FF', label: 'Hex — #0000FF (valid)' },
    { value: '#FF0000', label: 'Hex — #FF0000 (valid)' },
    { value: '#00FF0080', label: 'Hex — #00FF0080 (valid)' },
    { value: '#0000ff', label: 'Hex lowercase — #0000ff (valid)' },
    { value: '#6750A4', label: 'Hex — #6750A4 (valid)' },
    { value: 'navy', label: 'Named — navy (invalid)' },
    { value: '0000FF', label: 'Missing # — 0000FF (invalid)' },
    { value: '#F00', label: 'Too short — #F00 (invalid)' },
    { value: '#FF0000FF00', label: 'Too long — #FF0000FF00 (invalid)' },
    { value: '#ZZ0000', label: 'Non-hex — #ZZ0000 (invalid)' },
  ],
  event: [
    { value: '', label: 'Omit — do not pass color' },
    { value: '#007AFF', label: 'Hex — #007AFF (valid)' },
    { value: '#0000FF', label: 'Hex — #0000FF (valid)' },
    { value: '#FF0000', label: 'Hex — #FF0000 (valid)' },
    { value: '#00FF0080', label: 'Hex — #00FF0080 (valid)' },
    { value: '#0000ff', label: 'Hex lowercase — #0000ff (valid)' },
    { value: '#6750A4', label: 'Hex — #6750A4 (valid)' },
    { value: 'blue', label: 'Named — blue (invalid for events)' },
    { value: 'navy', label: 'Named — navy (invalid)' },
    { value: '0000FF', label: 'Missing # — 0000FF (invalid)' },
    { value: '#F00', label: 'Too short — #F00 (invalid)' },
    { value: '#FF0000FF00', label: 'Too long — #FF0000FF00 (invalid)' },
    { value: '#ZZ0000', label: 'Non-hex — #ZZ0000 (invalid)' },
  ],
  list: [
    { value: '', label: 'Omit — do not pass color' },
    { value: 'blue', label: 'Named — blue (valid)' },
    { value: 'orange', label: 'Named — orange (valid)' },
    { value: 'indigo', label: 'Named — indigo (valid)' },
    { value: 'teal', label: 'Named — teal (valid)' },
    { value: '#007AFF', label: 'Hex — #007AFF (valid)' },
    { value: '#FF0000', label: 'Hex — #FF0000 (valid)' },
    { value: '#00FF0080', label: 'Hex — #00FF0080 (valid)' },
    { value: 'navy', label: 'Named — navy (invalid)' },
    { value: '0000FF', label: 'Missing # — 0000FF (invalid)' },
    { value: '#F00', label: 'Too short — #F00 (invalid)' },
    { value: '#ZZ0000', label: 'Non-hex — #ZZ0000 (invalid)' },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  const isWeb = Capacitor.getPlatform() === 'web';
  if (isWeb) {
    applyWebMethodVisibility();
  }

  const tabs = document.querySelector('ion-tabs');
  if (tabs && typeof tabs.select === 'function') {
    void tabs.select('methods');
  }

  initColorSelects();

  document.querySelector('#check-all-permissions').addEventListener('click', async () => {
    const result = await CapacitorCalendar.checkAllPermissions();
    console.log('#checkAllPermissions', result);
  });

  document.querySelector('#create-calendar').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createCalendar({
      accountName: 'plugin@example.com',
      ...optionalColorFromSelect('#create-calendar-color-select'),
      ownerAccount: 'plugin@example.com',
      title: getInputValue('#create-calendar-title-input', 'Plugin Test Calendar'),
    });

    getCalendarIdInput().value = result.id;
    console.log('#createCalendar', result);
  });

  document.querySelector('#create-event').addEventListener('click', async () => {
    const startDate = Date.now();
    const endDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;
    const options = {
      alerts: [-1440, -60, 30],
      attendees: [{ email: 'guest@example.com', name: 'Alex Guest' }],
      availability: EventAvailability.BUSY,
      ...optionalColorFromSelect('#create-event-color-select'),
      commit: true,
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate,
      icsFileName: 'recurring-standup.ics',
      isAllDay: false,
      location: 'Conference Room A',
      organizer: 'organizer@example.com',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'daily',
        interval: 2,
      },
      startDate,
      title: getInputValue('#create-event-title-input', 'Recurring standup'),
      url: 'https://example.com/standup',
    };

    // listCalendars is not implemented on web; calendarId is ignored there anyway
    if (!isWeb) {
      const { result: calendars } = await CapacitorCalendar.listCalendars();
      options.calendarId = pickNonHolidayCalendar(calendars)?.id;
    }

    const result = await CapacitorCalendar.createEvent({
      ...options,
      autoDownloadIcsFile: true,
      icsFileName: 'recurring-standup.ics',
    });

    if (result.id) {
      getEventIdInput().value = result.id;
    }
    if (result.ics) {
      await presentToast(`Downloaded ${result.ics.name} — open it in your calendar app.`);
    }
    console.log('#createEvent', result);
  });

  document.querySelector('#create-event-with-prompt').addEventListener('click', async () => {
    const startDate = Date.now() + 24 * 60 * 60 * 1000;
    const endDate = startDate + 60 * 60 * 1000;
    const promptOptions = {
      alerts: [-1440, -60, 30],
      availability: EventAvailability.BUSY,
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
      title: getInputValue('#create-event-with-prompt-title-input', 'Planning session'),
      url: 'https://example.com/planning',
    };

    // listCalendars is not implemented on web; calendarId is ignored there anyway
    if (!isWeb) {
      const { result: calendars } = await CapacitorCalendar.listCalendars();
      promptOptions.calendarId = pickNonHolidayCalendar(calendars)?.id;
    }

    const result = await CapacitorCalendar.createEventWithPrompt(promptOptions);

    if (result.id) {
      getEventIdInput().value = result.id;
    }
    if (result.ics) {
      await presentToast(`Downloaded ${result.ics.name} — open it in your calendar app.`);
    } else if (isWeb) {
      await presentToast('Create event cancelled.');
    }
    console.log('#createEventWithPrompt', result);
  });

  document.querySelector('#create-reminder').addEventListener('click', async () => {
    const startDate = Date.now();
    const dueDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;
    const listId = getRemindersListIdInput().value.trim();

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

    getReminderIdInput().value = result.id;
    console.log('#createReminder', result);
  });

  document.querySelector('#create-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createRemindersList({
      ...optionalColorFromSelect('#create-reminders-list-color-select'),
      title: getInputValue('#create-reminders-list-title-input', 'Groceries list'),
    });

    getRemindersListIdInput().value = result.id;
    console.log('#createRemindersList', result);
  });

  document.querySelector('#delete-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.deleteCalendar({ id: getCalendarIdInput().value });
    console.log('#deleteCalendar');
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

  document.querySelector('#get-default-calendar').addEventListener('click', async () => {
    const withoutFallback = await CapacitorCalendar.getDefaultCalendar();
    console.log('#getDefaultCalendar (useFallbackCalendar: false)', withoutFallback);

    const withFallback = await CapacitorCalendar.getDefaultCalendar({ useFallbackCalendar: true });
    console.log('#getDefaultCalendar (useFallbackCalendar: true)', withFallback);

    const result = withFallback.result ?? withoutFallback.result;
    if (result?.id) {
      getCalendarIdInput().value = result.id;
    }
  });

  document.querySelector('#get-reminder-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getReminderById({
      id: getReminderIdInput().value,
    });
    console.log('#getReminderById', result);
  });

  document.querySelector('#get-reminders-from-lists').addEventListener('click', async () => {
    let listIds = [getRemindersListIdInput().value.trim()].filter(Boolean);
    if (listIds.length === 0) {
      const { result: lists } = await CapacitorCalendar.getRemindersLists();
      listIds = lists.map((list) => list.id).filter(Boolean);
    }

    const result = await CapacitorCalendar.getRemindersFromLists({ listIds });
    const reminder = result.result[0];
    if (reminder?.id) {
      getReminderIdInput().value = reminder.id;
    }
    console.log('#getRemindersFromLists', result);
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
    const from = new Date();
    const to = new Date();
    to.setMonth(from.getMonth() + 1);

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

  document.querySelector('#modify-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.modifyCalendar({
      ...optionalColorFromSelect('#modify-calendar-color-select'),
      id: getCalendarIdInput().value,
      title: getInputValue('#modify-calendar-title-input', 'Updated Plugin Test Calendar'),
    });
    console.log('#modifyCalendar');
  });

  document.querySelector('#modify-reminder').addEventListener('click', async () => {
    const recurrenceEnd = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await CapacitorCalendar.modifyReminder({
      id: getReminderIdInput().value,
      notes: 'Updated with @ebarooni/capacitor-calendar',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'daily',
        interval: 2,
      },
      title: getInputValue('#modify-reminder-title-input', 'Updated weekly grocery check'),
    });
    console.log('#modifyReminder');
  });

  document.querySelector('#open-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.openCalendar({ date: Date.now() });
    console.log('#openCalendar');
  });

  document.querySelector('#open-reminders').addEventListener('click', async () => {
    await CapacitorCalendar.openReminders();
    console.log('#openReminders');
  });

  document.querySelector('#request-full-calendar-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullCalendarAccess();
    console.log('#requestFullCalendarAccess', result);
  });

  document.querySelector('#request-full-reminders-access').addEventListener('click', async () => {
    const result = await CapacitorCalendar.requestFullRemindersAccess();
    console.log('#requestFullRemindersAccess', result);
  });

  document.querySelector('#select-calendars-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.selectCalendarsWithPrompt({
      multiple: getSelectCalendarsMultiple(),
    });
    console.log('#selectCalendarsWithPrompt', result);
  });

  document.querySelector('#update-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.updateRemindersList({
      ...optionalColorFromSelect('#update-reminders-list-color-select'),
      id: getRemindersListIdInput().value,
      title: getInputValue('#update-reminders-list-title-input', 'Updated Groceries list'),
    });

    getRemindersListIdInput().value = result.id;
    console.log('#updateRemindersList', result);
  });
});

function initColorSelects() {
  document.querySelectorAll('ion-select.color-select').forEach((select) => {
    const presetName = select.dataset.colorPreset;
    const options = COLOR_PRESETS[presetName];
    if (!options) {
      return;
    }

    select.innerHTML = '';
    for (const option of options) {
      const element = document.createElement('ion-select-option');
      element.value = option.value;
      element.textContent = option.label;
      select.appendChild(element);
    }

    const swatchId = select.dataset.swatch;
    const omitTitle = select.dataset.omitTitle || 'Color omitted';
    if (swatchId) {
      updateColorSwatch(`#${swatchId}`, select.value, omitTitle);
      select.addEventListener('ionChange', (event) => {
        updateColorSwatch(`#${swatchId}`, event.detail.value, omitTitle);
      });
    }
  });
}

function getInputValue(selector, fallback = '') {
  const element = document.querySelector(selector);
  const value = element?.value?.trim();
  return value || fallback;
}

/** Returns `{ color }` only when the select has a value; empty means omit the field. */
function optionalColorFromSelect(selector) {
  const color = document.querySelector(selector)?.value;
  return color ? { color } : {};
}

function getCalendarIdInput() {
  return document.querySelector('#calendar-id-input');
}

function updateColorSwatch(swatchSelector, color, omittedTitle) {
  const swatch = document.querySelector(swatchSelector);
  if (!swatch) {
    return;
  }
  if (!color) {
    swatch.style.background = '';
    swatch.title = omittedTitle;
    return;
  }
  const preview = cssColorPreview(color);
  if (preview) {
    swatch.style.background = preview;
    swatch.title = color;
  } else {
    swatch.style.background = '';
    swatch.title = `${color} (no CSS preview)`;
  }
}

/**
 * Map a select value to a CSS color for the swatch.
 * Supports hex (#RRGGBB / #RRGGBBAA) and known system named colors.
 */
function cssColorPreview(color) {
  if (typeof color !== 'string') {
    return null;
  }
  const namedPreview = {
    blue: '#007AFF',
    brown: '#A2845E',
    gray: '#8E8E93',
    green: '#34C759',
    indigo: '#5856D6',
    orange: '#FF9500',
    pink: '#FF2D55',
    purple: '#AF52DE',
    red: '#FF3B30',
    teal: '#5AC8FA',
    yellow: '#FFCC00',
  };
  if (namedPreview[color]) {
    return namedPreview[color];
  }
  if (!color.startsWith('#')) {
    return null;
  }
  const digits = color.slice(1);
  if (/^[0-9a-fA-F]{6}$/.test(digits)) {
    return `#${digits}`;
  }
  if (/^[0-9a-fA-F]{8}$/.test(digits)) {
    const r = digits.slice(0, 2);
    const g = digits.slice(2, 4);
    const b = digits.slice(4, 6);
    const a = Number.parseInt(digits.slice(6, 8), 16) / 255;
    return `rgba(${Number.parseInt(r, 16)}, ${Number.parseInt(g, 16)}, ${Number.parseInt(b, 16)}, ${a})`;
  }
  return null;
}

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

function getReminderIdInput() {
  return document.querySelector('#reminder-id-input');
}

function getRemindersListIdInput() {
  return document.querySelector('#reminders-list-id-input');
}

function getSelectCalendarsMultiple() {
  return document.querySelector('#select-calendars-multiple-select').value === 'true';
}

function pickNonHolidayCalendar(calendars) {
  return calendars.find((calendar) => {
    const labels = [calendar.internalTitle, calendar.title].filter(Boolean).join(' ').toLowerCase();
    return !/\bholidays?\b/.test(labels);
  });
}

function applyWebMethodVisibility() {
  const note = document.querySelector('#web-platform-note');
  if (note) {
    note.hidden = false;
  }

  document.querySelectorAll('#methods-list ion-button').forEach((button) => {
    const id = button.id;
    if (!id) {
      return;
    }
    if (WEB_SUPPORTED_METHOD_IDS.has(id)) {
      button.disabled = false;
      return;
    }
    button.disabled = true;
    button.setAttribute('title', 'Not available on web (export-only)');
  });
}

async function presentToast(message) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = 3500;
  toast.position = 'bottom';
  document.body.appendChild(toast);
  await toast.present();
}
