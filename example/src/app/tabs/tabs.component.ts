import { Component } from '@angular/core';
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { codeSlashOutline, clipboardOutline, settingsOutline } from 'ionicons/icons';
import { LetDirective } from '@ngrx/component';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs, IonBadge, LetDirective],
  standalone: true,
})
export class TabsComponent {
  constructor(readonly storeService: StoreService) {
    addIcons({
      'code-slash-outline': codeSlashOutline,
      'clipboard-outline': clipboardOutline,
      'settings-outline': settingsOutline,
    });
  }
}
