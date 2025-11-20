# 🚀 Deploy Completo - JPR Móveis Rústicos Vouchers

Sistema de vouchers com autenticação administrativa implantado em produção.

## 📋 Arquitetura do Sistema

O projeto está dividido em duas partes:

### 1. **Frontend (Netlify)**
- Arquivos estáticos: HTML, CSS, JavaScript
- URL de produção: https://rosamexicanovouchers.netlify.app
- Admin: https://app.netlify.com/projects/rosamexicanovouchers

### 2. **Backend (Railway - Recomendado)**
- Servidor Node.js + Express
- API REST para vouchers
- Banco de dados SQLite
- Precisa ser configurado separadamente

---

## 🎯 Status Atual

### ✅ Frontend no Netlify
- [x] Deploy realizado com sucesso
- [x] Sistema de login implementado (`admin-login.html`)
- [x] Painel admin protegido (`admin-vouchers.html`)
- [x] Exportação de CSV funcionando
- [x] Integração com API pronta

### ⚠️ Backend - Precisa Configurar

**O backend ainda não está no ar!** É necessário fazer deploy no Railway ou outro serviço Node.js.

---

## 🔐 Sistema de Autenticação

### Credenciais Padrão
```
Usuário: admin
Senha: rosa2025
```

**⚠️ IMPORTANTE**: Altere estas credenciais em produção!

### Como Funciona
1. Usuário acessa: `https://rosamexicanovouchers.netlify.app/admin-login.html`
2. Faz login com usuário/senha
3. Sistema valida via API: `POST /api/admin-login`
4. Recebe um token que é armazenado em `sessionStorage`
5. É redirecionado para o painel: `admin-vouchers.html`
6. Painel verifica token antes de carregar
7. Botão "Sair" limpa a sessão

---

## 🛠️ Como Fazer Deploy do Backend

### Opção 1: Railway (Recomendado)

#### 1. Instalar Railway CLI
```bash
npm i -g @railway/cli
```

#### 2. Fazer login
```bash
railway login
```

#### 3. Criar novo projeto
```bash
railway init
```

#### 4. Configurar variáveis de ambiente
No painel do Railway (https://railway.app), adicione:

```env
NODE_ENV=production
PORT=3000
APP_URL=https://seu-projeto.up.railway.app

# Asaas
ASAAS_API_KEY=sua_chave_aqui

# Email
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app

# WhatsApp (Opcional)
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=sua_chave
EVOLUTION_INSTANCE=rosamexicano

# Admin (ALTERAR!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SuaSenhaForteAqui123!
```

#### 5. Fazer deploy
```bash
git push
```

Railway detecta automaticamente que é um projeto Node.js e faz o deploy.

#### 6. Obter URL do backend
Após o deploy, Railway fornecerá uma URL como:
```
https://jpr-moveis-vouchers.up.railway.app
```

---

### Opção 2: Fly.io

#### 1. Instalar Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
```

#### 2. Login e configurar
```bash
fly auth login
fly launch
```

#### 3. Configurar variáveis
```bash
fly secrets set ADMIN_USERNAME=admin
fly secrets set ADMIN_PASSWORD=SuaSenhaForte123!
fly secrets set ASAAS_API_KEY=sua_chave
# ... outras variáveis
```

#### 4. Deploy
```bash
fly deploy
```

---

### Opção 3: Render

1. Acesse: https://render.com
2. Conecte seu repositório GitHub
3. Crie um novo "Web Service"
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Adicione variáveis de ambiente
6. Deploy automático!

---

## 🔗 Conectar Frontend com Backend

Depois que o backend estiver no ar, você precisa atualizar o frontend:

### 1. Criar arquivo de configuração no Netlify

Crie um arquivo `netlify/functions/config.js`:

```javascript
exports.handler = async function() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      apiUrl: process.env.API_URL || 'http://localhost:3000'
    })
  };
};
```

### 2. Configurar variável no Netlify

No painel do Netlify (https://app.netlify.com):
1. Vá em "Site settings"
2. "Environment variables"
3. Adicione: `API_URL` = `https://seu-backend.up.railway.app`

### 3. Ou use um Proxy Reverso

Adicione no arquivo `_redirects` (já existe no projeto):

```
/api/*  https://seu-backend.up.railway.app/api/:splat  200
```

Isso faz com que todas as chamadas para `/api/*` sejam redirecionadas para o backend.

---

## 🧪 Testar o Sistema

### 1. Testar Login
```bash
curl -X POST https://seu-backend.up.railway.app/api/admin-login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"rosa2025"}'
```

Deve retornar:
```json
{
  "success": true,
  "token": "...",
  "username": "admin"
}
```

### 2. Testar API de Vouchers
```bash
curl https://seu-backend.up.railway.app/api/vouchers
```

### 3. Testar no Navegador
1. Acesse: https://rosamexicanovouchers.netlify.app/admin-login.html
2. Faça login com: `admin` / `rosa2025`
3. Deve redirecionar para o painel
4. Verifique se os vouchers carregam

---

## 📊 Monitoramento

### Backend (Railway)
- Logs: `railway logs`
- Métricas: Dashboard do Railway
- Alertas: Configure no painel

### Frontend (Netlify)
- Analytics: Dashboard do Netlify
- Logs de função: https://app.netlify.com/projects/rosamexicanovouchers/logs/functions
- Deploy logs: Ver histórico de deploys

---

## 🔒 Segurança em Produção

### 1. Alterar senha do admin
```bash
# No Railway
railway variables set ADMIN_PASSWORD=SuaSenhaForte123!
```

### 2. Configurar HTTPS
- Netlify: Automático ✅
- Railway: Automático ✅

### 3. Configurar CORS
O backend já está configurado para aceitar qualquer origem (`*`).
Em produção, altere para aceitar apenas o domínio do Netlify:

```javascript
// server-vouchers.js
res.header('Access-Control-Allow-Origin', 'https://rosamexicanovouchers.netlify.app');
```

### 4. Rate Limiting
Adicione proteção contra ataques de força bruta no login.

---

## 📝 Próximos Passos

- [ ] Fazer deploy do backend no Railway
- [ ] Configurar variáveis de ambiente no Railway
- [ ] Atualizar `_redirects` com URL do backend
- [ ] Testar sistema completo
- [ ] Alterar senha do admin
- [ ] Configurar backup do banco de dados
- [ ] Configurar domínio customizado (opcional)

---

## 🆘 Problemas Comuns

### Frontend não conecta com backend
- Verificar se backend está rodando
- Verificar URL no arquivo `_redirects`
- Verificar CORS no backend
- Abrir console do navegador (F12) para ver erros

### Login não funciona
- Verificar credenciais no backend (.env)
- Verificar logs do backend
- Testar rota diretamente com curl

### Vouchers não carregam
- Verificar se backend está respondendo em `/api/vouchers`
- Verificar se banco de dados existe
- Ver logs no console do navegador

---

## 📞 Suporte

Para dúvidas sobre o sistema:
- Email: ferramentas.starken@gmail.com
- Documentação: Arquivos README-*.md no repositório

---

**✨ Sistema desenvolvido por Starken Tecnologia**
**🤖 Com assistência de Claude Code**
