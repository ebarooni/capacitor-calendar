export function getCheckPermissionPickerButtons(successCallback: (result: any) => void): any[] {
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
