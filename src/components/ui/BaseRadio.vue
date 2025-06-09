<template>
  <label class="flex items-center gap-2 cursor-pointer font-inter">
    <div class="relative">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
        class="sr-only peer"
      />
      <div
        class="flex-shrink-0 w-4 h-4 border border-regular-600 rounded-sm peer-checked:bg-active peer-checked:border-regular-600"
      ></div>
    </div>
    <span class="text-sm font-normal text-regular-700">{{ label }}</span>
  </label>
</template>

<script setup>
defineOptions({
  name: 'BaseRadio',
})

defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
