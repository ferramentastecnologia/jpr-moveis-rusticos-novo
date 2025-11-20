# STATUS DO DEPLOY - Sistema de Vouchers JPR Móveis Rústicos

**Data:** 03/11/2025
**Status:** Em andamento - Aguardando deploy do backend

---

## ✅ CONCLUÍDO:

### 1. Desenvolvimento
- ✅ Sistema completo de vendas de vouchers criado
- ✅ Frontend com 3 vouchers + voucher de teste (R$ 1,00)
- ✅ Backend Node.js com geração de PDF e QR Code
- ✅ Integração com Asaas (gateway de pagamento)
- ✅ Checkout simplificado sem scroll
- ✅ Sistema de webhook para receber notificações

### 2. Repositório GitHub
- ✅ Código enviado para: https://github.com/ferramentastecnologia/jpr-moveis-vouchers
- ✅ Branch: main
- ✅ Último commit: "fix: Atualizar BACKEND_URL para Railway em produção"

### 3. Frontend (Netlify)
- ✅ Deploy realizado com sucesso
- ✅ URL: https://rosamexicanovouchers.netlify.app/
- ✅ Conectado ao GitHub (auto-deploy habilitado)
- ✅ Backend URL configurada para: https://jpr-moveis-vouchers-production.up.railway.app

### 4. Webhook Asaas
- ✅ Configurado com sucesso
- ✅ Nome: JPR Móveis Rústicos Vouchers
- ✅ URL: https://jpr-moveis-vouchers-production.up.railway.app/api/webhook
- ✅ Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
- ✅ Tipo: Sequencial
- ✅ Fila de sincronização: Ativada

---

## ⏳ PENDENTE:

### 5. Backend (Railway)
- ⏳ **AGUARDANDO:** Upgrade para plano Hobby (US$ 5/mês)
- ⏳ **PRÓXIMOS PASSOS:**
  1. Fazer upgrade do Railway
  2. Criar serviço no Railway
  3. Conectar ao repositório GitHub
  4. Adicionar variáveis de ambiente
  5. Gerar domínio público
  6. Atualizar APP_URL nas variáveis

### 6. Testes
- ⏳ Testar pagamento de R$ 1,00
- ⏳ Verificar geração de voucher
- ⏳ Confirmar recebimento de webhook

---

## 🔧 CONFIGURAÇÕES NECESSÁRIAS:

### Variáveis de Ambiente do Railway:

```env
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjE5Y2Q5MDA1LTQ1OGQtNDQzMS1hYmNkLWY1ZGFmMzZjNzYwNzo6JGFhY2hfMDM5MzNkMDMtNTMyNi00YmRmLWI1NGYtMWNiMzU5YTk0MzU0
PORT=3000
NODE_ENV=production
APP_URL=[URL_DO_RAILWAY_DEPOIS_DE_GERAR]
```

### Start Command do Railway:
```
node server-vouchers.js
```

---

## 📋 CHECKLIST FINAL:

**Backend:**
- [ ] Railway upgrade concluído
- [ ] Serviço criado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio público gerado
- [ ] APP_URL atualizada
- [ ] Deploy com sucesso (logs sem erro)

**Frontend:**
- [x] Netlify deploy funcionando
- [ ] BACKEND_URL atualizada com Railway final (se mudou)
- [ ] Re-deploy no Netlify (se necessário)

**Asaas:**
- [x] Webhook configurado
- [ ] URL do webhook atualizada (se mudou)
- [ ] Teste de webhook enviado
- [ ] Webhook recebido no Railway (verificar logs)

**Teste Final:**
- [ ] Compra de R$ 1,00 realizada
- [ ] Pagamento processado no Asaas
- [ ] Webhook recebido no backend
- [ ] Voucher PDF gerado
- [ ] Voucher entregue (email/WhatsApp se configurado)

---

## 🌐 URLs DO PROJETO:

**Frontend (Netlify):**
https://rosamexicanovouchers.netlify.app/

**Backend (Railway) - PENDENTE:**
https://jpr-moveis-vouchers-production.up.railway.app/

**GitHub:**
https://github.com/ferramentastecnologia/jpr-moveis-vouchers

**Railway Project:**
https://railway.app/project/832d7e3f-a6c9-4b5c-b365-f16fe2378acc

**Asaas Webhooks:**
https://www.asaas.com/config/webhooks

---

## 📞 DADOS DO RESTAURANTE:

- **Nome:** JPR Móveis Rústicos Blumenau
- **Telefone:** (47) 3288-3096
- **WhatsApp:** (47) 99233-4348
- **Endereço:** Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC

---

## 💳 VOUCHERS DISPONÍVEIS:

1. **🧪 TESTE R$ 1,00** - Para testes de pagamento
2. **💃 Quinta no Rosa** - R$ 60,00 por pessoa (mín. 4 mulheres)
3. **🎵 Couvert Livre Ter-Qui** - R$ 10,00 por pessoa
4. **🎉 Couvert Livre Sex-Sáb** - R$ 12,00 por pessoa

---

## 🎯 PRÓXIMO PASSO IMEDIATO:

**Fazer upgrade do Railway para Hobby Plan (US$ 5/mês)**
- Acesse: https://railway.app/project/832d7e3f-a6c9-4b5c-b365-f16fe2378acc
- Clique em "Deploy with Hobby"
- Adicione cartão de crédito
- Após upgrade, criar serviço e conectar ao GitHub

---

**Última atualização:** 03/11/2025 22:55
