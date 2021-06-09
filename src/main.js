import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {};

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import "./assets/style/app.scss"
import "@fontsource/alata"

import 'animate.css';

const app = createApp(App)

app.use(router);
app.use(store);
app.use(PerfectScrollbar);
app.use(Toast, options);

app.mount('#oswapApp')
