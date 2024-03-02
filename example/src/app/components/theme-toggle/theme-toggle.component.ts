import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonToggle} from "@ionic/angular/standalone";
import {LetDirective} from "@ngrx/component";
import {addIcons} from "ionicons";
import {moon} from "ionicons/icons";
import {StoreService} from "../../store/store.service";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonToggle,
    LetDirective
  ],
  standalone: true
})
export class ThemeToggleComponent {
  constructor(readonly storeService: StoreService) {
    addIcons({ 'moon': moon });
  }
}
