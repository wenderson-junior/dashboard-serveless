const fs = require('fs')
const path = require('path')

// Função para ler o banco de dados do arquivo JSON
const readDb = () => {
  try {
    // Para ambiente de desenvolvimento (local) e produção (Vercel)
    const dbPath = path.join(process.cwd(), 'db.json')
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8')
      return JSON.parse(data)
    }
    
    // Fallback para o módulo require
    return require('../../db.json')
  } catch (error) {
    console.error('Erro ao ler banco de dados:', error)
    // Retorna um objeto vazio em caso de erro
    return {
      users: [],
      clients: [],
      subscriptions: [],
      dashboard: {}
    }
  }
}

// Obtém o banco de dados
const db = readDb()

// Funções de acesso ao banco de dados
const findUserByEmail = (email) => {
  return db.users.find((user) => user.email === email)
}

const findUserById = (id) => {
  return db.users.find((user) => {
    return String(user.id) === String(id)
  })
}

const createUser = (userData) => {
  const newId = (Math.max(...db.users.map((u) => parseInt(u.id))) + 1).toString()
  const newUser = { id: newId, ...userData }
  db.users.push(newUser)
  return newUser
}

const findClientById = (id) => {
  return db.clients.find((client) => client.id === id)
}

const findClientByEmail = (email) => {
  return db.clients.find((client) => client.email === email)
}

const createClient = (clientData) => {
  const newId = (Math.max(...db.clients.map((c) => parseInt(c.id))) + 1).toString()
  const newClient = {
    id: newId,
    ...clientData,
    createdAt: new Date().toISOString(),
  }
  db.clients.push(newClient)
  return newClient
}

const getAllClients = () => {
  return db.clients
}

const getAllSubscriptions = (clientId = null) => {
  if (clientId) {
    return db.subscriptions.filter((sub) => sub.clientId === clientId)
  }
  return db.subscriptions
}

const getSubscriptionById = (id, clientId = null) => {
  if (clientId) {
    return db.subscriptions.find((sub) => sub.id === id && sub.clientId === clientId)
  }
  return db.subscriptions.find((sub) => sub.id === id)
}

const createSubscription = (subData) => {
  const newId = (Math.max(...db.subscriptions.map((s) => parseInt(s.id))) + 1).toString()
  const newSubscription = {
    id: newId,
    ...subData,
    createdAt: new Date().toISOString(),
  }
  db.subscriptions.push(newSubscription)
  return newSubscription
}

const updateSubscription = (id, clientId, updateData) => {
  const index = db.subscriptions.findIndex((sub) => sub.id === id && sub.clientId === clientId)
  if (index === -1) return null

  db.subscriptions[index] = { ...db.subscriptions[index], ...updateData }
  return db.subscriptions[index]
}

const deleteSubscription = (id, clientId) => {
  const index = db.subscriptions.findIndex((sub) => sub.id === id && sub.clientId === clientId)
  if (index === -1) return false

  db.subscriptions.splice(index, 1)
  return true
}

const getDashboardData = () => {
  return db.dashboard
}

const addSubscription = (subscription) => {
  db.subscriptions.push(subscription)
  return subscription
}

const updateUser = (id, updateData) => {
  const index = db.users.findIndex((user) => String(user.id) === String(id))
  if (index === -1) return null

  db.users[index] = { ...db.users[index], ...updateData }
  return db.users[index]
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  findClientById,
  findClientByEmail,
  createClient,
  getAllClients,
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getDashboardData,
  updateUser,
  addSubscription,
}
