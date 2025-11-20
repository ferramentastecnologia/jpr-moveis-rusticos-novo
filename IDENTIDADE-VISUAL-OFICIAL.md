# 🎨 Identidade Visual Oficial - JPR Móveis Rústicos

## Baseado no Manual Oficial da Marca

---

## 📋 Paleta de Cores Oficial

### Cores Primárias

| Cor | Nome | RGB | HEX | Uso |
|-----|------|-----|-----|-----|
| 🟤 | Bege Principal | 219, 193, 162 | `#dbc1a2` | Elemento principal, backgrounds |
| 🟤 | Marrom Escuro | 107, 68, 54 | `#6b4436` | Textos, acentos, logo |
| 🟤 | Marrom Médio | 115, 115, 83 | `#737353` | Textos secundários, detalhes |
| 🟢 | Teal/Verde | 27, 135, 104 | `#1b8768` | Destaque, CTA, hover |

### Cores Complementares

| Cor | HEX | Uso |
|-----|-----|-----|
| 🟠 Orange | `#ff6913` | Alertas, destaques especiais |
| 🔴 Vermelho | `#e04c16` | Promoções, atenção |
| 🟢 Teal Claro | `#009476` | Hover, links |
| 💎 Mint | `#1ce0b8` | Backgrounds claros |

### Cores Neutras

| Cor | RGB | HEX | Uso |
|-----|-----|-----|-----|
| ⬛ Escuro | 23, 37, 42 | `#17252a` | Textos principais |
| ⚪ Branco | 255, 255, 255 | `#ffffff` | Backgrounds, textos claros |
| 🩶 Cinza Claro | 245, 245, 245 | `#f5f5f5` | Backgrounds alternativos |

---

## 🔤 Tipografia Oficial

### Fonte Principal - TRAJAN PRO
```
Uso: Títulos, headings, logo
Peso: 400 (Regular), 700 (Bold)
Estilo: Serif clássico e elegante
Características: Serifas alongadas, requer, inovação
```

**Exemplo:**
```
JPR Móveis Rústicos
Mesas Premium em Fino Acabamento
```

### Fonte Secundária - QUATTROCENTO SANS
```
Uso: Corpo do texto, parágrafos, descrições
Peso: 400 (Regular), 500 (Medium), 700 (Bold)
Estilo: Sans-serif moderno
Características: Limpa, legível, contemporânea
```

**Exemplo:**
```
Móveis rústicos em fino acabamento com madeira de qualidade
```

### Fonte de Destaque - WISDOM SCRIPT
```
Uso: Subtítulos, citações, destaques especiais
Estilo: Script/Cursiva elegante
Características: Despojada, atual, acessível
```

**Exemplo:**
```
Móveis rústicos em fino acabamento
```

---

## 🎨 Aplicação das Cores

### Hero Section
```css
background: linear-gradient(135deg, #1b8768 0%, #6b4436 100%);
/* Verde Teal → Marrom Escuro */
```

### Botões CTA (Call-to-Action)
```css
background: #6b4436;  /* Marrom Escuro */
color: #ffffff;
hover: background #1b8768;  /* Teal */
```

### Backgrounds
```css
background: #f5f5f5;  /* Cinza Claro */
accent: #dbc1a2;      /* Bege Principal */
```

### Textos
```css
text: #17252a;        /* Escuro */
text-secondary: #737353;  /* Marrom Médio */
text-light: #6b4436;  /* Marrom Escuro sobre claro */
```

---

## 🖼️ Logo e Identidade

### Logo Oficial - JPR

**Elementos:**
- **Serra** (símbolo): Representa a tecnologia de confecção
- **Linhas Horizontais**: Estabilidade e compromisso
- **Letras JR**: Elegância com serifas alongadas
- **Texto**: "Móveis Rústicos" em script

**Cores da Logo:**
- Bege principal: `#dbc1a2`
- Marrom escuro: `#6b4436`
- Branco: `#ffffff`

**Variações:**
- Sobre fundo branco (padrão)
- Sobre fundo marrom escuro
- Sobre fundo teal
- Monocromático (cinza/preto)

---

## 📐 Especificações de Design

### Spacing (Espaçamento)
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Border Radius
```css
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 9999px (círculos)
```

### Sombras
```css
sm:  0 2px 8px rgba(0, 0, 0, 0.08)
md:  0 4px 12px rgba(0, 0, 0, 0.12)
lg:  0 8px 24px rgba(0, 0, 0, 0.15)
xl:  0 16px 40px rgba(0, 0, 0, 0.2)
```

