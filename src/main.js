import { createApp } from 'vue'
import './style.css'
import './forms.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

createApp(App)
.use(router, axios)
.mount('#app')


