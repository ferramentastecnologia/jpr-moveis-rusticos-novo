# 📱 Configuração WhatsApp no Railway

**Data:** 04/11/2025
**Status:** ✅ Tunnel Ativo

---

## 🌐 URLs

### Localtunnel (WAHA exposto):
- **URL Pública**: https://rosa-waha.loca.lt
- **Porta Local**: 3001
- **Status**: ✅ Funcionando
- **Sessão WhatsApp**: default (Juan Minni - 5547 92752697)

### Railway (Backend):
- **URL**: https://jpr-moveis-vouchers-production.up.railway.app

---

## ⚙️ Variáveis de Ambiente para Adicionar no Railway

Acesse: https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b

Adicione as seguintes variáveis:

```
EVOLUTION_API_URL=https://rosa-waha.loca.lt
EVOLUTION_API_KEY=shieldcar2024
EVOLUTION_INSTANCE=default
```

---

## 🔄 Como Adicionar no Railway

1. Acesse o projeto: https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b
2. Clique no serviço `jpr-moveis-vouchers`
3. Vá em **Variables**
4. Clique em **+ New Variable**
5. Adicione cada variável acima
6. Clique em **Deploy** para aplicar

---

## 🧪 Testar WhatsApp Após Deploy

```bash
# 1. Verificar health check
curl https://jpr-moveis-vouchers-production.up.railway.app/health

# 2. Testar envio de WhatsApp (através do Railway)
curl -X POST https://jpr-moveis-vouchers-production.up.railway.app/api/test-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5547992752697",
    "message": "Teste de envio via Railway!"
  }'
```

---

## 📝 Observações Importantes

### ⚠️ Localtunnel vs ngrok:
- **Localtunnel**: Grátis, URL pode mudar a cada reinício
- **ngrok**: Mais estável, URL fixa (plano pago)

### 🔁 Se o Localtunnel cair:
```bash
# 1. Reiniciar o tunnel
pkill -f "lt --port"
lt --port 3001 --subdomain rosa-waha > /tmp/lt-waha.log 2>&1 &

# 2. Verificar nova URL
cat /tmp/lt-waha.log

# 3. Atualizar no Railway se a URL mudou
```

### 🚀 Alternativa: WAHA na Nuvem (Recomendado para produção)
Para evitar dependência do tunnel local:
1. Deploy WAHA no Railway/Render
2. Conectar WhatsApp direto na nuvem
3. Usar URL permanente

---

## 📊 Fluxo de Envio com WhatsApp

```
Cliente compra voucher (Netlify)
    ↓
Asaas processa pagamento
    ↓
Webhook notifica Railway
    ↓
Railway gera PDF
    ↓
Railway envia Email (Gmail SMTP)
    ↓
Railway envia WhatsApp
    ↓
Railway → Localtunnel → WAHA Local → WhatsApp
    ↓
Cliente recebe mensagem com link do PDF
```

---

## ✅ Checklist

- [x] WAHA rodando local (porta 3001)
- [x] WhatsApp conectado (sessão default)
- [x] Localtunnel expondo WAHA (https://rosa-waha.loca.lt)
- [ ] Variáveis adicionadas no Railway
- [ ] Deploy do Railway com novas variáveis
- [ ] Teste de envio de WhatsApp em produção

---

**Última Atualização:** 04/11/2025 10:30
**Status:** Aguardando configuração no Railway
