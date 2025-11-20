# 🚀 Guia Rápido: Deploy no Railway

## 📋 Pré-requisitos
- ✅ Conta no Railway (gratuita)
- ✅ Repositório no GitHub: `ferramentastecnologia/jpr-moveis-vouchers`

---

## 🎯 Passo a Passo (5 minutos)

### 1. Criar Projeto no Railway

Abri o Railway para você! Siga estes passos:

1. **Acesse**: https://railway.app/new
2. **Clique em**: "Deploy from GitHub repo"
3. **Selecione**: `ferramentastecnologia/jpr-moveis-vouchers`
4. **Aguarde**: Railway detecta Node.js automaticamente

> 💡 O Railway vai fazer o build e deploy automaticamente!

---

### 2. Configurar Variáveis de Ambiente

Após o deploy inicial, clique em **"Variables"** e adicione:

#### ✅ Obrigatórias

```env
NODE_ENV=production
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rosa2025
```

> ⚠️ **IMPORTANTE**: Altere `ADMIN_PASSWORD` para uma senha forte!

#### 💳 Asaas (Pagamentos)

```env
ASAAS_API_KEY=sua_chave_aqui
```

> 📌 Pegue sua chave em: https://www.asaas.com/api

#### 📧 Email (Opcional)

```env
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
```

> 📌 Senha de app: https://myaccount.google.com/apppasswords

---

### 3. Obter URL do Backend

Após o deploy:

1. Vá na aba **"Settings"**
2. Role até **"Domains"**
3. Copie a URL, exemplo:
   ```
   https://jpr-moveis-vouchers-production.up.railway.app
   ```

---

### 4. Atualizar Frontend

Execute o script automático com a URL do Railway:

```bash
./atualizar-url-railway.sh https://SUA-URL-AQUI.up.railway.app
```

Ou manualmente:

1. Edite o arquivo `_redirects`:
   ```
   /api/*  https://SUA-URL-AQUI.up.railway.app/api/:splat  200
   /*  /index.html  200
   ```

2. Commit e push:
   ```bash
   git add _redirects
   git commit -m "Atualiza URL do backend Railway"
   git push origin main
   ```

3. Deploy no Netlify:
   ```bash
   netlify deploy --prod
   ```

---

## 🧪 Testar o Sistema

### 1. Testar Backend

```bash
curl https://SUA-URL.up.railway.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "env": "production",
  "port": "3000"
}
```

### 2. Testar Login

```bash
curl -X POST https://SUA-URL.up.railway.app/api/admin-login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"rosa2025"}'
```

### 3. Testar no Navegador

1. Acesse: https://rosamexicanovouchers.netlify.app/admin-login.html
2. Faça login com: `admin` / `rosa2025`
3. Deve carregar o painel com vouchers

---

## 📊 Monitoramento

### Logs do Railway

```bash
railway logs
```

Ou no dashboard: https://railway.app/dashboard

### Logs do Netlify

https://app.netlify.com/projects/rosamexicanovouchers/logs/functions

---

## ⚠️ Problemas Comuns

### Backend não responde
- Aguarde 2-3 minutos após deploy
- Verifique logs no Railway
- Verifique se as variáveis foram configuradas

### Login não funciona
- Verifique `ADMIN_USERNAME` e `ADMIN_PASSWORD` no Railway
- Teste a rota `/api/admin-login` diretamente

### Vouchers não carregam
- Verifique se backend está no ar
- Verifique arquivo `_redirects`
- Abra console do navegador (F12) para ver erros

---

## 🔒 Segurança

### ✅ Checklist de Produção

- [ ] Alterar `ADMIN_PASSWORD` para senha forte
- [ ] Configurar `ASAAS_API_KEY` de produção
- [ ] Configurar backup do banco de dados
- [ ] Monitorar logs regularmente
- [ ] Testar sistema end-to-end

---

## 📞 Suporte

Se precisar de ajuda:
- **Logs Railway**: `railway logs`
- **Documentação**: Veja `DEPLOY-COMPLETO.md`
- **Email**: ferramentas.starken@gmail.com

---

## 🎉 Pronto!

Seu sistema está no ar:

- 🌐 **Frontend**: https://rosamexicanovouchers.netlify.app
- 🔐 **Admin**: https://rosamexicanovouchers.netlify.app/admin-login.html
- 🖥️ **Backend**: https://sua-url.up.railway.app

**✨ Sistema desenvolvido com Claude Code**
