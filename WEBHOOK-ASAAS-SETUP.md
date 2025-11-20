# Configuração de Webhook Asaas

## 🎯 O que é um Webhook?

Um webhook é uma notificação automática que o Asaas envia para seu servidor quando um pagamento é confirmado.

**Sem webhook:** Cliente paga, mas seu sistema não sabe que o pagamento foi feito.
**Com webhook:** Cliente paga → Asaas envia notificação → Seu sistema gera o voucher → Cliente vê a confirmação.

---

## ✅ Como Configurar

### 1. Acesse o Dashboard Asaas

- Vá para: https://asaas.com
- Faça login com sua conta
- Clique em **"Configurações"** (ícone de engrenagem)

### 2. Vá para "Webhooks"

1. No menu esquerdo, procure por **"Integrações"** ou **"Webhooks"**
2. Clique em **"Adicionar novo webhook"** ou **"+ Novo"**

### 3. Configure o Webhook

Preencha os campos:

**URL do Webhook:**
```
https://jpr-moveis-vouchers-production.up.railway.app/api/webhook
```

**Eventos para ativar:**
- ✅ `PAYMENT_CONFIRMED` (quando PIX é pago)
- ✅ `PAYMENT_RECEIVED` (quando cartão é confirmado)

**Headers (opcional):**
- Pode deixar em branco

**Clique em:** Salvar ou Criar

---

## ✅ Testar Webhook

Depois de configurar, o Asaas geralmente oferece um botão **"Testar"** ou **"Send Test"**.

**No seu servidor, você verá nos logs:**
```
📥 Webhook recebido do Asaas: {...}
🔍 Buscando pedido: RM-123456
✅ Processando pagamento aprovado para pedido: RM-123456
💾 Voucher salvo: RM-ABC123-XYZ
```

---

## 🔧 Endpoint do Webhook

**URL:** `POST https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`

**Formato esperado do Asaas:**
```json
{
  "event": "PAYMENT_CONFIRMED",
  "payment": {
    "id": "pay_xxxxx",
    "externalReference": "RM-123456",
    "value": 50.00,
    "status": "CONFIRMED",
    "billingType": "PIX"
  }
}
```

---

## 🚨 Troubleshoot

### "Webhook não está recebendo notificações"

**Checklist:**
1. ✅ Webhook foi criado no dashboard Asaas?
2. ✅ URL está correta? (https://jpr-moveis-vouchers-production.up.railway.app/api/webhook)
3. ✅ Eventos `PAYMENT_CONFIRMED` e `PAYMENT_RECEIVED` estão ativados?
4. ✅ Backend está rodando? (Verifique `/health`)

**Teste manual:**
```bash
curl -X POST "https://jpr-moveis-vouchers-production.up.railway.app/api/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PAYMENT_CONFIRMED",
    "payment": {
      "id": "pay_test_123",
      "externalReference": "RM-TEST-001",
      "value": 10.00,
      "status": "CONFIRMED",
      "billingType": "PIX"
    }
  }'
```

Esperado: Resposta `OK` com status 200

### "Pagamento foi confirmado mas voucher não foi criado"

Possíveis causas:
1. **Webhook não configurado** - Configurar conforme acima
2. **Campo `externalReference` diferente** - O Asaas não está enviando o mesmo valor que foi criado
3. **Banco de dados** - Verificar se há espaço/permissões

Solução: Processar manualmente via endpoint `/api/process-payment-manually`

---

## 📝 Processar Pagamento Manualmente

Se o webhook falhar, você pode processar manualmente:

**Endpoint:** `POST /api/process-payment-manually`

**Body:**
```json
{
  "paymentId": "pay_xxxxx"
}
```

**Exemplo:**
```bash
curl -X POST "https://jpr-moveis-vouchers-production.up.railway.app/api/process-payment-manually" \
  -H "Content-Type: application/json" \
  -d '{"paymentId": "pay_123456789"}'
```

---

## 📊 Verificar Logs

**No Railway Dashboard:**

1. Clique em `jpr-moveis-vouchers`
2. Vá na aba **"Logs"**
3. Procure por linhas com:
   - `📥 Webhook recebido` - webhook foi enviado
   - `💾 Voucher salvo` - voucher foi criado
   - `❌ Erro` - se algo deu errado

---

## ✅ Confirmação Final

Após configurar o webhook:

1. **Compre um voucher** (faça um teste)
2. **Vá para o Asaas** e confirme o pagamento (se usar sandbox)
3. **Verifique os logs** do Railway
4. **Veja se o voucher** foi criado automaticamente

Se tudo funcionar, você verá:
- ✅ Log "Webhook recebido"
- ✅ Log "Voucher salvo"
- ✅ Cliente redirecionado para página de sucesso
- ✅ PDF disponível para download

---

**Dúvidas?** Verifique os logs ou entre em contato com suporte Asaas.

Última atualização: 08/11/2025
