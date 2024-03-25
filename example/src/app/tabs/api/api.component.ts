import { Component } from '@angular/core';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { PermissionsStatusComponent } from '../../components/permissions-status/permissions-status.component';
import { MethodsListComponent } from '../../components/methods-list/methods-list.component';
import { StoreService } from '../../store/store.service';
import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import type { RefresherEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  imports: [
    IonContent,
    HeaderComponent,
    PermissionsStatusComponent,
    MethodsListComponent,
    IonRefresher,
    IonRefresherContent,
  ],
  standalone: true,
})
export class ApiComponent {
  constructor(readonly storeService: StoreService) {}

  public handlePageRefresh(event: CustomEvent<RefresherEventDetail>): void {
    CapacitorCalendar.checkAllPermissions()
      .then((result) => this.storeService.updateState({ permissions: result }))
      .catch((error: Error) => this.storeService.dispatchLog(JSON.stringify(error)))
      .finally(() => event.detail.complete());
  }
}
