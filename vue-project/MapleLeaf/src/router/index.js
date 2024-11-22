import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LogInView from '../views/LogInView.vue';
import ModQuizView from '../views/ModQuizView.vue';
import QuizView from '../views/QuizView.vue';
import ChildVitaminView from '../views/ChildVitaminView.vue';
import VitaminView from '../views/VitaminView.vue';

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
    },
    {
      path: '/adminQuiz',
      name: 'ModQuiz',
      component: ModQuizView
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: QuizView
    },
    {
      path: '/Vitamins',
      name: 'Vitamins',
      component: VitaminView
    },
    {
      path: '/ChildVitamins',
      name: 'ChildVitamins',
      component: ChildVitaminView
    }
  ]
})

export default router
