import { PickerButton } from '@ionic/angular';
import { CalendarChooserDisplayStyle, CalendarChooserSelectionStyle } from '@ebarooni/capacitor-calendar';

export interface CalendarChooserResult {
  selectionStyle: {
    value: CalendarChooserSelectionStyle;
  };
  displayStyle: {
    value: CalendarChooserDisplayStyle;
  };
}

export function getCalendarChooserPickerButtons(
  successCallback: (result: CalendarChooserResult) => void
): PickerButton[] {
  return [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: successCallback,
    },
  ];
}
