<template>
  <div class="flex items-center gap-3 cursor-pointer">
    <div class="bg-gray-500 rounded-lg flex justify-center align-center p-[6px]">
      <img src="@/assets/icons/user.svg" alt="User" />
    </div>
    <div class="font-inter flex flex-col">
      <div>
        <span class="font-semibold text-regular-800 text-lg">Olá, </span>
        <span class="font-normal text-regular-500 text-lg">Cliente!</span>
      </div>
      <span class="text-xs text-regular-400 font-normal">Perfil movimentador</span>
    </div>
    <img src="@/assets/icons/caret-down.svg" alt="Dropdown" />
  </div>
</template>

<script setup>
defineOptions({
  name: 'AppUserProfile',
})
</script>
