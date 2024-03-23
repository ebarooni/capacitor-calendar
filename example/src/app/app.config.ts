import { ApplicationConfig } from '@angular/core';

import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { ApiComponent } from './tabs/api/api.component';
import { SettingsComponent } from './tabs/settings/settings.component';
import { LogsComponent } from './tabs/logs/logs.component';
import { provideStore } from './store/provide-store';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'api',
        component: ApiComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: '',
        redirectTo: 'api',
        pathMatch: 'full',
      },
    ],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({
      mode: 'ios',
    }),
    provideStore(),
  ],
};
