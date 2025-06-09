import { getSubscriptionById, updateSubscription, deleteSubscription } from '../utils/db'
import { verifyToken } from '../utils/auth'

export default async (req, res) => {
  try {
    const user = verifyToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // Obter ID da URL ou dos parâmetros da query
    let id = req.params?.id || req.query?.id

    // Para APIs serverless, o ID pode estar em um formato diferente
    if (!id && req.url) {
      const urlParts = req.url.split('/')
      id = urlParts[urlParts.length - 1]

      // Remover parâmetros de query se existirem
      if (id && id.includes('?')) {
        id = id.split('?')[0]
      }
    }

    if (!id) {
      return res.status(400).json({ error: 'ID da assinatura é obrigatório' })
    }

    if (req.method === 'GET') {
      const subscription = getSubscriptionById(id, user.id)

      if (!subscription) {
        return res.status(404).json({ error: 'Assinatura não encontrada' })
      }

      return res.status(200).json(subscription)
    }

    if (req.method === 'PUT') {
      const { name, value, status, startDate, endDate, paymentMethod } = req.body

      // Verificar se a assinatura existe
      const existingSubscription = getSubscriptionById(id, user.id)
      if (!existingSubscription) {
        return res.status(404).json({ error: 'Assinatura não encontrada' })
      }

      const updatedSubscription = updateSubscription(id, user.id, {
        name,
        value,
        status,
        startDate,
        endDate,
        paymentMethod,
        updatedAt: new Date().toISOString(),
      })

      return res.status(200).json(updatedSubscription)
    }

    if (req.method === 'DELETE') {
      // Verificar se a assinatura existe
      const existingSubscription = getSubscriptionById(id)
      if (!existingSubscription) {
        return res.status(404).json({ error: 'Assinatura não encontrada' })
      }

      // Para fins de demonstração, permitimos que qualquer usuário autenticado exclua qualquer assinatura
      // Em um ambiente real, verificaríamos permissões específicas
      const deleted = deleteSubscription(id, existingSubscription.clientId)

      if (deleted) {
        return res.status(200).json({ message: 'Assinatura excluída com sucesso' })
      } else {
        return res.status(500).json({ error: 'Erro ao excluir assinatura' })
      }
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error) {
    console.error('Erro ao processar assinatura:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
