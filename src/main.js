import { createApp } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import TvSettings from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'
import './style.scss'

const app = createApp(TvSettings)
app.component('TvDemo', TvDemo)
app.mount('#tv-settings')
