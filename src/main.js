import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { inject } from '@vercel/analytics';

inject()

const app = createApp(App)

useRegisterSW()
app.use(router)
app.mount('#app')