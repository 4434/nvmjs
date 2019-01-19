import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js';

import axios from 'axios'
Vue.prototype.$http = axios;

import tool from '@/assets/js/yk-tool.js'
Vue.use(tool);

import filters from '@/assets/js/yk-filter.js'
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})
 
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
