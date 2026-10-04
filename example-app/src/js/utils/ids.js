import { getEventInstanceDateInput } from './dom.js';

const CUSTOM_KEY = '__custom__';

/**
 * @typedef {{ key: string, id: string, label: string, startDate?: number|null, listId?: string|null }} IdOption
 * @typedef {'event' | 'calendar' | 'reminder' | 'remindersList'} IdFieldName
 */

/** @type {Record<IdFieldName, { selector: string, items: IdOption[], selectedKey: string, onPick?: (item: IdOption) => void }>} */
const FIELDS = {
  event: {
    selector: '#event-id-select',
    items: [],
    selectedKey: '',
    onPick: (item) => {
      if (item.startDate != null) {
        setEventInstanceDate(item.startDate);
      }
    },
  },
  calendar: {
    selector: '#calendar-id-select',
    items: [],
    selectedKey: '',
  },
  reminder: {
    selector: '#reminder-id-select',
    items: [],
    selectedKey: '',
    onPick: (item) => {
      if (item.listId) {
        setRemindersListId(item.listId);
      }
    },
  },
  remindersList: {
    selector: '#reminders-list-id-select',
    items: [],
    selectedKey: '',
  },
};

export function initIdFields() {
  for (const fieldName of Object.keys(FIELDS)) {
    const field = FIELDS[/** @type {IdFieldName} */ (fieldName)];
    const select = document.querySelector(field.selector);
    if (!select) {
      continue;
    }

    renderField(/** @type {IdFieldName} */ (fieldName));

    select.addEventListener('ionChange', async (event) => {
      const key = event.detail.value;
      if (key === CUSTOM_KEY) {
        const customId = await promptCustomId(/** @type {IdFieldName} */ (fieldName));
        if (customId) {
          upsertAndSelect(/** @type {IdFieldName} */ (fieldName), {
            key: customId,
            id: customId,
            label: `Custom — ${customId}`,
          });
        } else {
          select.value = field.selectedKey || '';
        }
        return;
      }

      if (!key) {
        field.selectedKey = '';
        return;
      }

      const item = field.items.find((entry) => entry.key === key);
      if (!item) {
        return;
      }
      field.selectedKey = key;
      field.onPick?.(item);
    });
  }
}

/**
 * Replace options from a list/get/create result set and select the first item.
 * An empty list leaves the current options and selection unchanged.
 * @param {IdFieldName} fieldName
 * @param {IdOption[]} items
 */
export function setIdFieldOptions(fieldName, items) {
  const field = FIELDS[fieldName];
  const usableItems = (items || []).filter((item) => item?.key && item?.id);
  if (usableItems.length === 0) {
    return;
  }

  field.items = usableItems;
  field.selectedKey = usableItems[0].key;
  renderField(fieldName);
  field.onPick?.(usableItems[0]);
}

export function getEventId() {
  return getSelectedId('event');
}

export function getCalendarId() {
  return getSelectedId('calendar');
}

export function getReminderId() {
  return getSelectedId('reminder');
}

export function getRemindersListId() {
  return getSelectedId('remindersList');
}

export function setEventId(id) {
  selectCreatedId('event', id);
}

export function setCalendarId(id) {
  selectCreatedId('calendar', id);
}

export function setReminderId(id) {
  selectCreatedId('reminder', id);
}

export function setRemindersListId(id) {
  selectCreatedId('remindersList', id);
}

export function setEventInstanceDate(startDateMs) {
  if (startDateMs == null || !Number.isFinite(Number(startDateMs))) {
    return;
  }
  getEventInstanceDateInput().value = String(startDateMs);
}

export function calendarToSelectItem(calendar) {
  const title = calendar.title || calendar.internalTitle || 'Untitled calendar';
  return {
    key: calendar.id,
    id: calendar.id,
    label: `${title} — ${calendar.id}`,
  };
}

export function eventToSelectItem(event) {
  const title = event.title || 'Untitled event';
  const startDate = event.startDate ?? null;
  const endDate = event.endDate ?? null;
  const key = `${event.id}|${startDate ?? ''}`;
  return {
    key,
    id: event.id,
    label: `${title} — ${formatEventRangeLabel(startDate, endDate)}`,
    startDate,
  };
}

