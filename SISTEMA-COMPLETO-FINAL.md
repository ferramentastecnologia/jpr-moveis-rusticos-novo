# 🎉 SISTEMA ROSA MEXICANO - 100% OPERACIONAL

**Data:** 04/11/2025
**Status:** ✅ TUDO FUNCIONANDO EM PRODUÇÃO

---

## 🌐 URLs DO SISTEMA

### Frontend (Netlify):
```
https://rosamexicanovouchers.netlify.app/
```
- ✅ Landing Page Black November
- ✅ 7 Vouchers disponíveis
- ✅ Checkout integrado

### Backend (Railway):
```
https://jpr-moveis-vouchers-production.up.railway.app
```
- ✅ API de vouchers
- ✅ Geração de PDF
- ✅ Envio de Email (Gmail SMTP)
- ✅ Webhook Asaas configurado

### WhatsApp (Railway - WAHA):
```
https://waha-jpr-moveis-production.up.railway.app
```
- ✅ WhatsApp conectado (Juan Minni - 5547 92752697)
- ✅ Envio de mensagens funcionando
- ✅ API Key: rosa_mexicano_waha_2024

### Repositórios GitHub:
- Backend: https://github.com/ferramentastecnologia/jpr-moveis-vouchers
- WAHA: https://github.com/ferramentastecnologia/waha-jpr-moveis

---

## 🎯 VOUCHERS DISPONÍVEIS

### BLACK NOVEMBER (3 vouchers):

#### 1. 🧀 Nachos + Churros em Dobro
- **Preço:** R$ 45,00
- **Compra:** 08-14/11/2025
- **Válido até:** 04/12/2025
- **Descrição:** Peça o combo e receba o DOBRO!

#### 2. 💎 Voucher Mágico R$100=R$200 (SUPER HOT!)
- **Preço:** R$ 100,00
- **Compra:** 15-18/11/2025 (APENAS 4 DIAS!)
- **Válido até:** 05/12/2025
- **Descrição:** Dobre seu dinheiro!
- **Destaque:** Promoção principal com animação especial

#### 3. 🍺 Chopp Liberado
- **Preço:** R$ 60,00
- **Compra:** 26-28/11/2025
- **Válido até:** 04/12/2025
- **Descrição:** Bebidas liberadas a noite toda!

### VOUCHERS CLÁSSICOS (4 vouchers):

4. 🧪 **Teste** - R$ 1,00
5. 💃 **Quinta no Rosa** - R$ 60,00 (mín. 4 pessoas)
6. 🎊 **Couvert Livre Ter-Qui** - R$ 10,00
7. 🎉 **Couvert Livre Sex-Sáb** - R$ 12,00

---

## 🔄 FLUXO DE COMPRA COMPLETO

```
1. Cliente acessa: https://rosamexicanovouchers.netlify.app/
   ↓
2. Escolhe voucher + quantidade
   ↓
3. Preenche dados (nome, email, telefone)
   ↓
4. Realiza pagamento via Asaas (PIX ou Cartão)
   ↓
5. Asaas processa e envia webhook para:
   https://jpr-moveis-vouchers-production.up.railway.app/api/webhook
   ↓
6. Backend gera PDF do voucher com QR Code
   ↓
7. Envia automaticamente:
   ✅ EMAIL (Gmail SMTP)
      - PDF anexado
      - Código do voucher
      - Instruções de uso

   ✅ WHATSAPP (WAHA Cloud)
      - Mensagem formatada
      - Link para download do PDF
      - Código do voucher
   ↓
8. Cliente recebe voucher em 2 canais
   ↓
9. Cliente apresenta voucher no restaurante
```

---

## ⚙️ VARIÁVEIS DE AMBIENTE CONFIGURADAS

### Backend (Railway):
```bash
# Aplicação
APP_URL=https://jpr-moveis-vouchers-production.up.railway.app
NODE_ENV=production
PORT=3000

# Asaas (Pagamentos)
ASAAS_API_KEY=<configurado>

# Email (Gmail)
EMAIL_USER=ferramentas.starken@gmail.com
EMAIL_PASS=<configurado>

# WhatsApp (WAHA Cloud)
EVOLUTION_API_URL=https://waha-jpr-moveis-production.up.railway.app
EVOLUTION_API_KEY=rosa_mexicano_waha_2024
EVOLUTION_INSTANCE=default
```

### WAHA (Railway):
```bash
WHATSAPP_API_KEY=rosa_mexicano_waha_2024
PORT=3000
```

---

## 🧪 COMANDOS DE TESTE

### 1. Testar Backend:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/health
```

### 2. Testar WAHA:
```bash
curl -s https://waha-jpr-moveis-production.up.railway.app/api/sessions \
  -H "X-Api-Key: rosa_mexicano_waha_2024"
```

### 3. Enviar mensagem de teste:
```bash
curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sendText \
  -H "X-Api-Key: rosa_mexicano_waha_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "session": "default",
    "chatId": "5547992752697@c.us",
    "text": "Teste do sistema!"
  }'
```

### 4. Gerar PDF de teste:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/api/test-pdf
```

