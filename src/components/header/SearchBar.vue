<template>
  <div class="relative">
    <!-- Barra de busca completa para telas lg e maiores -->
    <div
      class="hidden lg:flex items-center px-5 py-3 gap-2.5 w-[474px] h-[46px] bg-regular-100 border border-gray-200 rounded-[40px]"
    >
      <img src="@/assets/icons/magnifying-glass.svg" alt="Buscar" class="w-5 h-5 mr-1" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Faça sua busca"
        class="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-regular-300"
      />
    </div>

    <!-- Apenas ícone de busca para telas menores que lg -->
    <div
      class="flex lg:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-regular-100 cursor-pointer"
      @click="toggleSearch"
    >
      <img src="@/assets/icons/magnifying-glass.svg" alt="Buscar" class="w-6 h-6" />
    </div>

    <!-- Overlay de busca para telas menores -->
    <div v-if="showSearch" class="fixed top-0 left-0 z-50 w-full">
      <div class="bg-white w-full h-[80.5px] flex items-center px-8">
        <div class="flex items-center w-full">
          <img src="@/assets/icons/magnifying-glass.svg" alt="Buscar" class="w-6 h-6 mr-3" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Faça sua busca"
            class="flex-1 bg-transparent focus:outline-none text-gray-800"
            ref="searchInput"
            @keyup.enter="performSearch"
            @keyup.esc="closeSearch"
            autofocus
          />
          <button
            @click="closeSearch"
            class="ml-2 text-gray-500 hover:text-gray-700 p-2"
            aria-label="Fechar busca"
          >
            <span class="text-4xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

defineOptions({
  name: 'AppSearchBar',
})

const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function toggleSearch() {
  showSearch.value = !showSearch.value

  if (showSearch.value) {
    // Foca no input quando o overlay é aberto
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

function closeSearch() {
  showSearch.value = false
}

function performSearch() {
  // Implementar a lógica de busca aqui
  console.log('Buscando por:', searchQuery.value)
  closeSearch()
}
</script>
