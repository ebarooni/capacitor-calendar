import {Component, OnInit,} from '@angular/core';
import {
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSpinner,
} from "@ionic/angular/standalone";
import {LetDirective} from "@ngrx/component";
import {StoreService} from "../../store/store.service";
import {CalendarPermissionStatus, CapacitorCalendar} from "@ebarooni/capacitor-calendar";

@Component({
  selector: 'app-permissions-status',
  templateUrl: './permissions-status.component.html',
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    LetDirective,
    IonBadge,
    IonSpinner
  ],
  standalone: true
})
export class PermissionsStatusComponent implements OnInit {
  constructor(readonly storeService: StoreService) {}

  ngOnInit() {
    CapacitorCalendar.checkAllPermissions()
      .then((result) => this.storeService.updateState({ permissions: result }))
      .catch((error) => this.storeService.dispatchLog(error));
  }

  requestPermission(alias: keyof CalendarPermissionStatus): void {
    CapacitorCalendar.requestPermission({ alias: alias })
      .then((result) => {
        let update: Partial<CalendarPermissionStatus>
        switch (alias) {
          case 'readCalendar':
            update = { 'readCalendar': result.result };
            break;
          case "writeCalendar":
            update = { 'writeCalendar': result.result };
            break;
        }
        this.storeService.updateState({ permissions: update });
        this.storeService.dispatchLog(JSON.stringify(result));
      })
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }
}
