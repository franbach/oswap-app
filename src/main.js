import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import "./assets/style/app.scss"
import "@fontsource/alata"

const app = createApp(App)

app.use(router);
app.use(store);
app.use(PerfectScrollbar);

app.mount('#oswapApp')
