# 📊 Estrutura do Projeto - Sistema de Vouchers JPR Móveis Rústicos

## 🎯 Visão Geral do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA DE VOUCHERS                       │
│                      JPR Móveis Rústicos                           │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   CLIENTE    │────▶│   SISTEMA    │────▶│ RESTAURANTE  │
│              │     │              │     │              │
│ Compra       │     │ Processa     │     │ Valida       │
│ Voucher      │     │ Pagamento    │     │ Voucher      │
└──────────────┘     └──────────────┘     └──────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
  vouchers.html        backend-vouchers.js   validar-voucher.html
  checkout.html        Mercado Pago         admin-vouchers.html
  sucesso.html         Email + WhatsApp
```

## 📁 Arquivos do Projeto

### 🎨 Frontend (HTML/CSS/JS)

```
📄 vouchers.html
   └─ Landing page de vendas
   └─ 6 tipos de combos
   └─ Design responsivo

📄 checkout.html
   └─ Formulário de compra
   └─ Integração Mercado Pago
   └─ Validação de dados

📄 sucesso.html
   └─ Confirmação de compra
   └─ Exibição do voucher
   └─ QR Code gerado

📄 validar-voucher.html
   └─ Sistema para equipe
   └─ Validação por código/QR
   └─ Histórico de validações

📄 admin-vouchers.html
   └─ Dashboard admin
   └─ Estatísticas
   └─ Gestão de vouchers
```

### ⚙️ Backend (Node.js)

```
📄 backend-vouchers.js
   └─ API REST completa
   └─ Processamento de pagamentos
   └─ Envio de vouchers
   └─ Validação e gestão

📄 package.json
   └─ Dependências do projeto
   └─ Scripts de execução

📄 .env.example
   └─ Variáveis de ambiente
   └─ Credenciais necessárias
```

### 📚 Documentação

```
📄 README-VOUCHERS.md
   └─ Documentação completa
   └─ 2000+ linhas
   └─ Tudo explicado

📄 QUICKSTART.md
   └─ Guia de 15 minutos
   └─ Setup rápido

📄 ESTRUTURA-PROJETO.md
   └─ Este arquivo
   └─ Visão geral
```

## 🔄 Fluxo de Dados

### 1️⃣ Compra de Voucher

```
Cliente                  Frontend               Backend              Integrações
  │                         │                      │                      │
  │   Escolhe combo         │                      │                      │
  │ ───────────────────────▶│                      │                      │
  │                         │                      │                      │
  │   Preenche dados        │                      │                      │
  │ ───────────────────────▶│                      │                      │
  │                         │                      │                      │
  │   Confirma pagamento    │                      │                      │
  │ ───────────────────────▶│  POST /api/process   │                      │
  │                         │ ────────────────────▶│  Processa MP         │
  │                         │                      │ ────────────────────▶│
  │                         │                      │                      │
  │                         │                      │  ✓ Aprovado          │
  │                         │                      │ ◀────────────────────│
  │                         │                      │                      │
  │                         │                      │  Gera voucher        │
  │                         │                      │  RM-XXXXX-XXXX       │
  │                         │                      │                      │
  │                         │                      │  Envia Email         │
  │                         │                      │ ────────────────────▶│
  │                         │                      │                      │
  │                         │                      │  Envia WhatsApp      │
  │                         │                      │ ────────────────────▶│
  │                         │  Retorna voucher     │                      │
  │   Sucesso + Voucher     │ ◀────────────────────│                      │
  │ ◀───────────────────────│                      │                      │
  │                         │                      │                      │
```

### 2️⃣ Validação de Voucher

```
Funcionário            Frontend               Backend              Database
  │                       │                      │                     │
  │  Digite código        │                      │                     │
  │ ─────────────────────▶│                      │                     │
  │                       │  POST /api/validate  │                     │
  │                       │ ────────────────────▶│  Busca voucher      │
  │                       │                      │ ───────────────────▶│
  │                       │                      │                     │
  │                       │                      │  Dados do voucher   │
  │                       │                      │ ◀───────────────────│
  │                       │                      │                     │
  │                       │                      │  Verifica status    │
  │                       │                      │  ✓ Ativo            │
  │                       │                      │  ✓ Não expirado     │
  │                       │                      │  ✓ Não usado        │
  │                       │                      │                     │
  │  Voucher VÁLIDO       │  Retorna detalhes    │                     │
  │ ◀─────────────────────│ ◀────────────────────│                     │
  │                       │                      │                     │
  │  Confirmar uso        │                      │                     │
  │ ─────────────────────▶│  POST /api/use       │                     │
  │                       │ ────────────────────▶│  Marca como usado   │
  │                       │                      │ ───────────────────▶│
  │                       │                      │                     │
  │  ✓ Confirmado         │  Sucesso             │                     │
  │ ◀─────────────────────│ ◀────────────────────│                     │
  │                       │                      │                     │
