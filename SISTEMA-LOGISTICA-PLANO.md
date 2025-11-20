# 🚚 Sistema de Logística e Vendas JPR Móveis Rústicos

## 📋 Visão Geral do Sistema

Sistema completo para gestão operacional de vendas e entregas de mesas rústicas com:
- Recebimento de pedidos via WhatsApp
- Gestão completa do ciclo de vida do pedido
- Logística de entregas semanais com Ducato própria
- Expedição e despacho otimizados

---

## 🔄 Fluxo Completo do Pedido

### 1️⃣ **Recebimento (WhatsApp)**
- Cliente envia mensagem/foto
- Sistema registra pedido
- Orçamento automático
- Status: `NOVO_PEDIDO`

### 2️⃣ **Orçamento e Aprovação**
- Calcular valor (mesa + frete)
- Enviar proposta via WhatsApp
- Cliente aprova
- Status: `AGUARDANDO_PAGAMENTO`

### 3️⃣ **Pagamento**
- PIX (preferencial)
- Cartão de crédito
- Boleto
- Confirmar recebimento
- Status: `PAGAMENTO_CONFIRMADO`

### 4️⃣ **Produção**
- Separar mesa do estoque
- Preparar para expedição
- Embalar
- Status: `EM_PREPARACAO`

### 5️⃣ **Expedição**
- Adicionar à rota semanal
- Organizar carga na Ducato
- Imprimir romaneio
- Status: `AGUARDANDO_EXPEDICAO`

### 6️⃣ **Transporte**
- Carregar Ducato
- Iniciar rota
- Status: `EM_TRANSITO`

### 7️⃣ **Entrega**
- Entregar ao cliente
- Foto comprobatória
- Assinatura digital
- Status: `ENTREGUE`

### 8️⃣ **Pós-venda**
- Pesquisa de satisfação
- Solicitar avaliação
- Status: `FINALIZADO`

---

## 📊 Status de Pedidos

### Status Operacionais
1. 🆕 **NOVO_PEDIDO** - Recebido via WhatsApp
2. 💬 **EM_ORCAMENTO** - Calculando valores
3. ⏳ **AGUARDANDO_APROVACAO** - Cliente analisando
4. 💰 **AGUARDANDO_PAGAMENTO** - Aprovado, aguardando pagar
5. ✅ **PAGAMENTO_CONFIRMADO** - Pagamento recebido
6. 🔨 **EM_PREPARACAO** - Separando/embalando
7. 📦 **PRONTO_EXPEDICAO** - Aguardando carga
8. 🚚 **EM_TRANSITO** - Na Ducato, a caminho
9. 📍 **SAIU_ENTREGA** - Próximo na rota
10. ✅ **ENTREGUE** - Entregue com sucesso
11. ⭐ **FINALIZADO** - Avaliado pelo cliente
12. ❌ **CANCELADO** - Cancelado
13. ⚠️ **PROBLEMA** - Requer atenção

---

## 🚛 Sistema de Entregas Semanais

### Planejamento de Rotas
- **Segunda-feira:** Blumenau e região
- **Terça-feira:** Gaspar e Ilhota
- **Quarta-feira:** Pomerode e Timbó
- **Quinta-feira:** Brusque e Guabiruba
- **Sexta-feira:** Jaraguá do Sul
- **Sábado:** Entregas urgentes

### Dados da Ducato
- **Capacidade:** 10-12 mesas (dependendo tamanho)
- **Km por entrega:** Calcular custo
- **Combustível:** Controlar consumo
- **Manutenção:** Registrar km rodados

---

## 📦 Gestão de Expedição

### Checklist Pré-Expedição
- [ ] Mesa separada do estoque
- [ ] Embalagem verificada
- [ ] Etiqueta com dados do cliente
- [ ] Romaneio impresso
- [ ] Cliente notificado (WhatsApp)

### Romaneio de Carga
```
ROMANEIO - [DATA]
━━━━━━━━━━━━━━━━━━━━━━
Pedido #[ID] - [CIDADE]
Cliente: [NOME]
Mesa: [MODELO] - [TAMANHO]
Endereço: [RUA, Nº]
Telefone: [WHATSAPP]
Obs: [OBSERVAÇÕES]
━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💬 Integração WhatsApp

### Mensagens Automáticas

**1. Confirmação de Pedido**
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

**2. Pagamento Confirmado**
```
✅ Pagamento confirmado!

Seu pedido #[ID] está sendo preparado.

Previsão de entrega:
📅 [DIA DA SEMANA], [DATA]
⏰ Entre [HORA] e [HORA]

Acompanhe: [LINK]
```

**3. Saiu para Entrega**
```
🚚 Sua mesa está a caminho!

Motorista: [NOME]
Previsão: [HORA]
Telefone: [NÚMERO]

📍 Rastreie em tempo real: [LINK]
```

**4. Entregue**
```
✅ Entrega realizada!

Obrigado pela preferência! 🙏

