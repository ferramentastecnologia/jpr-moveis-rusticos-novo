# 🌮 Sistema de Vouchers Automatizado - JPR Móveis Rústicos

Sistema completo de venda de vouchers com pagamento online, geração automática de PDF e envio por WhatsApp + Email.

---

## 🎯 Workflow Completo

```
1. Cliente escolhe voucher e quantidade
         ↓
2. Preenche dados (nome, email, telefone, CPF)
         ↓
3. É redirecionado para Mercado Pago
         ↓
4. Paga com PIX ou Cartão
         ↓
5. Mercado Pago notifica nosso servidor (webhook)
         ↓
6. Sistema gera código único do voucher
         ↓
7. Cria PDF bonito do voucher com QR Code
         ↓
8. Envia AUTOMATICAMENTE por Email
         ↓
9. Envia AUTOMATICAMENTE por WhatsApp
         ↓
10. Cliente recebe e pode usar!
```

**Tudo 100% AUTOMATIZADO! Nenhuma intervenção manual necessária** ✨

---

## 📁 Arquivos do Sistema

### Frontend (HTML)
```
index-vouchers.html         → Landing page com os vouchers
checkout-voucher.html       → Formulário de dados do cliente
```

### Backend (Node.js)
```
server-vouchers.js          → Backend completo
package.json                → Dependências
.env.example                → Template de configuração
```

---

## 🚀 Como Colocar no Ar

### 1. Instalar Dependências

```bash
cd jpr-moveis-dashboard
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o `.env` e adicione:

```env
# Mercado Pago (OBRIGATÓRIO)
MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_AQUI

# Email (OBRIGATÓRIO)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=senha_de_app_gmail

# WhatsApp (OBRIGATÓRIO)
WHATSAPP_API_URL=url_da_sua_evolution_api
WHATSAPP_API_KEY=sua_api_key
WHATSAPP_INSTANCE=nome_instancia

# URL do seu site (OBRIGATÓRIO)
APP_URL=https://rosamexicanoblumenau.com.br
```

### 3. Iniciar o Servidor

```bash
npm start
```

O sistema estará rodando em `http://localhost:3000`

---

## ⚙️ Configurações Necessárias

### 1️⃣ Mercado Pago

**Obter credenciais:**

1. Acesse https://www.mercadopago.com.br/developers
2. Crie uma aplicação
3. Copie o **Access Token**
4. Configure a URL de notificação (webhook):
   - URL: `https://seu-dominio.com.br/api/webhook`

**⚠️ Importante:** Use credenciais de **PRODUÇÃO**, não de teste!

---

### 2️⃣ Email (Gmail)

**Criar senha de aplicativo:**

1. Acesse sua conta Google
2. Vá em: Segurança → Verificação em duas etapas (ative se não tiver)
3. Vá em: Segurança → Senhas de app
4. Crie uma senha para "Mail"
5. Use essa senha no `.env`

---

### 3️⃣ WhatsApp (Evolution API)

**Opções:**

**A) Usar Evolution API (Recomendado)**

1. Deploy da Evolution API: https://github.com/EvolutionAPI/evolution-api
2. Conecte uma instância do WhatsApp
3. Obtenha API Key e nome da instância
4. Configure no `.env`

**B) Alternativas:**
- Baileys
- WPPConnect
- API Oficial do WhatsApp Business (paga)

---

## 🎨 Como os Vouchers Ficam

### PDF Gerado Automaticamente

O sistema gera um PDF profissional contendo:

```
┌─────────────────────────────────┐
│   🌮 JPR Móveis Rústicos              │
│   Voucher de Consumo            │
├─────────────────────────────────┤
│                                 │
│   CÓDIGO DO VOUCHER             │
│   RM-ABC123XYZ-12345            │
│                                 │
│   [QR CODE]                     │
│                                 │
│   Detalhes:                     │
│   • Tipo: Quinta no Rosa        │
│   • Quantidade: 4 pessoas       │
│   • Valor Pago: R$ 240,00       │
│   • Validade: 15/07/2025        │
│                                 │
│   Comprador:                    │
│   João Silva                    │
│   joao@email.com                │
│   (47) 99999-9999               │
│                                 │
│   Como Usar:                    │
│   1. Faça sua reserva           │
│   2. Informe o código           │
│   3. Apresente no restaurante   │
│   4. Aproveite!                 │
│                                 │
│   JPR Móveis Rústicos Blumenau        │
│   Rua Carlos Rischbieter, 64    │
│   (47) 3288-3096                │
└─────────────────────────────────┘
```

---

## 📧 Emails e WhatsApp Automáticos

### Email

- Enviado instantaneamente após pagamento
- Design profissional em HTML
- PDF do voucher em anexo
- Instruções de como usar

### WhatsApp

- Mensagem formatada com todos os detalhes
- PDF do voucher em anexo
- Link direto para fazer reserva

---

## 🔧 Testando o Sistema