### 5. Listar vouchers vendidos:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/api/vouchers
```

---

## 💰 CUSTOS MENSAIS

### Railway:
- **Backend:** ~$2-3/mês
- **WAHA:** ~$3-5/mês
- **Total:** ~$5-8/mês (~R$ 25-40/mês)

### Netlify:
- **Frontend:** Grátis (até 100GB bandwidth)

### Asaas:
- **Taxa:** 4,99% + R$ 0,40 por transação

### Gmail SMTP:
- **Grátis**

### **CUSTO FIXO TOTAL:** ~R$ 25-40/mês

---

## 📊 ARQUITETURA DO SISTEMA

```
┌─────────────────────────────────────┐
│  👤 Cliente (Navegador)             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  🌐 Netlify (Frontend)              │
│  Landing Page + Checkout            │
│  rosamexicanovouchers.netlify.app   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  🚂 Railway (Backend API)           │
│  - API REST                         │
│  - Geração de PDF                   │
│  - Webhook Asaas                    │
│  jpr-moveis-vouchers...          │
└────────────┬────────────────────────┘
             │
             ├─────────────────────┐
             │                     │
             ▼                     ▼
┌──────────────────┐    ┌──────────────────┐
│  💳 Asaas        │    │  📧 Gmail SMTP   │
│  Pagamentos      │    │  Email           │
└──────────────────┘    └──────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  🚂 Railway (WAHA WhatsApp)         │
│  - WhatsApp HTTP API                │
│  - Envio de mensagens               │
│  waha-jpr-moveis...              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  📱 WhatsApp (Cliente)              │
└─────────────────────────────────────┘
```

---

## ✅ CHECKLIST FINAL

- [x] Frontend deployado no Netlify
- [x] Backend deployado no Railway
- [x] WAHA deployado no Railway
- [x] WhatsApp conectado
- [x] Webhook Asaas configurado
- [x] Email Gmail configurado
- [x] Variáveis de ambiente configuradas
- [x] Teste de geração de PDF
- [x] Teste de envio de email
- [x] Teste de envio de WhatsApp
- [x] Landing Page Black November online
- [x] 7 vouchers configurados e funcionais

---

## 🎁 FEATURES IMPLEMENTADAS

### Frontend:
- ✅ Landing page responsiva (mobile-first)
- ✅ Black November theme (preto/vermelho/dourado)
- ✅ 3 vouchers promocionais + 4 clássicos
- ✅ Seletor de quantidade por voucher
- ✅ Cálculo de total em tempo real
- ✅ Checkout simplificado
- ✅ Integração com Asaas
- ✅ Voucher Mágico com destaque "SUPER HOT"

### Backend:
- ✅ API REST completa
- ✅ Geração automática de PDF com QR Code
- ✅ Envio automático de email
- ✅ Envio automático de WhatsApp
- ✅ Webhook Asaas
- ✅ Validação de vouchers
- ✅ Listagem de vouchers vendidos
- ✅ Download de PDF por código

### WhatsApp:
- ✅ WAHA Cloud (100% web)
- ✅ Sessão persistente
- ✅ Envio de mensagens formatadas
- ✅ Envio de links para download
- ✅ API Key segura

---

## 📞 INFORMAÇÕES DO RESTAURANTE

**Nome:** JPR Móveis Rústicos Blumenau
**Telefone:** (47) 3288-3096
**WhatsApp:** (47) 99233-4348
**Endereço:** Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
**Horário:** Seg-Dom: 18h às 00h

---

## 🆘 SUPORTE E MANUTENÇÃO

### Ver logs no Railway:
1. Acesse: https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b
2. Clique no serviço (backend ou WAHA)
3. Vá em **Deployments**
4. Clique em **View Logs**

### Reconectar WhatsApp:
```bash
# 1. Parar sessão
curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sessions/default/stop \
  -H "X-Api-Key: rosa_mexicano_waha_2024"

# 2. Iniciar sessão
curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sessions/default/start \
  -H "X-Api-Key: rosa_mexicano_waha_2024"

# 3. Gerar QR Code
curl -X GET https://waha-jpr-moveis-production.up.railway.app/api/default/auth/qr \
  -H "X-Api-Key: rosa_mexicano_waha_2024" \
  -H "Accept: image/png" \
  --output waha-qr.png
```

### Webhook Asaas não está funcionando:
1. Verifique: https://www.asaas.com/config/webhooks
2. URL deve ser: https://jpr-moveis-vouchers-production.up.railway.app/api/webhook
3. Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED

---

## 🚀 PRÓXIMAS MELHORIAS (OPCIONAL)

- [ ] Dashboard administrativo para gerenciar vouchers
- [ ] Relatórios de vendas
- [ ] Notificações por email de novas vendas
- [ ] Sistema de fidelidade
- [ ] Integração com Google Analytics
- [ ] Monitoramento com Sentry
- [ ] Backup automático de vouchers
- [ ] Rate limiting na API

---

**DESENVOLVIDO POR:** Starken Tecnologia
**EMAIL:** ferramentas.starken@gmail.com
**SISTEMA:** 100% Cloud (Netlify + Railway)
**DATA:** Novembro/2025

---

## 🎊 SISTEMA PRONTO PARA BLACK NOVEMBER 2025!

**Tudo funcionando perfeitamente. Boas vendas! 🚀**
