<template>
  <div
    class="relative"
    @mouseenter="showTooltip = isInDevelopment"
    @mouseleave="showTooltip = false"
  >
    <component
      :is="action ? 'button' : isInDevelopment ? 'div' : 'router-link'"
      v-bind="action ? {} : isInDevelopment ? {} : { to }"
      @click="action && action()"
      :class="[
        'flex items-center rounded-lg transition-colors relative px-[10px] size-11',
        isActive ? 'bg-active/15 text-regular-800' : 'text-regular-500 hover:bg-gray-100',
        isExpanded ? 'w-full justify-start gap-2' : 'justify-center',
        isInDevelopment ? 'opacity-60 cursor-not-allowed' : '',
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
    </component>

    <BaseTooltip v-if="showTooltip">
      O módulo de "{{ label }}" está em desenvolvimento e estará disponível em breve.
    </BaseTooltip>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSvgIcon } from '@/utils/iconLoader'
import BaseTooltip from '@/components/ui/Tooltip.vue'

defineOptions({
  name: 'SidebarItem',
})

const props = defineProps({
  to: {
    type: String,
    default: '',
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
  action: {
    type: Function,
    default: null,
  },
})

const showTooltip = ref(false)

const isInDevelopment = computed(() => {
  return !props.to || props.to === '#'
})

const route = useRoute()
const isActive = computed(() => {
  return route.path === props.to
})

const svgIcon = computed(() => {
  return getSvgIcon(props.icon)
})
</script>
