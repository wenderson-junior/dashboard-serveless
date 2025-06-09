<template>
  <aside
    :class="[
      'h-full bg-white flex flex-col items-center pt-11 transition-all duration-300 relative px-6',
      isExpanded ? 'w-[180px]' : 'w-[115px]',
      'z-40',
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
      <!-- Botão de logout com o mesmo layout dos outros itens -->
      <button
        @click="handleLogout"
        :class="[
          'flex items-center rounded-lg transition-colors relative px-[10px] size-11',
          'text-regular-500 hover:bg-gray-100',
          isExpanded ? 'w-full justify-start gap-2' : 'justify-center',
        ]"
      >
        <component
          :is="getSvgIcon('sign-out')"
          class="size-6 text-regular-500"
        />
        <span
          v-if="isExpanded && showLabels"
          class="text-sm font-inter font-normal whitespace-nowrap"
        >Sair</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import AppToggleButton from './AppToggleButton.vue'
import { authService } from '@/services/authService'
import { getSvgIcon } from '@/utils/iconLoader'

defineOptions({
  name: 'AppSidebar',
})

const isExpanded = ref(false)
const showLabels = ref(false)

defineExpose({
  isExpanded,
})

const generalItem = [{ to: '/visao-geral', icon: 'house-line', label: 'Visão geral' }]
const featureItems = [
  { to: '/assinaturas', icon: 'invoice', label: 'Assinaturas' },
  { to: '/', icon: 'chart-bar', label: 'Progressão' },
  { to: '/', icon: 'note-pencil', label: 'Relatórios' },
]
const portalItems = [
  { to: '/configuracoes', icon: 'gear-six', label: 'Config.' },
  { to: '/', icon: 'question', label: 'Ajuda' },
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

// Função para lidar com o logout quando o usuário clica no item "Sair"
function handleLogout() {
  authService.logout()
}
</script>