export function reminderToSelectItem(reminder) {
  const title = reminder.title || 'Untitled reminder';
  return {
    key: reminder.id,
    id: reminder.id,
    label: `${title} — ${reminder.id}`,
    listId: reminder.listId || null,
  };
}

export function remindersListToSelectItem(list) {
  const title = list.title || 'Untitled list';
  return {
    key: list.id,
    id: list.id,
    label: `${title} — ${list.id}`,
  };
}

/**
 * @param {IdFieldName} fieldName
 * @returns {string}
 */
function getSelectedId(fieldName) {
  const field = FIELDS[fieldName];
  const item = field.items.find((entry) => entry.key === field.selectedKey);
  return item?.id || '';
}

/**
 * @param {IdFieldName} fieldName
 * @param {string|null|undefined} id
 */
function selectCreatedId(fieldName, id) {
  if (id == null || id === '') {
    return;
  }
  const stringId = String(id);
  upsertAndSelect(fieldName, {
    key: stringId,
    id: stringId,
    label: stringId,
  });
}

/**
 * @param {IdFieldName} fieldName
 * @param {IdOption} item
 */
function upsertAndSelect(fieldName, item) {
  const field = FIELDS[fieldName];
  const existingIndex = field.items.findIndex((entry) => entry.key === item.key);
  if (existingIndex >= 0) {
    field.items[existingIndex] = { ...field.items[existingIndex], ...item };
  } else {
    field.items = [item, ...field.items];
  }
  field.selectedKey = item.key;
  renderField(fieldName);
  field.onPick?.(field.items.find((entry) => entry.key === item.key) || item);
}

/**
 * @param {IdFieldName} fieldName
 */
function renderField(fieldName) {
  const field = FIELDS[fieldName];
  const select = document.querySelector(field.selector);
  if (!select) {
    return;
  }

  select.innerHTML = '';

  if (field.items.length === 0) {
    const emptyOption = document.createElement('ion-select-option');
    emptyOption.value = '';
    emptyOption.textContent = 'No IDs yet';
    select.appendChild(emptyOption);
  } else {
    for (const item of field.items) {
      const option = document.createElement('ion-select-option');
      option.value = item.key;
      option.textContent = item.label;
      select.appendChild(option);
    }
  }

  const customOption = document.createElement('ion-select-option');
  customOption.value = CUSTOM_KEY;
  customOption.textContent = 'Custom ID…';
  select.appendChild(customOption);

  select.value = field.selectedKey || '';
  select.disabled = false;
}

/**
 * @param {IdFieldName} fieldName
 * @returns {Promise<string|null>}
 */
async function promptCustomId(fieldName) {
  const labels = {
    event: 'Event ID',
    calendar: 'Calendar ID',
    reminder: 'Reminder ID',
    remindersList: 'Reminders list ID',
  };

  const alert = document.createElement('ion-alert');
  alert.header = labels[fieldName];
  alert.message = 'Paste or type an ID to use for method calls.';
  alert.inputs = [
    {
      name: 'id',
      type: 'text',
      placeholder: '73D6F2A1-4B8C-4E9A-9F3D-1C2B5A7E8D90',
      value: getSelectedId(fieldName),
    },
  ];
  alert.buttons = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Use', role: 'confirm' },
  ];

  document.body.appendChild(alert);
  await alert.present();
  const { role, data } = await alert.onDidDismiss();
  alert.remove();

  if (role !== 'confirm') {
    return null;
  }
  const customId = String(data?.values?.id || '').trim();
  return customId || null;
}

function formatEventRangeLabel(startDateMs, endDateMs) {
  const startLabel = formatTimestamp(startDateMs);
  const endLabel = formatTimestamp(endDateMs);
  if (startLabel && endLabel) {
    return `${startLabel} → ${endLabel}`;
  }
  if (startLabel) {
    return startLabel;
  }
  return 'no dates';
}

function formatTimestamp(timestampMs) {
  if (timestampMs == null || !Number.isFinite(Number(timestampMs))) {
    return null;
  }
  return new Date(Number(timestampMs)).toLocaleString();
}
