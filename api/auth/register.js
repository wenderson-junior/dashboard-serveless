import { findUserByEmail, createUser } from '../utils/db';
import { generateToken } from '../utils/auth';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Este email já está em uso' });
    }

    const newUser = createUser({
      name,
      email,
      password,
      role: role || 'Perfil Movimentador' // Usa o role fornecido ou 'Perfil Movimentador' como padrão
    });

    const token = generateToken(newUser);

    // Criar uma cópia do usuário sem a senha
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    return res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
