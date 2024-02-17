import { Injectable } from '@angular/core';
import {ReplaySubject, scan} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private readonly logsSubject = new ReplaySubject<string>(1);
  readonly logs$ = this.logsSubject.asObservable()
    .pipe(
      scan((acc: { message: string, timestamp: number }[], curr: string) => [{ message: curr, timestamp: Date.now() }, ...acc], []),
    );

  dispatchLog(log: string): void {
    this.logsSubject.next(log);
  }
}
