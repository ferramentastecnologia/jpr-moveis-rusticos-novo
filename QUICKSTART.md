# 🚀 Guia de Início Rápido - Sistema de Vouchers

Este guia vai te ajudar a colocar o sistema no ar em menos de 15 minutos!

## ⚡ Setup Rápido

### 1. Instalar Dependências (2 minutos)

```bash
cd jpr-moveis-dashboard
npm install
```

### 2. Configurar Credenciais (5 minutos)

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais mínimas:

```env
# Mercado Pago (obrigatório)
MERCADOPAGO_ACCESS_TOKEN=TEST-seu-token-aqui
MERCADOPAGO_PUBLIC_KEY=TEST-sua-key-aqui

# Email (obrigatório)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app

# WhatsApp (opcional - pode configurar depois)
WHATSAPP_API_URL=http://localhost:8080
WHATSAPP_API_KEY=sua-key
```

**Onde conseguir as credenciais:**

#### Mercado Pago
1. Acesse: https://www.mercadopago.com.br/developers
2. Crie uma aplicação de teste
3. Copie `Access Token` e `Public Key`

#### Gmail
1. Ative verificação em 2 etapas na sua conta Google
2. Vá em Segurança > Senhas de app
3. Crie uma senha para "Mail"

### 3. Atualizar Public Key no Frontend (2 minutos)

Abra o arquivo `checkout.html` e na linha 494, substitua:

```javascript
const MERCADOPAGO_PUBLIC_KEY = 'TEST-sua-public-key-aqui';
```

### 4. Iniciar o Servidor (1 minuto)

```bash
npm start
```

Pronto! Acesse: http://localhost:3000

## 📱 Testando o Sistema

### Teste de Compra

1. Acesse: http://localhost:3000/vouchers.html
2. Escolha um combo e clique em "Comprar"
3. Preencha os dados:
   - **CPF de teste:** 12345678909
   - **Email:** seu-email@teste.com
   - **Telefone:** (47) 99999-9999

4. Use um cartão de teste do Mercado Pago:

| Cartão | Número | CVV | Validade |
|--------|--------|-----|----------|
| Visa (aprovado) | 4509 9535 6623 3704 | 123 | 11/25 |
| Master (aprovado) | 5031 4332 1540 6351 | 123 | 11/25 |

5. Finalize a compra!

### Teste de Validação

1. Acesse: http://localhost:3000/validar-voucher.html
2. Digite o código do voucher que foi gerado
3. Clique em "Validar"
4. Veja os detalhes e confirme o uso

### Dashboard Admin

1. Acesse: http://localhost:3000/admin-vouchers.html
2. Veja estatísticas e lista de vouchers
3. Teste filtros e ações

## 🔧 Configurações Opcionais

### Personalizar Informações do Restaurante

Edite os arquivos HTML e substitua:

- **Nome:** JPR Móveis Rústicos → Seu Restaurante
- **Telefone:** (47) 99999-9999 → Seu número
- **Endereço:** Blumenau/SC → Sua cidade
- **Email:** vouchers@rosamexicano.com.br → Seu email

### Ajustar Valores dos Combos

No arquivo `vouchers.html`, procure por `.voucher-card` e edite:
- Preços
- Descrições
- Itens inclusos

### Adicionar Mais Combos

Copie um bloco de `.voucher-card` existente e personalize!

## 🚨 Problemas Comuns

### Email não está enviando

**Solução:**
- Verifique se ativou "Senhas de app" no Gmail
- Teste com outro provedor de email
- Verifique firewall/antivírus

### Pagamento não está processando

**Solução:**
- Confirme que usou cartões de teste do MP
- Verifique se o Access Token está correto
- Use o modo TEST, não PRODUCTION

### WhatsApp não está enviando

**Solução:**
- Por enquanto, é opcional!
- Configure depois com calma
- Voucher ainda será enviado por email

## 📦 Deploy para Produção

### Netlify (Frontend)

1. Conecte seu repositório ao Netlify
2. Configure variáveis de ambiente
3. Deploy automático!

### Heroku/Render (Backend)

```bash
# Exemplo com Heroku
heroku create jpr-moveis-vouchers
heroku config:set MERCADOPAGO_ACCESS_TOKEN=seu-token
heroku config:set EMAIL_USER=seu-email
heroku config:set EMAIL_PASS=sua-senha
git push heroku main
```

### Railway (Recomendado)

1. Conecte seu repositório no Railway
2. Adicione as variáveis de ambiente
3. Deploy automático!

## 📚 Próximos Passos

Depois que tudo estiver funcionando:

1. ✅ Leia o `README-VOUCHERS.md` completo
2. ✅ Configure banco de dados real
3. ✅ Adicione autenticação ao admin
4. ✅ Teste com cartões reais (modo produção)
5. ✅ Configure domínio personalizado
6. ✅ Adicione SSL/HTTPS

## 💬 Precisa de Ajuda?

- 📖 Documentação completa: `README-VOUCHERS.md`
- 💻 Código bem comentado
- 📧 Suporte: contato@starken.com.br

---

**Boas vendas! 🌮**
