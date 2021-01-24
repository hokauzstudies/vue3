import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// import store from './store'
import { startRouter } from './router'
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB-DeDhVhLFjzKZ4gm8xJTLGa-LHZpRLk0',
  authDomain: 'tmm-admin.firebaseapp.com',
  databaseURL: 'https://tmm-admin.firebaseio.com',
  projectId: 'tmm-admin',
  storageBucket: 'tmm-admin.appspot.com',
  messagingSenderId: '676785336028',
  appId: '1:676785336028:web:0187b67ebf3961b61b4e19'
}

firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const app = createApp(App)

app
  .use(startRouter())
  .mount('#app')
