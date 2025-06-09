<template>
  <div class="flex flex-col h-screen w-full">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="flex flex-1 overflow-hidden">
      <div class="hidden lg:block h-full">
        <AppSidebar />
      </div>
      <transition name="slide">
        <div
          v-if="sidebarMobileOpen"
          class="fixed top-[80.5px] left-0 h-[calc(100vh-80.5px)] z-50 shadow-lg lg:hidden bg-white border-r border-regular-200"
        >
          <AppSidebar />
        </div>
      </transition>
      <main class="flex-1 overflow-auto lg:mr-[14px] mb-[25px] bg-regular-100 rounded-3xl">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '@/components/header/AppHeader.vue'
import AppSidebar from '@/components/sidebar/AppSidebar.vue'

const sidebarMobileOpen = ref(false)

function handleResize() {
  if (window.innerWidth >= 1024) {
    sidebarMobileOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function toggleSidebar() {
  sidebarMobileOpen.value = !sidebarMobileOpen.value
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
