# 🔄 Atualizar Backend - WhatsApp Cloud

**Status:** ✅ WAHA conectado no Railway
**URL WAHA:** https://waha-jpr-moveis-production.up.railway.app
**Sessão:** default (Juan Minni - 5547 92752697)

---

## 📝 Variáveis para Adicionar no Backend

Acesse: **https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b**

### 1. Clique no serviço: `jpr-moveis-vouchers`

### 2. Vá em: **Variables**

### 3. Adicione/Edite estas variáveis:

```
EVOLUTION_API_URL=https://waha-jpr-moveis-production.up.railway.app
EVOLUTION_API_KEY=rosa_mexicano_waha_2024
EVOLUTION_INSTANCE=default
```

### 4. Clique em **Deploy** (se necessário)

O Railway vai fazer redeploy automaticamente ao salvar.

---

## 🧪 Teste Após Atualizar

```bash
# 1. Testar WAHA diretamente
curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sendText \
  -H "X-Api-Key: rosa_mexicano_waha_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "session": "default",
    "chatId": "5547992752697@c.us",
    "text": "🎉 WAHA Cloud funcionando perfeitamente!"
  }'

# 2. Verificar health do backend
curl https://jpr-moveis-vouchers-production.up.railway.app/health

# 3. Fazer compra de teste
# Acesse: https://rosamexicanovouchers.netlify.app/
# Compre o voucher de teste (R$ 1,00)
# Aguarde receber:
#   ✅ Email com PDF
#   ✅ WhatsApp com link do PDF
```

---

## ✅ Checklist Final

- [x] WAHA deployado no Railway
- [x] WhatsApp conectado (Juan Minni)
- [ ] Variáveis atualizadas no backend
- [ ] Teste de mensagem direta
- [ ] Teste de voucher completo

---

## 🌐 URLs Finais do Sistema

### Frontend:
```
https://rosamexicanovouchers.netlify.app/
```

### Backend:
```
https://jpr-moveis-vouchers-production.up.railway.app
```

### WAHA (WhatsApp):
```
https://waha-jpr-moveis-production.up.railway.app
```

### GitHub:
- Backend: https://github.com/ferramentastecnologia/jpr-moveis-vouchers
- WAHA: https://github.com/ferramentastecnologia/waha-jpr-moveis

---

## 📊 Arquitetura Final (100% Cloud)

```
Cliente (Navegador)
    ↓
Netlify (Frontend)
https://rosamexicanovouchers.netlify.app/
    ↓
Railway (Backend API)
https://jpr-moveis-vouchers-production.up.railway.app
    ↓
├── Asaas (Pagamento)
├── Gmail SMTP (Email)
└── Railway (WAHA WhatsApp)
    https://waha-jpr-moveis-production.up.railway.app
    ↓
WhatsApp (Cliente)
```

---

## 💰 Custos Mensais Estimados

- **Railway (Backend)**: ~$2-3/mês
- **Railway (WAHA)**: ~$3-5/mês
- **Netlify**: Grátis
- **Gmail SMTP**: Grátis
- **Asaas**: 4,99% + R$ 0,40 por transação

**Total Fixo**: ~$5-8/mês (~R$ 25-40/mês)

---

## 📞 Suporte

Se tiver problemas:

1. **Logs do Railway**: Deploy > View Logs
2. **Status WAHA**: `GET /api/sessions`
3. **Teste Backend**: `GET /health`

---

**Data:** 04/11/2025
**Status:** ✅ Sistema 100% Cloud Pronto!
