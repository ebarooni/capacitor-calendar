import { ApplicationConfig } from '@angular/core';

import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [provideIonicAngular({})]
};
