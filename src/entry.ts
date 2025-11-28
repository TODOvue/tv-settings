import type { App, Plugin } from 'vue'
import _TvSettings from './components/TvSettings.vue'
import './style.scss'

const TvSettings = _TvSettings as typeof _TvSettings & Plugin;
TvSettings.install = (app: App) => {
  app.component('TvSettings', TvSettings)
};

export { TvSettings }

export const TvSettingsPlugin: Plugin = {
  install: TvSettings.install
};
export default TvSettings;

declare module 'vue' {
  export interface GlobalComponents {
    TvSettings: typeof TvSettings;
  }
}
