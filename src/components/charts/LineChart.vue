<template>
  <div class="w-full font-poppins">
    <div class="relative w-full min-h-[278px] mt-16 mb-2">
      <!-- Linhas horizontais de referência -->
      <div
        v-for="(value, index) in yAxisValues"
        :key="index"
        class="absolute w-[95%] border-b border-1 border-gray-400 -right-10"
        :style="{ bottom: `${(index / (yAxisValues.length - 1)) * 100}%` }"
      >
        <span class="absolute -left-30 -translate-y-1/2 text-lg text-gray-600">{{
          formatCurrency(value)
        }}</span>
      </div>

      <!-- Linhas do gráfico (segmentadas) -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1 1" preserveAspectRatio="none">
        <line
          v-for="(_, index) in dataPoints.slice(0, -1)"
          :key="index"
          :x1="getX1(index)"
          :y1="getY1(index)"
          :x2="getX2(index)"
          :y2="getY2(index)"
          stroke="#2D3648"
          stroke-width="4"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <!-- Pontos e labels -->
      <div
        v-for="(point, index) in dataPoints"
        :key="index"
        class="absolute"
        :style="{
          left: `${generateXValues(index) * 100}%`,
          bottom: `${((point.value - minValue) / (maxValue - minValue)) * 100}%`,
        }"
      >
        <div class="relative">
          <div class="absolute -translate-x-1/2 -translate-y-1/2">
            <div class="w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
          </div>
          <div
            class="absolute -translate-x-1/2 -top-8 bg-gray-800 text-white text-sm px-1.5 py-0.5 rounded"
          >
            {{ point.period }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-around w-full">
      <div
        v-for="(month, index) in months"
        :key="index"
        class="text-gray-600 font-semibold text-lg"
      >
        {{ month.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'LineChart',
})

const props = defineProps({
  dataPoints: {
    type: Array,
    default: () => [],
  },
})

const months = computed(() => ['outubro', 'novembro', 'dezembro'])

// Calcular valores mínimo e máximo para escala
const minValue = computed(() => {
  return 0 // Sempre começamos do zero para melhor visualização
})

const maxValue = computed(() => {
  // Encontrar o valor máximo nos dados
  const max = Math.max(...props.dataPoints.map((point) => point.value))

  // Determinar a escala (milhões, milhares, etc.)
  let scale = 1
  let increment = 2

  if (max >= 1000000) {
    // Se for milhões, incrementa em milhões
    scale = 1000000
  } else if (max >= 1000) {
    // Se for milhares, incrementa em milhares
    scale = 1000
  }

  // Adicionar 2 unidades da escala identificada
  return max + increment * scale
})

// Calcular valores para o eixo Y
const yAxisValues = computed(() => {
  const min = 0
  const max = maxValue.value
  const step = max / 5 // Dividimos por 5 para ter 6 valores (0 a 5)

  // Criar array com 6 valores
  return Array.from({ length: 6 }, (_, i) => min + i * step)
})

// Formatar valores como moeda
const formatCurrency = (value) => {
  if (value >= 1000000) {
    // Formatar em milhões
    return `R$ ${(value / 1000000).toFixed(1)} mi`
  } else if (value >= 1000) {
    // Formatar em milhares
    return `R$ ${(value / 1000).toFixed(1)} mil`
  } else {
    // Formatar valores menores
    return `R$ ${value.toFixed(2)}`
  }
}

// Funções para calcular as coordenadas das linhas
const getX1 = (index) => {
  const x = generateXValues(index)
  return x + 0.02 // Espaçamento maior depois do ponto
}

const getY1 = (index) => {
  const point = props.dataPoints[index]
  return 0.99 - (point.value - minValue.value) / (maxValue.value - minValue.value)
}

const getX2 = (index) => {
  const x = generateXValues(index + 1)
  return x - 0.02 // Espaçamento maior antes do ponto
}

const getY2 = (index) => {
  const point = props.dataPoints[index + 1]
  return 1.01 - (point.value - minValue.value) / (maxValue.value - minValue.value)
}

const generateXValues = (index) => {
  let x = (index / (props.dataPoints.length - 1)) * 100
  if (index === 0) {
    x = x + 16
    return x / 100
  } else if (index === props.dataPoints.length - 1) {
    x = x - 16
    return x / 100
  }
  return x / 100
}
</script>
