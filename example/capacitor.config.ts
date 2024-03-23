import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.barooni.CapacitorCalendar',
  appName: 'CAP Calendar',
  webDir: 'dist/example/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
