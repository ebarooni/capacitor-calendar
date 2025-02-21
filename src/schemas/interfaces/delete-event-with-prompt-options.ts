import { EventSpan } from "../enums/event-span";

/**
 * @since 7.1.0
 */
export interface DeleteEventWithPromptOptions {
  /**
   * @since 7.1.0
   */
  id: string;
  /**
   * The span of deletion.
   *
   * @default EventSpan.THIS_EVENT
   * @platform iOS
   * @see 7.1.0
   */
  span?: EventSpan;
  /**
   * Title of the dialog.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  title: string;
  /**
   * Message of the dialog.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  message: string;
  /**
   * Text to show on the confirm button.
   *
   * @default 'Delete'
   * @platform Android, iOS
   * @since 7.1.0
   */
  confirmButtonText?: string;
  /**
   * Text to show on the cancel button.
   *
   * @default 'Cancel'
   * @platform Android, iOS
   * @since 7.1.0
   */
  cancelButtonText?: string;
}
