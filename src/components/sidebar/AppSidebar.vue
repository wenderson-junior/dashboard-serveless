<template>
  <aside
    :class="[
      'h-full bg-white flex flex-col items-center pt-11 transition-all duration-200 relative px-6',
      isExpanded ? 'w-[180px]' : 'w-[115px]',
    ]"
  >
    <AppToggleButton :isExpanded="isExpanded" @toggle="toggleSidebar" />
    <nav class="flex flex-col w-full justify-center">
      <SidebarItem
        v-for="item in generalItem"
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
        v-for="item in featureItems"
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
import AppToggleButton from './AppToggleButton.vue'

defineOptions({
  name: 'AppSidebar',
})

const isExpanded = ref(false)
const showLabels = ref(false)

const generalItem = [{ to: '/general', icon: 'house-line', label: 'Visão geral' }]
const featureItems = [
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
