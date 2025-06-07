<template>
  <aside class="h-full w-[115px] bg-white flex flex-col items-center py-6 pr-[18px]">
    <nav class="flex flex-col items-center gap-6">
      <router-link
        to="/"
        class="flex items-center justify-center size-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative active-icon"
      >
        <img src="@/assets/icons/house-line.svg" alt="Home" />
      </router-link>
      <router-link
        to="/reports"
        class="flex items-center justify-center size-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
      >
        <img src="@/assets/icons/chart-bar.svg" alt="Relatórios" />
      </router-link>
      <router-link
        to="/documents"
        class="flex items-center justify-center size-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
      >
        <img src="@/assets/icons/invoice.svg" alt="Documentos" />
      </router-link>
      <router-link
        to="/settings"
        class="flex items-center justify-center size-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
      >
        <img src="@/assets/icons/gear-six.svg" alt="Configurações" />
      </router-link>
    </nav>
    <div class="mt-auto">
      <router-link
        to="/help"
        class="flex items-center justify-center size-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
      >
        <img src="@/assets/icons/question.svg" alt="Ajuda" />
      </router-link>
    </div>
  </aside>
</template>

<script setup>
defineOptions({
  name: 'AppSidebar',
})
</script>

<style scoped>
.active-icon {
  background-color: var(--color-emphasis);
  color: white;
}

.active-icon::before {
  content: '';
  position: absolute;
  left: -16px;
  width: 4px;
  height: 24px;
  background-color: var(--color-emphasis);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
