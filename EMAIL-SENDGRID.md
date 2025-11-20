# 📧 Email Transacional - SendGrid Integration

Documentação completa do sistema de email transacional implementado com SendGrid.

---

## 🎯 Visão Geral

O backend agora envia emails automáticos em pontos críticos do fluxo:

| Evento | Email | Quando |
|--------|-------|--------|
| **Registro** | Boas-vindas | Novo usuário se registra |
| **Novo Pedido** | Confirmação | Cliente cria pedido |
| **Atualização Pedido** | Status | Admin atualiza pedido |
| **Pagamento Confirmado** | Confirmação | Asaas confirma pagamento |

---

## 🚀 Setup SendGrid

### 1. Criar Conta SendGrid

1. Acessar https://sendgrid.com
2. Criar conta gratuita (até 100 emails/dia)
3. Confirmar email
4. Acessar "Settings → API Keys"

### 2. Gerar API Key

1. Clique em "Create API Key"
2. Nomeie como "JPR-Backend"
3. Selecione permissões:
   - ✅ Mail Send (Full Access)
4. Copie a chave
5. Salve em local seguro

### 3. Configurar .env

```env
SENDGRID_API_KEY=SG.seu_api_key_super_longo_aqui
SENDGRID_FROM_EMAIL=contato@jprmoveis.com.br
```

### 4. Verificar Domínio (Opcional)

Para melhor deliverability, adicione domínio verificado:

1. Em SendGrid Dashboard → Sender Authentication
2. Clique "Create New Sender"
3. Preencha dados da empresa
4. Adicione registros DNS no seu hosting

---

## 📧 Templates de Email Implementados

### 1. Email de Boas-vindas (Register)

**Acionado:** Após usuário se registrar
**Para:** Email do usuário novo

```
Assunto: "Bem-vindo à JPR Móveis, João! 🎉"

Conteúdo:
- Logo da empresa
- Personalizado com nome
- Bem-vindo + próximas ações
- Call-to-action para explorar loja
- Contato de suporte
```

**Variáveis Dinâmicas:**
- `usuario.nome` - Nome do usuário
- `usuario.email` - Email do usuário

---

### 2. Email de Confirmação de Pedido

**Acionado:** Ao criar novo pedido
**Para:** Email do cliente

```
Assunto: "Pedido Confirmado - JPR-20241110... 📦"

Conteúdo:
- Número do pedido (copiável)
- Data e status
- Tabela com itens do pedido
- Preços unitários e subtotal
- Desconto aplicado (se houver)
- Próximos passos
- Link para rastrear
```

**Variáveis Dinâmicas:**
- `pedido.numero_pedido` - Código único
- `pedido.data_pedido` - Data formatada
- `itens[]` - Array de produtos
- `pedido.valor_desconto` - Desconto aplicado

---

### 3. Email de Atualização de Pedido

**Acionado:** Admin atualiza status do pedido
**Para:** Email do cliente

```
Assunto: "✅ Seu pedido foi confirmado - JPR-20241110..."

Status possíveis:
- ✅ Confirmado
- 🔨 Em preparação
- 📦 Despachado
- 🎉 Entregue

Conteúdo dinâmico de acordo com status
Código de rastreamento (se disponível)
```

**Variáveis Dinâmicas:**
- `pedido.status` - Status atual
- `pedido.numero_pedido` - Código do pedido
- `pedido.rastreamento_codigo` - Código de rastreamento

---

### 4. Email de Confirmação de Pagamento

**Acionado:** Webhook Asaas confirma pagamento
**Para:** Email do cliente

```
Assunto: "Pagamento Confirmado - JPR-20241110... ✅"

Conteúdo:
- Confirmação visual (verde, checkmark)
- Número do pedido
- Método de pagamento
- Valor pago
- Data do pagamento
- Próximas etapas
```

**Variáveis Dinâmicas:**
- `pagamento.valor` - Valor pago
- `pagamento.metodo` - Tipo (PIX, Cartão, Boleto)
- `pedido.numero_pedido` - Código do pedido

---

## 🔌 Integração nas Rotas

### Autenticação (auth.js)

```javascript
// Após registrar usuário
try {
    await enviarBoasVindas(usuario);
} catch (error) {
    console.error('Aviso: Erro ao enviar email');
    // Não falha o registro
}
```

### Pedidos (pedidos.js)

