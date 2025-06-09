<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-regular-100 rounded-3xl p-12">
      <div>
        <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Logo" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre na sua conta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link
            :to="{ name: 'register' }"
            class="font-medium text-primary-600 hover:text-gray-500"
          >
            crie uma nova conta
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative"
          role="alert"
        >
          <span class="block sm:inline">{{ error }}</span>
        </div>
        <div class="space-y-4">
          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="Digite seu email"
            required
          />
          <BaseInput
            v-model="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading || !password || !email"
          class="group relative disabled:opacity-50 w-full flex justify-center py-4 px-4 border text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import BaseInput from '@/components/ui/BaseInput.vue'

export default {
  name: 'LoginView',
  components: {
    BaseInput,
  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const error = ref('')

    const handleLogin = async () => {
      try {
        error.value = ''
        isLoading.value = true

        await authService.login({
          email: email.value,
          password: password.value,
        })

        // Redirecionar para a página principal após login bem-sucedido
        router.push({ name: 'general' })
      } catch (err) {
        console.error('Erro ao fazer login:', err)
        error.value =
          err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      isLoading,
      error,
      handleLogin,
    }
  },
}
</script>
