# JPR Móveis Rústicos - Backend API

Backend completo para ecommerce de móveis rústicos com Node.js, Express, PostgreSQL e integração Asaas.

## 🚀 Stack Tecnológico

- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Asaas** - Processamento de pagamentos
- **SendGrid** - Email transacional

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── server.js                 # Servidor principal
│   ├── config/
│   │   └── database.js           # Configuração PostgreSQL
│   ├── models/
│   │   └── db.js                 # Query helpers
│   ├── middleware/
│   │   └── auth.js               # JWT e autorização
│   ├── routes/
│   │   ├── auth.js               # Login/Registro
│   │   ├── produtos.js           # CRUD de produtos
│   │   ├── pedidos.js            # Gestão de pedidos
│   │   ├── usuarios.js           # Perfil de usuários
│   │   ├── avaliacoes.js         # Sistema de avaliações
│   │   └── pagamentos.js         # Integração Asaas
│   └── migrations/               # Scripts de migração
├── .env.example                  # Template de variáveis
├── package.json
└── README.md
```

## 🔧 Instalação

### 1. Pré-requisitos
- Node.js v18+
- PostgreSQL instalado e rodando
- npm ou yarn

### 2. Setup Inicial

```bash
# Clonar repositório
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas credenciais
nano .env
```

### 3. Configuração do .env

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jpr_moveis_db
DB_USER=postgres
DB_PASSWORD=sua_senha

# Server
PORT=3001
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_super_segura

# Asaas
ASAAS_API_KEY=sua_api_key_asaas
ASAAS_API_URL=https://api.asaas.com/v3

# Frontend
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://jprmoveis.com.br
```

### 4. Criar Banco de Dados

```bash
# PostgreSQL
createdb jpr_moveis_db

# ou no psql
psql
CREATE DATABASE jpr_moveis_db;
```

## ▶️ Executar Servidor

```bash
# Desenvolvimento (com reload automático)
npm run dev

# Produção
npm start
```

Server rodará em: http://localhost:3001

## 📚 API Endpoints

### Autenticação
- **POST** `/api/auth/register` - Registrar novo usuário
- **POST** `/api/auth/login` - Fazer login
- **POST** `/api/auth/refresh` - Renovar token
- **GET** `/api/auth/me` - Dados do usuário (requer token)

### Produtos
- **GET** `/api/produtos` - Listar produtos com filtros
- **GET** `/api/produtos/:id` - Detalhes do produto
- **POST** `/api/produtos` - Criar produto (admin)
- **PUT** `/api/produtos/:id` - Atualizar produto (admin)
- **DELETE** `/api/produtos/:id` - Deletar produto (admin)

### Pedidos
- **GET** `/api/pedidos` - Listar pedidos (meus ou todos se admin)
- **GET** `/api/pedidos/:id` - Detalhes do pedido com itens
- **POST** `/api/pedidos` - Criar novo pedido
- **PUT** `/api/pedidos/:id` - Atualizar status (admin)

### Pagamentos (Asaas)
- **POST** `/api/pagamentos/criar` - Criar pagamento
- **GET** `/api/pagamentos/:id` - Status do pagamento
- **POST** `/api/pagamentos/webhook` - Webhook Asaas

### Usuários
- **GET** `/api/usuarios/me` - Dados do perfil
- **PUT** `/api/usuarios/me` - Atualizar perfil
- **GET** `/api/usuarios` - Listar usuários (admin)

### Avaliações
- **GET** `/api/avaliacoes?produto_id=id` - Listar avaliações do produto
- **POST** `/api/avaliacoes` - Criar avaliação
- **PUT** `/api/avaliacoes/:id/resposta` - Responder avaliação (admin)
- **POST** `/api/avaliacoes/:id/util` - Marcar como útil

## 🔐 Autenticação

Todos os endpoints protegidos requerem token JWT no header:

```bash
Authorization: Bearer seu_token_aqui
```

## 🗄️ Banco de Dados

### Tabelas Criadas Automaticamente

- `usuarios` - Usuários do sistema
- `produtos` - Catálogo de produtos
- `pedidos` - Histórico de pedidos
- `itens_pedido` - Itens de cada pedido
- `pagamentos` - Registro de pagamentos
- `avaliacoes` - Sistema de reviews
- `cupons` - Cupons de desconto
- `newsletter` - Subscribers
- `logs_admin` - Auditoria

## 💳 Integração Asaas

### Métodos de Pagamento Suportados
- PIX (pagamento instantâneo)
- Cartão de Crédito
- Boleto Bancário

### Webhook Asaas
Configure em https://www.asaas.com:

```
Webhook URL: https://seu-dominio.com/api/pagamentos/webhook
Eventos: payment.confirmed, payment.failed
```

## 📧 Email Transacional

Usando SendGrid para:
- Confirmação de conta
- Confirmação de pedido
- Aviso de pagamento
- Atualizações de status

Configure sua API key do SendGrid no `.env`

## 🚀 Deploy

### Railway (Recomendado)

```bash
# 1. Criar conta em railway.app
# 2. Conectar repositório GitHub
# 3. Selecionar branch
# 4. Adicionar variáveis de ambiente
# 5. Deploy automático
```

### Heroku

```bash
# Login
heroku login

# Criar app
heroku create jpr-moveis-api

# Deploy
git push heroku main
```

## 🧪 Testes

```bash
# Health check
curl http://localhost:3001/health

# Exemplos de requisição
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "senha": "senha123",
    "nome": "João Silva"
  }'
```

## 📋 Checklist de Setup

- [ ] Node.js v18+ instalado
- [ ] PostgreSQL rodando
- [ ] `.env` configurado com variáveis
- [ ] Banco de dados criado
- [ ] Dependencies instaladas (`npm install`)
- [ ] Asaas API key obtida
- [ ] SendGrid API key obtida
- [ ] Servidor iniciando sem erros (`npm run dev`)

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED" no PostgreSQL
```bash
# Verificar se PostgreSQL está rodando
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start
```

### Erro: "Database jpr_moveis_db não existe"
```bash
# Criar banco de dados
createdb jpr_moveis_db
```

### Erro: "Invalid token"
- Verificar se JWT_SECRET no .env está correto
- Renovar token com `/api/auth/refresh`

## 📞 Suporte

Email: contato@jprmoveis.com.br
WhatsApp: (47) 99716-8814

## 📄 Licença

ISC
