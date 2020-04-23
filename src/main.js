import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js';

import loading from '@/components/common/loading/loading.js' // 引入loading
Vue.use(loading);

import tool from '@/assets/js/yk-tool.js'
Vue.use(tool);

import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

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
