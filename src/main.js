import Vue from 'vue'
import App from './App.vue'

import router from './router';
import { store } from './stores/store';
require('./libs/setup.plugins');


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  store
})
