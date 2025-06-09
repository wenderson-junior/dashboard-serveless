import api from './api'

/**
 * Serviço para gerenciar assinaturas
 */
export const subscriptionService = {
  /**
   * Obtém todas as assinaturas do usuário
   * @returns {Promise} Promessa com a lista de assinaturas
   */
  getAllSubscriptions: async () => {
    try {
      const response = await api.get('/subscriptions')
      return response.data
    } catch (error) {
      console.error('Erro ao obter assinaturas:', error)
      throw error
    }
  },

  /**
   * Obtém uma assinatura específica pelo ID
   * @param {string} id - ID da assinatura
   * @returns {Promise} Promessa com os dados da assinatura
   */
  getSubscriptionById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao obter assinatura ${id}:`, error)
      throw error
    }
  },

  /**
   * Cria uma nova assinatura
   * @param {Object} subscriptionData - Dados da assinatura
   * @returns {Promise} Promessa com os dados da nova assinatura
   */
  createSubscription: async (subscriptionData) => {
    try {
      const response = await api.post('/subscriptions', subscriptionData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar assinatura:', error)
      throw error
    }
  },

  /**
   * Atualiza uma assinatura existente
   * @param {string} id - ID da assinatura
   * @param {Object} subscriptionData - Dados atualizados da assinatura
   * @returns {Promise} Promessa com os dados da assinatura atualizada
   */
  updateSubscription: async (id, subscriptionData) => {
    try {
      const response = await api.put(`/subscriptions/${id}`, subscriptionData)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar assinatura ${id}:`, error)
      throw error
    }
  },

  /**
   * Exclui uma assinatura
   * @param {string} id - ID da assinatura
   * @returns {Promise} Promessa com mensagem de sucesso
   */
  deleteSubscription: async (id) => {
    try {
      const response = await api.delete(`/subscriptions/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao excluir assinatura ${id}:`, error)
      throw error
    }
  }
}
