import { findUserByEmail } from '../utils/db.js';
import { generateToken } from '../utils/auth.js';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' })
  }

  try {
    const user = findUserByEmail(email)

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = generateToken(user)

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      },
      token
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
