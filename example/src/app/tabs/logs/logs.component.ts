import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent} from "@ionic/angular/standalone";
import {LogsListComponent} from "../../components/logs-list/logs-list.component";
import {StoreService} from "../../store/store.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  imports: [
    HeaderComponent,
    IonContent,
    LogsListComponent
  ],
  standalone: true
})
export class LogsComponent {
  constructor(private readonly storeService: StoreService) {}

  ionViewDidEnter(): void {
    this.storeService.updateState({ unreadLogs: 0 });
  }
}
