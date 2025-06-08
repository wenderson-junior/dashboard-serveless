import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../views/GeneralView.vue'
import ReportsView from '../views/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/general',
      name: 'general',
      component: GeneralView,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
    },
  ],
})

export default router
