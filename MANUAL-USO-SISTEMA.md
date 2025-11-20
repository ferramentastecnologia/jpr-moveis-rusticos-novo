# 📖 Manual de Uso - Sistema JPR Móveis Rústicos

## 🎯 Visão Geral do Sistema

Sistema completo de e-commerce e gestão logística para vendas de mesas rústicas com:
- ✅ Área pública (site de vendas)
- ✅ Área administrativa (gestão completa)
- ✅ Sistema de logística (rotas e entregas)
- ✅ Integração WhatsApp (preparada)

---

## 🌐 URLs do Sistema

### Área Pública
**Site Principal:**
```
https://polite-dango-daf27b.netlify.app
```

### Área Administrativa

**Login Admin:**
```
https://polite-dango-daf27b.netlify.app/admin-login.html
```

**Credenciais:**
- **Admin:** `admin@jprmoveis.com.br` / `JPR2025#Admin`
- **Gerente:** `gerente@jprmoveis.com.br` / `JPR2025#Gerente`

**Dashboard:**
```
https://polite-dango-daf27b.netlify.app/admin.html
```

**Logística:**
```
https://polite-dango-daf27b.netlify.app/admin-logistica.html
```

---

## 📊 Funcionalidades do Admin Dashboard

### 1. **Dashboard Principal** (`admin.html`)

#### Estatísticas Visíveis:
- 📦 Total de produtos (13)
- ⭐ Total de avaliações (8)
- 💰 Vendas do mês
- 📈 Taxa de conversão

#### Seções:
1. **Vendas**
   - Ver todas as vendas
   - Editar informações
   - Atualizar status:
     - ✅ Confirmado
     - 📦 Preparação
     - 🚚 Enviado
     - ✅ Entregue
   - Filtrar por status
   - Filtrar por data

2. **Produtos**
   - Visualizar catálogo (13 mesas)
   - Adicionar novo produto
   - Editar preços
   - Gerenciar estoque

3. **Avaliações**
   - Moderar pendentes
   - Aprovar/rejeitar
   - Responder clientes
   - Ver rating médio (4.9⭐)

4. **Usuários**
   - Gerenciar admins
   - Controlar permissões
   - Ver último acesso

5. **Atividades**
   - Log de todas as ações
   - Histórico completo
   - Rastreabilidade

6. **Relatórios**
   - Exportar CSV
   - Backup JSON
   - Análises de performance

---

## 🚚 Sistema de Logística

### 2. **Gestão de Entregas** (`admin-logistica.html`)

#### KPIs do Dashboard:
- 📦 Pedidos do dia
- 🚚 Em transporte
- ✅ Entregues na semana
- 📍 Rotas ativas

#### Abas Principais:

##### **📋 Pedidos**
Gerenciamento completo de pedidos:

**Criar Novo Pedido:**
1. Clicar em "+ Novo Pedido"
2. Preencher dados:
   - **Cliente:** Nome, WhatsApp, Email, CPF
   - **Endereço:** CEP, Cidade, Rua, Número
   - **Produto:** Modelo, Tamanho (2m/2.5m/3m)
   - **Valor:** Sistema calcula frete automaticamente
3. Salvar

**Status do Pedido:**
O sistema gerencia automaticamente 13 status diferentes:

1. 🆕 **NOVO_PEDIDO** - Recebido via WhatsApp
2. 💬 **EM_ORCAMENTO** - Calculando valores
3. ⏳ **AGUARDANDO_APROVACAO** - Cliente analisando
4. 💰 **AGUARDANDO_PAGAMENTO** - Aprovado, aguardando pagamento
5. ✅ **PAGAMENTO_CONFIRMADO** - Pagamento recebido
6. 🔨 **EM_PREPARACAO** - Separando/embalando mesa
7. 📦 **PRONTO_EXPEDICAO** - Aguardando carga na Ducato
8. 🚚 **EM_TRANSITO** - Na Ducato, a caminho
9. 📍 **SAIU_ENTREGA** - Próximo da rota
10. ✅ **ENTREGUE** - Entregue ao cliente
11. ⭐ **FINALIZADO** - Cliente avaliou
12. ❌ **CANCELADO** - Cancelado
13. ⚠️ **PROBLEMA** - Requer atenção

**Alterar Status:**
1. Localizar pedido na lista
2. Clicar em "✏️ Status"
3. Informar novo status
4. Sistema atualiza automaticamente
5. Cliente é notificado (futuro: WhatsApp)

##### **🗺️ Rotas**
Planejamento de entregas semanais:

**Rotas da Semana:**
- **Segunda-feira:** Blumenau
- **Terça-feira:** Gaspar + Ilhota
- **Quarta-feira:** Pomerode + Timbó
- **Quinta-feira:** Brusque + Guabiruba
- **Sexta-feira:** Jaraguá do Sul + Indaial
- **Sábado:** Entregas urgentes

**Criar Nova Rota:**
1. Clicar em "+ Nova Rota"
2. Selecionar data
3. Informar motorista
4. Adicionar pedidos
5. Sistema otimiza ordem de entrega
6. Imprimir romaneio

**Dados da Rota:**
- Total de pedidos
- Km total
- Custo de combustível estimado
- Tempo previsto
- Status da rota

##### **📦 Expedição**
Central de separação e despacho:

**Checklist:**
- [ ] Mesa separada do estoque
- [ ] Embalagem verificada
- [ ] Etiqueta com dados do cliente
- [ ] Romaneio impresso
- [ ] Cliente notificado

**Capacidade da Ducato:**
- **Mesas:** 10-12 unidades
- **Peso máximo:** 2.000 kg
- **Volume máximo:** 30 m³

##### **📊 Relatórios**
Análises e exportações:

