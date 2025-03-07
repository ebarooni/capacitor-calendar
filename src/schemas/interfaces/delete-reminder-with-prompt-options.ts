/**
 * @since 7.2.0
 */
export interface DeleteReminderWithPromptOptions {
  /**
   * @since 7.2.0
   */
  id: string;
  /**
   * Title of the dialog.
   *
   * @since 7.2.0
   */
  title: string;
  /**
   * Message of the dialog.
   *
   * @since 7.2.0
   */
  message: string;
  /**
   * Text to show on the confirm button.
   *
   * @default 'Delete'
   * @since 7.2.0
   */
  confirmButtonText?: string;
  /**
   * Text to show on the cancel button.
   *
   * @default 'Cancel'
   * @since 7.2.0
   */
  cancelButtonText?: string;
}
