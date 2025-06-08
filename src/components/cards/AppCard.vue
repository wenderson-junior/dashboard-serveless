<template>
  <div
    :class="['bg-white rounded-2xl p-6 h-auto font-poppins', customClasses]"
    :style="customStyles"
  >
    <CardHeader
      :title="title"
      :title-tag="titleTag"
      :percentage-change="percentageChange"
      :show-percentage-icon="showPercentageIcon"
      :variant="variant"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import CardHeader from './CardHeader.vue'

defineOptions({
  name: 'AppCard',
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
  customClasses: {
    type: String,
    default: '',
  },
  customStyles: {
    type: Object,
    default: () => ({}),
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
    validator: (value) => ['normal', 'big'].includes(value),
  },
})
</script>
