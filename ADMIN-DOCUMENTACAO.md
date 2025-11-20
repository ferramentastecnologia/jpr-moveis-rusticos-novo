# 🎛️ Admin Dashboard - JPR Móveis Rústicos

## Visão Geral

**Admin Panel profissional** para gerenciamento completo da loja, com dashboard, gestão de vendas, produtos, avaliações, usuários e relatórios.

**URL:** `https://jprmoveis.com.br/admin`
**Acesso Demo:**
- Email: `admin@jprmoveis.com.br`
- Senha: `admin123`

---

## 1. Funcionalidades Principais

### 🎯 Dashboard
- **Estatísticas em Tempo Real:**
  - Total de produtos (13)
  - Total de avaliações (8)
  - Avaliações pendentes
  - Nota média (4.9)
  - Vendidos hoje
  - Receita total
  - Visitantes hoje
  - Taxa de conversão

- **Últimas Vendas:** Grid com últimas 5 transações
- **Backup:** Exportar dados em JSON

### 💰 Vendas
- **Gestão Completa:**
  - Listar todas as vendas
  - Ver detalhes
  - Atualizar status (Confirmado → Preparação → Enviado → Entregue)
  - Editar informações
  - Filtrar por status
  - Filtrar por data

- **Status Visuais:**
  - Confirmado (Amarelo)
  - Preparação (Cinza)
  - Enviado (Azul)
  - Entregue (Verde)

- **Dados:**
  - 8 vendas simuladas
  - Valor total: R$ 28.700
  - Média por venda: R$ 3.587,50

### 📦 Produtos
- **Gestão de Catálogo:**
  - Listar todos os 13 produtos
  - Adicionar novo produto
  - Editar informações
  - Deletar produtos
  - Ver estoque

- **Informações por Produto:**
  - Nome
  - Preço
  - Categoria
  - Estoque

### ⭐ Avaliações
- **Moderação Completa:**
  - Avaliar pendentes (separadas)
  - Avaliar aprovadas
  - Aprovar avaliações
  - Rejeitar avaliações
  - Responder clientes
  - Ver histórico

- **Dados de Avaliações:**
  - Cliente
  - Produto
  - Rating (⭐)
  - Título
  - Data
  - Status de resposta

### 👥 Usuários
- **Gestão de Admin:**
  - Listar usuários
  - Adicionar novo usuário
  - Editar permissões
  - Deletar usuários
  - Ver último acesso

- **Informações por Usuário:**
  - Nome
  - Email
  - Role (admin/gerente)
  - Status (ativo/inativo)
  - Último acesso

- **Usuários Padrão:**
  - Administrador (admin@jprmoveis.com.br)
  - Gerenciador (gerente@jprmoveis.com.br)

### 📋 Atividades
- **Log de Atividades:**
  - Histórico de mudanças
  - Usuário que fez a ação
  - Tipo (produto, venda, avaliação, etc)
  - Descrição
  - Data e hora

- **Armazenamento:**
  - Últimas 1000 atividades em localStorage
  - Automático ao fazer qualquer ação

### 📈 Relatórios
- **Estatísticas:**
  - Total de vendas
  - Receita total
  - Total de avaliações
  - Exportação em CSV

- **Exportações:**
  - CSV de vendas
  - CSV de avaliações
  - JSON de backup completo

---

## 2. Estrutura de Arquivos

```
admin.html              // Dashboard interface
admin-dados.js          // Lógica de admin
  ├── Autenticação
  ├── Vendas
  ├── Produtos
  ├── Avaliações
  ├── Usuários
  ├── Atividades
  └── Relatórios
```

---

## 3. Sistema de Autenticação

### Login
```javascript
fazerLogin(email, senha)
// Exemplo:
fazerLogin('admin@jprmoveis.com.br', 'admin123')
```

### Sessão
```javascript
usuarioLogado // Objeto do usuário
obterUsuarioLogado() // Get usuário atual
```

### Armazenamento
- **sessionStorage:** Não persiste entre abas
- **localStorage:** Para atividades e dados persistentes

