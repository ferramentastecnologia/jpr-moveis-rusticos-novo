# 🌮 Sistema de Vouchers - JPR Móveis Rústicos

Sistema completo de venda, gestão e validação de vouchers para o restaurante JPR Móveis Rústicos em Blumenau/SC.

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-green)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Páginas do Sistema](#páginas-do-sistema)
- [API Backend](#api-backend)
- [Integrações](#integrações)
- [Próximos Passos](#próximos-passos)
- [Suporte](#suporte)

---

## 🎯 Sobre o Projeto

O Sistema de Vouchers foi desenvolvido para permitir que o JPR Móveis Rústicos venda vouchers/combos de refeições online, processe pagamentos automaticamente e gerencie todo o ciclo de vida dos vouchers desde a venda até a validação no restaurante.

### ✨ Diferenciais

- ✅ **Landing page otimizada** para conversão de vendas
- 💳 **Pagamento integrado** com Mercado Pago (PIX, cartão, boleto)
- 📧 **Envio automático** por Email + WhatsApp
- 🔐 **Sistema de validação** para equipe do restaurante
- 📊 **Dashboard administrativo** completo
- 📱 **100% responsivo** para mobile

---

## 🚀 Funcionalidades

### Para Clientes

- [x] Navegação e escolha de combos/vouchers
- [x] Checkout seguro com Mercado Pago
- [x] Recebimento instantâneo por email e WhatsApp
- [x] Voucher com código único + QR Code
- [x] Página de sucesso com instruções de uso
- [x] Validade de 6 meses
- [x] Opção de presentear (gift card)

### Para Equipe do Restaurante

- [x] Validação de vouchers por código ou QR Code
- [x] Verificação de status (ativo, usado, expirado)
- [x] Histórico de validações
- [x] Interface simples e rápida

### Para Administradores

- [x] Dashboard com estatísticas de vendas
- [x] Listagem completa de vouchers
- [x] Filtros e busca avançada
- [x] Reenvio de vouchers
- [x] Cancelamento de vouchers
- [x] Exportação de dados

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5 / CSS3** - Interface moderna e responsiva
- **JavaScript** - Lógica client-side
- **Mercado Pago SDK** - Checkout e pagamentos
- **QRCode.js** - Geração de QR Codes

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Mercado Pago API** - Processamento de pagamentos
- **Nodemailer** - Envio de emails
- **Axios** - Requisições HTTP
- **QRCode** - Geração de QR Codes server-side

### Integrações

- **Mercado Pago** - Gateway de pagamento
- **Evolution API** - Envio de WhatsApp
- **Gmail SMTP** - Envio de emails

---

## 📁 Estrutura de Arquivos

```
jpr-moveis-dashboard/
│
├── vouchers.html              # Landing page de venda
├── checkout.html              # Página de checkout/pagamento
├── sucesso.html               # Página de confirmação de compra
├── validar-voucher.html       # Sistema de validação (restaurante)
├── admin-vouchers.html        # Dashboard administrativo
│
├── backend-vouchers.js        # API Backend Node.js
├── package.json               # Dependências do projeto
├── .env.example               # Exemplo de variáveis de ambiente
│
├── index.html                 # Dashboard principal (existente)
├── netlify.toml               # Configuração Netlify
└── README-VOUCHERS.md         # Esta documentação
```

---

## 💻 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- Conta no Mercado Pago (credenciais de teste/produção)
- Conta de email (Gmail recomendado)
- API de WhatsApp configurada (Evolution API ou similar)

### Passo a Passo

1. **Clone o repositório ou baixe os arquivos**

```bash
cd jpr-moveis-dashboard
```

2. **Instale as dependências do backend**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. **Inicie o servidor**

```bash
npm start
```

O sistema estará disponível em `http://localhost:3000`

---

## ⚙️ Configuração

### 1. Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers
2. Crie uma aplicação
3. Copie o `Access Token` e `Public Key`
4. Adicione no arquivo `.env`:

```env
MERCADOPAGO_ACCESS_TOKEN=TEST-your-access-token
MERCADOPAGO_PUBLIC_KEY=TEST-your-public-key
```

5. No arquivo `checkout.html`, substitua:

```javascript
const MERCADOPAGO_PUBLIC_KEY = 'SUA_PUBLIC_KEY_AQUI';
```

### 2. Email (Gmail)

1. Acesse sua conta Google
2. Vá em Segurança > Verificação em duas etapas
3. Crie uma "Senha de app" para o Gmail
4. Adicione no `.env`:

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-aqui
```

### 3. WhatsApp (Evolution API)

1. Configure sua instância da Evolution API
2. Obtenha a `API Key` e `Instance Name`
3. Adicione no `.env`:

```env
WHATSAPP_API_URL=http://seu-servidor:8080
WHATSAPP_API_KEY=sua-api-key
WHATSAPP_INSTANCE=nome-da-instancia
```

### 4. Informações do Restaurante

Edite os arquivos HTML para personalizar:

- Nome do restaurante
- Endereço
- Telefone de contato
- Horários de funcionamento
- Links de redes sociais

---

## 📖 Como Usar

### Fluxo de Venda de Voucher

1. **Cliente acessa** `vouchers.html`
2. **Escolhe um combo** e clica em "Comprar"
3. É redirecionado para `checkout.html`
4. **Preenche dados** (nome, email, telefone, CPF)
5. **Informa dados de pagamento** no formulário Mercado Pago
6. **Confirma a compra**
7. Sistema processa pagamento
8. Se aprovado:
   - Gera código único do voucher
   - Salva no banco de dados
   - Envia por email
   - Envia por WhatsApp
   - Redireciona para `sucesso.html`
9. Cliente visualiza voucher com código e QR Code

### Fluxo de Validação de Voucher

1. **Cliente chega no restaurante** com o voucher
2. **Funcionário acessa** `validar-voucher.html`
3. **Digite ou escaneie** o código do voucher
4. Sistema verifica:
   - Se o código existe
   - Se está ativo (não usado)
   - Se não está expirado
5. Se válido:
   - Mostra detalhes do voucher
   - Funcionário confirma o uso
   - Sistema marca como usado
6. Voucher é baixado da lista de ativos

### Fluxo Administrativo

1. **Administrador acessa** `admin-vouchers.html`
2. Visualiza:
   - Estatísticas de vendas
   - Total de vouchers ativos/usados
   - Lista completa de vouchers
3. Pode:
   - Filtrar por status/tipo
   - Buscar por código/cliente
   - Ver detalhes de qualquer voucher
   - Reenviar vouchers
   - Cancelar vouchers
   - Exportar dados

---

## 🌐 Páginas do Sistema

### 1. vouchers.html - Landing Page de Vendas

**URL:** `/vouchers.html`

**Objetivo:** Apresentar os combos disponíveis e converter visitantes em compradores.

**Características:**
- Hero section atrativo
- 6 tipos de combos diferentes
- Valores e detalhes de cada combo
- Call-to-action destacado
- Seção de benefícios
- Como funciona (passo a passo)
- Informações de contato

**Combos Disponíveis:**
1. **Combo Romântico** (R$ 159,90) - Para 2 pessoas
2. **Combo Família** (R$ 279,90) - Para 4 pessoas
3. **Combo Degustação** (R$ 89,90) - Para 1 pessoa
4. **Combo Taco Night** (R$ 189,90) - Para 2 pessoas
5. **Combo Aniversário** (R$ 399,90) - Para 6 pessoas
6. **Combo Empresarial** (R$ 249,90) - Para 4 pessoas

### 2. checkout.html - Página de Pagamento

**URL:** `/checkout.html`

**Objetivo:** Coletar dados do cliente e processar o pagamento.

**Características:**
- Formulário de dados do comprador
- Integração direta com Mercado Pago
- Resumo do pedido
- Opção de presente com mensagem
- Validação de campos em tempo real
- Loading overlay durante processamento
- Máscaras para CPF, telefone, CEP

**Dados Coletados:**
- Nome completo
- Email
- Telefone/WhatsApp
- CPF
- Data de nascimento (opcional)
- CEP (opcional)
- Opção de presente
- Dados do cartão (via Mercado Pago)

### 3. sucesso.html - Confirmação de Compra

**URL:** `/sucesso.html`

**Objetivo:** Confirmar a compra e exibir o voucher para o cliente.

**Características:**
- Confirmação visual da compra
- Código do voucher destacado
- QR Code do voucher
- Botão para copiar código
- Informações de como usar
- Dados da reserva
- Contato do restaurante
- Opções de imprimir/baixar PDF
- Link direto para WhatsApp do restaurante

### 4. validar-voucher.html - Sistema de Validação

**URL:** `/validar-voucher.html`

**Objetivo:** Permitir que a equipe do restaurante valide vouchers.

**Características:**
- Interface simples e rápida
- Duas formas de validação:
  - Digite o código manualmente
  - Escaneie QR Code (câmera)
- Verificação em tempo real
- Exibição de status (válido, usado, expirado)
- Detalhes completos do voucher
- Confirmação de uso
- Histórico de validações da sessão
- Design otimizado para tablet/mobile

### 5. admin-vouchers.html - Dashboard Administrativo

**URL:** `/admin-vouchers.html`

**Objetivo:** Gerenciar todos os vouchers vendidos.

**Características:**
- Cards com estatísticas:
  - Total vendido
  - Vouchers ativos
  - Vouchers usados
  - Taxa de conversão
- Gráficos (placeholder para integração)
- Filtros avançados:
  - Por código/cliente
  - Por status
  - Por tipo de voucher
- Tabela completa de vouchers
- Ações:
  - Ver detalhes
  - Reenviar voucher
  - Cancelar voucher
- Paginação
- Exportar dados

---

## 🔌 API Backend

### Endpoints Disponíveis

#### POST /api/process-payment

Processa o pagamento e cria o voucher.

**Body:**
```json
{
  "voucher": {
    "id": "romantico",
    "title": "Combo Romântico",
    "price": 159.90,
    "emoji": "💑"
  },
  "buyer": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(47) 99999-9999",
    "cpf": "12345678900"
  },
  "payment": {
    "token": "card_token_from_mp",
    "paymentMethodId": "visa",
    "issuerId": "123",
    "amount": 159.90
  },
  "isGift": false
}
```

**Resposta:**
```json
{
  "success": true,
  "voucherCode": "RM-ABC123-XYZ",
  "orderId": "RM-1234567890",
  "emailSent": true,
  "whatsappSent": true
}
```

---

#### POST /api/validate-voucher

Valida um código de voucher.

**Body:**
```json
{
  "code": "RM-ABC123-XYZ"
}
```

**Resposta (voucher válido):**
```json
{
  "valid": true,
  "voucher": {
    "code": "RM-ABC123-XYZ",
    "type": "Combo Romântico",
    "value": 159.90,
    "client": "João Silva",
    "purchaseDate": "2024-01-15",
    "expiryDate": "2024-07-15",
    "status": "active"
  }
}
```

**Resposta (voucher inválido):**
```json
{
  "valid": false,
  "reason": "already_used",
  "message": "Voucher já utilizado"
}
```

---

#### POST /api/use-voucher

Marca um voucher como utilizado.

**Body:**
```json
{
  "code": "RM-ABC123-XYZ",
  "usedBy": "Maria Funcionária"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Voucher marcado como utilizado",
  "voucher": { ... }
}
```

---

#### GET /api/vouchers

Lista todos os vouchers (admin).

**Resposta:**
```json
{
  "success": true,
  "vouchers": [ ... ],
  "total": 25
}
```

---

#### POST /api/resend-voucher

Reenvia um voucher por email e WhatsApp.

**Body:**
```json
{
  "code": "RM-ABC123-XYZ"
}
```

**Resposta:**
```json
{
  "success": true,
  "emailSent": true,
  "whatsappSent": true
}
```

---

## 🔗 Integrações

### Mercado Pago

**Documentação:** https://www.mercadopago.com.br/developers/pt/docs

**Funcionalidades utilizadas:**
- Checkout Transparente (Cardform)
- Processamento de pagamentos
- Suporte a PIX, cartão e boleto
- Parcelamento sem juros

**Ambiente de Testes:**
- Use cartões de teste: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing

---

### Evolution API (WhatsApp)

**Repositório:** https://github.com/EvolutionAPI/evolution-api

**Funcionalidades utilizadas:**
- Envio de mensagens de texto
- Envio de imagens (QR Code do voucher)

**Alternativas:**
- Baileys
- Venom-bot
- WPPConnect
- API oficial do WhatsApp Business

---

### Nodemailer (Email)

**Documentação:** https://nodemailer.com/

**Funcionalidades utilizadas:**
- Envio de emails HTML
- Anexos (QR Code)
- Templates personalizados

**Provedores suportados:**
- Gmail
- Outlook
- SendGrid
- Amazon SES
- Qualquer SMTP

---

## 🚧 Próximos Passos

### Essenciais para Produção

- [ ] **Banco de Dados Real**
  - Implementar PostgreSQL ou MongoDB
  - Criar migrations e seeds
  - Backup automático

- [ ] **Autenticação Admin**
  - Login para acesso ao dashboard
  - Controle de permissões
  - Logs de auditoria

- [ ] **Testes Automatizados**
  - Testes unitários
  - Testes de integração
  - Testes E2E

- [ ] **Deploy em Produção**
  - Configurar servidor
  - SSL/HTTPS
  - CDN para assets
  - Monitoramento

### Melhorias Futuras

- [ ] **Notificações**
  - Email de lembrete próximo da expiração
  - SMS para validação importante

- [ ] **Relatórios**
  - Gráficos avançados
  - Exportação em Excel
  - Relatório por período

- [ ] **Vouchers Avançados**
  - Desconto percentual
  - Vale-crédito recorrente
  - Programas de fidelidade

- [ ] **Integração com iFood**
  - Usar vouchers no delivery
  - Sincronização automática

- [ ] **App Mobile**
  - App nativo iOS/Android
  - Carteira de vouchers
  - Notificações push

---

## 📞 Suporte

### Documentação Adicional

- [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
- [Nodemailer Docs](https://nodemailer.com/about/)
- [Evolution API](https://github.com/EvolutionAPI/evolution-api)

### Contato

**Desenvolvido por:** Starken Tecnologia
**Website:** [inserir site]
**Email:** contato@starken.com.br
**WhatsApp:** (47) 99999-9999

### Reportar Problemas

Se encontrar algum bug ou tiver sugestões:

1. Descreva o problema detalhadamente
2. Inclua prints se possível
3. Informe navegador e dispositivo usado
4. Entre em contato pelo email de suporte

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙏 Agradecimentos

- JPR Móveis Rústicos Blumenau pela oportunidade
- Comunidade open-source pelas ferramentas
- Você por usar este sistema!

---

**Feito com ❤️ por Starken Tecnologia**

🌮 Bom apetite e boas vendas! 🌮