### Teste Local

```bash
# 1. Inicie o servidor
npm start

# 2. Acesse no navegador
http://localhost:3000/index-vouchers.html

# 3. Escolha um voucher
# 4. Teste o fluxo completo
```

### Teste com Cartão

Use cartões de teste do Mercado Pago:

| Cartão | Número | CVV | Validade |
|--------|--------|-----|----------|
| Visa Aprovado | 4509 9535 6623 3704 | 123 | 11/25 |
| Master Aprovado | 5031 4332 1540 6351 | 123 | 11/25 |

---

## 🌐 Deploy em Produção

### Frontend (Netlify)

1. Faça upload dos arquivos HTML
2. Configure domínio customizado
3. Pronto!

### Backend (Railway/Heroku/Render)

**Railway (Recomendado):**

```bash
# 1. Conecte seu repositório no Railway
# 2. Adicione as variáveis de ambiente
# 3. Deploy automático!
```

**Heroku:**

```bash
heroku create jpr-moveis-vouchers
heroku config:set MERCADOPAGO_ACCESS_TOKEN=seu-token
heroku config:set EMAIL_USER=seu-email
# ... outras vars
git push heroku main
```

---

## 📊 Dashboard Admin (Futuro)

Você pode usar os arquivos que já criei antes:

- `admin-vouchers.html` - Dashboard visual
- `validar-voucher.html` - Sistema de validação

Basta integrar com a API do `server-vouchers.js`

---

## 🔒 Segurança

### Implementado:

✅ HTTPS obrigatório em produção
✅ Validação de dados do cliente
✅ Códigos únicos e não duplicáveis
✅ Webhook seguro do Mercado Pago
✅ Variáveis de ambiente para credenciais

### Recomendações Adicionais:

- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria
- [ ] Backup automático do banco de dados
- [ ] Monitoramento de erros (Sentry)
- [ ] WAF (Web Application Firewall)

---

## 💰 Custos Estimados

```
Mercado Pago: 4,99% por transação + R$ 0,40
Servidor (Railway): R$ 50-100/mês
WhatsApp API: R$ 0-50/mês (depende do volume)
Email (Gmail): Grátis
Domínio: R$ 40/ano
SSL: Grátis (Let's Encrypt)
---
Total: ~R$ 100-200/mês + taxas por venda
```

### ROI Exemplo:

```
Vendendo 100 vouchers/mês de R$ 60 = R$ 6.000
Taxa MP (5%): R$ 300
Custos operacionais: R$ 150
---
Lucro líquido: R$ 5.550/mês
```

---

## 📈 Próximas Melhorias

### Curto Prazo

- [ ] Adicionar mais tipos de vouchers
- [ ] Sistema de cupons de desconto
- [ ] Notificações de lembrete (voucher vai expirar)
- [ ] Relatórios de vendas

### Médio Prazo

- [ ] App mobile
- [ ] Programa de fidelidade
- [ ] Integração com iFood
- [ ] Sistema de afiliados

---

## 🐛 Troubleshooting

### Email não está enviando

**Verifique:**
- Senha de app do Gmail está correta
- Verificação em 2 etapas ativada
- Firewall não está bloqueando porta 587

---

### WhatsApp não está enviando

**Verifique:**
- Evolution API está rodando
- Instância está conectada
- API Key está correta
- Número está no formato correto (5547999999999)

---

### Webhook não está funcionando

**Verifique:**
- URL pública está acessível
- HTTPS está configurado
- Webhook está configurado no Mercado Pago
- Servidor está rodando

---

### PDF não está sendo gerado

**Verifique:**
- Pasta `vouchers/` existe
- Permissões de escrita
- pdfkit instalado: `npm install pdfkit`

---

## 📞 Suporte

**Problemas técnicos:**
- Verifique os logs do servidor
- Teste localmente primeiro
- Consulte documentação do Mercado Pago

**Contato:**
- Email: contato@starken.com.br

---

## 📝 Licença

Este sistema foi desenvolvido exclusivamente para o JPR Móveis Rústicos Blumenau.

**Desenvolvido por:** Starken Tecnologia
**Data:** Novembro 2024

---

## ✅ Checklist de Go-Live

Antes de ir para produção:

- [ ] Servidor rodando em produção
- [ ] Credenciais de PRODUÇÃO do Mercado Pago
- [ ] Email configurado e testado
- [ ] WhatsApp configurado e testado
- [ ] Webhook configurado e testando
- [ ] SSL/HTTPS configurado
- [ ] Domínio apontando corretamente
- [ ] Backup configurado
- [ ] Testado compra completa de ponta a ponta
- [ ] Testado recebimento de email
- [ ] Testado recebimento de WhatsApp
- [ ] PDF sendo gerado corretamente
- [ ] Validação de vouchers funcionando

---

🌮 **Sistema pronto para vender vouchers 24/7 automaticamente!** 🎉

**Boa sorte e boas vendas!**
