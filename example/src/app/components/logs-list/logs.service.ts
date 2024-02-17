import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, scan, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private readonly logsNotificationSubject = new BehaviorSubject<number>(0);
  readonly logsNotification$ = this.logsNotificationSubject.asObservable();
  private readonly logsSubject = new ReplaySubject<string>(1);
  readonly logs$ = this.logsSubject.asObservable()
    .pipe(
      scan((acc: { message: string, timestamp: number }[], curr: string) => [{ message: curr, timestamp: Date.now() }, ...acc], []),
      tap(() => this.incrementNotificationsCounter())
    );

  dispatchLog(log: string): void {
    this.logsSubject.next(log);
  }

  incrementNotificationsCounter(): void {
    this.logsNotificationSubject.next(this.logsNotificationSubject.getValue() + 1);
  }

  resetNotificationsCounter(): void {
    this.logsNotificationSubject.next(0);
  }
}
