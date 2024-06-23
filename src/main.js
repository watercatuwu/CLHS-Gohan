import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { useRegisterSW } from 'virtual:pwa-register/vue';

const app = createApp(App)

useRegisterSW()
app.use(router)
app.mount('#app')