<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()

// Determina o layout com base na rota atual
const layout = computed(() => {
  // Rotas de autenticação usam o AuthLayout
  if (route.name === 'login' || route.name === 'register') {
    return AuthLayout
  }
  // Todas as outras rotas usam o MainLayout
  return MainLayout
})
</script>
