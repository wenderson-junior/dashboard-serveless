import { verifyToken } from '../utils/auth'
import { createSubscription } from '../utils/db'

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const user = verifyToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    const {
      name,
      value,
      frequency,
      paymentMethods,
      feeOptions,
      duration,
      proportionalValue,
      description,
      chargeDate,
    } = req.body

    // Validações básicas
    if (!name || !value || !frequency || !chargeDate) {
      return res.status(400).json({ error: 'Dados incompletos' })
    }

    const startDate = new Date(chargeDate)
    let endDate = null

    if (duration === 'limited') {
      endDate = new Date(startDate)
      endDate.setFullYear(endDate.getFullYear() + 1)
    }

    // Criar objeto de assinatura
    const newSubscription = {
      id: Date.now().toString(),
      name,
      value,
      frequency,
      paymentMethods: paymentMethods || {
        pix: false,
        debitCard: false,
        creditCard: false,
      },
      feeOptions: feeOptions || {
        passFees: false,
        limitInstallments: false,
      },
      duration,
      proportionalValue: proportionalValue || false,
      description: description || '',
      chargeDate: new Date(chargeDate).getDate().toString(), // Extrair apenas o dia
      status: 'active',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,
      createdAt: new Date().toISOString(),
    }

    // Adicionar assinatura ao banco de dados
    const subscription = createSubscription(newSubscription)

    // Retornar assinatura criada
    return res.status(201).json(subscription)
  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
