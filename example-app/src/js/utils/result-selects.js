import { setCalendarId, setEventId, setEventInstanceDate, setReminderId, setRemindersListId } from './ids.js';

const EMPTY_LABEL = 'Run a list method first';

/** @type {Record<string, (item: object) => void>} */
const SELECT_PICK_HANDLERS = {
  '#calendar-results-select': (item) => {
    setCalendarId(item.id);
  },
  '#event-results-select': (item) => {
    setEventId(item.id);
    if (item.startDate != null) {
      setEventInstanceDate(item.startDate);
    }
  },
  '#reminder-results-select': (item) => {
    setReminderId(item.id);
    if (item.listId) {
      setRemindersListId(item.listId);
    }
  },
  '#reminders-list-results-select': (item) => {
    setRemindersListId(item.id);
  },
};

export function initResultSelects() {
  for (const selectSelector of Object.keys(SELECT_PICK_HANDLERS)) {
    const select = document.querySelector(selectSelector);
    if (!select) {
      continue;
    }
    select.disabled = true;
    select.innerHTML = '';
    const emptyOption = document.createElement('ion-select-option');
    emptyOption.value = '';
    emptyOption.textContent = EMPTY_LABEL;
    select.appendChild(emptyOption);
    select.value = '';

    select.addEventListener('ionChange', (event) => {
      const id = event.detail.value;
      if (!id) {
        return;
      }
      const items = select._resultItems || [];
      const item = items.find((entry) => entry.id === id);
      if (item) {
        SELECT_PICK_HANDLERS[selectSelector](item);
      }
    });
  }
}

/**
 * Replace options on a results select, store items, select the first, and apply it to the ID field.
 * @param {string} selectSelector
 * @param {{ id: string, label: string, startDate?: number|null, listId?: string|null }[]} items
 */
export function populateResultSelect(selectSelector, items) {
  const select = document.querySelector(selectSelector);
  if (!select) {
    return;
  }

  const usableItems = (items || []).filter((item) => item?.id);
  select._resultItems = usableItems;
  select.innerHTML = '';

  if (usableItems.length === 0) {
    const emptyOption = document.createElement('ion-select-option');
    emptyOption.value = '';
    emptyOption.textContent = EMPTY_LABEL;
    select.appendChild(emptyOption);
    select.value = '';
    select.disabled = true;
    return;
  }

  select.disabled = false;
  for (const item of usableItems) {
    const option = document.createElement('ion-select-option');
    option.value = item.id;
    option.textContent = item.label;
    select.appendChild(option);
  }

  const firstItem = usableItems[0];
  select.value = firstItem.id;
  SELECT_PICK_HANDLERS[selectSelector]?.(firstItem);
}

export function calendarToSelectItem(calendar) {
  const title = calendar.title || calendar.internalTitle || 'Untitled calendar';
  return { id: calendar.id, label: `${title} — ${calendar.id}` };
}

export function eventToSelectItem(event) {
  const title = event.title || 'Untitled event';
  return {
    id: event.id,
    label: `${title} — ${event.id}`,
    startDate: event.startDate ?? null,
  };
}

export function reminderToSelectItem(reminder) {
  const title = reminder.title || 'Untitled reminder';
  return {
    id: reminder.id,
    label: `${title} — ${reminder.id}`,
    listId: reminder.listId || null,
  };
}

export function remindersListToSelectItem(list) {
  const title = list.title || 'Untitled list';
  return { id: list.id, label: `${title} — ${list.id}` };
}
