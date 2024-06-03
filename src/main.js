import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import { useRegisterSW } from 'virtual:pwa-register/vue';



const app = createApp(App)

useRegisterSW()
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
app.mount('#app')