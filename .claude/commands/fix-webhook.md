# Comando: Corrigir Webhook

Diagnosticar e corrigir problemas com webhook do Asaas:

## 1. Verificar Configuração

- Acessar dashboard Asaas
- Ir em Configurações > Webhooks
- Verificar URL configurada: `https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`
- Verificar eventos ativados: PAYMENT_CONFIRMED, PAYMENT_RECEIVED

## 2. Testar Endpoint

- Fazer request manual: `curl https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`
- Verificar se retorna 200 OK
- Verificar se endpoint está acessível publicamente
- Testar com payload de exemplo

## 3. Verificar Logs

- Acessar Railway dashboard
- Ver logs do servidor
- Procurar por:
  - "Webhook recebido"
  - Erros de processamento
  - Timeouts
  - Erros de conexão

## 4. Problemas Comuns

### Webhook não está sendo chamado
- Verificar se URL está correta no Asaas
- Verificar se servidor está online
- Verificar firewall/bloqueios

### Webhook recebe mas não processa
- Verificar estrutura do payload
- Verificar se evento está sendo tratado
- Verificar logs de erro

### Voucher não é gerado
- Verificar se pedido existe no banco
- Verificar se geração de PDF funciona
- Verificar permissões da pasta /vouchers/

## 5. Testar Processamento Manual

Se webhook falhar, processar manualmente:

```bash
# Endpoint alternativo
POST /api/process-payment-manually
Body: { "paymentId": "pay_xxx" }
```

## 6. Solução de Fallback

Se webhook continuar falhando:

- Implementar polling (verificar pagamento a cada X segundos)
- Adicionar fila de processamento
- Configurar retry automático
- Adicionar alertas por email/slack

## 7. Relatório

Criar relatório com:
- Status do webhook (funcionando/com problemas)
- Últimos webhooks recebidos
- Taxa de sucesso/falha
- Recomendações de correção

Sempre testar após aplicar correções!
