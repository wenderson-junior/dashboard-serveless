import axios from 'axios'

// Determinar a URL base da API com base no ambiente
const getBaseUrl = () => {
  // Verificar se estamos em produção (Vercel)
  const isProduction = window.location.hostname === 'cappta-teste-dev.vercel.app'
  
  // Em produção, usar a URL completa da API, em desenvolvimento usar o caminho relativo
  return isProduction 
    ? 'https://cappta-teste-dev.vercel.app/api' 
    : '/api'
}

// Criar instância do Axios com configurações padrão
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o erro for 401 (não autorizado), limpar o token e redirecionar para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Se não estiver na página de login, redirecionar
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
