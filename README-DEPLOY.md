# 🚀 GUIA COMPLETO DE DEPLOY - Sistema de Vouchers JPR Móveis Rústicos

## ✅ O QUE JÁ FOI FEITO:

- ✅ Frontend deployado no Netlify
- ✅ Backend configurado com Asaas
- ✅ API Key do Asaas configurada
- ✅ Sistema funcionando localmente

**URLs:**
- Frontend: https://idyllic-bublanina-f8a371.netlify.app/
- Backend: (falta configurar Railway)

---

## 🎯 PRÓXIMOS PASSOS:

### **PASSO 1: DEPLOY DO BACKEND NO RAILWAY**

**ID do seu projeto:** `832d7e3f-a6c9-4b5c-b365-f16fe2378acc`

#### **1.1 - Via Site Railway (RECOMENDADO):**

1. Acesse: https://railway.app/project/832d7e3f-a6c9-4b5c-b365-f16fe2378acc

2. Clique em **"+ New Service"** ou **"Add Service"**

3. Selecione **"GitHub Repo"**

4. Conecte ao repositório: **`meu-repositorio`**

5. **Configure Root Directory:**
   - Vá em: **Settings** do serviço
   - Encontre: **Root Directory**
   - Defina: `jpr-moveis-dashboard`

6. **Configure Start Command:**
   - Em Settings, encontre: **Start Command**
   - Defina: `node server-vouchers.js`

7. **Adicione Variáveis de Ambiente:**
   - Vá em: **Variables**
   - Adicione:

```
ASAAS_API_KEY
$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjE5Y2Q5MDA1LTQ1OGQtNDQzMS1hYmNkLWY1ZGFmMzZjNzYwNzo6JGFhY2hfMDM5MzNkMDMtNTMyNi00YmRmLWI1NGYtMWNiMzU5YTk0MzU0

PORT
3000

NODE_ENV
production

APP_URL
https://AGUARDE_GERAR_DOMINIO.up.railway.app
```

8. **Gere um domínio:**
   - Settings → **Networking** → **Public Networking**
   - Clique em **"Generate Domain"**
   - **COPIE A URL** que aparecer (ex: `https://jpr-moveis-vouchers-production.up.railway.app`)

9. **Atualize a variável APP_URL:**
   - Volte em Variables
   - Edite `APP_URL` e cole a URL que acabou de copiar

10. **Aguarde o deploy completar!**

---

### **PASSO 2: ATUALIZAR FRONTEND PARA APONTAR PARA O BACKEND**

Depois que o Railway estiver rodando:

#### **2.1 - Editar o arquivo checkout-simples.html:**

No seu computador:

1. Abra: `/Users/juanminni/meu-repositorio/jpr-moveis-dashboard/checkout-simples.html`

2. Procure por (linha ~498):
```javascript
const BACKEND_URL = window.location.origin;
```

3. **Substitua por:**
```javascript
const BACKEND_URL = 'https://SUA-URL-DO-RAILWAY.up.railway.app';
```
*(Cole a URL do Railway que você copiou)*

4. **Salve o arquivo**

#### **2.2 - Refazer deploy no Netlify:**

1. Acesse: https://app.netlify.com/drop

2. **Arraste a pasta `jpr-moveis-dashboard` inteira** de novo

3. Isso vai **atualizar** o site com o novo backend configurado!

---

### **PASSO 3: CONFIGURAR WEBHOOK NO ASAAS**

Para o Asaas notificar quando um pagamento for aprovado:

1. Acesse: https://www.asaas.com/config/webhooks

2. Clique em **"Adicionar webhook"** ou **"Configurar webhooks"**

3. **URL do webhook:**
```
https://SUA-URL-DO-RAILWAY.up.railway.app/api/webhook
```
*(Cole a URL do Railway + /api/webhook)*

4. **Eventos para escutar:**
   - ✅ **PAYMENT_RECEIVED** (Pagamento recebido)
   - ✅ **PAYMENT_CONFIRMED** (Pagamento confirmado)
   - ✅ **PAYMENT_APPROVED** (Pagamento aprovado)

5. **Ative o webhook!**

