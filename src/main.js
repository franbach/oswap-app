import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/style/app.scss"

import "@fontsource/alata"

createApp(App).use(router).mount('#oswapApp')
