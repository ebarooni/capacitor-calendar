import { EventSpan } from '@ebarooni/capacitor-calendar';

export function getInputValue(selector, fallback = '') {
  const element = document.querySelector(selector);
  const value = element?.value?.trim();
  return value || fallback;
}

export function getEventIdInput() {
  return document.querySelector('#event-id-input');
}

export function getCalendarIdInput() {
  return document.querySelector('#calendar-id-input');
}

export function getReminderIdInput() {
  return document.querySelector('#reminder-id-input');
}

export function getRemindersListIdInput() {
  return document.querySelector('#reminders-list-id-input');
}

export function getEventInstanceDateInput() {
  return document.querySelector('#event-instance-date-input');
}

export function getEventInstanceDate() {
  const raw = getEventInstanceDateInput().value.trim();
  if (!raw) {
    return undefined;
  }
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

export function getEventSpan() {
  const value = Number(document.querySelector('#event-span-select').value);
  return value === EventSpan.THIS_AND_FUTURE_EVENTS ? EventSpan.THIS_AND_FUTURE_EVENTS : EventSpan.THIS_EVENT;
}

export function getSelectCalendarsMultiple() {
  return document.querySelector('#select-calendars-multiple-select').value === 'true';
}