**Disponíveis:**
- Vendas por período
- Performance de entregas
- Custos logísticos
- Satisfação de clientes
- Análise de rotas

---

## 💰 Tabela de Fretes

| Cidade | Frete | Distância Base |
|--------|-------|----------------|
| Blumenau | R$ 0,00 | 0 km |
| Gaspar | R$ 50,00 | 15 km |
| Ilhota | R$ 80,00 | 25 km |
| Pomerode | R$ 60,00 | 18 km |
| Timbó | R$ 70,00 | 22 km |
| Brusque | R$ 100,00 | 35 km |
| Guabiruba | R$ 90,00 | 30 km |
| Jaraguá do Sul | R$ 150,00 | 60 km |
| Indaial | R$ 85,00 | 28 km |
| Rio do Sul | R$ 200,00 | 90 km |

---

## 📱 Fluxo de Comunicação WhatsApp

### Mensagens Automáticas (Estrutura Preparada)

**1. Novo Pedido Recebido:**
```
Olá [NOME]! 👋

Recebemos seu pedido:
📦 Mesa [MODELO] - [TAMANHO]
💰 Valor: R$ [VALOR]
🚚 Frete: R$ [FRETE]
━━━━━━━━━━━━━━━━
💵 Total: R$ [TOTAL]

Formas de pagamento:
• PIX (5% desconto)
• Cartão até 3x
• Boleto

Confirma o pedido? ✅
```

**2. Pagamento Confirmado:**
```
✅ Pagamento confirmado!

Pedido #[NUMERO] está sendo preparado.

Previsão de entrega:
📅 [DIA], [DATA]
⏰ [PERIODO]

Acompanhe: [LINK]
```

**3. Saiu para Entrega:**
```
🚚 Sua mesa está a caminho!

Motorista: [NOME]
Previsão: [HORA]
Telefone: [NUMERO]

📍 Rastreie: [LINK]
```

**4. Entrega Realizada:**
```
✅ Entrega realizada!

Obrigado pela preferência! 🙏

Sua opinião é importante:
⭐ Avalie: [LINK]
```

---

## 🔧 Tarefas Operacionais Diárias

### Manhã (08:00 - 12:00)
1. ✅ Verificar novos pedidos
2. ✅ Atualizar status pendentes
3. ✅ Planejar rotas da semana
4. ✅ Separar mesas do dia
5. ✅ Notificar clientes (entregas do dia)

### Tarde (13:00 - 18:00)
1. ✅ Carregar Ducato
2. ✅ Realizar entregas
3. ✅ Atualizar status em tempo real
4. ✅ Coletar fotos/assinaturas
5. ✅ Registrar problemas

### Noite (18:00 - 20:00)
1. ✅ Finalizar rotas do dia
2. ✅ Atualizar km da Ducato
3. ✅ Registrar combustível
4. ✅ Solicitar avaliações
5. ✅ Preparar relatório do dia

---

## 📈 KPIs Importantes

### Vendas:
- 💰 **Ticket médio:** R$ 3.500
- 📊 **Taxa de conversão:** 15%
- 📈 **Crescimento mensal:** Acompanhar

### Logística:
- ⏱️ **Tempo médio entrega:** 3-5 dias
- ✅ **Taxa de sucesso:** > 95%
- 🚚 **Entregas/semana:** 15-20
- ⛽ **Custo por entrega:** Monitorar

### Satisfação:
- ⭐ **Rating médio:** 4.9/5.0
- 💬 **Resposta WhatsApp:** < 30min
- 🔄 **Taxa de recompra:** Acompanhar

---

## 🆘 Resolução de Problemas

### Pedido com Problema
1. Alterar status para "⚠️ PROBLEMA"
2. Registrar observação
3. Notificar cliente
4. Buscar solução
5. Atualizar status

### Atraso na Entrega
1. Notificar cliente imediatamente
2. Informar nova previsão
3. Oferecer compensação se necessário
4. Registrar motivo
5. Ajustar futuras rotas

### Cliente Insatisfeito
1. Ouvir reclamação
2. Registrar no sistema
3. Oferecer solução
4. Acompanhar até resolução
5. Solicitar nova avaliação

---

## 🔒 Segurança e Backup

### Dados Armazenados:
- **localStorage:** Pedidos, rotas, produtos
- **sessionStorage:** Sessão do admin
- **Backup:** Exportar JSON regularmente

### Recomendações:
1. ✅ Fazer backup semanal
2. ✅ Exportar relatórios mensais
3. ✅ Trocar senhas periodicamente
4. ✅ Limpar dados antigos
5. ✅ Monitorar acessos

---

## 📚 Documentação Adicional

### Arquivos de Referência:
- `SISTEMA-LOGISTICA-PLANO.md` - Plano completo
- `CREDENCIAIS-ADMIN-JPR.md` - Acessos e senhas
- `logistica-dados.js` - Código do sistema
- `admin-logistica.html` - Interface

---

## 🚀 Próximas Funcionalidades

### Em Desenvolvimento:
- [ ] WhatsApp automático (Evolution API)
- [ ] GPS tracking em tempo real
- [ ] App mobile do motorista
- [ ] Assinatura digital
- [ ] Fotos na entrega

### Planejado:
- [ ] IA para otimização de rotas
- [ ] Previsão de demanda
- [ ] Integração com ERP
- [ ] Business Intelligence
- [ ] Sistema de fidelidade

---

## 📞 Suporte

**Desenvolvido por:** Claude Code (Anthropic)
**Data:** 20/11/2025
**Versão:** 1.0

**Repositório GitHub:**
https://github.com/ferramentastecnologia/jpr-moveis-rusticos-novo

**Site em Produção:**
https://polite-dango-daf27b.netlify.app

---

**✅ Sistema pronto para uso operacional!**
