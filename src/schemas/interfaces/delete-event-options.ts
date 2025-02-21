import { EventSpan } from "../enums/event-span";

/**
 * @since 7.1.0
 */
export interface DeleteEventOptions {
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
}
