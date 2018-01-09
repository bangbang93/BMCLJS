import Vue from 'vue';
import * as Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('../pages/index.vue').default,
    },
    {
      path: '/game',
      name: 'game',
      component: require('../pages/games.vue').default,
    },
    {
      path: '/config',
      name: 'config',
      component: require('../pages/config.vue').default,
    },
    {
      path: '/download',
      name: 'download',
      component: require('../components/LandingPage.vue').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
