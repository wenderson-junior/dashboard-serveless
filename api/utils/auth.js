import jwt from 'jsonwebtoken';

const JWT_SECRET = 'cappta-teste-dev-secret';

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => {
  try {
    console.log('Verificando token:', token ? 'Token fornecido' : 'Token não fornecido');
    
    // Verificar se o token foi fornecido
    if (!token) {
      console.log('Token não fornecido');
      return null;
    }

    // Se o token estiver em um objeto request, extrair o token
    if (typeof token === 'object' && token.headers && token.headers.authorization) {
      console.log('Token é um objeto request, extraindo token do header');
      const authHeader = token.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Header de autorização inválido:', authHeader);
        return null;
      }
      token = authHeader.split(' ')[1];
      console.log('Token extraído do header');
    }

    // Verificar o token
    console.log('Tentando verificar o token com JWT');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado com sucesso:', decoded);
    return decoded;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
};

export {
  generateToken,
  verifyToken
};
