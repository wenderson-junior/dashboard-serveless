<template>
  <button
    @click="onClick"
    class="absolute -right-5 top-[25.5px] flex items-center justify-center size-9 rounded-lg bg-white text-gray-600 hover:bg-gray-100 transition-colors z-10"
  >
    <img
      src="@/assets/icons/arrow-line-right.svg"
      :class="{ 'rotate-180': isExpanded }"
      alt="Expandir/Recolher"
    />
  </button>
</template>

<script setup>
defineOptions({
  name: 'AppToggleButton',
})

defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const onClick = () => {
  emit('toggle')
}
</script>