```

## 🔐 Segurança

### Camadas de Proteção

```
┌─────────────────────────────────────────┐
│ 🛡️ HTTPS/SSL                            │
│ ├─ Toda comunicação criptografada      │
│ └─ Certificado válido                  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 🔑 Autenticação                         │
│ ├─ Mercado Pago: Tokens seguros        │
│ ├─ Email: Senha de aplicativo          │
│ └─ Admin: Login protegido (implementar) │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ ✅ Validações                           │
│ ├─ Códigos únicos (não duplicados)     │
│ ├─ Verificação de expiração            │
│ ├─ Status de uso (uma vez apenas)      │
│ └─ Validação de dados do cliente       │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 📊 Auditoria                            │
│ ├─ Logs de todas as operações          │
│ ├─ Histórico de validações             │
│ └─ Rastreamento de transações          │
└─────────────────────────────────────────┘
```

## 💾 Dados Armazenados

### Voucher Record

```json
{
  "code": "RM-ABC123-XYZ",
  "orderId": "RM-1234567890",
  "voucher": {
    "id": "romantico",
    "title": "Combo Romântico",
    "emoji": "💑",
    "price": 159.90
  },
  "buyer": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(47) 99999-9999",
    "cpf": "12345678900"
  },
  "purchaseDate": "2024-01-15T10:00:00Z",
  "expiryDate": "2024-07-15T10:00:00Z",
  "status": "active",
  "used": false,
  "usedDate": null,
  "usedBy": null,
  "paymentId": "MP-123456789",
  "isGift": false,
  "giftData": null
}
```

## 📈 Métricas e KPIs

### Dashboard Admin

```
┌──────────────────────────────────────────────────┐
│  📊 ESTATÍSTICAS                                 │
├──────────────────────────────────────────────────┤
│                                                  │
│  💰 Total Vendido                                │
│     R$ 25.478,00                                 │
│     ↗ +15% vs mês anterior                       │
│                                                  │
│  🎫 Vouchers Ativos                              │
│     42 vouchers                                  │
│     ↗ +8 esta semana                             │
│                                                  │
│  ✓ Vouchers Usados                               │
│     158 vouchers                                 │
│     ↗ +12 este mês                               │
│                                                  │
│  📈 Taxa de Conversão                            │
│     78% (usados / vendidos)                      │
│     ↗ +3% vs mês anterior                        │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  📊 VENDAS POR TIPO                              │
├──────────────────────────────────────────────────┤
│                                                  │
│  💑 Romântico       45  ████████████░░░  60%     │
│  👨‍👩‍👧‍👦 Família          28  ████████░░░░░░  37%     │
│  🌮 Degustação     52  ███████████░░░  70%     │
│  🎉 Taco Night     35  █████████░░░░  47%     │
│  🎂 Aniversário    18  ██████░░░░░░░░  24%     │
│  💼 Empresarial    22  ███████░░░░░░░  29%     │
│                                                  │
└──────────────────────────────────────────────────┘
```

## 🔄 Ciclo de Vida do Voucher

```
┌──────────┐
│  CRIADO  │  ← Compra confirmada, pagamento aprovado
└────┬─────┘
     │
     ▼
┌──────────┐
│  ATIVO   │  ← Aguardando uso (até 6 meses)
└────┬─────┘
     │
     ├────────────┬────────────┐
     │            │            │
     ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  USADO   │  │ EXPIRADO │  │CANCELADO │
└──────────┘  └──────────┘  └──────────┘
     │            │            │
     └────────────┴────────────┘
              │
              ▼
       ┌────────────┐
       │  HISTÓRICO │
       └────────────┘
```

## 🚀 Tecnologias

### Stack Completo

```
Frontend
├── HTML5
├── CSS3 (Design responsivo)
├── JavaScript (ES6+)
└── Bibliotecas
    ├── Mercado Pago SDK
    └── QRCode.js

Backend
├── Node.js
├── Express.js
└── Bibliotecas
    ├── mercadopago
    ├── nodemailer
    ├── axios
    ├── qrcode
    └── dotenv

Integrações
├── Mercado Pago (Pagamentos)
├── Gmail SMTP (Email)
└── Evolution API (WhatsApp)

Infraestrutura
├── Netlify (Frontend)
├── Railway/Heroku (Backend)
└── MongoDB/PostgreSQL (Database)
```

## 📊 Tabela de Funcionalidades

| Funcionalidade | Status | Página | API |
|---|---|---|---|
| Landing page de vendas | ✅ Completo | vouchers.html | - |
| Checkout/Pagamento | ✅ Completo | checkout.html | /api/process-payment |
| Página de sucesso | ✅ Completo | sucesso.html | - |
| Validação de vouchers | ✅ Completo | validar-voucher.html | /api/validate-voucher |
| Marcar como usado | ✅ Completo | validar-voucher.html | /api/use-voucher |
| Dashboard admin | ✅ Completo | admin-vouchers.html | /api/vouchers |
| Reenvio de vouchers | ✅ Completo | admin-vouchers.html | /api/resend-voucher |
| Envio por email | ✅ Completo | - | backend |
| Envio por WhatsApp | ✅ Completo | - | backend |
| Geração de QR Code | ✅ Completo | - | backend |
| Autenticação admin | ⏳ Pendente | - | - |
| Banco de dados real | ⏳ Pendente | - | - |
| Relatórios avançados | ⏳ Pendente | - | - |
| Notificações SMS | ⏳ Futuro | - | - |

## 🎯 Próximas Melhorias

### Curto Prazo (1-2 meses)

```
✅ Implementar
   ├── Banco de dados real (PostgreSQL)
   ├── Autenticação de administrador
   ├── Sistema de logs
   └── Backup automático

✅ Melhorar
   ├── Performance do sistema
   ├── SEO das páginas
   ├── Acessibilidade (WCAG)
   └── Testes automatizados
```

### Médio Prazo (3-6 meses)

```
✅ Adicionar
   ├── Programa de fidelidade
   ├── Desconto progressivo
   ├── Vouchers recorrentes
   └── Integração com iFood

✅ Expandir
   ├── App mobile nativo
   ├── Notificações push
   ├── Carteira digital
   └── Sistema de pontos
```

---

**Sistema desenvolvido com ❤️ por Starken Tecnologia**

**Para o restaurante JPR Móveis Rústicos - Blumenau/SC**

🌮 **Boas vendas e sucesso!** 🌮
