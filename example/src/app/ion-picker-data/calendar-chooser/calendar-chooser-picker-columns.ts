import { CalendarChooserDisplayStyle, CalendarChooserSelectionStyle } from '@ebarooni/capacitor-calendar';
import { PickerColumn } from '@ionic/angular';

export const calendarChooserPickerColumns: PickerColumn[] = [
  {
    name: 'selectionStyle',
    options: [
      {
        text: 'Single',
        value: CalendarChooserSelectionStyle.SINGLE,
      },
      {
        text: 'Multiple',
        value: CalendarChooserSelectionStyle.MULTIPLE,
      },
    ],
  },
  {
    name: 'displayStyle',
    options: [
      {
        text: 'All Calendars',
        value: CalendarChooserDisplayStyle.ALL_CALENDARS,
      },
      {
        text: 'Writable Calendars Only',
        value: CalendarChooserDisplayStyle.WRITABLE_CALENDARS_ONLY,
      },
    ],
  },
];
