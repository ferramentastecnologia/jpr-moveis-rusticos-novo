# 🏠 JPR Móveis Rústicos - Guia de Setup

Bem-vindo ao sistema de vouchers da **JPR Móveis Rústicos**! Este documento contém todas as informações necessárias para configurar e gerenciar o sistema.

## 📋 Índice

1. [Informações da Empresa](#informações-da-empresa)
2. [Próximos Passos](#próximos-passos)
3. [Customização](#customização)
4. [Credenciais](#credenciais)
5. [Deployment](#deployment)

## 📍 Informações da Empresa

**JPR Móveis Rústicos**
- **Localização:** Blumenau, Santa Catarina
- **Telefone:** (47) 3288-3096
- **WhatsApp:** (47) 99233-4348
- **Email:** jpr.moveis.rusticos@gmail.com

## 🎯 Próximos Passos

### 1️⃣ Criar Conta no Asaas
- Acesse: https://asaas.com
- Crie uma conta para JPR Móveis Rústicos
- Gere uma chave API (começará com `$aact_`)
- Copie a chave para o arquivo `.env`

### 2️⃣ Configurar Email
- Gmail: jpr.moveis.rusticos@gmail.com
- Gere uma senha de aplicativo: https://myaccount.google.com/apppasswords
- Copie a senha para o arquivo `.env` (campo `EMAIL_PASS`)

### 3️⃣ Criar Conta no Railway
- Acesse: https://railway.app
- Deploy o repositório (veja seção [Deployment](#deployment))
- Configure variáveis de ambiente em Railway

### 4️⃣ Deploy no Netlify
- Acesse: https://netlify.com
- Conecte este repositório
- Configure build settings:
  - **Build command:** `echo "No build needed"`
  - **Publish directory:** `.`

## 🎨 Customização

### Atualizar Cores
Edite `index-vouchers-black-november.html` (linhas 50-150):

```css
:root {
    --primary: #8B4513;      /* Marrom rústico */
    --secondary: #D2691E;    /* Marrom claro */
    --accent: #DAA520;       /* Dourado */
}
```

### Adicionar Novo Voucher
Edite `index-vouchers-black-november.html`:

```javascript
const vouchers = {
    'jpr-movel-promocao': {
        name: '🪑 Móvel Promocional',
        price: 150.00,
        minQty: 1,
        maxQty: 10,
        emoji: '🪑'
    }
};
```

### Atualizar Contato
Pesquise por `(47) 3288-3096` em todos os arquivos HTML e atualize conforme necessário.

## 🔐 Credenciais

### Admin Login
- **Usuário:** admin
- **Senha:** JPR2025#@ (alterar em produção!)

Acesse: `https://seu-dominio.com/validar-voucher.html`

### API Keys (Variáveis de Ambiente)

```bash
# Asaas - OBRIGATÓRIO
ASAAS_API_KEY=$aact_xxxxxxxxxxxxxxxx

# Email
EMAIL_USER=jpr.moveis.rusticos@gmail.com
EMAIL_PASS=senha_de_app_google

# WhatsApp (opcional)
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=sua_chave_evolution

# Admin (alterar em produção)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=JPR2025#@
```

## 🚀 Deployment

### Deploy no Railway

```bash
# 1. Instalar CLI do Railway
npm i -g @railway/cli

# 2. Login
railway login

# 3. Criar projeto
railway init

# 4. Deploy
railway up
```

### Variáveis no Railway
No dashboard do Railway, adicione:
1. `ASAAS_API_KEY` - Sua chave do Asaas
2. `EMAIL_PASS` - Sua senha de app Google
3. `ADMIN_PASSWORD` - Senha do admin

### URLs de Produção

Após deploy, suas URLs serão:
- **Backend:** `https://jpr-moveis-vouchers-production.up.railway.app`
- **Frontend:** `https://seu-dominio-netlify.netlify.app`

## 📊 Dados do Sistema

### Banco de Dados
- **Tipo:** SQLite (desenvolvimento) → PostgreSQL (produção)
- **Arquivo local:** `vouchers.db`
- **Backup:** `cp vouchers.db vouchers-backup.db`

### Tabelas Principais
```sql
-- Vouchers gerados
SELECT * FROM vouchers;

-- Validações realizadas
SELECT * FROM validations;

-- Pagamentos
SELECT * FROM payments;
```

## 🔍 Monitoramento

### Health Check
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/health
```

### Logs do Railway
```bash
railway logs
```

### Testes Locais
```bash
# Instalar dependências
npm install

# Rodar servidor local
node server-vouchers.js

# Acessar
http://localhost:3000
```

## 🆘 Suporte

### Problemas Comuns

**"Erro ao processar pagamento"**
- Verifique se `ASAAS_API_KEY` está configurada
- Confirme se está em modo sandbox ou produção

**"PDF não carrega"**
- Instale dependência: `npm install pdfkit qrcode`
- Reinicie o servidor

**"Webhook não funciona"**
- Configure URL pública no Asaas: `https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`
- Verifique logs do Railway

## 📝 Checklist de Setup

- [ ] Criar conta Asaas e obter API key
- [ ] Gerar senha de app Google
- [ ] Criar conta Railway
- [ ] Criar conta Netlify
- [ ] Deploy backend no Railway
- [ ] Deploy frontend no Netlify
- [ ] Configurar variáveis de ambiente
- [ ] Testar pagamento com PIX
- [ ] Testar pagamento com Cartão
- [ ] Validar geração de PDF
- [ ] Testar admin login
- [ ] Atualizar contato em HTML files
- [ ] Atualizar cores/branding

## 🎓 Recursos Úteis

- [Documentação Asaas](https://docs.asaas.com)
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)
- [Node.js Express](https://expressjs.com)

---

**Desenvolvido com ❤️ por Juan Minni**
Última atualização: 2025-11-09
