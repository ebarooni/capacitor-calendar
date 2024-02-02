export interface CapacitorCalendarPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
