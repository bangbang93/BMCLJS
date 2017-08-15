import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // component: require('../components/downloader.vue'),
      component: require('../pages/games.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: require('../pages/games.vue'),
    },
    {
      path: '/config',
      name: 'config',
      component: require('../pages/config.vue'),
    },
    {
      path: '/download',
      name: 'download',
      component: require('../components/LandingPage.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
