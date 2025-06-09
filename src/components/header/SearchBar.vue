<template>
  <div class="relative">
    <div
      class="flex items-center px-5 py-3 gap-2.5 w-[474px] h-[46px] bg-regular-100 border border-gray-200 rounded-[40px]"
    >
      <img src="@/assets/icons/magnifying-glass.svg" alt="Buscar" class="w-5 h-5 mr-1" />
      <input
        type="text"
        placeholder="Faça sua busca"
        class="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-regular-300"
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'AppSearchBar',
})
</script>
