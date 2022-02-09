import Vue from 'vue';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyCtc5PxWWl_Ywznt4G9Q0dvMeIcbF37gVM',
  authDomain: 'form-creator-0110.firebaseapp.com',
  projectId: 'form-creator-0110',
  storageBucket: 'form-creator-0110.appspot.com',
  messagingSenderId: '145520868173',
  appId: '1:145520868173:web:8d8c19212643e462ecd504',
  measurementId: 'G-XY95PSNCTB',
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const firestore = getFirestore(firebase);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
