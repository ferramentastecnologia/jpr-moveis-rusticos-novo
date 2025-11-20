# JPR Móveis Rústicos - Diagnóstico Completo do Sistema

**Data:** 08 de novembro de 2025
**Status:** Sistema funcional com problemas identificados

---

## 📊 Resumo Executivo

### ✅ O Que Está Funcionando:
- ✅ PostgreSQL configurado e funcionando
- ✅ Backend respondendo (Railway)
- ✅ Frontend carregando (Netlify)
- ✅ QR Code PIX sendo gerado automaticamente
- ✅ Webhook do Asaas enviando eventos
- ✅ Vouchers sendo criados no banco

### ⚠️ O Que Não Está Funcionando:
- ❌ Frontend não redireciona para página de sucesso após pagamento
- ❌ Dados do comprador não estão sendo salvos no banco (campos NULL)
- ❌ Cliente não vê confirmação de pagamento

### 🔐 Problemas de Segurança Críticos:
- 🔴 Webhook sem validação de origem (qualquer um pode criar vouchers fake)
- 🔴 Endpoint `/api/vouchers` expõe dados de clientes (sem autenticação)
- 🔴 Admin tokens gerados mas nunca validados
- 🔴 Senhas em localStorage (vulnerável a XSS)

---

## 🔍 Fluxo Atual (Testado)

### 1. Landing Page → Checkout
```
✅ FUNCIONA:
- Cliente seleciona voucher
- Dados do voucher salvos em localStorage
- Redirecionamento para /checkout
```

### 2. Checkout - Preenchimento de Dados
```
✅ FUNCIONA:
- Formulário carrega
- Cliente preenche: nome, email, telefone, CPF
- Validação de CPF funciona
- Validação de telefone funciona
```

### 3. Criação de Pagamento
```
⚠️ FUNCIONA MAS COM PROBLEMA:
- POST /api/create-payment é chamado
- Asaas recebe dados e cria cobrança
- Retorna paymentId ✅
- Frontend chama POST /api/pix-qrcode/:paymentId
- QR Code é gerado e exibido ✅
```

### 4. Cliente Paga
```
✅ FUNCIONA:
- Cliente escaneia QR Code
- Pagamento é processado no Asaas
- Asaas envia webhook para /api/webhook
```

### 5. Webhook Processa Pagamento
```
⚠️ FUNCIONA MAS COM PROBLEMA:
- Webhook recebido ✅
- Voucher criado no banco ✅
- MAS: Dados do comprador (name, email, phone) = NULL ❌
```

### 6. Frontend Aguarda Confirmação
```
❌ NÃO FUNCIONA:
- Frontend faz polling a cada 3 segundos em GET /api/vouchers
- Procura por voucher onde orderId = externalReference
- PROBLEMA: /api/vouchers expõe TODOS os vouchers (sem autenticação)
- PROBLEMA: Frontend não consegue filtrar corretamente?
```

### 7. Redirecionamento para Sucesso
```
❌ NÃO ACONTECE:
- window.location.href = `/sucesso-voucher.html?code=${voucher.code}`
- Cliente fica esperando na página de checkout
```

---

## 🎯 Problemas Identificados

### Problema #1: Dados do Comprador Não Salvos ❌
**Severidade:** ALTA

**Como detectei:**
```bash
GET /api/vouchers
# Resposta:
{
  "buyername": null,      # ← Deveria ter "Test User"
  "buyeremail": null,     # ← Deveria ter "test@example.com"
  "buyerphone": null      # ← Deveria ter telefone
}
```

**Causa Provável:**
1. Ordem correta de dados no webhook
2. Ordem em que são salvos no banco

**Localização:** server-vouchers.js linhas 942-965

