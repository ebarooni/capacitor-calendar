import { PickerButton } from '@ionic/angular';
import { PluginPermission } from '@ebarooni/capacitor-calendar';

export interface CheckPermissionPickerResult {
  alias: {
    value: PluginPermission;
  };
}

export function getCheckPermissionPickerButtons(
  successCallback: (result: CheckPermissionPickerResult) => void
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
