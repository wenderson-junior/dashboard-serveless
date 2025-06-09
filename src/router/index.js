import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../views/GeneralView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import UserSettingsView from '../views/UserSettingsView.vue'
import { authService } from '../services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/visao-geral',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/registro',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/visao-geral',
      name: 'general',
      component: GeneralView,
      meta: { requiresAuth: true }
    },
    {
      path: '/assinaturas',
      name: 'subscription',
      component: SubscriptionView,
      meta: { requiresAuth: true }
    },
    {
      path: '/configuracoes',
      name: 'settings',
      component: UserSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/visao-geral',
    },
  ],
})

// Verificação de autenticação nas rotas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = authService.isAuthenticated()

  // Se a rota requer autenticação e o usuário não está autenticado, redirecionar para login
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } 
  // Se o usuário está autenticado e tenta acessar login/registro, redirecionar para visão geral
  else if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'general' })
  }
  // Caso contrário, continuar normalmente
  else {
    next()
  }
})

export default router
