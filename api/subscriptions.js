import { verifyToken } from './utils/auth.js'
import { getAllSubscriptions } from './utils/db.js'
import createSubscription from './subscriptions/create.js'

// Handler para requisições à rota /subscriptions
export default async (req, res) => {
  try {
    const user = verifyToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    if (req.method === 'GET') {
      const subscriptions = getAllSubscriptions()
      return res.status(200).json(subscriptions)
    }

    if (req.method === 'POST') {
      return createSubscription(req, res)
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error) {
    console.error('Erro ao processar requisição de assinaturas:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
