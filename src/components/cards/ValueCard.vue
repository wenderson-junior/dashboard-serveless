<template>
  <div
    :class="[
      'rounded-xl flex flex-col justify-between',
      paddingClass,
      'w-full lg:w-[calc(50%-0.5rem)]',
      bgColorClass,
      borderColorClass ? `border ${borderColorClass}` : '',
    ]"
  >
    <h3
      :class="[
        'font-heading font-medium',
        variant === 'big' ? 'text-lg' : 'text-base',
        titleColorClass,
      ]"
    >
      {{ title }}
    </h3>

    <div
      :class="[
        'font-heading font-bold',
        variant === 'big' ? 'text-3xl' : 'text-2xl',
        valueColorClass,
      ]"
    >
      <span v-if="showCurrency" class="font-normal">R$ </span>{{ value }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ValueCard',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  variant: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'big'].includes(value),
  },
  showCurrency: {
    type: Boolean,
    default: false,
  },
  bgColorClass: {
    type: String,
    default: 'bg-white',
  },
  titleColorClass: {
    type: String,
    default: 'text-regular-500',
  },
  valueColorClass: {
    type: String,
    default: 'text-regular-800',
  },
  borderColorClass: {
    type: String,
    default: '',
  },
  paddingClass: {
    type: String,
    default: '',
  },
})
</script>
