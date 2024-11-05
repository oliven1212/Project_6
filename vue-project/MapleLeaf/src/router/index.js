import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LogInView from '../views/LogInView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Om-os',
      name: 'about',
      component: AboutView
    },
    {
      path: '/LogInd',
      name: 'LogIn',
      component: LogInView
    }
  ]
})

export default router
