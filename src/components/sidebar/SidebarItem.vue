<template>
  <router-link
    :to="to"
    :class="[
      'flex items-center rounded-lg transition-colors relative px-[10px] size-11',
      isActive ? 'bg-active/15 text-regular-800' : 'text-regular-500 hover:bg-gray-100',
      isExpanded ? 'w-full justify-start gap-2' : 'justify-center',
    ]"
  >
    <component
      :is="svgIcon"
      class="size-6"
      :class="isActive ? 'text-active' : 'text-regular-500'"
    />
    <span
      v-if="isExpanded && showLabels"
      class="text-sm font-inter font-normal whitespace-nowrap"
      >{{ label }}</span
    >
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSvgIcon } from '@/utils/iconLoader'

defineOptions({
  name: 'SidebarItem',
})

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
  showLabels: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const isActive = computed(() => {
  return route.path === props.to
})

const svgIcon = computed(() => {
  return getSvgIcon(props.icon)
})
</script>
