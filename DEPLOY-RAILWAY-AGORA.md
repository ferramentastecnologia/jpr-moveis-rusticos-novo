# 🚂 DEPLOY NO RAILWAY - INSTRUÇÕES DIRETAS

**Data:** 10 de Novembro de 2025
**Status:** Código pronto para upload
**Tempo:** ~15-20 minutos

---

## ✅ Pré-requisitos (Você já tem)

- [x] Railway account com acesso
- [x] Código pronto nesta pasta
- [x] Backend em `/backend`
- [x] Railway CLI (opcional, mas recomendado)

---

## 🚀 OPÇÃO 1: Via Railway Dashboard (Mais Fácil)

### Passo 1: Acessar Railway
```
1. Abra: https://railway.app
2. Faça login com sua conta
3. Vá para: Dashboard
```

### Passo 2: Criar Novo Projeto

```
1. Clique: "Create New Project"
2. Selecione: "Deploy from GitHub"
   (Se não tiver GitHub, use "Deploy from Repo")
3. Se pedir acesso ao GitHub:
   - Autorize Railway
   - Selecione seu repositório: jpr-moveis-rusticos
```

### Passo 3: Configuração Automática

Railway vai detectar automaticamente:
```
✅ Node.js (pela presença de package.json em /backend)
✅ Start command: npm run start
✅ Port: 3001
```

### Passo 4: Adicionar PostgreSQL

```
1. No projeto do Railway
2. Clique: "Add" (botão azul no canto)
3. Selecione: "Database" → "PostgreSQL"
4. Railway cria automaticamente
5. As variáveis de conexão aparecem em "Variables"
```

### Passo 5: Configurar Variáveis de Ambiente

**No Railway Dashboard:**

Vá para **Variables** e adicione:

```toml
# Obtenha do banco PostgreSQL que Railway criou:
DATABASE_URL=postgresql://user:password@host:port/railway

# Ou configure manualmente:
DB_HOST=seu-host
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=sua-senha

# Servidor
PORT=3001
NODE_ENV=production

# JWT (IMPORTANTE: Mude isso para algo seguro!)
JWT_SECRET=sua-chave-super-secreta-com-minimo-32-caracteres

# Frontend
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://seu-dominio.com

# Asaas (opcional)
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3

# SendGrid (opcional)
SENDGRID_API_KEY=sua-chave-sendgrid
SENDGRID_FROM_EMAIL=contato@seu-dominio.com
```

### Passo 6: Deploy

```
1. Clique: "Deploy"
2. Aguarde: ~3-5 minutos
3. Verifique: Logs devem mostrar ✅
4. Procure por: "✅ Servidor JPR Móveis rodando na porta 3001"
```

### Passo 7: Pegar a URL

```
No Dashboard do Railway:
1. Vá para seu projeto
2. Clique em "Settings"
3. Procure por "Domains" ou "Public URL"
4. Cópia a URL: https://seu-projeto-random.railway.app
5. Salve para usar no frontend
```

---

## 🚂 OPÇÃO 2: Via Railway CLI (Mais Rápido)

Se você tiver Railway CLI instalado:

### Passo 1: Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### Passo 2: Login
```bash
railway login
# Vai abrir navegador para autenticar
```

### Passo 3: Inicializar Projeto
```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
railway init
# Selecione seu projeto existente do Railway
```

### Passo 4: Conectar Database
```bash
railway add --database postgresql
# Railway cria PostgreSQL automaticamente
```

### Passo 5: Configurar Variáveis
```bash
railway variables set JWT_SECRET="sua-chave-aqui"
railway variables set NODE_ENV="production"
railway variables set PORT="3001"
# ... adicione outras conforme necessário
```

### Passo 6: Deploy
```bash
railway up
# Faz upload do código e deploya
```

### Passo 7: Ver Logs
```bash
railway logs
# Mostra logs em tempo real
```

### Passo 8: Pegar URL
```bash
railway domain
# Mostra a URL do seu projeto
```

---

## 📋 Checklist de Variáveis Necessárias

**OBRIGATÓRIAS:**
- [ ] DATABASE_URL (Railway fornece)
- [ ] PORT=3001
- [ ] NODE_ENV=production
- [ ] JWT_SECRET (você cria)

