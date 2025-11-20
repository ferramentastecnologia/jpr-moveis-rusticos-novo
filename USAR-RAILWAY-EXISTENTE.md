# 🔄 Usando Projeto Railway Existente

Como você já tem um projeto Railway configurado em outra conta, siga estes passos:

---

## 🎯 Opção 1: Deploy Automático via GitHub (Recomendado)

Se o Railway está conectado ao GitHub, o deploy já aconteceu automaticamente! ✨

### Verificar Deploy:

1. **Acesse seu projeto Railway**:
   - https://railway.app/dashboard
   - Encontre o projeto "jpr-moveis-vouchers"

2. **Verifique o Status**:
   - Se estiver "Deployed" ou "Active" ✅
   - Veja os logs para confirmar que subiu

3. **Obter a URL do Backend**:
   - Clique no projeto
   - Vá em "Settings" → "Domains"
   - Copie a URL (ex: `https://jpr-moveis-vouchers-production.up.railway.app`)

---

## 🔧 Verificar/Adicionar Variáveis de Ambiente

No painel do Railway, vá em **"Variables"** e confirme/adicione:

### ✅ Essenciais para o Painel Admin:

```env
NODE_ENV=production
PORT=3000

# IMPORTANTE - Credenciais Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rosa2025
```

⚠️ **ALTERE A SENHA EM PRODUÇÃO!**

### 💳 Asaas (já deve estar configurada):

```env
ASAAS_API_KEY=sua_chave_asaas
```

### 📧 Email (se ainda não estiver):

```env
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=senha_do_app_gmail
```

---

## 🚀 Forçar Novo Deploy

Se o deploy automático não aconteceu:

### Via Interface Web:

1. Acesse o projeto no Railway
2. Clique em **"Deploy"**
3. Selecione **"Deploy Now"**

### Via GitHub:

O código já foi enviado para o GitHub! Se o Railway está conectado, ele deveria fazer deploy automático.

```bash
# Já fizemos isso:
git push origin main
```

---

## 🧪 Testar o Backend

Depois que o deploy estiver completo:

```bash
# Substitua pela URL do seu projeto Railway
RAILWAY_URL="https://jpr-moveis-vouchers-production.up.railway.app"

# Testar health
curl $RAILWAY_URL/health

# Testar login (nova funcionalidade!)
curl -X POST $RAILWAY_URL/api/admin-login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"rosa2025"}'
```

Deve retornar um token! 🎉

---

## 🔗 Conectar Frontend com Backend

Depois de confirmar que o backend está funcionando:

### 1. Execute o script automático:

```bash
./atualizar-url-railway.sh https://SUA-URL-RAILWAY.up.railway.app
```

Este script vai:
- ✅ Atualizar o arquivo `_redirects`
- ✅ Fazer commit e push
- ✅ Deploy no Netlify
- ✅ Testar conectividade

### 2. Ou faça manualmente:

Edite o arquivo `_redirects`:

```
/api/*  https://SUA-URL-RAILWAY.up.railway.app/api/:splat  200
/*  /index.html  200
```

E faça deploy:

```bash
git add _redirects
git commit -m "Conecta frontend com backend Railway"
git push origin main
netlify deploy --prod
```

---

## 🎯 Resumo das Novas Funcionalidades

Estas funcionalidades foram adicionadas hoje:

### 🔐 Sistema de Login Admin
- **URL**: https://rosamexicanovouchers.netlify.app/admin-login.html
- **Rota API**: `POST /api/admin-login`
- **Proteção**: Painel só acessível após login

### 📊 Painel Admin Conectado
- **Dados reais** do banco de dados
- **Exportação CSV** funcionando
- **Download de PDFs** dos vouchers
- **Estatísticas dinâmicas**

### 🔒 Segurança
- Autenticação obrigatória
- Token de sessão
- Logout seguro
- Redirecionamento automático

---

## 📋 Checklist Pós-Deploy

- [ ] Backend está respondendo no Railway
- [ ] Variáveis `ADMIN_USERNAME` e `ADMIN_PASSWORD` configuradas
- [ ] URL do Railway copiada
- [ ] Arquivo `_redirects` atualizado
- [ ] Deploy no Netlify realizado
- [ ] Login testado e funcionando
- [ ] Painel admin carregando vouchers
- [ ] Senha alterada para produção

---

## 🌐 URLs do Sistema

Após configurar tudo:

- **Frontend**: https://rosamexicanovouchers.netlify.app
- **Admin Login**: https://rosamexicanovouchers.netlify.app/admin-login.html
- **Backend**: https://sua-url.up.railway.app
- **Painel Railway**: https://railway.app/dashboard

---

## ⚡ Deploy Rápido (TL;DR)

Se o Railway já está configurado:

```bash
# 1. O código já foi enviado para o GitHub (✅ feito)
# 2. Railway faz deploy automático (deve estar acontecendo agora)
# 3. Obtenha a URL do Railway no dashboard
# 4. Execute:
./atualizar-url-railway.sh https://sua-url-railway.up.railway.app
# 5. Pronto! ✨
```

---

## 🆘 Problemas?

### Deploy não aconteceu automaticamente
- Verifique se o Railway está conectado ao GitHub
- Force um deploy manual no painel
- Verifique os logs no Railway

### Erro 401 no login
- Confirme que `ADMIN_USERNAME` e `ADMIN_PASSWORD` estão configurados
- Teste a rota diretamente com curl
- Verifique os logs do Railway

### Frontend não conecta com backend
- Confirme que o arquivo `_redirects` foi atualizado
- Verifique se fez novo deploy no Netlify
- Teste a URL do Railway diretamente

---

## 📞 Próximos Passos

1. ✅ Verificar status do deploy no Railway
2. ✅ Confirmar variáveis de ambiente
3. ✅ Obter URL do backend
4. ✅ Executar `./atualizar-url-railway.sh`
5. ✅ Testar login: https://rosamexicanovouchers.netlify.app/admin-login.html
6. ✅ Alterar senha em produção

---

**🎉 Tudo pronto para usar!**

**✨ Desenvolvido com Claude Code**
