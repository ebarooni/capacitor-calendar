import { Component } from '@angular/core';
import {IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {codeSlashOutline, clipboardOutline, settingsOutline} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonTabs
  ],
  standalone: true
})
export class TabsComponent {
  constructor() {
    addIcons({
      'code-slash-outline': codeSlashOutline,
      'clipboard-outline': clipboardOutline,
      'settings-outline': settingsOutline
    });
  }
}
