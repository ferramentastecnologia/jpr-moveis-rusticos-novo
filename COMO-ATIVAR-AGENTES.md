# 🤖 Como Ativar e Usar os Agentes - Guia Rápido

## ✅ Boas Notícias: Agentes Já Estão Prontos!

**Os agentes FUNCIONAM NATIVAMENTE!** 🎉

Não precisa ativar nada. Eles já estão:
- ✅ Instalados no `.claude/agents/`
- ✅ Prontos para usar
- ✅ Ativados automaticamente conforme necessário

---

## 🚀 3 Formas de Usar os Agentes

### Forma 1: Mencionar no Chat (RECOMENDADO) ⭐

**Simplesmente mencione o agente:**

```
@Code Reviewer, valida esse código de pagamento para segurança

@Test Engineer, cria testes para a integração com Asaas

@Fullstack Developer, cria um novo endpoint para listar vouchers

@UI/UX Designer, melhora o design do checkout da Infinity Pay

@DevOps Engineer, configura CI/CD no Railway

@AI Engineer, cria um chatbot para suporte do cliente
```

**Pronto! O agente ativa automaticamente e começa a trabalhar.**

---

### Forma 2: Deixar Ativar Automaticamente

Você não precisa mencionar explicitamente. Os agentes ativam baseado no contexto:

```
Exemplos de ativação automática:

"Revisar esse código"
→ Code Reviewer ativa automaticamente

"Cria testes para isso"
→ Test Engineer ativa automaticamente

"Melhora o design disso"
→ UI/UX Designer ativa automaticamente

"Deploy em produção"
→ DevOps Engineer + Deployment Engineer ativam

"Cria testes e revisa"
→ Test Engineer + Code Reviewer trabalham juntos
```

---

### Forma 3: Comando CLI (Avançado)

Se quiser usar via terminal:

```bash
# Listar agentes instalados
claude-code --list-agents

# Usar agente específico
claude-code --agent=code-reviewer "valida meu código"

# Usar múltiplos agentes
claude-code --agents=code-reviewer,test-engineer "cria e testa feature"
```

---

## 📋 Agentes Disponíveis (23 Instalados)

### Desenvolvimento (6)
- `code-reviewer` - Revisar código
- `fullstack-developer` - Desenvolver full-stack
- `backend-architect` - Arquitetar backend
- `frontend-developer` - Desenvolver frontend
- `ui-ux-designer` - Design UI/UX
- `mobile-developer` - Apps mobile

### Testes & Qualidade (3)
- `test-engineer` - Criar testes
- `debugger` - Debugar erros
- `error-detective` - Analisar logs

### DevOps & Infraestrutura (2)
- `devops-engineer` - CI/CD
- `deployment-engineer` - Deploy

### Banco de Dados (1)
- `database-architect` - Otimizar BD

### IA & Dados (4)
- `ai-engineer` - Integrações LLM
- `prompt-engineer` - Otimizar prompts
- `search-specialist` - Pesquisa web
- `task-decomposition-expert` - Planejar tarefas

### Arquitetura & Consultoria (3)
- `architect-review` - Revisar padrões
- `context-manager` - Gerenciar contexto
- `backend-architect` - Arquitetar backend (duplicado)

### Documentação (1)
- `api-documenter` - Documentar APIs

### Linguagens (3)
- `javascript-pro` - JavaScript avançado
- `typescript-pro` - TypeScript avançado
- `python-pro` - Python avançado

### Integrações (1)
- `mcp-expert` - Integrações MCP

---

## 🎯 Exemplos Práticos de Uso

### Exemplo 1: Integração Asaas (JPR Móveis Rústicos)

```
"@Code Reviewer, analisa a segurança do endpoint /api/create-payment"

→ Code Reviewer valida segurança de pagamentos

"@Test Engineer, cria testes para o webhook da Infinity Pay"

→ Test Engineer gera testes automáticos

"@Fullstack Developer, cria um dashboard para ver vendas"

→ Fullstack Developer cria frontend + backend

"@DevOps Engineer, configura deploy automático no Railway"

→ DevOps Engineer setup CI/CD
```

### Exemplo 2: Novo Projeto React

```
"@Task Decomposition Expert, quebra esse projeto React em tarefas"

→ Especialista cria roadmap detalhado

"@Frontend Developer, cria os componentes principais"

→ Developer faz componentes React

"@UI/UX Designer, melhora o design dos formulários"

→ Designer refina interface

"@Code Reviewer, revisa toda a qualidade"

→ Reviewer valida tudo

"@Test Engineer, cria testes de cobertura alta"

→ Engineer cria testes
```

### Exemplo 3: Automação com IA

```
"@AI Engineer, projeta um chatbot para atendimento ao cliente"

→ AI Engineer cria arquitetura LLM

"@Prompt Engineer, otimiza os prompts para melhor resposta"

→ Prompt Engineer fine-tunes

"@Fullstack Developer, integra no sistema"

→ Developer faz integração

"@Test Engineer, testa funcionalidade"

→ Engineer valida tudo
```

