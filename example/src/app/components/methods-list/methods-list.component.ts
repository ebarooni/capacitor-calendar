import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/angular/standalone";
import {CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {PermissionStatusService} from "../permissions-status/permission-status.service";
import {LogsService} from "../logs-list/logs.service";

@Component({
  selector: 'app-methods-list',
  templateUrl: './methods-list.component.html',
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader
  ],
  standalone: true
})
export class MethodsListComponent {

  constructor(
    readonly permissionStatusService: PermissionStatusService,
    private readonly logsService: LogsService
  ) {}

  public createEventWithPrompt(): void {
    CapacitorCalendar.createEventWithPrompt()
      .then((response) => this.logsService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.logsService.dispatchLog(JSON.stringify(error)));
  }
}
