import {
  getCalendarIdInput,
  getEventIdInput,
  getEventInstanceDateInput,
  getReminderIdInput,
  getRemindersListIdInput,
} from './dom.js';

export function setEventId(id) {
  if (id == null || id === '') {
    return;
  }
  getEventIdInput().value = String(id);
}

export function setCalendarId(id) {
  if (id == null || id === '') {
    return;
  }
  getCalendarIdInput().value = String(id);
}

export function setReminderId(id) {
  if (id == null || id === '') {
    return;
  }
  getReminderIdInput().value = String(id);
}

export function setRemindersListId(id) {
  if (id == null || id === '') {
    return;
  }
  getRemindersListIdInput().value = String(id);
}

export function setEventInstanceDate(startDateMs) {
  if (startDateMs == null || !Number.isFinite(Number(startDateMs))) {
    return;
  }
  getEventInstanceDateInput().value = String(startDateMs);
}
