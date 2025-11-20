# GUIA COMPLETO - FIGMA AUTO GENERATOR
## Luis Alves Mesas para Festas - Landing Page

> Sistema automatizado para criar projeto completo no Figma sem intervenção manual

---

## 📋 ÍNDICE

1. [Visão Geral](#visao-geral)
2. [Arquivos Gerados](#arquivos-gerados)
3. [Métodos de Criação](#metodos-de-criacao)
4. [Opção 1: Plugin Figma (Recomendado)](#opcao-1-plugin-figma)
5. [Opção 2: Criação Manual com Tokens](#opcao-2-manual-tokens)
6. [Opção 3: API REST (Limitado)](#opcao-3-api-rest)
7. [Design System Completo](#design-system)
8. [Estrutura do Projeto](#estrutura-projeto)
9. [Próximos Passos](#proximos-passos)

---

## 🎯 VISÃO GERAL {#visao-geral}

Este projeto automatiza completamente a criação de uma landing page profissional no Figma para **Luis Alves Mesas para Festas**, incluindo:

- ✅ Design System completo (cores, tipografia, efeitos)
- ✅ Biblioteca de componentes reutilizáveis
- ✅ Landing Page Desktop (1280px)
- ✅ Landing Page Mobile (375px)
- ✅ Design tokens exportados (CSS + JSON)
- ✅ Documentação completa do projeto

---

## 📦 ARQUIVOS GERADOS {#arquivos-gerados}

### Scripts Principais

```
figma-auto-generator.js          - Script Node.js principal
figma-plugin-generator.js        - Gerador do plugin Figma
figma-plugin/
  ├── code.js                    - Código do plugin
  ├── manifest.json              - Configuração do plugin
  └── ui.html                    - Interface do plugin
```

### Dados e Tokens

```
figma-project-data.json          - Documentação completa do projeto
figma-design-tokens.css          - Tokens CSS prontos para desenvolvimento
figma-design-tokens-full.json    - Tokens JSON para Tailwind/outras ferramentas
```

### Documentação

```
FIGMA-AUTO-SETUP-GUIDE.md        - Este guia
FIGMA-PROJECT-PREVIEW.html       - Preview visual do projeto
```

---

## 🎨 MÉTODOS DE CRIAÇÃO {#metodos-de-criacao}

### Comparação

| Método | Automação | Dificuldade | Tempo | Recomendado |
|--------|-----------|-------------|-------|-------------|
| **Plugin Figma** | 100% | Fácil | 2 min | ✅ SIM |
| **Manual + Tokens** | 50% | Médio | 30 min | ⚠️ Alternativa |
| **API REST** | Limitado | Difícil | - | ❌ Não suportado |

---

## 🚀 OPÇÃO 1: PLUGIN FIGMA (RECOMENDADO) {#opcao-1-plugin-figma}

### Passo 1: Gerar Plugin

```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
node figma-plugin-generator.js
```

**Saída esperada:**
```
✅ Plugin gerado com sucesso!
📁 Arquivos criados em: figma-plugin/
   - code.js (código principal)
   - manifest.json (configuração)
   - ui.html (interface)
```

### Passo 2: Importar no Figma

1. **Abra o Figma Desktop** (não funciona no browser)
2. Vá em: **Plugins → Development → Import plugin from manifest**
3. Selecione: `figma-plugin/manifest.json`
4. Confirme a importação

### Passo 3: Executar Plugin

1. Crie um **novo arquivo** no Figma ou abra um existente
2. Vá em: **Plugins → Development → Luis Alves Mesas Auto Generator**
3. Clique em: **"Criar Projeto"**
4. Aguarde a criação (30-60 segundos)

### Passo 4: Resultado

O plugin criará automaticamente:

#### PAGE 1: Design System
- 8 Color Styles com nomes e hex codes
- 10 Text Styles (títulos, body, botões)
- Effect Styles (sombras)

#### PAGE 2: Components
- Button (Primary, Secondary, Outline)
- Product Card (com imagem, preço, CTA)
- Testimonial Card (depoimento + rating)
- Feature Card (ícone + texto)

#### PAGE 3: Landing Desktop (1280px)
- Hero Section (600px height)
- Diferenciais (4 cards)
- Catálogo (nota para grid)
- Seções marcadas

#### PAGE 4: Landing Mobile (375px)
- Hero responsivo
- Layout otimizado para mobile

---

## 🛠️ OPÇÃO 2: CRIAÇÃO MANUAL COM TOKENS {#opcao-2-manual-tokens}

### Passo 1: Gerar Tokens

```bash
node figma-auto-generator.js
```

### Passo 2: Criar Arquivo no Figma

1. Acesse [figma.com](https://figma.com)
2. Crie novo arquivo: **"Luis Alves Mesas - Landing Page"**
3. Email: `ferramentas.starken@gmail.com`

### Passo 3: Configurar Design System

#### 3.1 Criar Páginas

Crie 4 páginas:
1. `01 - Design System`
2. `02 - Components`
3. `03 - Landing Page Desktop`
4. `04 - Landing Page Mobile`

#### 3.2 Configurar Cores

Vá em: **Assets → Local styles → +**

| Nome | Hex Code | RGB |
|------|----------|-----|
| Primary/Marrom Rústico | #983421 | 152, 52, 33 |
| Secondary/Bege | #D3B185 | 211, 177, 133 |
| Accent/Verde CTA | #23af24 | 35, 175, 36 |
| Text/Preto | #17252a | 23, 37, 42 |
| Footer/Marrom Escuro | #563524 | 86, 53, 36 |
| Base/Branco | #ffffff | 255, 255, 255 |
| Base/Cinza Claro | #f8f9fa | 248, 249, 250 |
| Base/Cinza Médio | #6c757d | 108, 117, 125 |

#### 3.3 Configurar Tipografia

**Fontes necessárias:**
- Lobster Two (Google Fonts)
- Poppins (Google Fonts)
- Open Sans (Google Fonts)

**Text Styles:**

| Nome | Fonte | Tamanho | Peso | Altura Linha |
|------|-------|---------|------|--------------|
| H1/Desktop | Lobster Two | 64px | Bold (700) | 76.8px |
| H1/Mobile | Lobster Two | 40px | Bold (700) | 48px |
| H2/Desktop | Poppins | 48px | Bold (700) | 57.6px |
| H2/Mobile | Poppins | 32px | Bold (700) | 38.4px |
| H3/Subtitle | Poppins | 24px | SemiBold (600) | 32px |
| Body/Regular | Open Sans | 16px | Regular (400) | 24px |
| Body/Bold | Open Sans | 16px | Bold (700) | 24px |
| Button/Text | Poppins | 18px | SemiBold (600) | 24px |
| Menu/Item | Poppins | 16px | Medium (500) | 24px |
| Caption/Small | Open Sans | 14px | Regular (400) | 20px |

#### 3.4 Configurar Efeitos

**Sombras:**

| Nome | Offset | Blur | Spread | Cor |
|------|--------|------|--------|-----|
| Shadow/Card | 0, 4px | 12px | 0 | #000 10% |
| Shadow/Card Hover | 0, 8px | 24px | 0 | #000 15% |
| Shadow/Button | 0, 2px | 8px | 0 | #000 12% |

### Passo 4: Criar Componentes

Use o arquivo `figma-project-data.json` como referência para:
- Dimensões dos componentes
- Estados (default, hover, active)
- Conteúdo de exemplo

### Passo 5: Criar Layouts

Use as especificações em `figma-project-data.json`:
- Desktop: 1280px width
- Mobile: 375px width
- Seções com heights definidos

---

## 🔧 OPÇÃO 3: API REST (LIMITADO) {#opcao-3-api-rest}

### Limitações

A Figma REST API **NÃO** permite:
- ❌ Criar novos arquivos
- ❌ Criar páginas
- ❌ Criar componentes
- ❌ Adicionar elementos visuais

A API **PERMITE**:
- ✅ Ler arquivos existentes
- ✅ Obter informações de componentes
- ✅ Exportar assets
- ✅ Gerenciar comentários

### Como Usar (se tiver arquivo existente)

```bash
# Configurar token no .env
echo "FIGMA_TOKEN=seu_token_aqui" >> .env

# Executar script
node figma-auto-generator.js
```

---

## 🎨 DESIGN SYSTEM COMPLETO {#design-system}

### Paleta de Cores

#### Cores Primárias

```css
--color-primary: #983421      /* Marrom Rústico - Identidade da marca */
--color-secondary: #D3B185    /* Bege - Elegância e sofisticação */
--color-accent: #23af24       /* Verde - Calls to Action */
```

#### Cores de Texto

```css
--color-text: #17252a         /* Preto - Texto principal */
--color-footer: #563524       /* Marrom Escuro - Footer */
```

#### Cores Base

```css
--color-white: #ffffff        /* Branco - Backgrounds */
--color-gray: #f8f9fa         /* Cinza Claro - Backgrounds secundários */
--color-gray-medium: #6c757d  /* Cinza Médio - Textos secundários */
```

### Tipografia

#### Família de Fontes

```css
--font-display: 'Lobster Two', cursive;     /* Títulos principais */
--font-heading: 'Poppins', sans-serif;      /* Subtítulos e menu */
--font-body: 'Open Sans', sans-serif;       /* Corpo do texto */
```

#### Escala de Tamanhos

```css
/* Desktop */
--font-h1-desktop: 64px / 76.8px
--font-h2-desktop: 48px / 57.6px

/* Mobile */
--font-h1-mobile: 40px / 48px
--font-h2-mobile: 32px / 38.4px

/* Universal */
--font-h3: 24px / 32px
--font-body: 16px / 24px
--font-button: 18px / 24px
--font-caption: 14px / 20px
```

### Espaçamento

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
--spacing-3xl: 64px
```

### Sombras e Efeitos

```css
--shadow-card: 0 4px 12px rgba(0, 0, 0, 0.1)
--shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.15)
--shadow-button: 0 2px 8px rgba(0, 0, 0, 0.12)
```

### Cantos Arredondados

```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-full: 9999px
```

---

## 📐 ESTRUTURA DO PROJETO {#estrutura-projeto}

### Landing Page Desktop (1280px)

```
┌─────────────────────────────────────┐
│ HEADER + HERO (600px)               │
│ - Logo + Menu                       │
│ - Headline + Subheadline            │
│ - 2 CTAs (Explorar / Orçamento)     │
├─────────────────────────────────────┤
│ DIFERENCIAIS (300px)                │
│ - 4 Cards (experiência, entrega,    │
│   customização, parcelamento)       │
├─────────────────────────────────────┤
│ CATÁLOGO (1200px)                   │
│ - Grid 3 colunas                    │
│ - 13 produtos                       │
│ - Product Cards                     │
├─────────────────────────────────────┤
│ SOBRE (500px)                       │
│ - Imagem + Texto                    │
│ - 3 Valores (Qualidade, Tradição,   │
│   Garantia)                         │
├─────────────────────────────────────┤
│ DEPOIMENTOS (400px)                 │
│ - Carousel de 8 depoimentos         │
│ - Rating 4.9★                       │
├─────────────────────────────────────┤
│ PROCESSO (350px)                    │
│ - 4 Steps com setas                 │
│ - Escolha > Personalize > Pague >   │
│   Receba                            │
├─────────────────────────────────────┤
│ FOOTER (250px)                      │
│ - Contato, Links, Redes Sociais     │
│ - Copyright                         │
└─────────────────────────────────────┘
```

### Landing Page Mobile (375px)

```
┌───────────────┐
│ HERO (500px)  │
│ - Logo        │
│ - Título      │
│ - CTA         │
├───────────────┤
│ DIFERENCIAIS  │
│ - Stack 4     │
│   cards       │
├───────────────┤
│ CATÁLOGO      │
│ - Grid 1 col  │
│ - 13 produtos │
├───────────────┤
│ SOBRE         │
│ - Stack       │
├───────────────┤
│ DEPOIMENTOS   │
│ - Carousel    │
├───────────────┤
│ PROCESSO      │
│ - Stack 4     │
│   steps       │
├───────────────┤
│ FOOTER        │
│ - Compacto    │
└───────────────┘
```

### Componentes Criados

1. **Button**
   - Primary (verde #23af24)
   - Secondary (marrom #983421)
   - Outline (border only)
   - Estados: default, hover, active, disabled

2. **Product Card** (380x480px)
   - Imagem (340x280px)
   - Nome do produto
   - Preço (destaque)
   - Badge (opcional)
   - Botão CTA

3. **Testimonial Card** (360x200px)
   - Rating (estrelas)
   - Texto do depoimento
   - Nome do cliente
   - Localização

4. **Feature Card** (260x220px)
   - Ícone (48px)
   - Título
   - Descrição

5. **Navigation Bar**
   - Logo (esquerda)
   - Menu items (centro)
   - CTA button (direita)

6. **Footer**
   - 4 colunas (desktop)
   - Stack (mobile)
   - Links, contato, redes sociais

---

## 📦 CATÁLOGO DE PRODUTOS

### 13 Produtos Incluídos

| # | Nome | Preço | Badge |
|---|------|-------|-------|
| 1 | Mesa Imperatriz Natural | R$ 3.400 | Destaque |
| 2 | Mesa Glamour | R$ 3.400 | - |
| 3 | Mesa Glamour Mel | R$ 3.400 | - |
| 4 | Mesa Requinte Nobre | R$ 3.400 | - |
| 5 | Mesa Nobreza | R$ 4.200 | Premium |
| 6 | Mesa Encanto | R$ 3.400 | - |
| 7 | Mesa Império | R$ 3.400 | - |
| 8 | Mesa Charme | R$ 3.400 | - |
| 9 | Mesa Imperatriz | R$ 3.400 | - |
| 10 | Mesa Luxúria | R$ 4.500 | Premium |
| 11 | Mesa Requinte | R$ 3.400 | - |
| 12 | Mesa Paris | R$ 3.400 | - |
| 13 | Mesa Sublime | R$ 3.400 | - |

---

## 🎯 PRÓXIMOS PASSOS {#proximos-passos}

### 1. Após Criar no Figma

- [ ] Revisar todas as páginas criadas
- [ ] Ajustar espaçamentos conforme necessário
- [ ] Adicionar imagens reais dos produtos
- [ ] Configurar auto-layout nos componentes
- [ ] Testar responsividade

### 2. Preparar para Desenvolvimento

- [ ] Exportar assets necessários (logos, ícones)
- [ ] Compartilhar link do Figma com desenvolvedores
- [ ] Documentar interações e animações desejadas
- [ ] Definir breakpoints adicionais se necessário

### 3. Integrar Design Tokens

```bash
# CSS já está pronto em:
figma-design-tokens.css

# JSON para Tailwind:
figma-design-tokens-full.json
```

### 4. Desenvolvimento Frontend

Use os tokens gerados:

```html
<!-- Importar CSS -->
<link rel="stylesheet" href="figma-design-tokens.css">

<!-- Usar classes -->
<h1 class="text-h1-desktop">Título</h1>
<button class="bg-accent text-white">CTA</button>
```

Ou com Tailwind:

```javascript
// tailwind.config.js
const tokens = require('./figma-design-tokens-full.json');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: {
        display: ['Lobster Two', 'cursive'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      },
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.boxShadow
    }
  }
}
```

---

## 📞 SUPORTE

### Recursos Disponíveis

- 📄 `figma-project-data.json` - Documentação completa
- 🎨 `figma-design-tokens.css` - Tokens CSS
- 📦 `figma-design-tokens-full.json` - Tokens JSON
- 🔧 `figma-plugin/` - Plugin Figma
- 📖 Este guia (FIGMA-AUTO-SETUP-GUIDE.md)

### Links Úteis

- [Figma Desktop](https://www.figma.com/downloads/)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Google Fonts - Lobster Two](https://fonts.google.com/specimen/Lobster+Two)
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- [Google Fonts - Open Sans](https://fonts.google.com/specimen/Open+Sans)

---

## ✅ CHECKLIST DE QUALIDADE

### Design System
- [ ] 8 cores configuradas
- [ ] 10 text styles criados
- [ ] 3 effect styles (sombras)
- [ ] Nomenclatura consistente

### Componentes
- [ ] Button com 3 variantes + estados
- [ ] Product Card completo
- [ ] Testimonial Card
- [ ] Feature Card
- [ ] Navigation Bar
- [ ] Footer

### Layouts
- [ ] Desktop 1280px completo
- [ ] Mobile 375px completo
- [ ] Todas as 7 seções presentes
- [ ] Hierarquia visual clara

### Exportação
- [ ] Design tokens CSS gerados
- [ ] Design tokens JSON gerados
- [ ] Assets exportados
- [ ] Documentação completa

---

**Criado por:** Claude Code + Starken Assessoria
**Data:** 2025-11-10
**Versão:** 1.0.0
**Projeto:** Luis Alves Mesas para Festas
