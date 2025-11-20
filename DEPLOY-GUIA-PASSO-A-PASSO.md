# 🚀 GUIA PASSO A PASSO - DEPLOY JPR MÓVEIS RÚSTICOS

**Data:** 10 de Novembro de 2025
**Status:** Pronto para Deploy
**Tempo Estimado:** 30-45 minutos

---

## 📋 O Que Vamos Fazer

```
✅ Backend em Railway (com PostgreSQL)
✅ Frontend em Netlify
✅ Conectar os dois
✅ Domínio customizado (opcional)
```

---

## 🎯 PASSO 1: Preparar GitHub

### 1.1 Verificar Git
```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
git status
```

### 1.2 Fazer Commit
```bash
git add .
git commit -m "Deploy JPR Móveis - Railway e Netlify"
git push origin main
```

Se não tiver repositório remoto:
```bash
# Criar em https://github.com/novo/repositorio
git remote add origin https://github.com/seu-usuario/jpr-moveis-rusticos.git
git branch -M main
git push -u origin main
```

---

## 🚂 PASSO 2: Deploy Backend em Railway

### 2.1 Criar Conta Railway
1. Acesse: https://railway.app
2. Clique: "Create New Project"
3. Login com GitHub

### 2.2 Criar Projeto no Railway
```
1. Clique: "Deploy from GitHub"
2. Conecte sua conta GitHub
3. Selecione: jpr-moveis-rusticos
4. Railway detectará automaticamente Node.js
5. Aguarde: ~3-5 minutos para deploy inicial
```

### 2.3 Adicionar PostgreSQL
```
No Dashboard do Railway:
1. Clique: "Add" (botão azul)
2. Selecione: "Database" → "PostgreSQL"
3. Railway cria automaticamente
4. Copie as credenciais que aparecem
```

### 2.4 Configurar Variáveis de Ambiente

**No Railway Dashboard do seu projeto:**

Vá para "Variables" e adicione:

```
# Database (Railway fornece automaticamente)
DATABASE_URL=postgresql://user:password@host:port/db

# Se Railway não criar, adicione manualmente:
DB_HOST=seu-host.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=seu-password

# Server
PORT=3001
NODE_ENV=production

# JWT (IMPORTANTE: Mude isso!)
JWT_SECRET=change-me-to-a-secure-random-key-min-32-chars

# Frontend URLs
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://seu-dominio.netlify.app

# Asaas (opcional, para pagamentos)
ASAAS_API_KEY=sua-chave-aqui
ASAAS_API_URL=https://api.asaas.com/v3

# SendGrid (opcional, para emails)
SENDGRID_API_KEY=sua-chave-aqui
SENDGRID_FROM_EMAIL=contato@seu-dominio.com
```

### 2.5 Verificar Deploy

```bash
# Vá para "Deployments" no Railway
# Deve aparecer: ✅ "Success"

# Clique em "View Logs"
# Procure por: "✅ Servidor JPR Móveis rodando na porta 3001"

# Testar URL (aparece no Railway):
# https://seu-projeto-random.railway.app/health

# Deve retornar:
# {"status":"OK","timestamp":"...","environment":"production"}
```

Se deu erro:
```
1. Clique em "Logs"
2. Procure por "Error"
3. Corrija no GitHub e faça push
4. Railway auto-redeploya
```

---

## 🎨 PASSO 3: Deploy Frontend em Netlify

### 3.1 Criar Conta Netlify
1. Acesse: https://netlify.com
2. Clique: "Sign up"
3. Escolha: "GitHub"

### 3.2 Conectar Repositório
```
1. Clique: "Add new site"
2. Escolha: "Import an existing project"
3. Selecione: "GitHub"
4. Procure: jpr-moveis-rusticos
5. Clique: "Install"
6. Selecione: main branch
```

### 3.3 Configurar Build (Importante!)
```
Build command:     [deixar vazio]
Publish directory: . (ponto = raiz)
```

Clique: "Deploy site"

Netlify vai:
```
1. Fazer push do código
2. Detectar como site estático
3. Publicar em ~1 minuto
4. Dar uma URL: https://seu-site-random.netlify.app
```

### 3.4 Verificar Deploy

Abra no navegador:
```
https://seu-site-random.netlify.app
```

Verificar:
- [ ] Homepage carrega
- [ ] Logo aparece
- [ ] Sem erros (F12 Console)
- [ ] Responsividade (redimensione)

---

## 🔗 PASSO 4: Conectar Frontend ao Backend

### 4.1 Atualizar app-novo.js

**Arquivo:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/app-novo.js`

**Encontre (linha ~1):**
```javascript
const API = 'http://localhost:3001';
```

**Substitua por:**
```javascript
const API = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'  // Desenvolvimento
  : 'https://seu-railway-url.railway.app';  // Produção

