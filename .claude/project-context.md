# JPR Móveis Rústicos Dashboard - Contexto do Projeto

## 🎯 Visão Geral

Sistema completo de venda, gestão e validação de vouchers para o restaurante JPR Móveis Rústicos em Blumenau/SC. Automatiza todo o ciclo desde a venda online até validação no ponto de venda.

**URLs Principais:**
- Frontend: https://rosamexicanovouchers.netlify.app/
- Backend: https://jpr-moveis-vouchers-production.up.railway.app
- Admin: https://rosamexicanovouchers.netlify.app/admin-vouchers.html

---

## 📁 Estrutura de Arquivos

### Frontend (HTML)
- `index-vouchers-black-november.html` - Landing page principal
- `checkout.html` - Página de pagamento (PIX/Cartão)
- `sucesso-voucher.html` - Confirmação de compra
- `validar-voucher.html` - Validação no restaurante
- `admin-vouchers.html` - Dashboard administrativo
- `admin-login.html` - Login de admin

### Backend
- `server-vouchers.js` - API completa (1.100+ linhas)
- `vouchers.db` - SQLite (reseta em deploy - migrar para PostgreSQL)
- `package.json` - Dependências Node.js

### Documentação
- `README.md` - Guia principal
- `ESTRUTURA-PROJETO.md` - Arquitetura
- Diversos guias de deploy e integração

---

## 🏗️ Arquitetura Técnica

### Stack
```
Frontend: HTML5 + CSS3 + JavaScript (Vanilla)
Backend: Node.js + Express.js
Banco: SQLite (local) - TODO: Migrar PostgreSQL
Hosting: Netlify (frontend) + Railway (backend)
```

### Integrações Ativas
- ✅ **Asaas** - Gateway de pagamento (PIX + Cartão)
- ✅ **Netlify** - Hosting frontend com CDN
- ✅ **Railway** - Hosting backend Node.js
- ❌ **Gmail SMTP** - Email (DESABILITADO - linhas 1050-1060)
- ❌ **WAHA API** - WhatsApp (DESABILITADO - linhas 1061-1079)

---

## 🔄 Fluxo Principal

### Compra de Voucher
```
1. Cliente acessa landing page
2. Escolhe voucher e quantidade
3. Preenche dados (nome, email, telefone, CPF)
4. Escolhe método: PIX (QR Code) ou Cartão
5. POST /api/create-payment → Cria cobrança Asaas
6. Cliente paga
7. Asaas envia webhook → POST /api/webhook
8. Sistema gera voucher único (RM-ABC123-XYZ)
9. Gera PDF com QR Code
10. Cliente baixa PDF na página de sucesso
```

### Validação no Restaurante
```
1. Funcionário acessa /validar-voucher.html
2. Digita código ou escaneia QR Code
3. POST /api/validate-voucher → Verifica status
4. Se válido, mostra detalhes
5. Confirma uso → POST /api/use-voucher
6. Marca como usado no banco
```

---

## 🔌 Endpoints da API

### Principais
- `POST /api/create-payment` - Criar cobrança
- `GET /api/pix-qrcode/:paymentId` - QR Code PIX
- `POST /api/webhook` - Webhook Asaas
- `POST /api/validate-voucher` - Validar código
- `POST /api/use-voucher` - Marcar como usado
- `GET /api/vouchers` - Listar vouchers (admin)
- `GET /api/download-pdf?code=XXX` - Download PDF
- `POST /api/admin-login` - Login admin
- `GET /health` - Health check

---

## 💾 Banco de Dados (SQLite)

### Tabela: orders
Pedidos pendentes/processados
```sql
Campos: id, externalReference, asaasPaymentId, voucherId,
        voucherName, quantity, total, buyerName, buyerEmail,
        buyerPhone, buyerCpf, createdAt
```

### Tabela: vouchers
Vouchers gerados
```sql
Campos: id, code, voucherId, voucherName, quantity, total,
        buyerName, buyerEmail, buyerPhone, purchaseDate,
        expiryDate, status, used, usedDate, paymentId,
        orderId, createdAt
```

