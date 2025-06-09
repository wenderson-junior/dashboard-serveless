import { getAllSubscriptions, createSubscription } from '../utils/db';
import { verifyToken } from '../utils/auth';

export default async (req, res) => {
  try {

    const user = verifyToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' });
    }


    if (req.method === 'GET') {
      const subscriptions = getAllSubscriptions(user.id);
      return res.status(200).json(subscriptions);
    }
    

    if (req.method === 'POST') {
      const { name, value, status, startDate, endDate, paymentMethod } = req.body;
      

      if (!name || !value || !status || !startDate || !endDate || !paymentMethod) {
        return res.status(400).json({ 
          error: 'Dados incompletos. Todos os campos são obrigatórios.' 
        });
      }
      

      const newSubscription = createSubscription({
        userId: user.id,
        name,
        value,
        status,
        startDate,
        endDate,
        paymentMethod
      });
      
      return res.status(201).json(newSubscription);
    }
    

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro ao processar assinaturas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
