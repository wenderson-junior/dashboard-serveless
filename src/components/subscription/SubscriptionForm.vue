<template>
  <div class="bg-white rounded-lg shadow p-4 md:p-10 font-inter max-w-full">
    <h2
      class="text-[32px] font-inter font-bold border-b border-gray-50 text-regular-700 pb-4 md:pb-8"
    >
      Nova assinatura
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-10">
      <div class="space-y-6">
        <BaseInput
          v-model="subscription.name"
          label="Nome da assinatura"
          placeholder="Digite o nome da assinatura"
          required
        />

        <div>
          <BaseLabel>Qual a frequência da cobrança?</BaseLabel>
          <div class="flex flex-wrap gap-4">
            <button
              v-for="freq in frequencies"
              :key="freq.value"
              @click="subscription.frequency = freq.value"
              class="px-4 py-2 border rounded-sm cursor-pointer text-md font-normal"
              :class="[
                subscription.frequency === freq.value
                  ? 'bg-active text-white border-active'
                  : 'border-regular-600 text-regular-600',
              ]"
            >
              {{ freq.label }}
            </button>
          </div>
        </div>

        <div>
          <BaseLabel>Meios de pagamento</BaseLabel>
          <div class="flex flex-wrap gap-4 md:gap-6">
            <BaseSwitch v-model="subscription.paymentMethods.pix" label="PIX" />

            <BaseSwitch v-model="subscription.paymentMethods.debitCard" label="Cartão de débito" />

            <BaseSwitch
              v-model="subscription.paymentMethods.creditCard"
              label="Cartão de crédito"
            />
          </div>
        </div>

        <div>
          <BaseLabel>Repasse de taxas</BaseLabel>
          <div class="flex flex-wrap gap-4 md:gap-6">
            <BaseSwitch v-model="subscription.feeOptions.passFees" label="Com repasse de taxas" />

            <BaseSwitch
              v-model="subscription.feeOptions.limitInstallments"
              label="Limitar parcelamento"
            />
          </div>
        </div>

        <div>
          <BaseLabel>Duração da assinatura</BaseLabel>
          <div class="flex flex-wrap gap-4">
            <BaseRadio
              v-model="subscription.duration"
              value="limited"
              label="Limitada"
              name="duration"
            />
            <BaseRadio
              v-model="subscription.duration"
              value="unlimited"
              label="Ilimitada"
              name="duration"
            />
          </div>
        </div>

        <div>
          <BaseLabel>Valor proporcional</BaseLabel>
          <div class="flex flex-wrap gap-4">
            <BaseSwitch
              v-model="subscription.proportionalValue"
              label="Os assinantes pagarão um valor proporcional pelos dias restantes até primeira cobrança"
            />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <BaseInput
          v-model="subscription.value"
          label="Valor da cobrança"
          placeholder="Digite o valor da cobrança"
          prefix=""
          type="number"
          required
        />

        <BaseTextarea
          v-model="subscription.description"
          label="Descrição (opcional)"
          placeholder="Acrescente uma descrição"
          :rows="6"
        />

        <div>
          <BaseLabel>Data da cobrança</BaseLabel>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="@/assets/icons/calendar-dots.svg" alt="Calendar icon" class="w-5 h-5" />
            </div>
            <input
              v-model="subscription.chargeDate"
              type="date"
              required
              :min="minDate"
              :class="[
                'text-md font-normal w-full border border-regular-400 rounded-md p-[14px] pl-[42px] focus:outline-none focus:ring-1 focus:ring-regular-500 appearance-none',
                subscription.chargeDate ? 'text-regular-600' : 'text-regular-400',
              ]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="submitError" class="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      <p>{{ submitError }}</p>
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="submitSuccess" class="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
      <p>Assinatura criada com sucesso!</p>
    </div>

    <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
      <button
        @click="$emit('cancel')"
        :disabled="isSubmitting"
        class="cursor-pointer text-sm rounded-[40px] px-4 py-2 border border-regular-600 text-regular-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
      <button
        @click="submitForm"
        :disabled="isSubmitting"
        class="cursor-pointer text-sm flex justify-center items-center px-4 py-3 gap-1 h-[48px] bg-regular-700 text-white rounded-[40px] hover:bg-regular-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
        <img v-else src="@/assets/icons/currency-circle-dollar.svg" alt="Dollar icon" class="w-6 h-6" />
        {{ isSubmitting ? 'Criando...' : 'Gerar assinatura' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseTextarea from '../ui/BaseTextarea.vue'
import BaseSwitch from '../ui/BaseSwitch.vue'
import BaseLabel from '../ui/BaseLabel.vue'
import BaseRadio from '../ui/BaseRadio.vue'
import { subscriptionService } from '@/services/subscriptionService'

defineOptions({
  name: 'SubscriptionForm',
})

const emit = defineEmits(['submit', 'cancel'])

// Estados para feedback ao usuário
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

// Calcula a data mínima (hoje) para o input de data
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0] // Formato YYYY-MM-DD
})

const frequencies = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'biannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' },
]

const subscription = reactive({
  name: '',
  value: '',
  frequency: 'monthly',
  paymentMethods: {
    pix: false,
    debitCard: false,
    creditCard: false,
  },
  feeOptions: {
    passFees: false,
    limitInstallments: false,
  },
  duration: 'unlimited',
  proportionalValue: false,
  description: '',
  chargeDate: '',
})

const submitForm = async () => {
  // Resetar estados
  submitError.value = ''
  submitSuccess.value = false
  
  // Validações
  if (!subscription.name) {
    submitError.value = 'Por favor, preencha o nome da assinatura'
    return
  }

  if (!subscription.value) {
    submitError.value = 'Por favor, preencha o valor da cobrança'
    return
  }

  if (!subscription.chargeDate) {
    submitError.value = 'Por favor, selecione a data da cobrança'
    return
  }

  const selectedDate = new Date(subscription.chargeDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    submitError.value = 'A data da cobrança deve ser maior ou igual à data atual'
    return
  }
  
  try {
    isSubmitting.value = true
    
    // Preparar dados para envio
    const subscriptionData = {
      ...subscription,
      // Garantir que o valor seja tratado como número
      value: parseFloat(subscription.value).toString(),
    }
    
    // Enviar para a API
    const result = await subscriptionService.createSubscription(subscriptionData)
    
    // Sucesso
    submitSuccess.value = true
    
    // Notificar o componente pai
    emit('submit', result)
    
    // Resetar formulário após 1 segundo
    setTimeout(() => {
      // Resetar o formulário
      Object.assign(subscription, {
        name: '',
        value: '',
        frequency: 'monthly',
        paymentMethods: {
          pix: false,
          debitCard: false,
          creditCard: false,
        },
        feeOptions: {
          passFees: false,
          limitInstallments: false,
        },
        duration: 'unlimited',
        proportionalValue: false,
        description: '',
        chargeDate: '',
      })
    }, 1000)
    
  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    submitError.value = 'Erro ao criar assinatura. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
