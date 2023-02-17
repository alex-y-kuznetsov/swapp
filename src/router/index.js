
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  { 
    path: '/', 
    name: 'HomePage',
    component: HomePage 
  },
  { 
    path: '/404', 
    name: 'NotFoundPage',
    component: NotFoundPage 
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;