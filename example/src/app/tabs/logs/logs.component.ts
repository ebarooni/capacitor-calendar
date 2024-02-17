import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent} from "@ionic/angular/standalone";
import {LogsListComponent} from "../../components/logs-list/logs-list.component";
import {LogsService} from "../../components/logs-list/logs.service";

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
  constructor(private readonly logsService: LogsService) {}

  ionViewDidEnter(){
    this.logsService.resetNotificationsCounter();
  }
}
