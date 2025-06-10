# 🚀 Serverless Dashboard

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## 📋 Sobre o Projeto

O **Serverless Dashboard** é uma aplicação web moderna desenvolvida como parte de um desafio técnico, demonstrando proficiência em desenvolvimento web full-stack. O projeto implementa um dashboard pixel-perfect baseado em um design do Figma, com foco em responsividade e experiência do usuário.

### 🌟 Principais Características

- **API Serverless**: Backend robusto e escalável utilizando arquitetura serverless
- **Integração Frontend-Backend**: Comunicação eficiente entre Vue.js e API Express
- **CI/CD com Vercel**: Automação de deploy e integração contínua
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela
- **Navegação com Vue Router**: Sistema de roteamento fluido entre seções
- **Gerenciamento de Estado**: Controle eficiente do estado da aplicação
- **Componentização**: Componentes reutilizáveis para UI consistente

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Vue 3, Tailwind CSS, Vite
- **Backend**: Node.js, Express (Serverless Functions)
- **Integração**: Axios
- **Deploy**: Vercel
- **Controle de Versão**: Git Flow

## 📁 Estrutura do Projeto

```
├── api/                  # API Serverless (Vercel Functions)
│   ├── auth/             # Endpoints de autenticação
│   ├── subscriptions/    # Endpoints de assinaturas
│   └── utils/            # Utilitários da API (db.js, auth.js)
├── public/               # Arquivos públicos
├── src/                  # Código-fonte do frontend
│   ├── assets/           # Recursos estáticos (imagens, ícones)
│   ├── components/       # Componentes Vue reutilizáveis
│   ├── layouts/          # Layouts da aplicação
│   ├── router/           # Configuração do Vue Router
│   ├── services/         # Serviços para comunicação com a API
│   ├── stores/           # Gerenciamento de estado
│   └── views/            # Páginas da aplicação
└── db.json               # Banco de dados em formato JSON
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node (recomendado: v24.1.0 ou superior)
- Bun (gerenciador de pacotes)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/wenderson-junior/dashboard-serveless.git
cd serverless-dashboard

# Instale as dependências
bun install
```

### Executando em Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento frontend
bun dev

# Em outro terminal, inicie o servidor API
bun server
```

O frontend estará disponível em `http://localhost:5173` e a API em `http://localhost:3000`.

### Build para Produção

```bash
bun run build
```

## 🔐 Credenciais de Teste

Para acessar o dashboard, utilize as seguintes credenciais ou realize um cadastro:

- **Email**: cliente@cliente.com
- **Senha**: cliente123

## 📱 Responsividade

O projeto foi desenvolvido com foco em responsividade, adaptando-se perfeitamente a diferentes dispositivos:

- **Desktop**: Layout completo com sidebar expandida
- **Tablet**: Sidebar colapsável e ajustes de layout
- **Mobile**: Menu hambúrguer, sidebar oculta e interface otimizada

## 🌐 Deployment

O projeto está configurado para deploy automático na Vercel, utilizando:

- Frontend: Build estático servido pela CDN da Vercel
- Backend: Vercel Serverless Functions
- Banco de dados: Arquivo JSON persistente

---

Desenvolvido com ❤️ por Wenderson Junior como parte de um desafio técnico.
