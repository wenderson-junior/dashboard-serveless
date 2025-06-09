import { findUserByEmail } from '../utils/db';
import { generateToken } from '../utils/auth';

export default async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }


    const user = findUserByEmail(email);
    

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }


    const token = generateToken(user);

    // Criar uma cópia do usuário sem a senha
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    return res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
