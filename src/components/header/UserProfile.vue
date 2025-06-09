<template>
  <div class="relative" ref="profileElement">
    <div class="flex items-center gap-3 cursor-pointer" @click="toggleDropdown">
      <div class="bg-gray-500 rounded-lg flex justify-center align-center p-[6px]">
        <img
          v-if="currentUser?.photo"
          :src="currentUser.photo"
          alt="Foto de perfil"
          class="w-full h-full object-cover"
        />
        <img v-else src="@/assets/icons/user.svg" alt="User" />
      </div>
      <!-- Informações do usuário apenas para telas md e maiores -->
      <div class="hidden md:flex items-center gap-3">
        <div class="flex flex-col">
          <div class="flex items-center gap-1">
            <span class="font-semibold text-regular-800 text-lg">Olá, </span>
            <span class="font-normal text-regular-500 text-lg">{{ userName }}!</span>
          </div>
          <span class="text-xs text-regular-400 font-normal">{{ userRole }}</span>
        </div>
      </div>
      <img
        :class="{ 'transform rotate-180': isDropdownOpen }"
        src="@/assets/icons/caret-down.svg"
        alt="Dropdown"
        class="transition-transform duration-300"
      />
    </div>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      ref="dropdownMenu"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
    >
      <router-link
        :to="{ name: 'settings' }"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Configurações
      </router-link>
      <button
        @click="logout"
        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Sair
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { authService } from '@/services/authService'

defineOptions({
  name: 'AppUserProfile',
})

const isDropdownOpen = ref(false)

const currentUser = computed(() => {
  return authService.getCurrentUser()
})

const userName = computed(() => {
  return currentUser.value?.name?.split(' ')[0] || 'Usuário'
})

const userRole = computed(() => {
  const roleMap = {
    admin: 'Administrador',
    manager: 'Gerente',
    user: 'Perfil movimentador',
  }
  return roleMap[currentUser.value?.role] || 'Perfil movimentador'
})

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function logout() {
  console.log('Logout iniciado')
  authService.logout()
}

const dropdownMenu = ref(null)
const profileElement = ref(null)

function handleOutsideClick(event) {
  if (
    dropdownMenu.value &&
    !dropdownMenu.value.contains(event.target) &&
    profileElement.value &&
    !profileElement.value.contains(event.target)
  ) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>