// Exemplo real:
// : 'https://jpr-moveis-backend-abc123.railway.app';
```

### 4.2 Fazer Commit e Push
```bash
git add app-novo.js
git commit -m "Configurar URL do backend para produção"
git push origin main
```

### 4.3 Aguardar Re-deploy
```
Netlify detecta mudança automaticamente
Aguarde ~1 minuto
Vá para "Deployments" para confirmar
```

### 4.4 Testar Conexão

Abra no navegador (console F12):
```javascript
// Cole no console:
fetch('https://seu-railway-url.railway.app/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend respondendo!', d))
  .catch(e => console.error('❌ Erro:', e))
```

Deve exibir:
```
✅ Backend respondendo! {status: 'OK', timestamp: '...'}
```

---

## 🔐 PASSO 5: Domínio Customizado (Opcional)

### 5.1 Frontend - Netlify

```
1. Vá para "Site settings" na Netlify
2. Clique "Domain management"
3. Clique "Add custom domain"
4. Digite: jprmoveis.com.br
5. Siga as instruções de DNS
6. Aguarde propagação (até 48h)
```

### 5.2 Backend - Railway

```
1. No Railway Dashboard
2. Vá para seu projeto
3. Clique "Settings"
4. Procure "Custom Domains"
5. Clique "Add"
6. Digite: api.jprmoveis.com.br
7. Railway fornecerá CNAME para DNS
```

### 5.3 Apontar DNS

Se seu registrador é Registro.br/GoDaddy/etc:
```
Criar registros CNAME:
jprmoveis.com.br    → CNAME para Netlify (URL fornecida)
api.jprmoveis.com.br → CNAME para Railway (URL fornecida)
```

---

## 🧪 PASSO 6: Testes em Produção

### 6.1 Testar Backend

```bash
# Health check
curl https://seu-backend.railway.app/health

# Registrar usuário
curl -X POST https://seu-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "senha": "senha123",
    "nome": "Teste"
  }'

# Listar produtos
curl https://seu-backend.railway.app/api/produtos
```

Esperado: Respostas JSON válidas

### 6.2 Testar Frontend

Abra no navegador:
```
https://seu-site.netlify.app
```

Checklist visual:
- [ ] Homepage carrega completamente
- [ ] Logo aparece (não emoji)
- [ ] Menu funciona
- [ ] Busca funciona
- [ ] Adicionar ao carrinho
- [ ] Abrir carrinho
- [ ] Links internos (Blog, Galeria, etc)
- [ ] Formulários
- [ ] Sem erros no console (F12)

### 6.3 Testar Integração

Na página, abra Console (F12):

```javascript
// Teste se consegue acessar backend
fetch('https://seu-backend.railway.app/api/produtos')
  .then(r => r.json())
  .then(d => console.log('Produtos:', d))
```

Deve listar os 3 produtos padrão.

---

## 📊 Checklist Final

### Railway (Backend)
- [ ] Projeto criado
- [ ] GitHub conectado
- [ ] PostgreSQL adicionado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido (✅ nos logs)
- [ ] Health check respondendo
- [ ] Endpoints testados

### Netlify (Frontend)
- [ ] Repositório conectado
- [ ] Build configurado (vazio + raiz)
- [ ] Deploy bem-sucedido
- [ ] App carrega sem erros
- [ ] API_URL atualizado
- [ ] Conecta ao backend
- [ ] Fluxo completo funciona

### URLs Finais
```
Frontend:  https://seu-site.netlify.app
Backend:   https://seu-backend.railway.app
Health:    https://seu-backend.railway.app/health
```

---

## 🔧 Troubleshooting

### "Cannot connect to database"
```
Verificar:
1. DATABASE_URL em Railway correto?
2. Banco PostgreSQL foi criado?
3. Usuário/senha corretos?
4. Botão "Redeploy" no Railway
```

### "CORS Error" no frontend
```
Verificar app-novo.js:
1. API URL está correta?
2. Backend CORS configurado?
3. Verifique: server.js linha 41-46
```

### "404 Not Found" em páginas
```
Netlify precisa de:
1. netlify.toml correto
2. ou arquivo _redirects
3. Verifique arquivo _redirects tem:
   /* /index-nova.html 200
```

### Deploy travou
```
Railway/Netlify:
1. Vá para "Deployments"
2. Clique "Redeploy"
3. Veja logs para erro específico
4. Corrija localmente
5. Faça push (auto-redeploya)
```

---

## 📞 Links Úteis

**Railway:**
- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app
- Suporte: support@railway.app

**Netlify:**
- Dashboard: https://app.netlify.com
- Docs: https://docs.netlify.com
- Suporte: support@netlify.com

---

## 🎉 Sucesso!

Você tem agora:
```
✅ Backend em produção (Railway)
✅ Frontend em produção (Netlify)
✅ Banco de dados PostgreSQL
✅ Sistema funcionando 24/7
```

Próximas ações:
1. Integrar SendGrid (emails)
2. Integrar Asaas (pagamentos)
3. Configurar Analytics
4. Monitorar performance

---

*Guia de Deploy - JPR Móveis Rústicos v1.0*
*Atualizado: 10 de Novembro de 2025*
