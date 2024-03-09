import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonNote, IonToggle} from "@ionic/angular/standalone";
import {LetDirective} from "@ngrx/component";
import {StoreService} from "../../store/store.service";
import {addIcons} from "ionicons";
import {moon, informationCircleOutline, logoGithub, globeOutline} from "ionicons/icons";
import {Browser, OpenOptions} from "@capacitor/browser";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [
    HeaderComponent,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonToggle,
    LetDirective,
    IonNote
  ],
  standalone: true
})
export class SettingsComponent {
  constructor(readonly storeService: StoreService) {
    addIcons({
      'moon': moon,
      'information-circle-outline': informationCircleOutline,
      'logo-github': logoGithub,
      'globe-outline': globeOutline
    });
  }

  openLink(url: string): void {
    const openOptions: OpenOptions = { url: url };
    if (Capacitor.getPlatform() === 'ios') {
      openOptions.presentationStyle = 'popover';
    }
    Browser.open(openOptions).catch(() => console.warn('failed to open the given url'));
  }
}
