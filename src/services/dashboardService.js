import api from './api'

/**
 * Serviço para gerenciar dados do dashboard
 */
export const dashboardService = {
  /**
   * Obtém os dados do dashboard
   * @returns {Promise} Promessa com os dados do dashboard
   */
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard')
      return response.data
    } catch (error) {
      console.error('Erro ao obter dados do dashboard:', error)
      throw error
    }
  }
}