6. **Teste o webhook:**
   - No painel do Asaas, tem opção "Testar webhook"
   - Envie um teste
   - Verifique nos logs do Railway se recebeu

---

### **PASSO 4: TESTAR O SISTEMA COMPLETO**

#### **4.1 - Teste com pagamento de R$ 1,00:**

1. Acesse: **https://idyllic-bublanina-f8a371.netlify.app/**

2. Procure o voucher **🧪 TESTE R$ 1,00**

3. Clique em **"Comprar Agora"**

4. Preencha seus dados reais:
   - Nome
   - Email (você vai receber o voucher aqui se email estiver configurado)
   - WhatsApp
   - CPF

5. Clique em **"Ir para Pagamento"**

6. **Você será redirecionado para o Asaas**

7. **Escolha forma de pagamento:**
   - PIX (mais rápido para testar)
   - Cartão
   - Boleto

8. **Complete o pagamento de R$ 1,00**

9. **Aguarde a confirmação**

10. **Verifique:**
    - ✅ Backend recebeu webhook (veja logs do Railway)
    - ✅ Voucher foi gerado (pasta `vouchers/` no Railway)
    - ⚠️ Email/WhatsApp só funcionam se configurados

---

### **PASSO 5: CONFIGURAR EMAIL E WHATSAPP (OPCIONAL)**

#### **5.1 - Email (Gmail):**

Se quiser enviar vouchers por email:

1. No Railway, adicione variáveis:
```
EMAIL_USER = seu-email@gmail.com
EMAIL_PASS = sua-senha-de-app-gmail
```

2. Como obter senha de app:
   - Acesse: https://myaccount.google.com/security
   - Ative "Verificação em 2 etapas"
   - Vá em: Senhas de app
   - Crie uma senha para "Mail"
   - Use essa senha no EMAIL_PASS

#### **5.2 - WhatsApp (Evolution API):**

Se quiser enviar por WhatsApp:

1. Configure Evolution API (ou outra API)

2. No Railway, adicione:
```
WHATSAPP_API_URL = https://sua-evolution-api.com
WHATSAPP_API_KEY = sua-api-key
WHATSAPP_INSTANCE = nome-instancia
```

---

## 🎯 CHECKLIST FINAL:

Antes de usar em produção:

### Backend:
- [ ] Railway rodando sem erros
- [ ] Logs mostrando servidor iniciado
- [ ] URL pública acessível
- [ ] Variáveis de ambiente configuradas

### Frontend:
- [ ] Netlify carregando a página
- [ ] Vouchers aparecendo
- [ ] BACKEND_URL atualizada para Railway
- [ ] Checkout abrindo corretamente

### Asaas:
- [ ] Webhook configurado
- [ ] Webhook testado e funcionando
- [ ] Logs do Railway mostrando recebimento

### Teste Completo:
- [ ] Compra de R$ 1,00 feita
- [ ] Pagamento processado
- [ ] Webhook recebido
- [ ] Voucher gerado
- [ ] (Opcional) Email enviado
- [ ] (Opcional) WhatsApp enviado

---

## 🐛 TROUBLESHOOTING:

### **Erro: Backend não responde**
- Verifique logs do Railway
- Confirme que Start Command está: `node server-vouchers.js`
- Verifique se APP_URL está correto

### **Erro: Webhook não chega**
- Teste a URL manualmente: `https://sua-url/api/webhook`
- Verifique se webhook está ativo no Asaas
- Veja logs do Railway quando fizer pagamento

### **Erro: Frontend não conecta no backend**
- Verifique se BACKEND_URL está correto no checkout-simples.html
- Refaça deploy no Netlify após atualizar
- Teste abrir a URL do Railway no navegador

---

## 📞 CONTATO E SUPORTE:

**Dúvidas?**
- Documentação Asaas: https://docs.asaas.com/
- Documentação Railway: https://docs.railway.app/

---

## 🎉 PRONTO!

Depois de seguir todos esses passos, seu sistema estará:
- ✅ No ar
- ✅ Aceitando pagamentos
- ✅ Gerando vouchers automaticamente

**Boa sorte e boas vendas!** 🌮💰
