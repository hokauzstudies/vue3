import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = createI18n({
  // shomething vue-i18n options here ...
  locale: 'en', // set locale
  fallbackLocale: 'ja', // set fallback locale
  messages // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

createApp(App).use(router).use(i18n).mount('#app')