```javascript
// Ao criar pedido
await enviarConfirmacaoPedido(pedido, usuario, itens);

// Ao atualizar status
await enviarAtualizacaoPedido(pedido, usuario);
```

### Pagamentos (pagamentos.js)

```javascript
// No webhook quando status = CONFIRMED
await enviarConfirmacaoPagamento(pagamento, usuario, pedido);
```

---

## ⚙️ Configuração Avançada

### Rate Limiting do SendGrid

Plano gratuito: 100 emails/dia
Plano pago: Sem limite

### Monitoramento

SendGrid Dashboard oferece:
- ✅ Emails entregues
- ❌ Bounced
- 🗑️ Spam reports
- 📊 Estatísticas de abertura

### Bounce Management

Emails que voltam como "hard bounce":
1. São automaticamente removidos do SendGrid
2. Sua conta é protegida
3. Evita danos à reputação

---

## 🧪 Testes Locais

### Sem SendGrid API Key

Se não tiver chave ainda, os emails são:
- ✅ Construídos corretamente
- ✅ Formatos HTML validados
- ❌ Não são enviados (erro gracioso)

### Com SendGrid API Key

1. Configurar `.env` com API key válida
2. Testar endpoint `/api/auth/register`
3. Verificar email na caixa de entrada
4. Checar SendGrid Dashboard para logs

### Teste Manual

```bash
# 1. Registrar usuário (enviará email de boas-vindas)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "senha": "senha123",
    "nome": "Teste Silva"
  }'

# 2. Criar pedido (enviará confirmação)
curl -X POST http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "itens": [{"produto_id": 1, "quantidade": 1}]
  }'

# 3. Atualizar pedido (enviará atualização)
curl -X PUT http://localhost:3001/api/pedidos/1 \
  -H "Authorization: Bearer seu_token_admin" \
  -H "Content-Type: application/json" \
  -d '{"status": "enviado", "rastreamento_codigo": "AA123456BR"}'
```

---

## 🔒 Segurança

### API Key

- ✅ Armazenada em `.env` (não versionada)
- ✅ Nunca exposta em logs
- ✅ Rotação recomendada a cada 3 meses

### Autenticação de Remetente

Para melhor segurança DNS:
1. Adicione registros SPF
2. Configure DKIM
3. Implemente DMARC

Isso evita spoofing e melhora deliverability.

---

## 📊 Monitoramento

### Health Check

```bash
curl http://localhost:3001/health
```

Retorna status do servidor incluindo:
- ✅ PostgreSQL conectado
- ✅ SendGrid testado (futuro)
- ✅ Uptime

### Logs

Todos os emails têm logs:

```
✅ Email de boas-vindas enviado para joao@example.com
✅ Email de confirmação enviado para joao@example.com
✅ Email de atualização enviado para joao@example.com
❌ Aviso: Erro ao enviar email de boas-vindas: Invalid API key
```

---

## 🚀 Próximas Melhorias

### A Implementar

- [ ] Email de redefinição de senha
- [ ] Notificação de produtos em falta
- [ ] Alerta para admin quando pagamento falha
- [ ] Newsletter transacional
- [ ] Emails de suporte/contato

### Considerações Futuras

- [ ] Templates visuais em builder
- [ ] Personalizações por segmento
- [ ] A/B testing de subject lines
- [ ] Agendamento de envios em massa

---

## ❓ Troubleshooting

### Email não enviado

**Verificar:**

1. API Key válida em `.env`
2. `SENDGRID_FROM_EMAIL` configurado
3. Logs do backend para mensagens de erro
4. SendGrid Dashboard para bounces

### Email com formatação errada

**Solução:**

1. Verificar template HTML em `email.js`
2. Testar renderização em navegador
3. Usar ferramentas de preview (MJML)

### Taxa de entrega baixa

**Melhorias:**

1. Adicionar domínio verificado no SendGrid
2. Implementar SPF/DKIM/DMARC
3. Usar conteúdo personalizado
4. Evitar palavras de spam

---

## 📚 Referências

- **SendGrid Docs:** https://docs.sendgrid.com
- **API Reference:** https://docs.sendgrid.com/api-reference
- **Email Design:** https://mjml.io (MJML builder)
- **Best Practices:** https://sendgrid.com/blog

---

## 📞 Suporte

**SendGrid Support:** support@sendgrid.com
**Nossa equipe:** contato@jprmoveis.com.br

---

*Email Service - JPR Móveis Rústicos*
*Última atualização: 10 de Novembro de 2024*
