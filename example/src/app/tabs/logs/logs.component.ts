import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  imports: [
    HeaderComponent,
    IonContent
  ],
  standalone: true
})
export class LogsComponent {}
