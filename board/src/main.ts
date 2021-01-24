import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { getFirstLetter } from './pkg/strings'

const app = createApp(App)
app.config.globalProperties.pipes = { getFirstLetter }
app.use(store).use(router).mount('#app')
