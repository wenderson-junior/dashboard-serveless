<template>
  <div class="px-[35px] py-[30px] w-full h-full">
    <header class="border-b border-gray-50 mb-6">
      <div class="flex items-center gap-4 mb-[18px]">
        <img src="@/assets/icons/house-line.svg" alt="House" />
        <span class="font-inter font-medium text-md">Visão geral</span>
      </div>
    </header>
    <div class="flex flex-col 2xl:flex-row gap-6 w-full">
      <AppCard
        title="Progressão de TPV"
        titleTag="h1"
        variant="big"
        customClasses="w-full 2xl:w-[40.75%] flex-shrink-0 relative pb-4"
        :percentageChange="15.8"
      >
        <div class="mt-8 flex flex-wrap gap-4">
          <ValueCard
            title="Mês atual"
            value="1.250.000,00"
            variant="big"
            show-currency
            bg-color-class="bg-gray-800"
            title-color-class="text-gray-100"
            value-color-class="text-emphasis"
            padding-class="pt-10 px-8 pb-12"
          />

          <ValueCard
            title="Mês anterior"
            value="1.080.000,00"
            variant="big"
            show-currency
            bg-color-class="bg-gray-100"
            title-color-class="text-regular-500"
            value-color-class="text-regular-800"
            border-color-class="border-gray-300"
            padding-class="pt-10 px-8 pb-12"
          />
        </div>

        <div class="mt-8 px-12 pb-6">
          <LineChart
            :dataPoints="[
              { period: '9mi', value: 9800000 },
              { period: '12mi', value: 12000000 },
              { period: '15mi', value: 15000000 },
            ]"
          />
        </div>
      </AppCard>

      <div class="flex flex-col gap-6 w-full 2xl:w-[66.25%]">
        <div class="flex flex-col md:flex-row gap-6 w-full">
          <AppCard
            title="Ticket médio"
            customClasses="w-full md:w-1/2 min-h-[238.23px] relative flex flex-col justify-between"
            :percentageChange="8.3"
          >
            <div class="mt-6 flex flex-wrap gap-4">
              <ValueCard
                title="Mês atual"
                value="125,50"
                bg-color-class="bg-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />

              <ValueCard
                title="Mês anterior"
                value="115,90"
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
            :percentageChange="-4.2"
          >
            <div class="mt-6 flex flex-wrap gap-4">
              <ValueCard
                title="Mês atual"
                value="9.875"
                bg-color-class="bg-gray-300"
                title-color-class="text-regular-500"
                value-color-class="text-regular-800"
                padding-class="pt-[26.68px] px-[19.85px] pb-[29.16px]"
              />

              <ValueCard
                title="Mês anterior"
                value="10.310"
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
          customClasses="w-full min-h-[192px] relative flex flex-col justify-between mb-4"
          :percentageChange="12.5"
          :showPercentageIcon="false"
        >
          <div class="mt-6 flex flex-wrap gap-4">
            <ValueCard
              title="Mês atual"
              value="3,75%"
              bg-color-class="bg-gray-300"
              title-color-class="text-regular-500"
              value-color-class="text-regular-800"
              padding-class="pt-[21.5px] px-[40.83px] pb-[23.5px]"
            />

            <ValueCard
              title="Mês anterior"
              value="3,33%"
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
import ValueCard from '@/components/cards/ValueCard.vue'
import AppCard from '@/components/cards/AppCard.vue'
import LineChart from '@/components/charts/LineChart.vue'

defineOptions({
  name: 'GeneralView',
})
</script>
