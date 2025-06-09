<template>
  <div class="p-6 h-full overflow-auto">
    <div class="flex justify-end items-center mb-6">
      <button
        v-show="!showNewSubscriptionForm && !isLoading"
        @click="showNewSubscriptionForm = true"
        class="bg-regular-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 font-inter cursor-pointer"
      >
        Nova assinatura
      </button>
    </div>

    <!-- Indicador de carregamento com logo -->
    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="animate-pulse">
        <img src="@/assets/logo-short.svg" alt="Logo" class="w-20 h-20" />
      </div>
      <p class="mt-4 text-regular-700 font-medium">Carregando</p>
    </div>

    <!-- Mensagem de erro -->
    <div
      v-else-if="hasError"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 justify-center"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>{{ errorMessage }}</p>
      </div>
      <div class="mt-3 flex">
        <button
          @click="loadSubscriptions"
          class="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-4 rounded transition-colors duration-200"
        >
          Tentar novamente
        </button>
      </div>
    </div>

    <!-- Lista de assinaturas -->
    <SubscriptionList 
      v-else-if="!showNewSubscriptionForm" 
      :subscriptions="subscriptions" 
      @refresh="loadSubscriptions"
    />

    <!-- Formulário de nova assinatura -->
    <SubscriptionForm
      v-if="showNewSubscriptionForm"
      @submit="createSubscription"
      @cancel="showNewSubscriptionForm = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SubscriptionForm from '../components/subscription/SubscriptionForm.vue'
import SubscriptionList from '../components/subscription/SubscriptionList.vue'
import { subscriptionService } from '@/services/subscriptionService'

defineOptions({
  name: 'SubscriptionView',
})

const showNewSubscriptionForm = ref(false)
const subscriptions = ref([])
const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')

// Carregar assinaturas da API
const loadSubscriptions = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''
    
    const data = await subscriptionService.getAllSubscriptions()
    subscriptions.value = data
  } catch (error) {
    console.error('Erro ao carregar assinaturas:', error)
    hasError.value = true
    errorMessage.value = 'Não foi possível carregar as assinaturas. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
}

// Criar nova assinatura
const createSubscription = async (newSubscription) => {
  // A lógica de validação e envio para API já está no componente SubscriptionForm
  // Aqui só precisamos adicionar a assinatura à lista e fechar o formulário
  subscriptions.value.unshift(newSubscription) // Adicionar no início da lista
  showNewSubscriptionForm.value = false
  
  // Recarregar a lista para garantir dados atualizados
  await loadSubscriptions()
}

// Carregar assinaturas ao montar o componente
onMounted(() => {
  loadSubscriptions()
})
</script>
