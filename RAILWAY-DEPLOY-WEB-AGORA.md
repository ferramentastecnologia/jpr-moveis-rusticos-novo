# 🚂 DEPLOY RAILWAY VIA WEB - AGORA!

**Melhor opção:** Use o Dashboard Railway (mais fácil e rápido)

---

## ⚡ 5 PASSOS SIMPLES (10 MINUTOS)

### PASSO 1: Abra Railway
```
https://railway.app
→ Faça login com sua conta
```

### PASSO 2: Novo Projeto
```
Clique: "New Project"
```

### PASSO 3: Deploy from GitHub
```
Clique: "Deploy from GitHub"
```

### PASSO 4: Autorizar GitHub
```
Se aparecer "Configure GitHub App":
  1. Clique: "Configure GitHub App"
  2. GitHub pedirá autorização
  3. Clique: "Authorize"
```

### PASSO 5: Selecionar Repositório
```
Procure por: jpr-moveis-rusticos
Clique para selecionar
Railway detectará automaticamente
```

---

## ⚙️ Railway Detecta Automaticamente

```
✅ Node.js (package.json)
✅ Backend em /backend
✅ Port 3001
✅ Start command: npm run start
```

---

## 📦 Adicionar PostgreSQL

```
1. No seu projeto do Railway
2. Clique: "Add" (botão azul)
3. Selecione: "Database" → "PostgreSQL"
4. Railway cria automaticamente
5. DATABASE_URL aparece em "Variables"
```

---

## 🔐 Configurar Variáveis

```
No Railway, vá para: "Variables"
Adicione:

JWT_SECRET=sua-chave-aleatoria-com-minimo-32-caracteres
NODE_ENV=production
PORT=3001
FRONTEND_PROD_URL=https://seu-dominio.com
```

Railway fornece automaticamente:
```
DATABASE_URL=postgresql://user:pass@host:port/db
```

---

## 🚀 Deploy

```
1. Clique: "Deploy"
2. Aguarde: 3-5 minutos
3. Verifique logs
4. Procure por: "✅ Servidor JPR Móveis rodando"
```

---

## 📍 Pegar a URL

```
No seu projeto do Railway:
1. Clique: "Settings"
2. Procure: "Domains" ou "Public URL"
3. Copie: https://seu-projeto-random.railway.app
4. Salve para usar no frontend!
```

---

## ✅ Testar

```bash
# Abra outro terminal e execute:
curl https://seu-projeto-railway.app/health

# Esperado:
{"status":"OK","timestamp":"...","environment":"production"}
```

---

## 🎯 Próximo Passo

Após ter a URL do Railway:

1. Abra: `app-novo.js` (linha 1)
2. Encontre: `const API = 'http://localhost:3001';`
3. Substitua por:
```javascript
const API = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://seu-projeto-railway.app';
```
4. Salve
5. Faça push para GitHub
6. Deploy no Netlify!

---

## ⏱️ Tempo Total

```
Dashboard Login:     2 min
Criar Projeto:       2 min
Add PostgreSQL:      2 min
Deploy:             5 min
────────────────────────
TOTAL:            ~10 min ✅
```

---

## 🚀 COMEÇAR AGORA!

1. Abra: https://railway.app
2. Login
3. New Project → Deploy from GitHub
4. Selecione: jpr-moveis-rusticos
5. Add PostgreSQL
6. Configure variáveis
7. Deploy
8. ✅ Pronto!

---

## 📞 Dúvidas?

Railway Docs: https://docs.railway.app
Discord: https://discord.gg/railway

---

**Em 10 minutos seu backend está EM PRODUÇÃO! 🚀**