---

## 4. API de Dados

### Vendas
```javascript
obterDashboardStats()           // Stats gerais
obterVendas()                   // Todas as vendas
obterVendaPorId(id)            // Venda específica
filtrarVendas(filtros)         // Com filtros
obterEstatisticasVendas()      // Stats de vendas
atualizarStatusVenda(id, status) // Mudar status
```

### Produtos
```javascript
obterProdutosAdmin()            // Todos os produtos
adicionarProduto(novoProduto)  // Novo
editarProduto(id, atualizacoes) // Editar
deletarProduto(id)              // Deletar
```

### Avaliações
```javascript
obterAvaliacoesPendentes()      // Pendentes
aprovarAvaliacao(id)            // Aprovar
rejeitarAvaliacao(id)           // Rejeitar
adicionarRespostaAvaliacao(id, texto) // Responder
```

### Usuários
```javascript
obterUsuariosAdmin()            // Todos
adicionarUsuarioAdmin(novo)     // Novo
editarUsuarioAdmin(id, atualizacoes)
deletarUsuarioAdmin(id)
```

### Atividades
```javascript
registrarAtividade(tipo, descricao) // Registrar
obterUltimasAtividades(limite)      // Últimas N
```

### Relatórios
```javascript
gerarRelatorioVendas(inicio, fim)   // Vendas
gerarRelatorioAvaliacoes()          // Avaliações
exportarDadosJSON()                 // Backup
exportarRelatorioCSV(tipo)          // CSV
```

---

## 5. Interface e Layout

### Componentes
- **Sidebar:** Navegação lateral com menu
- **Header:** Título da página e ações
- **Stats Grid:** Cards com números
- **Tabelas:** Dados em grid
- **Modais:** Forms e confirmações
- **Botões:** Ações específicas

### Cores
- **Primary:** #1b8768 (Teal)
- **Secondary:** #2c3e50 (Escuro)
- **Backgrounds:** #f5f5f5 (Cinza claro)
- **White:** #ffffff

### Responsividade
- **Desktop:** Layout 2 colunas
- **Tablet:** Adaptado
- **Mobile:** Sidebar deslizante, 1 coluna

---

## 6. Segurança

### ⚠️ Importante
**Versão Atual:** Demo/desenvolvimento
**Produção Requer:**

1. **Autenticação Real**
   - Hashing de senha (bcrypt)
   - JWT tokens
   - HTTPS obrigatório
   - Sessions seguras

2. **Autorização**
   - Roles/Permissions
   - Verificação por endpoint
   - Rate limiting

3. **Validação**
   - Input validation no backend
   - CSRF tokens
   - SQL injection prevention
   - XSS protection

4. **Auditoria**
   - Logs em banco de dados
   - IP tracking
   - Alerts de atividades suspeitas

---

## 7. Guia de Uso

### Fazer Login
1. Abrir `admin.html`
2. Email: `admin@jprmoveis.com.br`
3. Senha: `admin123`
4. Clicar "Entrar"

### Dashboard
- Ver estatísticas gerais
- Últimas vendas
- Quick actions
- Backup rápido

### Gerenciar Vendas
1. Clicar "Vendas" no sidebar
2. Ver todas as vendas
3. Clicar em uma venda para editar
4. Atualizar status conforme processo

### Gerenciar Produtos
1. Clicar "Produtos"
2. Clicar "➕ Novo Produto" para adicionar
3. Preencher informações
4. Editar ou deletar existentes

### Moderar Avaliações
1. Clicar "Avaliações"
2. Ver "Avaliações Pendentes"
3. Aprovar (✓) ou Rejeitar (✗)
4. Na seção "Aprovadas", adicionar resposta

### Gerenciar Usuários
1. Clicar "Usuários"
2. Clicar "➕ Novo Usuário"
3. Adicionar admin/gerente
4. Editar ou deletar

### Ver Atividades
1. Clicar "Atividades"
2. Ver histórico de mudanças
3. Quem fez, quando e o quê

