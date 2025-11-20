# 🔌 Guia de Integração - Mercado Pago

## 🎯 O que você precisa fazer:

1. ✅ Obter credenciais do Mercado Pago
2. ✅ Configurar o backend
3. ✅ Integrar o checkout
4. ✅ Configurar webhook
5. ✅ Testar tudo

---

## 📋 Passo 1: Obter Credenciais do Mercado Pago

### 1.1 Criar/Acessar conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/
2. Faça login ou crie uma conta (precisa ser conta Business/Vendedor)

### 1.2 Criar uma Aplicação

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Clique em **"Suas integrações"** ou **"Your integrations"**
3. Clique em **"Criar aplicação"**
4. Preencha:
   - **Nome:** JPR Móveis Rústicos Vouchers
   - **Descrição:** Sistema de venda de vouchers
   - **Modelo de integração:** Checkout Pro ou Checkout API
5. Clique em **"Criar"**

### 1.3 Copiar suas Credenciais

Depois de criar, você verá:

```
🔑 CREDENCIAIS DE TESTE (para testar primeiro)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Public Key (TEST):  TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Access Token (TEST): TEST-1234567890-xxxxxx-xxxxxxxxxxxxxxxx-xxxxxxxxx

🔑 CREDENCIAIS DE PRODUÇÃO (para vender de verdade)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Public Key (PROD):  APP-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Access Token (PROD): APP-1234567890-xxxxxx-xxxxxxxxxxxxxxxx-xxxxxxxxx
```

**IMPORTANTE:**
- Comece com credenciais de **TESTE** (começam com TEST-)
- Só use produção (APP-) quando tudo estiver funcionando!

---

## 📋 Passo 2: Configurar o Backend

### 2.1 Editar o arquivo .env

No diretório do projeto:

```bash
cd jpr-moveis-dashboard
cp .env.example .env
nano .env
```

Cole suas credenciais:

```env
# Mercado Pago - TESTE (use estas primeiro!)
MERCADOPAGO_ACCESS_TOKEN=TEST-1234567890-seu-token-aqui

# Email (Gmail)
EMAIL_USER=vouchers@rosamexicano.com.br
EMAIL_PASS=sua-senha-de-app-do-gmail

# WhatsApp (Evolution API)
WHATSAPP_API_URL=http://seu-servidor:8080
WHATSAPP_API_KEY=sua-api-key
WHATSAPP_INSTANCE=rosamexicano

# URL do seu site (importante para o webhook!)
APP_URL=https://seu-dominio.com.br
PORT=3000
```

### 2.2 Instalar Dependências

```bash
npm install
```

---

## 📋 Passo 3: Integrar o Checkout

Vou atualizar o checkout para criar a preferência de pagamento automaticamente:

### 3.1 Atualizar checkout-simples.html

Preciso adicionar a Public Key do Mercado Pago no frontend.

Abra `checkout-simples.html` e adicione no topo do `<script>`:

```javascript
// Configurar Mercado Pago
const MERCADOPAGO_PUBLIC_KEY = 'TEST-sua-public-key-aqui'; // ← COLE SUA PUBLIC KEY AQUI
```

### 3.2 Backend já está pronto!

O arquivo `server-vouchers.js` já tem toda a lógica:
- ✅ Criar preferência de pagamento
- ✅ Processar webhook
- ✅ Gerar voucher
- ✅ Enviar por email/WhatsApp

---

## 📋 Passo 4: Testar Localmente

### 4.1 Iniciar o Backend

```bash
cd jpr-moveis-dashboard
npm start
```

Você verá:

```
╔════════════════════════════════════════════════╗
║   🌮 Sistema de Vouchers - JPR Móveis Rústicos      ║
║   Servidor rodando na porta 3000               ║
╚════════════════════════════════════════════════╝

📡 Endpoints:
   POST /api/create-payment
   POST /api/webhook (Mercado Pago)
   ...
```

### 4.2 Testar no Navegador

1. Acesse: http://localhost:3000/index-vouchers.html
2. Escolha um voucher
3. Clique em "Comprar Agora"
4. Preencha os dados
5. Clique em "Ir para Pagamento"

### 4.3 Cartões de Teste

Use estes cartões para testar:

| Cartão | Número | CVV | Validade | Resultado |
|--------|--------|-----|----------|-----------|
| **VISA** | 4509 9535 6623 3704 | 123 | 11/25 | ✅ Aprovado |
| **MASTER** | 5031 4332 1540 6351 | 123 | 11/25 | ✅ Aprovado |
| **VISA** | 4774 0614 7489 8350 | 123 | 11/25 | ❌ Recusado |

**CPF de teste:** 12345678909

---

## 📋 Passo 5: Configurar Webhook (IMPORTANTE!)

O webhook é como o Mercado Pago avisa seu servidor que um pagamento foi aprovado.

### 5.1 Colocar Backend Online (Produção)

Primeiro, seu backend precisa estar acessível pela internet:

**Opções:**

#### Opção A: Railway (Recomendado - Grátis)

1. Acesse: https://railway.app/
2. Conecte seu GitHub
3. New Project → Deploy from repo
4. Escolha seu repositório
5. Adicione as variáveis de ambiente (as mesmas do .env)
6. Deploy!

Você receberá uma URL tipo: `https://jpr-moveis-vouchers.railway.app`

#### Opção B: Heroku

```bash
heroku create jpr-moveis-vouchers
heroku config:set MERCADOPAGO_ACCESS_TOKEN=seu-token
heroku config:set EMAIL_USER=seu-email
# ... outras variáveis
git push heroku main
```