**RECOMENDADAS:**
- [ ] FRONTEND_PROD_URL
- [ ] FRONTEND_URL

**OPCIONAIS (mas recomendadas):**
- [ ] ASAAS_API_KEY
- [ ] SENDGRID_API_KEY
- [ ] SENDGRID_FROM_EMAIL

---

## 🧪 Teste Após Deploy

### Teste 1: Health Check
```bash
curl https://seu-projeto-railway.app/health

# Esperado:
# {"status":"OK","timestamp":"...","environment":"production"}
```

### Teste 2: Registrar Usuário
```bash
curl -X POST https://seu-projeto-railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "senha": "senha123",
    "nome": "Teste"
  }'

# Esperado: 201 Created + token JWT
```

### Teste 3: Listar Produtos
```bash
curl https://seu-projeto-railway.app/api/produtos

# Esperado: Array de produtos
```

---

## 🔧 Troubleshooting

### ❌ Deploy não inicia
```
Verificar:
1. Vá para "Logs" no Railway
2. Procure por "Error"
3. Common errors:
   - PORT não está 3001
   - NODE_ENV não está production
   - Database não conecta
```

### ❌ "Cannot connect to database"
```
Solução:
1. Verifique DATABASE_URL está correto
2. Teste: railway variable get DATABASE_URL
3. Se não funcionar, recrie PostgreSQL:
   - Delete o banco
   - Clique "Add" → Database → PostgreSQL
```

### ❌ "Port already in use"
```
Solução:
1. Railway usa port 3001 automaticamente
2. Se houver conflito, mude em:
   PORT=3002
```

### ❌ "Module not found"
```
Solução:
1. Certifique-se que /backend/package.json existe
2. Certifique-se que npm install foi executado
3. Se necessário, railway será executar npm install automaticamente
```

---

## ⚙️ Configuração Adicional (Após Deploy)

### Domínio Customizado
```
1. No Railway Dashboard
2. Projeto → Settings
3. Procure "Domains"
4. Clique "Add Domain"
5. Digite: api.seudominio.com
6. Siga instruções de DNS
```

### Webhooks Asaas
```
Se usando Asaas para pagamentos:
1. Painel Asaas → Webhooks
2. URL: https://seu-projeto.railway.app/api/pagamentos/webhook
3. Eventos: Confirmação de pagamento
```

### Monitoramento
```
Railway fornece automaticamente:
- Logs em tempo real
- Metrics (CPU, memória)
- Deployments histórico
- Rollback automático
```

---

## 📊 URLs Finais Após Deploy

Você terá:

```
Health Check:
https://seu-projeto-railway.app/health

API Endpoints:
https://seu-projeto-railway.app/api/...

Exemplo:
https://seu-projeto-railway.app/api/products
https://seu-projeto-railway.app/api/auth/login
https://seu-projeto-railway.app/api/pedidos
```

---

## 🎯 Próximo Passo: Atualizar Frontend

Após ter a URL do Railway, atualizar:

**File:** `app-novo.js` (linha ~1)

Antes:
```javascript
const API = 'http://localhost:3001';
```

Depois:
```javascript
const API = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://seu-projeto-railway.app';
```

Depois fazer push para GitHub (se tiver repositório):
```bash
git add app-novo.js
git commit -m "Atualizar URL da API para Railway"
git push origin main
```

---

## ✨ Resumo

**15-20 minutos depois:**
```
✅ Backend em produção
✅ PostgreSQL ativo
✅ 13 endpoints funcionais
✅ 24/7 disponível
✅ URL: https://seu-projeto-railway.app
```

---

## 📞 Suporte Railway

- **Docs:** https://docs.railway.app
- **Discord:** https://discord.gg/railway
- **Status:** https://status.railway.app

---

## 🚀 Começar Agora!

1. Abra https://railway.app
2. Clique "Create New Project"
3. Selecione seu repositório
4. Configure PostgreSQL
5. Adicione variáveis
6. Clique "Deploy"
7. Aguarde (3-5 minutos)
8. ✅ Pronto!

---

*Guia Railway Deploy - JPR Móveis Rústicos v1.0*
*Atualizado: 10 de Novembro de 2025*
