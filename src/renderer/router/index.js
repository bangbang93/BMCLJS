import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: require('../pages/games.vue'),
    },
    {
      path: '/test',
      name: 'landing-page',
      component: require('../components/LandingPage.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
