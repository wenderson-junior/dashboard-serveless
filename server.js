import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3000

const corsOptions = {
  origin: ['http://localhost:5173', 'https://cappta-teste-dev.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))

// Middleware para debug de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  if (req.method === 'PUT' || req.method === 'POST') {
    console.log('Corpo da requisição recebido:', JSON.stringify(req.body, null, 2))
  }
  next()
})

// Função para carregar dinamicamente os handlers de API
const loadApiRoutes = async (app) => {
  const apiPath = join(__dirname, 'api')

  // Função recursiva para carregar os handlers
  const loadHandlers = async (directory) => {
    try {
      const files = fs.readdirSync(directory)

      for (const file of files) {
        const fullPath = join(directory, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // Se for diretório, continua recursivamente
          await loadHandlers(fullPath)
        } else if (file.endsWith('.js') && !file.startsWith('_')) {
          // Se for arquivo JS e não começar com underscore
          const relativePath = fullPath.substring(apiPath.length).replace(/\\/g, '/')
          const routePath = relativePath.replace(/\.js$/, '')

          // Importa o handler
          const { default: handler } = await import(fullPath)

          // Registra a rota
          const apiRoutePath = `/api${routePath}`
          console.log(`Registrando rota: ${apiRoutePath}`)

          // Cria um middleware para processar a requisição
          app.all(apiRoutePath, async (req, res) => {
            try {
              await handler(req, res)
            } catch (error) {
              console.error(`Erro ao processar ${apiRoutePath}:`, error)
              res.status(500).json({ error: 'Erro interno do servidor' })
            }
          })

          // Suporte para rotas dinâmicas com parâmetros
          if (routePath.includes('[') && routePath.includes(']')) {
            const dynamicRoutePath = `/api${routePath.replace(/\[([^\]]+)\]/g, ':$1')}`
            console.log(`Registrando rota dinâmica: ${dynamicRoutePath}`)

            app.all(dynamicRoutePath, async (req, res) => {
              try {
                await handler(req, res)
              } catch (error) {
                console.error(`Erro ao processar ${dynamicRoutePath}:`, error)
                res.status(500).json({ error: 'Erro interno do servidor' })
              }
            })
          }
        }
      }
    } catch (error) {
      console.error(`Erro ao carregar rotas de ${directory}:`, error)
    }
  }

  await loadHandlers(apiPath)
}

loadApiRoutes(app).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`API disponível em http://localhost:${PORT}/api`)
  })
})
