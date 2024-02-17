import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent} from "@ionic/angular/standalone";
import {LogsListComponent} from "../../components/logs-list/logs-list.component";

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
export class LogsComponent {}