⚠️ **IMPORTANTE:** Banco reseta em deploy do Railway → Migrar para PostgreSQL

---

## 🔐 Variáveis de Ambiente

### Obrigatórias
```env
ASAAS_API_KEY=xxx           # Token Asaas
APP_URL=https://...         # URL pública do backend
ADMIN_USERNAME=admin        # Login admin
ADMIN_PASSWORD=rosa2025     # Senha admin (TROCAR!)
```

### Opcionais (Desabilitadas)
```env
EMAIL_USER=xxx              # Email Gmail
EMAIL_PASS=xxx              # Senha de app Gmail
WAHA_API_URL=xxx           # URL WAHA API
WAHA_API_KEY=xxx           # Key WAHA
```

### Restaurante
```env
RESTAURANT_NAME=JPR Móveis Rústicos Blumenau
RESTAURANT_PHONE=(47) 3288-3096
RESTAURANT_WHATSAPP=(47) 99233-4348
RESTAURANT_ADDRESS=Rua Carlos Rischbieter, 64...
```

---

## ⚠️ Problemas Conhecidos

### 1. SQLite Reseta em Deploy
**Problema:** Banco local é deletado a cada deploy no Railway
**Solução Atual:** Backup manual via CSV do admin
**Solução Permanente:** Migrar para PostgreSQL do Railway

### 2. Email/WhatsApp Desabilitados
**Razão:** Simplificar fluxo e evitar custos
**Status:** Cliente baixa PDF diretamente
**Reativar:** Descomentar linhas 1050-1079 em server-vouchers.js

### 3. Segurança Admin
**Problema:** Senha simples em .env
**Melhorias:** Implementar JWT + bcrypt + rate limiting

---

## 🛠️ Manutenção Rápida

### Adicionar Novo Voucher
1. Editar `index-vouchers-black-november.html`
2. Adicionar card com `data-id` único
3. Configurar objeto no JavaScript
4. Backend aceita qualquer voucherId automaticamente

### Reativar Email
1. Descomentar linhas 1050-1060 em `server-vouchers.js`
2. Configurar `EMAIL_USER` e `EMAIL_PASS` no `.env`
3. Testar: `/api/test-email?to=seu@email.com`

### Reativar WhatsApp
1. Descomentar linhas 1061-1079 em `server-vouchers.js`
2. Configurar `WAHA_*` no `.env`
3. Ter instância WAHA rodando

### Migrar PostgreSQL
```javascript
// Instalar: npm install pg
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Substituir db.all() por pool.query()
```

---

## 📊 Métricas do Sistema

- **Linhas de Código Backend:** 1.100+
- **Endpoints da API:** 10+
- **Tempo Médio de Compra:** 2-5 minutos
- **Tempo Geração PDF:** <2 segundos
- **Tempo Validação:** <500ms
- **Validade Voucher:** 6 meses

---

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|---|---|
| Pagamento não processa | Verificar status Asaas: https://status.asaas.com/ |
| Voucher não gera | Verificar permissões pasta `/vouchers/` |
| QR Code não funciona | Regenerar com `/api/test-pdf` |
| Admin não loga | Limpar sessionStorage e refazer login |
| Webhook não funciona | Testar acesso externo com HTTPS |

---

## 📞 Contato

**Restaurante JPR Móveis Rústicos:**
- 📍 Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
- ☎️ (47) 3288-3096
- 📱 WhatsApp: (47) 99233-4348
- 🕐 Seg-Dom: 18h às 00h

**Desenvolvedor:**
- Starken Tecnologia
- Email: contato@starken.com.br

---

## 🎯 Próximas Prioridades

1. ✅ Migrar SQLite → PostgreSQL (evitar perda de dados)
2. ✅ Implementar JWT + bcrypt no admin
3. ✅ Adicionar monitoramento e logs
4. ⏳ Reativar Email/WhatsApp quando necessário
5. ⏳ Implementar relatórios avançados de vendas

---

**Última Atualização:** 07/11/2025
**Versão:** 1.0.0
