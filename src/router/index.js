import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../views/GeneralView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/visao-geral',
    },
    {
      path: '/visao-geral',
      name: 'general',
      component: GeneralView,
    },
    {
      path: '/assinaturas',
      name: 'subscription',
      component: SubscriptionView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/visao-geral',
    },
  ],
})

export default router
