import { CreateEventWithPromptOptions } from "./create-event-with-prompt-options";

/**
 * @since 7.1.0
 */
export interface ModifyEventWithPromptOptions
  extends CreateEventWithPromptOptions {
  /**
   * The ID of the event to be modified.
   *
   * @since 7.1.0
   */
  id: string;
}
