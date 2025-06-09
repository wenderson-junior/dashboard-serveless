<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div v-if="subscriptions.length === 0" class="text-center py-8">
      <p class="text-regular-500">Nenhuma assinatura cadastrada.</p>
    </div>
    <div v-else>
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-3 px-4 font-medium text-regular-500">Nome</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Valor</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Frequência</th>
            <th class="text-left py-3 px-4 font-medium text-regular-500">Próxima cobrança</th>
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
            <td class="py-3 px-4">{{ formatDate(subscription.nextChargeDate) }}</td>
            <td class="py-3 px-4">
              <button class="text-regular-500 hover:text-regular-700">
                <span class="material-symbols-outlined">more_vert</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'SubscriptionList',
})

defineProps({
  subscriptions: {
    type: Array,
    default: () => [],
  },
})

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
