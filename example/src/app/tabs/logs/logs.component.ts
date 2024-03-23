import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { LogsListComponent } from '../../components/logs-list/logs-list.component';
import { StoreService } from '../../store/store.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  imports: [HeaderComponent, IonContent, LogsListComponent, IonIcon, IonButton],
  standalone: true,
})
export class LogsComponent {
  constructor(private readonly storeService: StoreService) {
    addIcons({ 'trash-outline': trashOutline });
  }

  ionViewDidEnter(): void {
    this.storeService.updateState({ unreadLogs: 0 });
  }

  eraseLogs(): void {
    this.storeService.updateState({ logs: [] });
  }
}
