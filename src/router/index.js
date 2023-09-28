import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/index.vue';
import PreView from '../pages/preview.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/preview',
    name: 'preview',
    component: PreView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