### Gerar Relatórios
1. Clicar "Relatórios"
2. Ver stats principais
3. Exportar em CSV ou JSON

---

## 8. Recursos Técnicos

### Tamanho dos Arquivos
```
admin.html      ~28 KB
admin-dados.js  ~18 KB
```

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dependências
- `data-produtos.js` (produtos)
- `avaliacoes-dados.js` (avaliações)

### Performance
- localStorage para persistência
- sessionStorage para sessão
- Sem chamadas de rede
- Renderização em tempo real

---

## 9. Funcionalidades Futuras

### High Priority
1. **Backend Real**
   - Banco de dados (PostgreSQL/MongoDB)
   - API REST
   - Autenticação JWT

2. **Integração com Asaas**
   - Pull de transações reais
   - Status atualizado
   - Sincronização automática

3. **Relatórios Avançados**
   - Gráficos (Chart.js)
   - Filtros por período
   - Exportação em PDF

4. **Backup Automático**
   - Scheduled backups
   - Cloud storage
   - Restore points

### Medium Priority
1. **Notificações**
   - Push notifications
   - Email alerts
   - SMS para eventos críticos

2. **Mais Permissões**
   - Suporte (read-only)
   - Gerente (full access)
   - Admin (tudo)

3. **Webhooks**
   - Para eventos de venda
   - Para novas avaliações
   - Integrações externas

### Low Priority
1. **Mobile App**
   - App nativa
   - Push notifications
   - Offline mode

2. **BI Dashboard**
   - KPIs avançados
   - Previsões
   - Análise preditiva

3. **Automações**
   - Auto-resposta de avaliações
   - Auto-atualização de status
   - Emails automáticos

---

## 10. Dados Simulados

### Vendas (8 total)
- Clientes reais (Maria Silva, João Santos, etc)
- Produtos do catálogo
- Datas de 2024-11-03 a 2024-11-10
- Status variados

### Avaliações
- 8 avaliações aprovadas
- 0 pendentes (demo)
- Média 4.9/5

### Usuários
- 2 usuários padrão
- 1 admin, 1 gerente

### Atividades
- Histórico vazio (inicia com primeira ação)
- Registra tudo automaticamente

---

## 11. Código de Exemplo

### Registrar Atividade
```javascript
registrarAtividade('produto', 'Deletou produto #5');
```

### Aprovar Avaliação
```javascript
aprovarAvaliacao(1);
renderizarAvaliacoes();
```

### Atualizar Venda
```javascript
atualizarStatusVenda(1, 'Enviado');
renderizarVendas();
```

### Exportar Backup
```javascript
exportarDadosJSON(); // Download JSON
exportarRelatorioCSV('vendas'); // Download CSV
```

---

## 12. Troubleshooting

### Não consegue fazer login
**Solução:** Verificar email/senha (ver credenciais acima)

### Dados não aparecem
**Solução:** Verificar `data-produtos.js` e `avaliacoes-dados.js` carregados

### Atividades não registram
**Solução:** localStorage habilitado no navegador

### Exportação não funciona
**Solução:** Navegador deve permitir downloads (allow-popups)

---

## 13. Próximos Passos

### Fase 1: Segurança
1. Implementar backend Node.js
2. Banco de dados PostgreSQL
3. JWT autenticação
4. Hash de senhas

### Fase 2: Integração
1. Conectar com Asaas
2. Sincronizar pagamentos
3. Webhooks de eventos
4. Email automático

### Fase 3: Analytics
1. Gráficos de vendas
2. Relatórios por período
3. KPIs principais
4. Previsões

### Fase 4: Expansão
1. Mobile app
2. Automações avançadas
3. IA para recomendações
4. Marketplace integration

---

## 14. Contato e Suporte

**Email:** contato@jprmoveis.com.br
**WhatsApp:** (47) 99716-8814
**Suporte:** 8h-18h seg-sex

---

**Status:** ✅ Implementado (Demo)
**Última Atualização:** 10 de Novembro de 2024
**Próxima Otimização:** Integração com backend real

