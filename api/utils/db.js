// Importações usando ESM para compatibilidade com Vercel
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter caminho absoluto para o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar dados do arquivo JSON
const db = (() => {
  try {
    // Tenta carregar o arquivo db.json da raiz do projeto
    const dbPath = path.join(process.cwd(), 'db.json');
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      console.log('Banco de dados carregado com sucesso do arquivo db.json');
      return JSON.parse(data);
    }
    throw new Error('Arquivo db.json não encontrado');
  } catch (error) {
    console.error('Erro ao carregar db.json:', error);
    // Dados padrão caso o arquivo não seja encontrado
    return {
      users: [
        {
          id: '1',
          name: 'Admin',
          email: 'admin@cappta.com',
          password: 'admin123',
          role: 'admin',
          photo: null
        },
        {
          id: '2',
          name: 'Gerente',
          email: 'gerente@cappta.com',
          password: 'senha123',
          role: 'manager',
          photo: null
        }
      ],
      clients: [],
      subscriptions: [],
      dashboard: {
        tpvProgression: {
          currentMonth: { value: '0', showCurrency: true },
          previousMonth: { value: '0', showCurrency: true },
          chartData: []
        },
        averageTicket: {
          currentMonth: { value: '0' },
          previousMonth: { value: '0' }
        },
        transactionsCount: {
          currentMonth: { value: '0' },
          previousMonth: { value: '0' }
        },
        markupPercentage: {
          showPercentageIcon: false,
          currentMonth: { value: '0' },
          previousMonth: { value: '0' }
        },
        conversionRate: {
          showPercentageIcon: true,
          currentMonth: { value: '0' },
          previousMonth: { value: '0' }
        }
      }
    };
  }
})();

// Funções para manipulação de usuários
const findUserByEmail = (email) => {
  return db.users.find(user => user.email === email) || null;
};

const findUserById = (id) => {
  return db.users.find(user => user.id === id) || null;
};

const createUser = (userData) => {
  // Gera um ID único para o novo usuário
  const newId = String(Math.max(0, ...db.users.map(u => parseInt(u.id))) + 1);
  
  const newUser = {
    id: newId,
    ...userData,
    photo: userData.photo || null
  };
  
  db.users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  const index = db.users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  // Atualiza apenas os campos fornecidos
  db.users[index] = {
    ...db.users[index],
    ...userData
  };
  
  return db.users[index];
};

// Funções para manipulação de clientes
const findClientById = (id) => {
  return db.clients.find(client => client.id === id) || null;
};

const findClientByEmail = (email) => {
  return db.clients.find(client => client.email === email) || null;
};

const createClient = (clientData) => {
  // Gera um ID único para o novo cliente
  const newId = String(Math.max(0, ...db.clients.map(c => parseInt(c.id))) + 1);
  
  const newClient = {
    id: newId,
    ...clientData,
    createdAt: new Date().toISOString()
  };
  
  db.clients.push(newClient);
  return newClient;
};

const getAllClients = () => {
  return db.clients;
};

// Funções para manipulação de assinaturas
const getAllSubscriptions = () => {
  return db.subscriptions;
};

const getSubscriptionById = (id) => {
  return db.subscriptions.find(sub => sub.id === id) || null;
};

const createSubscription = (subscriptionData) => {
  // Gera um ID único para a nova assinatura
  const newId = String(Math.max(0, ...db.subscriptions.map(s => parseInt(s.id))) + 1);
  
  const newSubscription = {
    id: newId,
    ...subscriptionData,
    createdAt: new Date().toISOString()
  };
  
  db.subscriptions.push(newSubscription);
  return newSubscription;
};

const updateSubscription = (id, subscriptionData) => {
  const index = db.subscriptions.findIndex(sub => sub.id === id);
  if (index === -1) return null;
  
  // Atualiza apenas os campos fornecidos
  db.subscriptions[index] = {
    ...db.subscriptions[index],
    ...subscriptionData
  };
  
  return db.subscriptions[index];
};

const deleteSubscription = (id) => {
  const index = db.subscriptions.findIndex(sub => sub.id === id);
  if (index === -1) return false;
  
  db.subscriptions.splice(index, 1);
  return true;
};

// Função para adicionar uma assinatura a um cliente
const addSubscription = (clientId, subscriptionData) => {
  const client = findClientById(clientId);
  if (!client) return null;
  
  return createSubscription({
    ...subscriptionData,
    clientId
  });
};

// Função para obter dados do dashboard
const getDashboardData = () => {
  return db.dashboard;
};

// Exporta todas as funções
export {
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
  addSubscription
};
