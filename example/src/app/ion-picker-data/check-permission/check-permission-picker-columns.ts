import { PickerColumn } from '@ionic/angular';

export const checkPermissionPickerColumns: PickerColumn[] = [
  {
    name: 'alias',
    options: [
      {
        text: 'writeCalendar',
        value: 'writeCalendar',
      },
      {
        text: 'readCalendar',
        value: 'readCalendar',
      },
      {
        text: 'writeReminders',
        value: 'writeReminders',
      },
      {
        text: 'readReminders',
        value: 'readReminders',
      },
    ],
  },
];
