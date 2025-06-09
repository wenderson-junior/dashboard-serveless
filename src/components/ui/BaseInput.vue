<template>
  <div class="font-inter">
    <label v-if="label" class="block text-md font-semibold text-regular-700 mb-2">{{
      label
    }}</label>
    <div class="relative">
      <span
        v-if="prefix"
        class="text-md font-normal absolute left-[14px] top-[15px] text-regular-400"
        >{{ prefix }}</span
      >
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :class="[
          'text-md font-normal text-regular-600 w-full border border-regular-400 rounded-md p-[14px] focus:outline-none focus:ring-1 focus:ring-regular-500 placeholder:text-regular-400',
          prefix ? 'pl-[42px]' : '',
          type === 'date' ? 'date-input' : '',
        ]"
      />
      <slot name="suffix"></slot>
      <slot name="prefix"></slot>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseInput',
})

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>