**Código problemático:**
```javascript
await dbRun(`
    INSERT INTO vouchers (
        code, voucherId, voucherName, voucherEmoji, pricePerUnit, quantity, total,
        buyerName, buyerEmail, buyerPhone, purchaseDate, expiryDate, status, used, paymentId, orderId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`, [
    voucherCode,
    order.voucherId,      // ← Pode ser NULL!
    order.voucherName,    // ← Pode ser NULL!
    order.voucherEmoji,   // ← Pode ser NULL!
    // ... outros valores
    order.buyerName,      // ← Vindo de order (banco)
    order.buyerEmail,
    order.buyerPhone,
    // ...
]);
```

**O Problema:**
- Dados vêm da tabela `orders`
- A tabela `orders` foi alimentada em `/api/create-payment` ✅
- Mas talvez haja um mismatch na ordem ou falta de dados

---

### Problema #2: Frontend Não Detecta Voucher ❌
**Severidade:** ALTA

**Como funciona atualmente:**
```javascript
// checkout.html - checkPaymentStatus()
const voucher = data.vouchers.find(v =>
    v.orderId === paymentData.externalReference
);
```

**Problemas:**
1. `/api/vouchers` retorna **TODOS** os vouchers (sem filtro)
2. Com muitos vouchers, pode ser lento
3. Campo `orderId` pode estar com valores diferentes
4. Polling a cada 3 segundos não é suficiente se houver delay no webhook

---

### Problema #3: Webhook Não Validado 🔴 (SEGURANÇA)
**Severidade:** CRÍTICA

**Problema:**
- Qualquer pessoa pode fazer POST /api/webhook
- Sem validação de origem (IP)
- Sem validação de assinatura (Asaas signature)
- **IMPACTO:** Qualquer um pode criar vouchers fake sem pagar!

**Teste:**
```bash
curl -X POST "https://jpr-moveis-vouchers-production.up.railway.app/api/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PAYMENT_CONFIRMED",
    "payment": {
      "id": "pay_FAKE_123",
      "externalReference": "RM-FAKE-001",
      "value": 1000.00,
      "status": "CONFIRMED",
      "billingType": "PIX"
    }
  }'
```

Resultado esperado: ✅ 200 OK (vulnerável!)

---

### Problema #4: Endpoint `/api/vouchers` Sem Autenticação 🔴 (SEGURANÇA)
**Severidade:** CRÍTICA

**Problema:**
- GET /api/vouchers retorna **TODOS** os dados de clientes
- Campos expostos: nome, email, telefone, CPF
- Sem proteção (sem token, sem autenticação)

**GDPR Violation:** Exibe dados pessoais de forma desprotegida

---

## 📋 Fluxo de Dados Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (Landing)                      │
│ index-vouchers-black-november.html                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │ localStorage.setItem('pendingPurchase',
                       │   {voucherId, voucherName, ...})
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CHECKOUT PAGE                                │
│ checkout.html - submitBuyerData()                               │
│ Adiciona: buyer: {name, email, phone, cpf}                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │ POST /api/create-payment
                       │ {voucherId, voucherName, buyer{...}}
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND - CREATE PAYMENT                     │
│ server-vouchers.js:715-825                                      │
│ 1. Cria customer no Asaas                                       │
│ 2. Cria payment no Asaas (billingType: PIX)                    │
│ 3. Salva order na tabela 'orders'                              │
│ 4. Retorna paymentId                                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │ ← {success, paymentId, externalReference}
                       │ GET /api/pix-qrcode/:paymentId
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SHOW QR CODE (Frontend)                      │
│ checkout.html - generatePixQRCode()                             │
│ Mostra QR Code PIX para cliente                                │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Cliente escaneia QR Code
                       │ e paga no Asaas
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ASAAS PROCESSA PAGAMENTO                     │
│ Asaas API                                                       │
│ POST /api/webhook (event: PAYMENT_CONFIRMED)                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │ Webhook com payment data
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND - WEBHOOK                            │
│ server-vouchers.js:857-1020                                     │
│ 1. Busca order pela externalReference                          │
│ 2. Gera voucher code                                            │
│ 3. Salva em tabela 'vouchers' ← AQUI FICAM NULL!              │
│ 4. Gera PDF com QR Code                                        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND POLLING                             │
│ checkout.html - checkPaymentStatus() a cada 3s                 │
│ GET /api/vouchers (retorna TODOS)                              │
│ Procura: v.orderId === externalReference                       │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ├─ ✅ SE ENCONTRAR:
                       │  window.location.href = /sucesso-voucher.html
                       │
                       └─ ❌ SE NÃO ENCONTRAR:
                          Cliente fica esperando (até timeout)
```

---

## 🔧 Soluções Recomendadas

### CRÍTICO (Fazer Imediatamente):

**1. Adicionar Validação ao Webhook**
```javascript
// Antes de processar, validar:
const asaasSignature = req.headers['asaas-signature'];
// Verificar se é realmente do Asaas
```

**2. Adicionar Autenticação em /api/vouchers**
```javascript
app.get('/api/vouchers', requireAuth, async (req, res) => {
    // Só retorna se tem token válido
});
```

**3. Investigar por que buyerData é NULL**
```javascript
// Debugar logs:
console.log('Order antes de salvar:', order);
console.log('Valores no INSERT:', [order.buyerName, order.buyerEmail, ...]);
```

### ALTA PRIORIDADE:

**4. Melhorar Polling do Frontend**
```javascript
// Em vez de polling em /api/vouchers (exposição de dados)
// Criar endpoint específico:
GET /api/check-payment/:externalReference
// Retorna: {exists, code, status}
```

**5. Adicionar Timeout ao Polling**
```javascript
// Limite máximo de tentativas
// Se não achar em 5 minutos, mostrar mensagem útil
```

---

## 📈 Testes Executados

### ✅ Testes Que Passaram:
```
POST /api/create-payment → 200 OK
GET /health → 200 OK (server respondendo)
POST /api/webhook → 200 OK (recebe webhook)
GET /api/vouchers → 200 OK (retorna dados)
POST /api/pix-qrcode/:paymentId → 200 OK (gera QR Code)
```

### ❌ Testes Que Falharam:
```
Frontend redireciona automaticamente? NÃO
Dados do comprador salvos? NÃO (NULL)
Endpoint /api/vouchers seguro? NÃO (exposição de dados)
Webhook validado? NÃO (qualquer um pode enviar)
```

---

## 🚀 Próximos Passos

### Fase 1 (Hoje - Fazer Funcionar):
1. ✅ Corrigir PIX QR Code (FEITO)
2. ⏳ Debugar por que buyerData é NULL
3. ⏳ Fazer frontend redirecionar corretamente
4. ⏳ Testar fluxo completo fim a fim

### Fase 2 (Esta Semana - Segurança):
1. ⏳ Validar webhook do Asaas
2. ⏳ Proteger /api/vouchers com autenticação
3. ⏳ Implementar JWT nos endpoints
4. ⏳ Hashing de senhas

### Fase 3 (Próximas Semanas - Escalabilidade):
1. ⏳ Melhorar performance (índices no DB)
2. ⏳ Implementar rate limiting
3. ⏳ Adicionar monitoring e logs
4. ⏳ Documentação de API

---

## 📞 Contato para Dúvidas

Se algo não estiver claro, revisar:
- TECHNICAL-ANALYSIS.md (análise detalhada)
- SECURITY-FIXES-EXAMPLES.md (soluções de código)
- WEBHOOK-ASAAS-SETUP.md (configuração do webhook)

---

**Relatório Gerado:** 08/11/2025 - 01:45 UTC
**Próxima Atualização Recomendada:** Após implementar correções Fase 1
