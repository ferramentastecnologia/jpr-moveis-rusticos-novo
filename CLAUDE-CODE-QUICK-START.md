# Claude Code Quick Start (neste projeto)

Este guia mostra duas formas de usar agentes do Claude aqui:

## 1) Claude Desktop + MCP (recomendado)
- Abra este diretório no Claude Desktop.
- Use `.mcp.json` já configurado com `filesystem` apontando para:
  `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos`.
- Opcional: configure `github` com seu token para ler issues/PRs.
- Carregue perfis em `.claude/agents/` (ex.: `frontend-developer.md`) como contexto.
- Peça para atuar no repo: “Assuma este agente e melhore `index.html`”.

## 2) Runner local via Node
- Instale a SDK: `npm i @anthropic-ai/sdk` (ou use `optionalDependencies`).
- Defina `ANTHROPIC_API_KEY` no ambiente.
- Execute:
  - `npm run agent:frontend -- "Melhorar layout do index.html"`
  - `npm run agent:fullstack -- "Adicionar endpoint de saúde"`
- O runner lê `.claude/agents/<nome>.md` e retorna a resposta no terminal.

## Dica de fluxo com visualização
- Mantenha o servidor: `PORT=3025 npm start`.
- Abra `http://localhost:3025/index.html` (ou páginas específicas) para validar mudanças.
- Edite HTML/CSS/JS, recarregue e valide.

## Observações
- Os agentes são perfis. Combine com documentos no repo (ex.: `FRONTEND-DEVELOPMENT-GUIDE.md`).
- Evite executar servidores MCP com caminhos placeholders; `.mcp.json` já ajustado para filesystem.