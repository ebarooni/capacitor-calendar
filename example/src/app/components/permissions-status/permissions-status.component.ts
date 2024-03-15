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
import {CapacitorCalendar} from "@ebarooni/capacitor-calendar";

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
}
