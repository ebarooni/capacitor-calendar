import { Component, } from '@angular/core';
import {
  IonBadge,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSpinner,
} from "@ionic/angular/standalone";
import {PermissionStatusService} from "./permission-status.service";
import {LetDirective} from "@ngrx/component";

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
    IonSpinner,
    IonChip,
  ],
  standalone: true
})
export class PermissionsStatusComponent {
  constructor(readonly permissionsStatusService: PermissionStatusService) {}
}
