import { createApp } from 'vue'
import TvSettings from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'
import './style.scss'

const app = createApp(TvSettings)
app.mount('#tv-settings')
