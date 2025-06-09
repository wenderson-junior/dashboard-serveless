<template>
  <div class="flex justify-between items-start mb-4">
    <component
      :is="titleTag"
      v-if="title"
      :class="[
        'font-heading break-words',
        variant === 'big' ? 'text-[32px] font-bold' : 'text-2xl font-semibold',
        'text-regular-800'
      ]"
    >
      {{ title }}
    </component>

    <div v-if="percentageChange !== null" class="flex items-start ml-2 shrink-0">
      <img
        v-if="showPercentageIcon"
        :src="getIconPath(percentageChange >= 0 ? 'arrow-up-right' : 'arrow-down-right')"
        :alt="percentageChange >= 0 ? 'Aumento' : 'Diminuição'"
        :class="[
          'mr-3',
          variant === 'big' ? 'w-8 h-8' : 'w-7 h-7'
        ]"
      />
      <span
        :class="[
          percentageChange >= 0 ? 'text-success-300' : 'text-red-600',
          variant === 'big' ? 'text-2xl' : 'text-xl',
          'font-medium'
        ]"
      >
        {{ percentageChange }}%
      </span>
    </div>
  </div>
</template>

<script setup>
import { getIconPath } from '@/utils/iconLoader'

defineOptions({
  name: 'CardHeader',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
  percentageChange: {
    type: Number,
    default: null,
  },
  showPercentageIcon: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'big'].includes(value)
  }
})
</script>
