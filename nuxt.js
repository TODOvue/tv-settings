
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@todovue/tv-settings',
    configKey: 'tvSettings'
  },
  setup(_options, nuxt) {
    const cssPath = '@todovue/tv-settings/style.css';
    if (!nuxt.options.css.includes(cssPath)) {
      nuxt.options.css.push(cssPath);
    }
  }
})
