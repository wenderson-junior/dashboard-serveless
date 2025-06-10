import { getDashboardData } from './utils/db.js'
import { verifyToken } from './utils/auth.js'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const user = verifyToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // Adicionado um delay de 2 segundos para visualizar o loading.
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const dashboardData = getDashboardData()

    return res.status(200).json(dashboardData)
  } catch (error) {
    console.error('Erro ao obter dados do dashboard:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
