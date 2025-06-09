<template>
  <button
    class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-regular-100 cursor-pointer mr-2"
    @click="toggleSidebar"
    aria-label="Toggle sidebar menu"
  >
    <div v-html="menuIcon" class="w-6 h-6 text-regular-800"></div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { getSvgIcon } from '@/utils/iconLoader'

defineOptions({
  name: 'MenuButton',
})

const emit = defineEmits(['toggle'])

const menuIcon = computed(() => {
  return getSvgIcon('menu')
})

function toggleSidebar() {
  emit('toggle')
}
</script>
