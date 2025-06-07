<template>
  <div class="flex flex-col h-screen w-full">
    <AppHeader />
    <div class="flex flex-1 overflow-hidden">
      <AppSidebar />
      <main class="flex-1 overflow-auto mr-[14px] pt-5 mb-[25px] bg-gray-100 rounded-3xl">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/header/AppHeader.vue'
import AppSidebar from '@/components/sidebar/AppSidebar.vue'
</script>
