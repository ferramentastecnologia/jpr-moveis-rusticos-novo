# FIGMA AUTO GENERATOR - Luis Alves Mesas

> Sistema completo para criar automaticamente uma landing page profissional no Figma

## INÍCIO RÁPIDO (2 minutos)

### Método 1: Script Automático (Recomendado)

```bash
./FIGMA-QUICK-START.sh
# Escolha opção 1 para gerar tudo
```

### Método 2: Manual

```bash
# 1. Gerar arquivos
node figma-auto-generator.js
node figma-plugin-generator.js

# 2. Abrir Figma Desktop
open -a "Figma"

# 3. Importar plugin
# Plugins → Development → Import plugin from manifest
# Selecionar: figma-plugin/manifest.json

# 4. Executar plugin
# Plugins → Development → Luis Alves Mesas Auto Generator
```

---

## ARQUIVOS PRINCIPAIS

| Arquivo | Descrição |
|---------|-----------|
| `FIGMA-QUICK-START.sh` | Script interativo (COMECE AQUI) |
| `FIGMA-AUTO-SETUP-GUIDE.md` | Guia completo passo a passo |
| `FIGMA-ENTREGA-FINAL.md` | Documento de entrega completo |
| `FIGMA-PROJECT-PREVIEW.html` | Preview visual do projeto |
| `figma-design-tokens.css` | Design tokens em CSS |
| `figma-design-tokens-full.json` | Design tokens em JSON |
| `figma-plugin/` | Plugin Figma executável |

---

## O QUE SERÁ CRIADO

### Design System
- 8 cores (paleta completa)
- 10 estilos tipográficos
- 3 estilos de sombra
- Spacing scale completo

### Componentes (9)
- Button (3 variantes + 4 estados)
- Product Card
- Testimonial Card
- Feature Card
- Navigation Bar
- Footer
- + 3 sub-componentes

### Layouts
- Desktop (1280px × 3600px)
  - Hero, Diferenciais, Catálogo, Sobre, Depoimentos, Processo, Footer
- Mobile (375px × 5000px)
  - Versão responsiva completa

### Exports
- Design tokens CSS
- Design tokens JSON (Tailwind)
- Assets prontos para desenvolvimento

---

## COMANDOS ÚTEIS

```bash
# Gerar tudo de uma vez
node figma-auto-generator.js && node figma-plugin-generator.js

# Visualizar preview
open FIGMA-PROJECT-PREVIEW.html

# Ver guia completo
open FIGMA-AUTO-SETUP-GUIDE.md

# Abrir Figma Desktop
open -a "Figma"

# Listar arquivos gerados
ls -lh figma-* figma-plugin/
```

---

## ESTRUTURA DO PROJETO

```
figma-auto-generator.js          # Script gerador principal
figma-plugin-generator.js        # Gerador do plugin
figma-plugin/
  ├── code.js                    # Plugin executável
  ├── manifest.json              # Configuração
  └── ui.html                    # Interface
figma-project-data.json          # Documentação completa
figma-design-tokens.css          # Tokens CSS
figma-design-tokens-full.json    # Tokens JSON
FIGMA-QUICK-START.sh            # Script interativo
FIGMA-AUTO-SETUP-GUIDE.md       # Guia completo
FIGMA-ENTREGA-FINAL.md          # Documento de entrega
FIGMA-PROJECT-PREVIEW.html      # Preview visual
```

---

## PRÓXIMOS PASSOS

### 1. Criar Projeto no Figma (5 min)

**Opção A - Plugin (100% automatizado):**
```bash
./FIGMA-QUICK-START.sh  # Opção 1 + 3 + 6
```

**Opção B - Manual:**
- Seguir `FIGMA-AUTO-SETUP-GUIDE.md`

### 2. Revisar e Ajustar (1-2 horas)
- [ ] Adicionar imagens reais dos produtos
- [ ] Ajustar textos
- [ ] Configurar auto-layout
- [ ] Testar responsividade

### 3. Handoff para Desenvolvimento
- [ ] Compartilhar link do Figma
- [ ] Enviar design tokens
- [ ] Exportar assets
- [ ] Documentar especificações

---

## DESIGN TOKENS

### CSS

```css
/* Importar no projeto */
@import 'figma-design-tokens.css';

/* Usar variáveis */
.button {
  background: var(--color-accent);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-button);
}
```

### Tailwind

```javascript
// tailwind.config.js
const tokens = require('./figma-design-tokens-full.json');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.boxShadow
    }
  }
}
```

---

## CONTATO

**Projeto:** Luis Alves Mesas para Festas
**Email:** ferramentas.starken@gmail.com
**Data:** 2025-11-10
**Versão:** 1.0.0

---

**Criado por:** Claude Code + Starken Assessoria
