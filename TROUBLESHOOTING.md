# 🔧 TROUBLESHOOTING - JPR Móveis Rústicos Vouchers

**Data:** 04/11/2025

---

## ❌ Erro: "Invalid character in header content [access_token]"

### Sintoma:
- Ao tentar comprar voucher, aparece: "❌ Erro ao processar. Por favor, tente novamente."
- Erro no console: `Invalid character in header content ["access_token"]`

### Causa:
A chave API do Asaas contém caracteres especiais (`$`) que o Railway pode interpretar incorretamente como variáveis de ambiente.

### Solução:

#### Opção 1: Via Interface Railway (Recomendada)

1. Acesse: https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b
2. Clique no serviço: **jpr-moveis-vouchers**
3. Vá em: **Variables**
4. Localize: **ASAAS_API_KEY**
5. **Exclua** a variável existente
6. **Crie nova** variável com o mesmo nome
7. Cole o valor da chave diretamente (a interface do Railway escapa automaticamente)
8. Salve e aguarde redeploy

#### Opção 2: Via Railway CLI

```bash
railway variables set ASAAS_API_KEY='$aact_prod_...'
```

#### Opção 3: Verificar valor atual

Para ver se a chave está correta, você pode testar:

```bash
curl -X POST https://jpr-moveis-vouchers-production.up.railway.app/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "voucherId": "teste",
    "voucherName": "TESTE",
    "pricePerUnit": 1.00,
    "quantity": 1,
    "total": 1.00,
    "buyer": {
      "name": "Teste",
      "email": "teste@teste.com",
      "phone": "47999999999",
      "cpf": "12345678900"
    }
  }'
```

**Resposta esperada (sucesso):**
```json
{
  "success": true,
  "paymentId": "...",
  "invoiceUrl": "https://..."
}
```

**Resposta com erro:**
```json
{
  "success": false,
  "error": "Invalid character in header content..."
}
```

---

## ❌ Erro: WhatsApp não envia mensagens ("No LID for user")

### Sintoma:
- WhatsApp conectado (status: WORKING)
- Ao enviar mensagem, erro: "No LID for user"

### Causa:
WhatsApp precisa sincronizar completamente após conexão. Pode levar 5-15 minutos.

### Solução:

1. **Aguardar:** Espere 5-15 minutos após conectar
2. **Enviar para si mesmo primeiro:** Isso força sincronização
   ```bash
   curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sendText \
     -H "X-Api-Key: rosa_mexicano_waha_2024" \
     -H "Content-Type: application/json" \
     -d '{
       "session": "default",
       "chatId": "SEU_NUMERO@c.us",
       "text": "Teste"
     }'
   ```
3. **Reiniciar sessão:**
   ```bash
   # Parar
   curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sessions/default/stop \
     -H "X-Api-Key: rosa_mexicano_waha_2024"

   # Iniciar
   curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sessions/default/start \
     -H "X-Api-Key: rosa_mexicano_waha_2024"

   # Aguardar 10s e gerar QR Code novamente
   ```

---

## ❌ Erro: CORS (Access-Control-Allow-Origin)

### Sintoma:
```
Access to fetch at 'https://jpr-moveis-vouchers...' from origin 'https://rosamexicanovouchers.netlify.app' has been blocked by CORS policy
```

### Causa:
Backend não está permitindo requisições do frontend Netlify.

### Solução:

Verificar se o backend tem CORS configurado:

```javascript
// No server-vouchers.js, deve ter:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
```

Se não tiver, adicionar antes das rotas.

---

## ❌ Erro: Backend não responde (502 Bad Gateway)

### Sintoma:
```
{"status":"error","code":502,"message":"Application failed to respond"}
```

### Causa:
- Railway pode estar reiniciando
- Aplicação crashou
- Porta incorreta

### Solução:

1. **Ver logs do Railway:**
   - https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b
   - Deployments > View Logs

2. **Verificar variável PORT:**
   - Deve estar: `PORT=3000`

3. **Forçar redeploy:**
   - No Railway, clicar em "Redeploy"

---

## ❌ Erro: Email não envia

### Sintoma:
- Voucher gerado
- PDF criado
- Mas email não chega

### Causa:
- Credenciais Gmail incorretas
- Senha de app expirada
- Gmail bloqueou

### Solução:

1. **Verificar variáveis no Railway:**
   ```
   EMAIL_USER=ferramentas.starken@gmail.com
   EMAIL_PASS=hoeuaqwjvnipdhf
   ```

2. **Gerar nova senha de app Gmail:**
   - Acesse: https://myaccount.google.com/apppasswords
   - Gere nova senha de 16 caracteres
   - Atualize EMAIL_PASS no Railway

3. **Testar manualmente:**
   ```bash
   curl https://jpr-moveis-vouchers-production.up.railway.app/api/test-email
   ```

---

## ❌ Erro: WhatsApp desconecta sozinho

### Sintoma:
- WhatsApp conecta
- Depois de algumas horas/dias desconecta
- Precisa escanear QR Code novamente

### Causa:
- Railway reiniciou container
- Sessão não persistiu
- WhatsApp Web desconectou

### Solução:

1. **Verificar se container reiniciou:**
   - Railway > Deployments
   - Ver se houve restart

2. **Reconectar WhatsApp:**
   ```bash
   # Gerar QR Code
   curl -X GET https://waha-jpr-moveis-production.up.railway.app/api/default/auth/qr \
     -H "X-Api-Key: rosa_mexicano_waha_2024" \
     -H "Accept: image/png" \
     --output qr.png

   # Escanear com WhatsApp
   ```

3. **Considerar:**
   - WAHA Plus (pago) tem persistência melhor
   - Evolution API como alternativa
   - API Oficial WhatsApp Business

---

## ✅ Comandos Úteis de Debug

### Verificar Backend:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/health
```

### Verificar WAHA:
```bash
curl -s https://waha-jpr-moveis-production.up.railway.app/api/sessions \
  -H "X-Api-Key: rosa_mexicano_waha_2024"
```

### Ver vouchers vendidos:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/api/vouchers
```

### Gerar PDF de teste:
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/api/test-pdf
```

### Enviar WhatsApp de teste:
```bash
curl -X POST https://waha-jpr-moveis-production.up.railway.app/api/sendText \
  -H "X-Api-Key: rosa_mexicano_waha_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "session": "default",
    "chatId": "5547992752697@c.us",
    "text": "Teste"
  }'
```

---

## 📞 Suporte

Se nenhuma solução funcionar:

1. **Ver logs do Railway**: Sempre a primeira coisa
2. **Testar APIs manualmente**: Usar comandos acima
3. **Verificar variáveis**: Railway > Variables
4. **Forçar redeploy**: Railway > Redeploy

**Desenvolvedor:** Starken Tecnologia
**Email:** ferramentas.starken@gmail.com

---

**Última atualização:** 04/11/2025
