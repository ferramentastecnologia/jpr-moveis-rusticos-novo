# Troubleshoot - QR Code PIX Não Gera

## 🔍 Diagnóstico do Problema

O erro acontece quando o frontend tenta carregar o QR Code PIX após criar o pagamento no Asaas.

### Flow do Problema:
```
1. Cliente clica "Pagar com PIX"
2. Frontend POST /api/create-payment → cria cobrança no Asaas
3. Asaas retorna paymentId
4. Frontend GET /api/pix-qrcode/:paymentId → tenta buscar QR Code
5. ❌ Erro: QR Code não gera
```

---

## ✅ Checklist de Verificação

### 1. Variáveis de Ambiente (Railway)

**Verifique no Dashboard Railway:**

1. Clique em `jpr-moveis-vouchers` (Node.js)
2. Vá em **"Variables"**
3. Procure por `ASAAS_API_KEY`

```
❌ Se não existir → Você esqueceu de configurar!
✅ Se existir → Próximo passo
```

**Qual deve ser o valor:**
- Obtenha em: https://asaas.com (Dashboard → Integração → API)
- Formato: `aac_...` (começando com "aac_")

---

### 2. Teste de Conexão Asaas

**Teste via curl para ver a resposta exata:**

```bash
# Teste 1: Verificar autenticação
curl -X GET "https://api.asaas.com/v3/customers" \
  -H "access_token: SUA_ASAAS_API_KEY" \
  -H "Content-Type: application/json"

# Resposta esperada:
# {"object":"list","hasMore":false,"data":[...]}

# Resposta errada:
# {"errors":[{"description":"Invalid authentication"}]}
```

---

### 3. Verificar Logs do Backend

**No Dashboard Railway:**

1. Clique em `jpr-moveis-vouchers`
2. Vá em **"Logs"**
3. Procure por linhas com:
   - `🔍 Buscando QR Code PIX`
   - `❌ Erro ao buscar QR Code`

**Procure pela mensagem de erro exata.**

---

## 🛠️ Soluções Comuns

### **Erro: "Invalid authentication" ou "access_token inválido"**

```
❌ Solução: ASAAS_API_KEY está incorreto ou vazio
```

**Ações:**
1. Obtenha a chave correta em https://asaas.com
2. Clique em `jpr-moveis-vouchers` no Railway
3. Edite `ASAAS_API_KEY` com a chave correta
4. Railway fará deploy automático (1-2 min)

---

### **Erro: "pagamento não suporta PIX" ou "billingType não é PIX"**

```
❌ Solução: O pagamento foi criado com tipo errado
```

**Verificar no `server-vouchers.js` (linha ~750):**

```javascript
// Procure por:
const paymentData = {
    billingType: 'PIX',  // ← Deve ser 'PIX'
    // ... outros campos
};
```

Se tiver `UNDEFINED`, significa que o Asaas vai auto-detectar PIX/Cartão.

---

### **Erro: "QR Code não encontrado" ou resposta vazia do Asaas**

```
❌ Solução: Asaas ainda não gerou o QR Code
```

**Motivos:**
- Pagamento foi criado há menos de 5 segundos
- Asaas está lento
- Há problema na integração

**Solução rápida:**
1. Adicione delay de 2 segundos no frontend antes de buscar QR

---

## 📝 Processo Completo de Teste

### **Teste 1: Verificar API do Asaas**
```bash
curl -X GET "https://api.asaas.com/v3/customers" \
  -H "access_token: SUA_ASAAS_API_KEY"
```

Se der erro, a chave está errada.

### **Teste 2: Criar Pagamento de Teste**
```bash
curl -X POST "https://api.asaas.com/v3/payments" \
  -H "access_token: SUA_ASAAS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "cus_000000000000001",
    "billingType": "PIX",
    "value": 10.00,
    "dueDate": "2025-12-31",
    "description": "Teste PIX"
  }'
```

Anote o `id` retornado.

### **Teste 3: Buscar QR Code**
```bash
curl -X GET "https://api.asaas.com/v3/payments/pay_000000000000001/pixQrCode" \
  -H "access_token: SUA_ASAAS_API_KEY"
```

Se retornar `encodedImage` e `payload`, está funcionando!

---

## 🔧 Debug no Frontend

**Abra o Console do Navegador (F12) e procure por:**

1. **Erro de rede:**
   - Status 401 → Chave inválida
   - Status 404 → Pagamento não encontrado
   - Status 500 → Erro no backend

2. **Resposta da API:**
   ```javascript
   // Copie no console:
   fetch('https://jpr-moveis-vouchers-production.up.railway.app/api/pix-qrcode/pay_xxx')
     .then(r => r.json())
     .then(data => console.log(JSON.stringify(data, null, 2)))
   ```

---

## 🎯 Checklist Final

- [ ] ASAAS_API_KEY está configurado no Railway
- [ ] Chave começa com `aac_`
- [ ] Deploy foi feito após configurar a chave
- [ ] Logs mostram "🐘 Usando PostgreSQL" ou "✅ Servidor rodando"
- [ ] Teste curl de autenticação funciona
- [ ] Console do navegador não mostra erros de rede

---

## 📞 Se Ainda Não Funcionar

1. **Verifique:** Qual é a mensagem de erro exata no console?
2. **Copie:** Os logs do backend (Railway → Logs)
3. **Teste:** O curl de autenticação acima
4. **Compartilhe:** A mensagem de erro específica

---

**Última atualização:** 07/11/2025