Sua opinião é importante:
⭐ Avalie sua experiência: [LINK]
```

---

## 🗺️ Otimização de Rotas

### Algoritmo de Roteamento
1. Agrupar por cidade/região
2. Ordenar por urgência
3. Calcular menor distância
4. Considerar horários de preferência
5. Gerar rota otimizada

### Exemplo de Rota Semanal
```
SEGUNDA - BLUMENAU
━━━━━━━━━━━━━━━━━━━━
08:00 - Pedido #101 - Centro
09:30 - Pedido #103 - Velha
11:00 - Pedido #107 - Fortaleza
14:00 - Pedido #108 - Ponta Aguda
16:00 - Retorno oficina
━━━━━━━━━━━━━━━━━━━━
Total: 45km | 4 entregas
```

---

## 📊 Dashboard Logístico

### KPIs Principais
- 📦 Pedidos do dia/semana/mês
- 🚚 Entregas programadas
- ⏱️ Tempo médio de entrega
- ✅ Taxa de sucesso (%)
- 💰 Ticket médio
- ⛽ Custo por entrega

### Métricas Operacionais
- Pedidos por status
- Rotas da semana
- Capacidade da Ducato (%)
- Atrasos/problemas
- Avaliações recebidas

---

## 💾 Modelo de Dados

### Pedido
```javascript
{
  id: "PED-2025-001",
  data: "2025-11-20",
  cliente: {
    nome: "João Silva",
    whatsapp: "47999999999",
    endereco: {
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Casa",
      bairro: "Centro",
      cidade: "Blumenau",
      cep: "89010-000"
    }
  },
  produto: {
    modelo: "Mesa Imperatriz",
    tamanho: "2.5m",
    quantidade: 1,
    valor: 3500.00
  },
  frete: {
    valor: 150.00,
    distancia: 15,
    regiao: "Blumenau"
  },
  pagamento: {
    metodo: "PIX",
    status: "CONFIRMADO",
    data: "2025-11-20",
    comprovante: "pix_123.jpg"
  },
  status: "EM_PREPARACAO",
  entrega: {
    data_programada: "2025-11-25",
    periodo: "MANHA",
    rota_id: "ROTA-SEG-001",
    motorista: "Carlos",
    observacoes: "Portão azul"
  },
  historico: [
    {data: "2025-11-20 10:00", status: "NOVO_PEDIDO", user: "whatsapp"},
    {data: "2025-11-20 11:30", status: "PAGAMENTO_CONFIRMADO", user: "admin"}
  ]
}
```

### Rota de Entrega
```javascript
{
  id: "ROTA-SEG-001",
  data: "2025-11-25",
  dia_semana: "SEGUNDA",
  motorista: {
    nome: "Carlos",
    telefone: "47999999999"
  },
  veiculo: {
    tipo: "Ducato",
    placa: "ABC-1234"
  },
  pedidos: [
    {id: "PED-001", ordem: 1, horario_previsto: "08:00"},
    {id: "PED-003", ordem: 2, horario_previsto: "09:30"}
  ],
  status: "EM_ANDAMENTO",
  inicio: "2025-11-25 07:30",
  fim: null,
  km_inicial: 45230,
  km_final: null,
  combustivel: {
    inicial: 45.5,
    abastecido: 0,
    final: null
  }
}
```

---

## 🛠️ Funcionalidades do Sistema

### 1. Gestão de Pedidos
- ✅ Criar pedido via WhatsApp
- ✅ Editar informações
- ✅ Alterar status
- ✅ Histórico completo
- ✅ Anexar comprovantes
- ✅ Notas internas

### 2. Planejamento de Rotas
- ✅ Criar rota semanal
- ✅ Adicionar/remover pedidos
- ✅ Reordenar entregas
- ✅ Calcular distâncias
- ✅ Otimizar trajeto
- ✅ Imprimir romaneio

### 3. Expedição
- ✅ Lista de separação
- ✅ Checklist embalagem
- ✅ Etiquetas impressas
- ✅ Carregar Ducato
- ✅ Conferência final

### 4. Entregas
- ✅ Rastreamento GPS
- ✅ Status em tempo real
- ✅ Foto na entrega
- ✅ Assinatura digital
- ✅ Notificar cliente

### 5. Relatórios
- ✅ Vendas por período
- ✅ Performance entregas
- ✅ Custos logísticos
- ✅ Satisfação clientes
- ✅ Análise de rotas

---

## 🔔 Notificações

### WhatsApp (Automáticas)
- Pedido recebido
- Pagamento confirmado
- Em preparação
- Saiu para entrega (30min antes)
- Chegando (10min antes)
- Entregue

### Dashboard (Alertas)
- Pagamento pendente (24h)
- Atraso na produção
- Rota com problemas
- Avaliação negativa
- Estoque baixo

---

## 📈 Próximas Melhorias

### Fase 1 (Atual)
- [x] Sistema de pedidos
- [x] Gestão de status
- [ ] Rotas manuais
- [ ] WhatsApp manual

### Fase 2 (3 meses)
- [ ] WhatsApp automático (Evolution API)
- [ ] Rotas otimizadas (algoritmo)
- [ ] Rastreamento GPS
- [ ] App do motorista

### Fase 3 (6 meses)
- [ ] IA para previsão demanda
- [ ] Gestão de estoque integrada
- [ ] ERP completo
- [ ] BI avançado

---

**Sistema preparado para escalar com o crescimento da JPR! 🚀**
