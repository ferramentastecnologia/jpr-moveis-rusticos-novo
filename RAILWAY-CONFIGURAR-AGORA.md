# 🚂 CONFIGURAR RAILWAY - PASSO A PASSO

**Status:** Servidor criado ✅ | PostgreSQL criado ✅
**Próximo:** Conectar tudo!

---

## 🔐 PASSO 1: Pegar DATABASE_URL do PostgreSQL

### No Railway Dashboard:

```
1. Seu projeto → PostgreSQL (database)
2. Clique na aba: "Variables"
3. Você verá: DATABASE_URL
4. Copie o valor completo:
   postgresql://user:password@host:port/database
5. Salve em um lugar temporário
```

**Exemplo:**
```
postgresql://postgres:abc123@containers-us-west-...railway.app:5432/railway
```

---

## ⚙️ PASSO 2: Configurar Variáveis no Servidor Node.js

### No Railway Dashboard:

```
1. Seu projeto → Node.js (seu servidor)
2. Clique na aba: "Variables"
3. Adicione as seguintes variáveis:
```

**Copie e cole exatamente:**

```
DATABASE_URL=COLE_AQUI_A_URL_DO_POSTGRESQL

JWT_SECRET=sua-chave-super-secreta-aleato-ria-com-minimo-32-caracteres

NODE_ENV=production

PORT=3001

FRONTEND_URL=http://localhost:8001

FRONTEND_PROD_URL=https://seu-dominio.com

ASAAS_API_KEY=sua-chave-asaas-aqui-ou-deixe-vazio

SENDGRID_API_KEY=sua-chave-sendgrid-aqui-ou-deixe-vazio

SENDGRID_FROM_EMAIL=contato@seu-dominio.com
```

---

## 📋 VARIÁVEIS OBRIGATÓRIAS (Mínimo)

```
DATABASE_URL          ← Do PostgreSQL
JWT_SECRET            ← Você gera (qualquer string com 32+ chars)
NODE_ENV              ← production
PORT                  ← 3001
```

---

## 📋 VARIÁVEIS RECOMENDADAS

```
FRONTEND_PROD_URL     ← URL do seu frontend (depois)
```

---

## 📋 VARIÁVEIS OPCIONAIS

```
ASAAS_API_KEY         ← Para pagamentos (deixe vazio se não tem)
SENDGRID_API_KEY      ← Para emails (deixe vazio se não tem)
```

---

## 🎯 COMO ADICIONAR VARIÁVEIS NO RAILWAY

### Método 1: Via Dashboard

```
1. Seu projeto → Node.js
2. Aba: "Variables"
3. Campo vazio que aparece
4. Digite: CHAVE=valor
5. Pressione Enter
6. Repita para cada variável
```

### Método 2: Raw Editor (Melhor)

```
1. Seu projeto → Node.js
2. Aba: "Variables"
3. Clique ícone: "Edit Raw" (canto superior)
4. Cole tudo de uma vez:

DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-32-chars
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://seu-dominio.com

5. Salve
6. Railway auto-redeploya
```

---

## ✅ CHECKLIST

### PostgreSQL:
- [ ] Variables do PostgreSQL acessíveis
- [ ] DATABASE_URL copiado
- [ ] URL começa com: postgresql://

### Node.js:
- [ ] Aba "Variables" aberta
- [ ] DATABASE_URL adicionado
- [ ] JWT_SECRET adicionado
- [ ] NODE_ENV=production adicionado
- [ ] PORT=3001 adicionado
- [ ] Salvo

### Verificação:
- [ ] Railway mostra "Deployment" iniciado
- [ ] Logs mostram: "npm install" rodando
- [ ] Logs mostram: "npm run start" iniciando
- [ ] Logs mostram: "✅ Servidor JPR Móveis rodando"

---

## 🚀 DEPOIS DE ADICIONAR VARIÁVEIS

Railway vai:
```
1. Detectar mudança nas variáveis
2. Fazer redeploy automaticamente
3. Instalar dependências
4. Iniciar o servidor
5. Conectar ao banco de dados
```

Aguarde ~2-3 minutos para tudo ficar pronto.

---

## 📊 VERIFICAR SE FUNCIONOU

### Pegar URL do seu servidor:

```
1. Seu projeto → Node.js
2. Procure por: "Domains" ou "Public URL"
3. Copie a URL: https://seu-projeto-random.railway.app
```

### Testar:

```bash
# No seu terminal:
curl https://seu-projeto-random.railway.app/health

# Esperado:
{"status":"OK","timestamp":"...","environment":"production"}
```

Se aparecer JSON: ✅ Funcionando!
Se aparecer erro: Verifique as variáveis.

---

## 🔍 VERIFICAR LOGS

Se algo der errado:

```
1. Seu projeto → Node.js
2. Aba: "Logs"
3. Procure por:
   - ❌ Error
   - ✅ Servidor rodando
   - ✅ Database conectado
```

---

## 🎯 PRÓXIMO PASSO

Após variáveis configuradas e servidor rodando:

```
1. Copie a URL do servidor
2. Abra: app-novo.js
3. Atualize const API:
   const API = 'https://seu-projeto-railway.app'
4. Commit e push
5. Deploy no Netlify!
```

---

## 💡 DICAS

- **JWT_SECRET:** Use algo como: `echo $(openssl rand -base64 32)`
- **Database URL:** Começa sempre com `postgresql://`
- **Port:** Sempre 3001
- **NODE_ENV:** Sempre `production` em produção

---

## ✨ RESULTADO FINAL

Após tudo configurado:

```
✅ Servidor Node.js: https://seu-projeto.railway.app
✅ PostgreSQL: Conectado e funcionando
✅ Health check: /health respondendo
✅ 13 endpoints: Disponíveis
✅ 24/7: Em produção!
```

---

## 📞 SUPORTE

Se tiver erro:
1. Verifique DATABASE_URL (começa com postgresql://)
2. Verifique JWT_SECRET (mínimo 32 caracteres)
3. Verifique PORT (deve ser 3001)
4. Veja os logs do Railway

---

**Agora vá até o Railway e adicione as variáveis!**

Após isso seu backend estará 100% em produção! 🚀
