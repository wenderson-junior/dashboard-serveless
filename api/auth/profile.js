import { findUserById, updateUser } from '../utils/db';
import { verifyToken } from '../utils/auth';

export default async (req, res) => {
  console.log('Recebida requisição para /auth/profile');
  console.log('Método:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  // Apenas permitir método PUT
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  
  // Verificar se o corpo da requisição existe
  if (!req.body) {
    console.error('Corpo da requisição vazio ou inválido');
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }

  try {
    // Verificar autenticação
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    // Buscar usuário pelo ID
    console.log('ID do usuário decodificado:', decoded.id);
    const user = findUserById(decoded.id);
    console.log('Usuário encontrado:', user ? 'Sim' : 'Não');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Dados do usuário:', { ...user, password: '[REDACTED]' });

    const { name, currentPassword, newPassword, photo } = req.body;
    console.log('Dados recebidos para atualização:', { 
      name, 
      currentPassword: currentPassword ? '[FORNECIDO]' : '[NÃO FORNECIDO]', 
      newPassword: newPassword ? '[FORNECIDO]' : '[NÃO FORNECIDO]', 
      photo: photo ? '[FORNECIDO]' : '[NÃO FORNECIDO]' 
    });
    const updates = {};

    // Atualizar nome se fornecido
    if (name) {
      updates.name = name;
    }
    
    // Atualizar foto se fornecida
    if (photo !== undefined) {
      updates.photo = photo;
    }

    // Verificar e atualizar senha apenas se a senha atual for fornecida
    if (currentPassword && newPassword) {
      // Em um cenário real, você usaria bcrypt.compare aqui
      if (currentPassword !== user.password) {
        return res.status(400).json({ error: 'Senha atual incorreta' });
      }
      updates.password = newPassword;
    }

    // Atualizar usuário
    console.log('Atualizando usuário com os dados:', updates);
    const updatedUser = updateUser(user.id, updates);
    console.log('Usuário atualizado:', updatedUser ? 'Sucesso' : 'Falha');

    // Criar uma cópia do usuário sem a senha
    const userWithoutPassword = { ...updatedUser };
    delete userWithoutPassword.password;
    
    console.log('Resposta final:', { 
      user: { ...userWithoutPassword }, 
      message: 'Perfil atualizado com sucesso' 
    });

    return res.status(200).json({
      user: userWithoutPassword,
      message: 'Perfil atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    console.error('Stack trace:', error.stack);
    return res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
  }
};
