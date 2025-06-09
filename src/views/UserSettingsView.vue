<template>
  <div class="p-6 h-full overflow-auto">
    <div class="bg-white rounded-lg shadow p-4 md:p-10 font-inter max-w-full">
      <h2
        class="text-[32px] font-inter font-bold border-b border-gray-50 text-regular-700 pb-4 md:pb-8"
      >
        Configurações do Usuário
      </h2>
      <div class="flex flex-col items-center justify-center mt-8 mb-8">
        <div
          class="w-32 h-32 rounded-2xl bg-gray-500 flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="currentUser?.photo"
            :src="currentUser.photo"
            alt="Avatar do usuário"
            class="w-full h-full object-cover"
          />
          <img v-else src="@/assets/icons/user.svg" alt="User" class="w-20 h-20" />
        </div>
        <div class="mt-6 text-center">
          <h3 class="text-xl font-bold text-regular-700">{{ name }}</h3>
          <p class="text-regular-500 font-medium mt-2">Email</p>
          <p class="text-regular-700 font-bold">{{ email }}</p>
        </div>
      </div>

      <div class="mt-8 text-center text-regular-500">
        <p>Esta página exibe suas informações de perfil.</p>
        <p class="mt-2">Em breve estará disponível a edição das suas informações.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const email = ref('')
const currentUser = ref(null)

onMounted(() => {
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      name.value = user.name || ''
      email.value = user.email || ''
      currentUser.value = user
    }
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error)
  }
})
</script>