#### Opção C: Ngrok (Apenas para TESTE local)

```bash
# Instalar ngrok
brew install ngrok

# Em outro terminal, com o servidor rodando:
ngrok http 3000
```

Você receberá uma URL temporária tipo: `https://abc123.ngrok.io`

### 5.2 Configurar no Mercado Pago

1. Vá em: https://www.mercadopago.com.br/developers/panel
2. Clique na sua aplicação
3. Vá em **"Webhooks"** no menu lateral
4. Clique em **"Configurar notificações"**
5. Adicione a URL:

```
https://seu-dominio.com.br/api/webhook
```

Ou se estiver usando ngrok para testar:

```
https://abc123.ngrok.io/api/webhook
```

6. Selecione os eventos:
   - ✅ **payment** (pagamentos)
   - ✅ **merchant_order** (pedidos)

7. Salve!

### 5.3 Testar Webhook

Mercado Pago tem uma ferramenta de teste:

1. Na página de Webhooks
2. Clique em **"Simular notificação"**
3. Escolha tipo: `payment`
4. Clique em **"Enviar"**

Se configurado corretamente, você verá no log do servidor:

```
✅ Webhook recebido!
📄 Gerando PDF do voucher...
📧 Enviando por email...
💬 Enviando por WhatsApp...
✅ Voucher processado com sucesso!
```

---

## 📋 Passo 6: Integração Completa do Checkout

Vou criar um arquivo atualizado que conecta tudo:

### checkout-integrado.html

Este arquivo vai:
1. Coletar dados do cliente
2. Criar preferência no Mercado Pago
3. Redirecionar para pagamento
4. Mercado Pago processa o pagamento
5. Webhook é chamado automaticamente
6. Sistema gera e envia voucher

---

## 🧪 Fluxo Completo de Teste

### Ambiente de Teste (credenciais TEST-)

1. **Frontend:**
   - Cliente escolhe voucher
   - Preenche dados
   - Clica "Ir para Pagamento"

2. **Backend cria preferência:**
   ```bash
   POST /api/create-payment
   → Mercado Pago retorna link de pagamento
   → Cliente é redirecionado
   ```

3. **Cliente paga no Mercado Pago:**
   - Usa cartão de teste
   - Paga com PIX (QR Code de teste)
   - Pagamento aprovado

4. **Mercado Pago notifica webhook:**
   ```bash
   POST /api/webhook
   → Backend recebe notificação
   → Gera código do voucher
   → Cria PDF
   → Envia email
   → Envia WhatsApp
   ```

5. **Cliente recebe:**
   - ✅ Email com PDF do voucher
   - ✅ WhatsApp com voucher
   - ✅ Código único

---

## 🚀 Indo para Produção

Quando tudo estiver funcionando em teste:

### 1. Trocar Credenciais

No `.env`:

```env
# Mudar de TEST- para APP-
MERCADOPAGO_ACCESS_TOKEN=APP-1234567890-seu-token-de-producao
```

No `checkout-simples.html`:

```javascript
const MERCADOPAGO_PUBLIC_KEY = 'APP-sua-public-key-de-producao';
```

### 2. Atualizar Webhook

Atualizar URL do webhook no painel do Mercado Pago para a URL de produção (não ngrok).

### 3. Testar com Pagamento Real

Fazer UMA compra real pequena (R$ 10) para testar todo o fluxo.

---

## 📊 Checklist de Integração

### Teste (antes de vender):

- [ ] Credenciais TEST- configuradas
- [ ] Backend rodando localmente
- [ ] Consegue escolher voucher
- [ ] Consegue preencher dados
- [ ] Redireciona para Mercado Pago
- [ ] Consegue pagar com cartão de teste
- [ ] Webhook recebe notificação
- [ ] PDF é gerado
- [ ] Email é enviado
- [ ] WhatsApp é enviado
- [ ] Voucher tem código único

### Produção (para vender de verdade):

- [ ] Credenciais APP- (produção) configuradas
- [ ] Backend em servidor de produção
- [ ] Domínio próprio configurado
- [ ] HTTPS/SSL funcionando
- [ ] Webhook configurado com URL de produção
- [ ] Testado com pagamento real pequeno
- [ ] Email chegando corretamente
- [ ] WhatsApp funcionando
- [ ] Backup configurado

---

## 🆘 Problemas Comuns

### Webhook não está sendo chamado

**Solução:**
- Verifique se a URL está acessível (teste no navegador)
- Verifique se termina com `/api/webhook`
- Verifique logs do Mercado Pago na Dashboard

### Pagamento aprovado mas voucher não é gerado

**Solução:**
- Verifique logs do servidor
- Veja se webhook está configurado
- Teste manualmente: `POST /api/webhook` com um payment_id

### Email não está enviando

**Solução:**
- Verifique credenciais do Gmail
- Use "Senha de app" não a senha normal
- Verifique se 2FA está ativo

---

## 📞 Próximos Passos

1. **Agora:** Obtenha credenciais de teste do Mercado Pago
2. **Configure:** Adicione no `.env`
3. **Teste:** Rode `npm start` e teste localmente
4. **Webhook:** Configure ngrok + webhook
5. **Produção:** Deploy + credenciais reais

---

## 💡 Dica Final

Comece **sempre com ambiente de teste (TEST-)** e só vá para produção quando tudo estiver 100% funcionando!

---

Quer que eu te ajude com algum desses passos especificamente? 🚀
