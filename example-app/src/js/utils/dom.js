import { EventSpan } from '@ebarooni/capacitor-calendar';

/** Append a method's Options-tab accordion markup into the shared host. */
export function injectMethodOptions(html) {
  document.querySelector('#options-accordion-group').insertAdjacentHTML('beforeend', html);
}

export function getInputValue(selector, fallback = '') {
  const element = document.querySelector(selector);
  const value = element?.value?.trim();
  return value || fallback;
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
