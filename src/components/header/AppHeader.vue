<template>
  <header class="flex items-center bg-white w-full h-[80.5px] px-5 md:px-0 relative">
    <!-- Botão de menu no canto esquerdo (apenas em telas pequenas) -->
    <button 
      class="lg:hidden absolute left-5 flex items-center justify-center w-10 h-10 rounded-full hover:bg-regular-100 cursor-pointer" 
      @click="toggleSidebar"
      aria-label="Toggle sidebar menu"
    >
      <img :src="menuIcon" alt="Menu" class="w-6 h-6" />
    </button>
    
    <!-- Logo centralizado em telas pequenas, alinhado à esquerda em telas grandes -->
    <div class="flex-1 flex justify-center lg:justify-start">
      <AppLogo class="lg:ml-[35.5px]" />
    </div>
    
    <!-- Elementos do lado direito do header -->
    <div class="flex items-center space-x-3 md:space-x-6 mr-2 xl:mr-[90px]">
      <AppSearchBar class="xl:mr-[99px]" />
      <AppNotificationIcon class="mr-5 xl:mr-[58px]" />
      <AppUserProfile />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import AppLogo from './Logo.vue'
import AppSearchBar from './SearchBar.vue'
import AppNotificationIcon from './NotificationIcon.vue'
import AppUserProfile from './UserProfile.vue'
import { getIconPath } from '@/utils/iconLoader'

const emit = defineEmits(['toggle-sidebar'])

const menuIcon = computed(() => {
  return getIconPath('menu')
})

function toggleSidebar() {
  emit('toggle-sidebar')
}
</script>
