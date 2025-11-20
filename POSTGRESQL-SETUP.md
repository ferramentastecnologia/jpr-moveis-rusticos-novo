# Configuração PostgreSQL no Railway

## 🎯 O que isso resolve?

✅ Banco de dados persistente (não reseta em deploys)
✅ Dados seguros e profissionais
✅ Melhor performance que SQLite
✅ Suporta conexões simultâneas

---

## 📋 Passos para Configurar

### 1. Adicionar PostgreSQL no Railway

1. Acesse: https://railway.app
2. Entre no projeto **jpr-moveis-vouchers**
3. Clique em **"+ New"** → **"Database"** → **"Add PostgreSQL"**
4. Aguarde a criação do banco (30-60 segundos)

### 2. Copiar DATABASE_URL

1. Clique no serviço **PostgreSQL** criado
2. Vá na aba **"Variables"**
3. Copie o valor de **DATABASE_URL**
   - Formato: `postgresql://user:pass@host:port/database`

### 3. Configurar no Serviço Node.js

1. Clique no serviço **jpr-moveis-vouchers** (Node.js)
2. Vá na aba **"Variables"**
3. Clique em **"+ New Variable"**
4. Adicione:
   - **Key:** `DATABASE_URL`
   - **Value:** (cole a URL copiada do PostgreSQL)

### 4. Deploy Automático

O Railway fará deploy automaticamente após salvar a variável.

---

## ✅ Verificar se Funcionou

1. Aguarde o deploy terminar (1-2 minutos)
2. Acesse: https://jpr-moveis-vouchers-production.up.railway.app/health
3. Logs devem mostrar: **"🐘 Usando PostgreSQL"**

---

## 🔄 O Sistema Detecta Automaticamente

```javascript
// Se DATABASE_URL existe → PostgreSQL
// Se DATABASE_URL não existe → SQLite (local)
```

**Desenvolvimento local:** SQLite (como antes)
**Produção Railway:** PostgreSQL (automático)

---

## 🗄️ Acessar Banco PostgreSQL

### Via Railway Dashboard
1. Clique no PostgreSQL no Railway
2. Aba **"Data"** → visualizar tabelas

### Via Cliente SQL (TablePlus, DBeaver, etc)
Use a `DATABASE_URL` do Railway para conectar.

---

## 📊 Backup e Restore

### Backup Automático
O Railway faz backup automático do PostgreSQL.

### Backup Manual via Admin
1. Acesse: https://rosamexicanovouchers.netlify.app/admin-vouchers.html
2. Login com credenciais
3. Clique em **"Exportar CSV"**

---

## 🚨 Troubleshooting

### "Connection refused"
- Verificar se DATABASE_URL está configurado no serviço Node.js
- Verificar se PostgreSQL está rodando no Railway

### "SSL required"
O código já está configurado para SSL automático em produção.

### "Tabelas não existem"
As tabelas são criadas automaticamente no primeiro acesso.

---

## 📝 Arquivos Modificados

1. **database.js** (NOVO)
   - Gerencia conexão SQLite/PostgreSQL
   - Cria tabelas automaticamente

2. **server-vouchers.js** (MODIFICADO)
   - Agora importa de `database.js`
   - Compatível com ambos bancos

3. **package.json** (MODIFICADO)
   - Adicionado `pg` (driver PostgreSQL)

---

## 🎉 Pronto!

Após configurar, o sistema:
- ✅ Não perderá mais dados em deploys
- ✅ Terá melhor performance
- ✅ Será mais profissional e escalável

---

**Última atualização:** 07/11/2025
**Responsável:** Starken Tecnologia
