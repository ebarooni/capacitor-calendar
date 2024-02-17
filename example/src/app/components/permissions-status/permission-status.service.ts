import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, map, merge, Observable, Subject, switchMap, tap} from "rxjs";
import {PermissionState} from "@capacitor/core";
import {CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {LogsService} from "../logs-list/logs.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionStatusService {
  private readonly checkAllPermissionsSubject = new Subject<void>();
  readonly checkAllPermissions$ = this.checkAllPermissionsSubject.asObservable()
    .pipe(
      switchMap(() => CapacitorCalendar.checkAllPermissions().catch((error) => error)),
      tap((response) => this.logsService.dispatchLog(JSON.stringify(response))),
    )
  private readonly readCalendarPermissionSubject = new BehaviorSubject<void>(void 0);
  readonly readCalendarPermission$: Observable<PermissionState> = merge(
    this.checkAllPermissions$.pipe(
      filter((response) => (response?.readCalendar ?? null) !== null),
      map((result) => result.readCalendar)
    ),
    this.readCalendarPermissionSubject.asObservable()
      .pipe(
        switchMap(() => CapacitorCalendar.checkPermission({alias: 'readCalendar'}).catch((error) => error)),
        tap((response) => this.logsService.dispatchLog(JSON.stringify(response))),
        filter((response) => (response?.result ?? null) != null),
        map((response) => response.result)
      )
  );

  constructor(private readonly logsService: LogsService) {}

  requestPermission(alias: 'readCalendar'): void {
    switch (alias) {
      case 'readCalendar':
        CapacitorCalendar.requestPermission({ alias: alias })
          .then((response) => this.logsService.dispatchLog(JSON.stringify(response)))
          .then(() => this.readCalendarPermissionSubject.next())
          .catch((error) => this.logsService.dispatchLog(JSON.stringify(error)));
        break;
      default:
        return;
    }
  }

  requestAllPermissions(): void {
    CapacitorCalendar.requestAllPermissions()
      .then((response) => this.logsService.dispatchLog(JSON.stringify(response)))
      .then(() => this.readCalendarPermissionSubject.next())
      .catch((error) => this.logsService.dispatchLog(JSON.stringify(error)));
  }

  checkAllPermissions(): void {
    this.checkAllPermissionsSubject.next();
  }
}
