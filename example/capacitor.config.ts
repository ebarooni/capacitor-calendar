import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.barooni.CapacitorCalendarExample',
  appName: 'example',
  webDir: 'dist/example/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
