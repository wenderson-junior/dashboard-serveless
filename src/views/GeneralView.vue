<template>
  <div class="px-6 lg:px-[35px] py-[30px] w-full h-auto">
    <header class="border-b border-gray-50 mb-6">
      <div class="flex items-center gap-4 mb-[18px]">
        <img src="@/assets/icons/house-line.svg" alt="House" />
        <span class="font-inter font-medium text-md">Visão geral</span>
      </div>
    </header>

    <!-- Indicador de carregamento com logo -->
    <div v-if="isLoading" class="flex flex-col justify-center items-center mt-48">
      <div class="animate-bounce">
        <img src="@/assets/logo-short.svg" alt="Logo" class="w-20 h-20" />
      </div>
      <p class="mt-4 text-regular-700 font-medium animate-pulse">Carregando...</p>
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
          @click="loadDashboardData"
          class="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-4 rounded transition-colors duration-200"
        >
          Tentar novamente
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col 2xl:flex-row gap-6 w-full">
      <AppCard
        title="Progressão de TPV"
        titleTag="h1"
        variant="big"
        customClasses="w-full 2xl:w-[40.75%] flex-shrink-0 relative pb-4"
        :percentageChange="dashboardData.tpvProgression.percentageChange"
      >
        <div class="mt-8 flex flex-wrap gap-4">
          <ValueCard
            title="Mês atual"
            :value="dashboardData.tpvProgression.currentMonth.value"
            variant="big"
            :show-currency="dashboardData.tpvProgression.currentMonth.showCurrency"
            bg-color-class="bg-gray-800"
            title-color-class="text-gray-100"
            value-color-class="text-emphasis"
            padding-class="pt-10 px-8 pb-12"
          />

          <ValueCard
            title="Mês anterior"
            :value="dashboardData.tpvProgression.previousMonth.value"
            variant="big"
            :show-currency="dashboardData.tpvProgression.previousMonth.showCurrency"
            bg-color-class="bg-gray-100"
            title-color-class="text-regular-500"
            value-color-class="text-regular-800"
            border-color-class="border-gray-300"
            padding-class="pt-10 px-8 pb-12"
          />
        </div>

        <div class="mt-8 px-12 pb-6">
          <LineChart :dataPoints="dashboardData.tpvProgression.chartData" />
        </div>
      </AppCard>

      <div class="flex flex-col gap-6 w-full 2xl:w-[66.25%]">
        <div class="flex flex-col md:flex-row gap-6 w-full">
          <AppCard
            title="Ticket médio"
            customClasses="w-full md:w-1/2 min-h-[238.23px] relative flex flex-col justify-between"
            :percentageChange="dashboardData.averageTicket.percentageChange"
          >
            <div class="mt-6 flex flex-wrap gap-4">
              <ValueCard
                title="Mês atual"
                :value="dashboardData.averageTicket.currentMonth.value"
                bg-color-class="bg-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />

              <ValueCard
                title="Mês anterior"
                :value="dashboardData.averageTicket.previousMonth.value"
                bg-color-class="bg-gray-100"
                border-color-class="border-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />
            </div>
          </AppCard>

          <AppCard
            title="Quantidade de transações"
            customClasses="w-full md:w-1/2 min-h-[238.23px] relative flex flex-col justify-between"
            :percentageChange="dashboardData.transactionsCount.percentageChange"
          >
            <div class="mt-6 flex flex-wrap gap-4">
              <ValueCard
                title="Mês atual"
                :value="dashboardData.transactionsCount.currentMonth.value"
                bg-color-class="bg-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />

              <ValueCard
                title="Mês anterior"
                :value="dashboardData.transactionsCount.previousMonth.value"
                bg-color-class="bg-gray-100"
                border-color-class="border-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />
            </div>
          </AppCard>
        </div>

        <AppCard
          title="Percentual markup"
          customClasses="w-full min-h-[192px] relative flex flex-col justify-between"
          :percentageChange="dashboardData.markupPercentage.percentageChange"
          :showPercentageIcon="dashboardData.markupPercentage.showPercentageIcon"
        >
          <div class="mt-6 flex flex-wrap gap-4">
            <ValueCard
              title="Mês atual"
              :value="dashboardData.markupPercentage.currentMonth.value"
              bg-color-class="bg-gray-300"
              title-color-class="text-regular-500"
              value-color-class="text-regular-800"
              padding-class="pt-[21.5px] px-[40.83px] pb-[23.5px]"
            />

            <ValueCard
              title="Mês anterior"
              :value="dashboardData.markupPercentage.previousMonth.value"
              bg-color-class="bg-gray-100"
              border-color-class="border-gray-300"
              title-color-class="text-regular-500"
              value-color-class="text-regular-800"
              padding-class="pt-[21.5px] px-[40.83px] pb-[23.5px]"
            />
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import ValueCard from '@/components/cards/ValueCard.vue'
import AppCard from '@/components/cards/AppCard.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { calculatePercentageChange } from '@/utils/calculations'
import { dashboardService } from '@/services/dashboardService'

defineOptions({
  name: 'GeneralView',
})

// Estado de carregamento e erro
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// Dados do dashboard com getters para cálculo de percentuais
const dashboardData = reactive({
  tpvProgression: {
    get percentageChange() {
      return calculatePercentageChange(this.currentMonth.value, this.previousMonth.value)
    },
    currentMonth: {
      value: '0',
      showCurrency: true,
    },
    previousMonth: {
      value: '0',
      showCurrency: true,
    },
    chartData: [],
  },
  averageTicket: {
    get percentageChange() {
      return calculatePercentageChange(this.currentMonth.value, this.previousMonth.value)
    },
    currentMonth: {
      value: '0',
    },
    previousMonth: {
      value: '0',
    },
  },
  transactionsCount: {
    get percentageChange() {
      return calculatePercentageChange(this.currentMonth.value, this.previousMonth.value)
    },
    currentMonth: {
      value: '0',
    },
    previousMonth: {
      value: '0',
    },
  },
  markupPercentage: {
    get percentageChange() {
      return calculatePercentageChange(
        this.currentMonth.value.replace('%', ''),
        this.previousMonth.value.replace('%', ''),
      )
    },
    showPercentageIcon: false,
    currentMonth: {
      value: '0',
    },
    previousMonth: {
      value: '0',
    },
  },
})

// Função para carregar os dados do dashboard
const loadDashboardData = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''

    // Buscar dados da API
    const data = await dashboardService.getDashboardData()

    // Atualizar os dados do dashboard
    if (data.tpvProgression) {
      dashboardData.tpvProgression.currentMonth = data.tpvProgression.currentMonth
      dashboardData.tpvProgression.previousMonth = data.tpvProgression.previousMonth
      dashboardData.tpvProgression.chartData = data.tpvProgression.chartData
    }

    if (data.averageTicket) {
      dashboardData.averageTicket.currentMonth = data.averageTicket.currentMonth
      dashboardData.averageTicket.previousMonth = data.averageTicket.previousMonth
    }

    if (data.transactionsCount) {
      dashboardData.transactionsCount.currentMonth = data.transactionsCount.currentMonth
      dashboardData.transactionsCount.previousMonth = data.transactionsCount.previousMonth
    }

    if (data.markupPercentage) {
      dashboardData.markupPercentage.currentMonth = data.markupPercentage.currentMonth
      dashboardData.markupPercentage.previousMonth = data.markupPercentage.previousMonth
      dashboardData.markupPercentage.showPercentageIcon = data.markupPercentage.showPercentageIcon
    }
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
    hasError.value = true
    errorMessage.value =
      'Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadDashboardData()
})
</script>
