import { Component } from '@angular/core';
import {IonContent} from "@ionic/angular/standalone";
import {HeaderComponent} from "../../components/header/header.component";
import {PermissionsStatusComponent} from "../../components/permissions-status/permissions-status.component";
import {MethodsListComponent} from "../../components/methods-list/methods-list.component";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  imports: [
    IonContent,
    HeaderComponent,
    PermissionsStatusComponent,
    MethodsListComponent
  ],
  standalone: true
})
export class ApiComponent {}
