import { Component } from '@angular/core';
import {LogsService} from "./logs.service";
import {LetDirective} from "@ngrx/component";
import {IonItem, IonLabel, IonList, IonNote} from "@ionic/angular/standalone";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  imports: [
    IonList,
    IonLabel,
    IonItem,
    LetDirective,
    IonNote,
    DatePipe,
  ],
  standalone: true
})
export class LogsListComponent {
  constructor(readonly logsService: LogsService) {}
}
