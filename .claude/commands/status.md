# Comando: Status do Sistema

Verifique o status completo do sistema JPR Móveis Rústicos Dashboard:

## 1. Status dos Serviços

Verificar se os serviços estão online:

- **Frontend Netlify:** https://rosamexicanovouchers.netlify.app/
- **Backend Railway:** https://jpr-moveis-vouchers-production.up.railway.app/health
- **Asaas API:** Fazer request de teste

## 2. Métricas do Banco de Dados

Executar queries para obter:

- Total de vouchers cadastrados
- Vouchers ativos (não usados, não expirados)
- Vouchers usados
- Vouchers expirados
- Total em vendas (soma de todos os totais)
- Últimos 5 vouchers criados

## 3. Status do Backend

- Verificar se server está rodando
- Ver últimas linhas do log (`server.log` se existir)
- Verificar uso de memória/CPU (se possível)
- Testar endpoints principais

## 4. Status das Integrações

- **Asaas:** Testar conexão com API
- **Email:** Status (ativo/desabilitado)
- **WhatsApp:** Status (ativo/desabilitado)
- **Webhooks:** Última notificação recebida

## 5. Verificações de Segurança

- Verificar se .env está no .gitignore
- Verificar se credenciais não estão expostas
- Verificar se senha admin não é padrão
- Verificar SSL/HTTPS ativo

## 6. Relatório Resumido

Criar dashboard visual com:

```
📊 ROSA MEXICANO DASHBOARD - STATUS

🌐 Serviços
  ✅ Frontend: Online
  ✅ Backend: Online
  ✅ Asaas API: Conectado

💾 Banco de Dados
  📈 Total Vouchers: XX
  ✅ Ativos: XX
  ✓ Usados: XX
  ⏰ Expirados: XX
  💰 Total Vendido: R$ X.XXX,XX

🔌 Integrações
  ✅ Asaas: Ativo
  ❌ Email: Desabilitado
  ❌ WhatsApp: Desabilitado

⚠️ Alertas
  - Lista de avisos ou problemas detectados
```

Sempre apresente os resultados de forma visual e fácil de entender!
