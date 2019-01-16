import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js';
import axios from 'axios'
Vue.prototype.$http = axios;
import tool from '@/assets/js/yk-tool.js'
Vue.use(tool);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
