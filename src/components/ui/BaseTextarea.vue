<template>
  <div class="font-inter">
    <label v-if="label" class="block text-md font-semibold text-regular-700 mb-2">{{
      label
    }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full text-md font-normal text-regular-600 border border-regular-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-regular-500 placeholder:text-regular-400"
    ></textarea>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseTextarea',
})

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
})

defineEmits(['update:modelValue'])
</script>
