<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div v-if="subscriptions.length === 0" class="text-center py-8">
      <p class="text-regular-500">Nenhuma assinatura cadastrada.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <!-- Tabela para telas médias e grandes -->
      <table class="w-full hidden md:table">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-3 px-4 font-medium text-regular-500">Nome</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Valor</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Frequência</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Criado em</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(subscription, index) in subscriptions"
            :key="index"
            class="border-b border-gray-100"
          >
            <td class="py-3 px-4">{{ subscription.name }}</td>
            <td class="py-3 px-4">{{ formatCurrency(subscription.value) }}</td>
            <td class="py-3 px-4">{{ formatFrequency(subscription.frequency) }}</td>
            <td class="py-3 px-4">{{ formatDate(subscription.createdAt) }}</td>
            <td class="py-3 px-4">
              <button
                @click="deleteSubscription(subscription.id)"
                class="text-red-600 hover:text-red-700 cursor-pointer"
                :disabled="isDeleting"
              >
                <span class="material-symbols-outlined">Deletar</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Cards para telas pequenas -->
      <div class="md:hidden space-y-4">
        <div
          v-for="(subscription, index) in subscriptions"
          :key="index"
          class="border border-gray-100 rounded-lg p-4 shadow-sm"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium text-regular-700">{{ subscription.name }}</h3>
            <button
              @click="deleteSubscription(subscription.id)"
              class="text-red-600 hover:text-red-700 cursor-pointer"
              :disabled="isDeleting"
            >
              <span class="material-symbols-outlined">Deletar</span>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p class="text-regular-500">Valor:</p>
              <p class="font-medium">{{ formatCurrency(subscription.value) }}</p>
            </div>
            <div>
              <p class="text-regular-500">Frequência:</p>
              <p class="font-medium">{{ formatFrequency(subscription.frequency) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { subscriptionService } from '@/services/subscriptionService'

defineOptions({
  name: 'SubscriptionList',
})

defineProps({
  subscriptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['refresh'])

const isDeleting = ref(false)
const deleteError = ref('')

// Função para deletar uma assinatura
const deleteSubscription = async (id) => {
  if (!id) return

  try {
    isDeleting.value = true
    deleteError.value = ''

    if (!confirm('Tem certeza que deseja excluir esta assinatura?')) {
      isDeleting.value = false
      return
    }

    await subscriptionService.deleteSubscription(id)
    emit('refresh')
  } catch (error) {
    console.error('Erro ao deletar assinatura:', error)
    deleteError.value = 'Não foi possível excluir a assinatura. Tente novamente.'
  } finally {
    isDeleting.value = false
  }
}

const frequencies = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'biannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' },
]

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatFrequency = (frequency) => {
  const freq = frequencies.find((f) => f.value === frequency)
  return freq ? freq.label : frequency
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>
