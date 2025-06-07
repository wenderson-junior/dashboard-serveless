<template>
  <aside
    :class="[
      'h-full bg-white flex flex-col items-center pt-11 transition-all duration-200 relative px-6',
      isExpanded ? 'w-[180px]' : 'w-[115px]',
    ]"
  >
    <button
      @click="toggleSidebar"
      class="absolute -right-5 top-[25.5px] flex items-center justify-center size-9 rounded-lg bg-white pa-[6px] text-gray-600 hover:bg-gray-100 transition-colors z-10"
    >
      <img
        src="@/assets/icons/arrow-line-right.svg"
        :class="{ 'rotate-180': isExpanded }"
        alt="Expandir/Recolher"
      />
    </button>
    <nav class="flex flex-col w-full justify-center">
      <SidebarItem
        v-for="item in homeItem"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        :isExpanded="isExpanded"
        :showLabels="showLabels"
      />
    </nav>
    <nav class="flex flex-col w-full mt-22 gap-4">
      <SidebarItem
        v-for="item in generalItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        :isExpanded="isExpanded"
        :showLabels="showLabels"
      />
    </nav>
    <div class="w-[49px] mt-12 mb-4 flex">
      <span class="text-xs font-inter font-normal text-regular-500">Portal</span>
    </div>

    <nav class="flex flex-col w-full gap-4">
      <SidebarItem
        v-for="item in portalItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        :isExpanded="isExpanded"
        :showLabels="showLabels"
      />
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'

defineOptions({
  name: 'AppSidebar',
})

const isExpanded = ref(false)
const showLabels = ref(false)

const homeItem = [{ to: '/', icon: 'house-line', label: 'Visão geral' }]
const generalItems = [
  { to: '/reports', icon: 'invoice', label: 'Relatórios' },
  { to: '/', icon: 'chart-bar', label: 'Progressão' },
  { to: '/', icon: 'note-pencil', label: 'Assinaturas' },
]
const portalItems = [
  { to: '/', icon: 'gear-six', label: 'Config.' },
  { to: '/', icon: 'question', label: 'Ajuda' },
  { to: '/', icon: 'sign-out', label: 'Sair' },
]

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value) {
    setTimeout(() => {
      showLabels.value = true
    }, 225)
  } else {
    showLabels.value = false
  }
}
</script>
