# 📧 Plataformas de Email para Envio de Vouchers

## ✅ Opção Atual: Gmail SMTP (Configurada)

**Vantagens:**
- ✅ Grátis
- ✅ Fácil de configurar
- ✅ Confiável
- ✅ Sem limite significativo para poucos envios

**Como Configurar:**

1. **Ativar Verificação em 2 Etapas:**
   - Acesse: https://myaccount.google.com/security
   - Ative "Verificação em duas etapas"

2. **Criar Senha de App:**
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "Mail" e "Outro (nome personalizado)"
   - Digite: "JPR Móveis Rústicos Vouchers"
   - Copie a senha gerada (16 caracteres)

3. **Configurar Variáveis de Ambiente:**
   ```env
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=senha_de_app_gerada
   ```

**Limitações:**
- ⚠️ Limite de ~500 emails/dia (contas pessoais)
- ⚠️ Para mais volume, usar conta Google Workspace

---

## 🔄 Outras Opções Disponíveis

### 1. **SendGrid** (Recomendado para produção)
- ✅ 100 emails/dia grátis
- ✅ Escalável
- ✅ API moderna
- ✅ Analytics de entregas

**Configuração:**
```javascript
const emailTransporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
    }
});
```

**Variáveis:**
```env
EMAIL_USER=apikey
EMAIL_PASS=sua_api_key_sendgrid
```

---

### 2. **Mailgun**
- ✅ 5.000 emails/mês grátis
- ✅ Excelente para APIs
- ✅ Dashboard avançado

**Configuração:**
```javascript
const emailTransporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILGUN_SMTP_USER,
        pass: process.env.MAILGUN_SMTP_PASS
    }
});
```

---

### 3. **Amazon SES**
- ✅ Muito barato ($0.10 por 1.000 emails)
- ✅ Escalável
- ✅ Confiável

**Configuração:**
```javascript
const emailTransporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.AWS_SES_USER,
        pass: process.env.AWS_SES_PASS
    }
});
```

---

### 4. **Zoho Mail**
- ✅ Grátis para até 25 usuários
- ✅ Bom para empresas
- ✅ Interface profissional

---

### 5. **ProtonMail / Outlook**
- ✅ Similar ao Gmail
- ✅ Funciona com SMTP

---

## 🎯 Recomendação por Volume

| Volume de Emails | Recomendação |
|-----------------|--------------|
| < 100/dia | **Gmail** (atual) |
| 100-500/dia | **SendGrid** (gratuito) |
| 500-5.000/mês | **Mailgun** (gratuito) |
| > 5.000/mês | **Amazon SES** ou **SendGrid** pago |

---

## 📝 Para Mudar a Plataforma

Basta alterar a configuração do `emailTransporter` no arquivo `server-vouchers.js` (linha ~58) e atualizar as variáveis de ambiente.






