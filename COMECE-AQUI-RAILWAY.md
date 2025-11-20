# 🚂 COMECE AQUI - DEPLOY RAILWAY AGORA

**Seu código está 100% pronto para o Railway!**

---

## ⚡ 3 Opções (Escolha Uma)

### OPÇÃO 1: Dashboard Railway (Mais Fácil - Recomendado)

**Tempo: ~10-15 minutos**

```
1. Abra: https://railway.app
2. Clique: "New Project"
3. Selecione: "Deploy from GitHub"
4. Escolha: jpr-moveis-rusticos
5. Aguarde Deploy (Railway auto-detecta Node.js)
6. Clique: "Add Database" → PostgreSQL
7. Vá para: "Variables"
8. Configure as variáveis (veja abaixo)
9. Clique: "Deploy"
10. ✅ Pronto! Copie sua URL
```

**Variáveis a Adicionar:**
```
JWT_SECRET=sua-chave-super-secreta-aqui-minimo-32-chars
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://seu-dominio.com
```

---

### OPÇÃO 2: Railway CLI (Mais Rápido)

**Tempo: ~5-10 minutos**

```bash
# 1. Instalar CLI (se não tiver)
npm install -g @railway/cli

# 2. Login
railway login

# 3. Executar script automático
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
chmod +x RAILWAY-SETUP.sh
bash RAILWAY-SETUP.sh

# 4. ✅ Pronto! Pegar URL
railway domain
```

---

### OPÇÃO 3: Manual Step by Step

**Tempo: ~15-20 minutos**

Siga o arquivo: `DEPLOY-RAILWAY-AGORA.md`

---

## 📋 Checklist Rápido

Antes de começar:
- [ ] Você tem acesso ao Railway
- [ ] Código está nesta pasta
- [ ] Backend está em `/backend`
- [ ] PostgreSQL será criado pelo Railway

---

## 🎯 Qual Opção Escolher?

| Opção | Tempo | Dificuldade | Recomendação |
|-------|-------|-------------|--------------|
| **Dashboard** | 10-15 min | Fácil | ✅ **Comece por aqui** |
| **CLI** | 5-10 min | Médio | Se tiver CLI instalado |
| **Manual** | 15-20 min | Detalhado | Se preferir aprender |

---

## 🚀 Começar AGORA com Dashboard (RECOMENDADO)

### PASSO 1: Ir para Railway
```
Abra: https://railway.app
```

### PASSO 2: Criar Novo Projeto
```
Clique: "New Project"
Escolha: "Deploy from GitHub"
Selecione seu repositório: jpr-moveis-rusticos
```

**Railway vai auto-detectar:**
- ✅ Node.js (pela presença de package.json)
- ✅ Start command (npm run start)
- ✅ Port (3001)

### PASSO 3: Adicionar PostgreSQL
```
No seu projeto:
1. Clique: "Add" (botão azul)
2. Selecione: "Database"
3. Escolha: "PostgreSQL"
4. Railway cria automaticamente
5. Variáveis aparecem em "Variables"
```

### PASSO 4: Configurar Variáveis
```
Vá para: "Variables"
Adicione:

JWT_SECRET=seu-secret-key-aleatorio-32-chars
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://seu-dominio.com

(PostgreSQL já vem de DATABASE_URL automaticamente)
```

### PASSO 5: Deploy
```
Clique: "Deploy"
Aguarde: 3-5 minutos
Verifique: Logs devem mostrar ✅
Procure: "✅ Servidor JPR Móveis rodando"
```

### PASSO 6: Copiar URL
```
No Railway Dashboard:
1. Vá para: "Project"
2. Clique em: "Settings"
3. Procure: "Domains" ou "URL"
4. Copie: https://seu-projeto-random.railway.app
5. Salve para usar no frontend
```

---

## ✅ Teste Após Deploy

```bash
# Teste 1: Health Check
curl https://seu-projeto-railway.app/health

# Teste 2: Registrar Usuário
curl -X POST https://seu-projeto-railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@test.com","senha":"123","nome":"Teste"}'

# Teste 3: Listar Produtos
curl https://seu-projeto-railway.app/api/produtos
```

Tudo deve retornar JSON válido ✅

---

## 🔗 Próximo Passo: Atualizar Frontend

Quando tiver a URL do Railway:

**Arquivo:** `app-novo.js` (linha 1)

**Encontre:**
```javascript
const API = 'http://localhost:3001';
```

**Substitua por:**
```javascript
const API = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://seu-projeto-railway.app';
```

**Salve e faça commit:**
```bash
git add app-novo.js
git commit -m "Atualizar API URL para Railway"
git push origin main
```

---

## 📞 Precisar de Ajuda?

- **Dashboard Railway:** https://railway.app
- **Docs:** https://docs.railway.app
- **Discord:** https://discord.gg/railway
- **Arquivo detalhado:** `DEPLOY-RAILWAY-AGORA.md`

---

## 🎉 Resumo

```
Você tem:
✅ Código pronto
✅ Backend implementado
✅ Testes passando (13/13)
✅ Documentação completa

Faltam:
⏳ Upload para Railway (15 minutos)
⏳ Copiar URL
⏳ Atualizar frontend
⏳ Deploy Netlify (opcional)

RESULTADO FINAL:
✅ Backend em produção
✅ PostgreSQL ativo
✅ 13 endpoints funcionais
✅ 24/7 disponível
✅ URL: https://seu-projeto.railway.app
```

---

## ⚡ Quick Reference

```bash
# Se escolher CLI:
npm i -g @railway/cli     # Instalar
railway login              # Autenticar
cd /seu-projeto
railway init              # Inicializar
railway add --database    # Adicionar DB
railway variables set KEY=value  # Configurar
railway up                # Deploy
railway logs              # Ver logs
railway domain            # Ver URL
railway open              # Abrir dashboard
```

---

## 🎯 Status Atual

```
✅ Frontend: Pronto (10 páginas HTML)
✅ Backend: Pronto (13 endpoints)
✅ Testes: Pronto (13/13 passou)
✅ Segurança: Implementada
✅ Documentação: Completa

PRÓXIMO: ⏳ Upload para Railway
```

---

## 🚀 Ação Imediata

**Agora mesmo:**

1. Abra https://railway.app
2. Clique "New Project"
3. Selecione GitHub
4. Escolha jpr-moveis-rusticos
5. Aguarde deployment
6. Configure variáveis
7. ✅ Done!

**Tempo total: ~15 minutos**

---

*Guia Rápido Railway - JPR Móveis Rústicos*
*Comece agora! 🚀*