### Transições
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🎯 Guia de Uso

### Quando usar Bege Principal (#dbc1a2)
- Backgrounds de seções
- Elementos decorativos
- Hoverstate suave
- Fundo do site

### Quando usar Marrom Escuro (#6b4436)
- Botões principais (CTA)
- Textos em backgrounds claros
- Logo e identidade
- Footers
- Links

### Quando usar Teal/Verde (#1b8768)
- Hero section
- Hover de botões
- Acentos principais
- Gradientes
- Badges especiais

### Quando usar Marrom Médio (#737353)
- Textos secundários
- Labels
- Subtítulos
- Textos em backgrounds escuros

---

## 📱 Responsividade e Acessibilidade

### Contraste de Cores
```
Texto Escuro sobre Bege:  ✅ Contraste válido (WCAG AA)
Texto Branco sobre Marrom: ✅ Contraste válido (WCAG AAA)
Texto Branco sobre Teal:   ✅ Contraste válido (WCAG AAA)
```

### Modo Escuro (Sugestão Futura)
```css
/* Dark mode palette */
--bg-dark: #2a2a2a
--accent-dark: #1ce0b8
--text-dark: #f5f5f5
```

---

## 🔗 Integração no Frontend

### CSS Variables
```css
:root {
    --primary: #dbc1a2;
    --secondary: #6b4436;
    --tertiary: #737353;
    --accent: #1b8768;
    --text: #17252a;
    --white: #ffffff;
    --gray-light: #f5f5f5;

    --font-display: 'Trajan Pro', serif;
    --font-body: 'Quattrocento Sans', sans-serif;
    --font-accent: 'Wisdom Script', cursive;
}
```

### Uso em HTML
```html
<!-- Hero com cores oficiais -->
<section class="hero" style="background: linear-gradient(135deg, var(--accent), var(--secondary));">
    <h1 style="font-family: var(--font-display);">JPR Móveis Rústicos</h1>
</section>

<!-- Botão CTA -->
<button class="btn-primary" style="background: var(--secondary);">
    Explorar Catálogo
</button>
```

---

## 📸 Exemplos Visuais

### Palheta Completa
```
[#1b8768] ────────────────────────────────────
  Teal/Verde Destaque (Ace­nte)

[#6b4436] [#dbc1a2] [#737353]
  Marrom   Bege     Marrom
  Escuro   Principal Médio

[#17252a]                          [#f5f5f5]
  Texto                           Background
  Escuro                          Claro
```

---

## ✅ Checklist de Implementação

Cores Oficiais:
- [x] Bege Principal (#dbc1a2)
- [x] Marrom Escuro (#6b4436)
- [x] Marrom Médio (#737353)
- [x] Teal/Verde (#1b8768)
- [x] Cores complementares

Tipografia Oficial:
- [x] Trajan Pro para títulos
- [x] Quattrocento Sans para corpo
- [x] Wisdom Script para destaques
- [x] Font imports adicionados

Aplicação no Frontend:
- [x] CSS variables atualizadas
- [x] Hero section com gradient oficial
- [x] Botões com cores corretas
- [x] Textos com contraste WCAG

---

## 📄 Arquivo de Referência

**Manual Oficial:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/Identidade Visual/Guia de marca JPR.pdf`

**Logos:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/Identidade Visual/`

---

## 🎨 Próximos Passos

1. **Implementar Logos Oficiais**
   - [ ] Logo em SVG para website
   - [ ] Favicon com logo
   - [ ] Logo responsivo para mobile

2. **Adicionar Fontes via Google Fonts**
   - [x] Trajan Pro
   - [x] Quattrocento Sans
   - [ ] Wisdom Script (verificar disponibilidade)

3. **Atualizar Componentes**
   - [ ] Cards de produtos com cores oficiais
   - [ ] Badges com teal
   - [ ] Links com hover em teal
   - [ ] Badges de promoção em orange

4. **Temas e Variações**
   - [ ] Tema light (atual)
   - [ ] Tema dark (futuro)
   - [ ] Tema de sazonalidade (Black Friday, Natal)

---

**Documento Criado:** Novembro 2024
**Baseado em:** Guia de Marca JPR Móveis Rústicos (Oficial)
**Status:** ✅ Implementado e Ativo

