import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store/index';
import db from '../common/service/datastore';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue['http'] = Vue.prototype.$http = axios;
Vue.prototype.$db = db;
Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
