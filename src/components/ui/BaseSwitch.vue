<template>
  <div class="flex items-start font-inter">
    <label class="inline-flex items-center cursor-pointer gap-2">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="sr-only peer"
      />
      <div
        class="flex-shrink-0 relative w-[26.5px] h-4 bg-white border-2 border-regular-600 rounded-full peer-focus:outline-none peer-checked:bg-emphasis after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-white after:border-regular-600 after:border-2 after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-full"
      ></div>
      <span v-if="label" class="text-sm font-normal text-regular-700">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseSwitch',
})

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
