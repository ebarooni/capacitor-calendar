import { Component } from '@angular/core';
import {IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {codeSlashOutline, clipboardOutline, settingsOutline} from "ionicons/icons";
import {LogsService} from "../components/logs-list/logs.service";
import {LetDirective} from "@ngrx/component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonTabs,
    IonBadge,
    LetDirective
  ],
  standalone: true
})
export class TabsComponent {
  constructor(readonly logsService: LogsService) {
    addIcons({
      'code-slash-outline': codeSlashOutline,
      'clipboard-outline': clipboardOutline,
      'settings-outline': settingsOutline
    });
  }
}
