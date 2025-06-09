import api from './api'

/**
 * Serviço para autenticação e gerenciamento de usuários
 */
export const authService = {
  /**
   * Realiza login do usuário
   * @param {Object} credentials - Credenciais do usuário
   * @param {string} credentials.email - Email do usuário
   * @param {string} credentials.password - Senha do usuário
   * @returns {Promise} Promessa com dados do usuário e token
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      
      // Armazenar token e dados do usuário no localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  },

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @param {string} userData.name - Nome do usuário
   * @param {string} userData.email - Email do usuário
   * @param {string} userData.password - Senha do usuário
   * @returns {Promise} Promessa com dados do usuário e token
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      
      // Armazenar token e dados do usuário no localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      throw error
    }
  },

  /**
   * Realiza logout do usuário
   */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} Verdadeiro se o usuário estiver autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  /**
   * Obtém os dados do usuário atual
   * @returns {Object|null} Dados do usuário ou null se não estiver autenticado
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Atualiza o perfil do usuário
   * @param {Object} userData - Dados do usuário para atualizar
   * @param {string} [userData.name] - Novo nome do usuário
   * @param {string} [userData.photo] - Nova foto do usuário (Base64 ou URL)
   * @param {string} [userData.currentPassword] - Senha atual (necessária para alterar a senha)
   * @param {string} [userData.newPassword] - Nova senha
   * @returns {Promise} Promessa com dados do usuário atualizado
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData)
      
      // Atualizar dados do usuário no localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      throw error
    }
  }
}
