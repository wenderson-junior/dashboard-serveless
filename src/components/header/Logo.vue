<template>
  <div class="flex items-center">
    <!-- Logo completo para telas md e maiores -->
    <img 
      src="@/assets/logo.svg" 
      height="32px" 
      width="166.15px" 
      alt="Logo" 
      class="hidden md:block"
    />
    <!-- Logo curto para telas menores que md -->
    <img 
      src="@/assets/logo-short.svg" 
      height="32px" 
      width="36px" 
      alt="Logo" 
      class="block md:hidden"
    />
  </div>
</template>

<script setup>
defineOptions({
  name: 'AppLogo',
})
</script>
