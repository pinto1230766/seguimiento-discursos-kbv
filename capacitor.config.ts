import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.franciscopinto.seguimiento.discursos.kbv',
  appName: 'Seguimiento Discursos KBV',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1f4e79',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1f4e79'
    }
  }
};

export default config;