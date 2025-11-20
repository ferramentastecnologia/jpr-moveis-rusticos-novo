# Comando: Testar Sistema

Execute testes completos do sistema de vouchers:

## 1. Testes de API

Executar os seguintes testes:

- `GET /health` - Verificar se servidor está online
- `GET /api/vouchers` - Listar vouchers (deve funcionar)
- `GET /api/test-pdf` - Gerar PDF de teste
- `GET /api/test-email?to=seu@email.com` - Testar email (se ativo)

## 2. Teste de Fluxo Completo

Simular compra de voucher:

1. Abrir landing page no navegador
2. Selecionar voucher
3. Preencher dados de teste
4. Criar pagamento de teste no Asaas (modo sandbox se disponível)
5. Verificar geração de voucher
6. Baixar PDF
7. Testar validação do código

## 3. Testes de Integração

- Verificar webhook do Asaas está configurado
- Testar QR Code PIX (se pagamento PIX)
- Verificar geração de PDF com QR Code
- Testar sistema de validação

## 4. Testes de Admin

- Fazer login no dashboard admin
- Verificar listagem de vouchers
- Testar filtros e busca
- Exportar CSV (se disponível)

## 5. Relatório

Criar relatório resumido com:
- ✅ Testes que passaram
- ❌ Testes que falharam
- ⚠️ Avisos ou observações
- 📊 Métricas (tempo de resposta, etc)

Sempre mostre os resultados de forma clara e organizada!