### Exemplo 4: Deploy em Produção

```
"@DevOps Engineer, configura pipeline CI/CD"

→ Setup GitHub Actions / GitLab CI

"@Deployment Engineer, faz deploy no Railway"

→ Deploy automático

"@Database Architect, otimiza queries"

→ Otimização BD

"@Error Detective, analisa logs de produção"

→ Detecta problemas
```

---

## 🔥 Dicas Avançadas

### Dica 1: Combinar Agentes (Paralelo)

```
"Preciso de uma feature completa com qualidade:
@Fullstack Developer cria,
@Code Reviewer revisa,
@Test Engineer testa,
tudo ao mesmo tempo"

Resultado: Feature pronta em menos tempo!
```

### Dica 2: Manter Contexto Longo

```
"@Context Manager, mantém contexto desse projeto complexo
enquanto eu trabalho em múltiplas features"

→ Gerenciador cuida do contexto
→ Evita repetir contexto manualmente
```

### Dica 3: Pesquisa Inteligente

```
"@Search Specialist, pesquisa as melhores práticas de
integração de pagamento com Asaas"

→ Busca automática de soluções
→ Analisa resultados
```

### Dica 4: Decomposição de Projetos

```
"@Task Decomposition Expert, quebra esse projeto em
tarefas menores com estimativas para 3 desenvolvedores"

→ Roadmap automático
→ Distribuição de trabalho
```

---

## 📊 Quando Usar Cada Agente

### Code Reviewer
✓ Depois de escrever código
✓ Antes de fazer commit
✓ Validações de segurança
✓ Code quality

### Test Engineer
✓ Criar testes unitários
✓ Testes de integração
✓ Coverage reports
✓ Estratégia de testes

### Fullstack Developer
✓ Feature completa
✓ Front + Back juntos
✓ Prototipar rápido
✓ MVP

### UI/UX Designer
✓ Design novo
✓ Melhorar interface
✓ Wireframes
✓ Protótipos

### DevOps Engineer
✓ CI/CD setup
✓ Automação
✓ Pipeline configuration
✓ Infrastructure

### AI Engineer
✓ Integração LLM
✓ Chatbots
✓ RAG systems
✓ Automação inteligente

### Database Architect
✓ Design BD
✓ Otimização queries
✓ Scaling
✓ Performance

### API Documenter
✓ Documentar endpoints
✓ OpenAPI/Swagger
✓ SDK generation
✓ Developer docs

---

## ❓ Perguntas Frequentes

### P: Preciso fazer algo para ativar?
**R:** Não! Já estão prontos. Só mencione `@AgenteName`.

### P: Posso usar múltiplos agentes ao mesmo tempo?
**R:** Sim! `@Fullstack @Code Reviewer @Test Engineer` - todos trabalham juntos.

### P: Os agentes podem conversar entre si?
**R:** Indiretamente - o Context Manager ajuda a sincronizar contexto.

### P: Funciona sem internet?
**R:** Sim, os agentes funcionam localmente com Claude.

### P: Posso personalizar os agentes?
**R:** Sim, editando arquivos em `.claude/agents/`.

### P: Qual agente usar primeiro?
**R:** Depende da tarefa. Veja a tabela "Quando Usar".

---

## 🚀 Próximos Passos

### Para JPR Móveis Rústicos:
1. `@Code Reviewer` → Validar Asaas
2. `@Test Engineer` → Testar webhook
3. `@Fullstack Developer` → Novas features

### Para Agência:
1. `@Task Decomposition Expert` → Planejar
2. `@Fullstack Developer` → Desenvolver
3. `@Code Reviewer` → Revisar
4. `@Test Engineer` → Testar
5. `@DevOps Engineer` → Deploy

### Para Projetos com IA:
1. `@AI Engineer` → Arquitetura
2. `@Prompt Engineer` → Otimizar
3. `@Fullstack Developer` → Integrar

---

## 📝 Template de Uso

Use esse template para máximo proveito:

```
@[Agent Name], [tarefa específica]
- Contexto: [background do projeto]
- Restrições: [limites técnicos]
- Objetivo: [resultado esperado]
```

**Exemplo:**
```
@Fullstack Developer, cria endpoint de listagem de vendas
- Contexto: Sistema JPR Móveis Rústicos com Asaas
- Restrições: Apenas JavaScript/Node.js
- Objetivo: API que retorna vendas com filtros
```

---

## ✅ Checklist de Uso

- [ ] Leu este documento
- [ ] Entendeu as 3 formas de usar agentes
- [ ] Experimentou mencionar um agente
- [ ] Verificou que funcionou
- [ ] Tentou combinar múltiplos agentes
- [ ] Pronto para usar em produção!

---

## 🎉 Pronto para Usar!

Os agentes estão:
- ✅ Instalados
- ✅ Funcionando
- ✅ Prontos para trabalhar
- ✅ Aguardando seus comandos

**Basta mencionar `@AgenteName` e começar!** 🚀

Qualquer dúvida, volte a este guia ou use `@Search Specialist` para pesquisar!

