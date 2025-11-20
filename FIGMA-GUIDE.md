# Guia Completo de Design no Figma - Luis Alves Mesas para Festas

## Informações da Conta Figma

**Email:** ferramentas.starken@gmail.com
**Tipo de Projeto:** Landing Page E-commerce
**Nome do Arquivo:** Luis Alves Mesas para Festas - Landing Page

---

## PASSO A PASSO PARA CRIAR NO FIGMA

### Etapa 1: Configuração Inicial do Arquivo

1. **Criar novo arquivo Figma**
   - Login em: https://www.figma.com
   - New Design File > Nome: "Luis Alves Mesas para Festas - LP"

2. **Criar páginas (Pages)**
   - Page 1: "🎨 Design System"
   - Page 2: "🖥 Desktop (1280px)"
   - Page 3: "📱 Mobile (375px)"
   - Page 4: "🧩 Components"
   - Page 5: "📄 Documentation"

---

### Etapa 2: Setup do Design System

#### 2.1 Color Styles

Criar estilos de cores:

1. **Primárias**
   - `Primary/Default` → #983421
   - `Primary/Light` → #b64a32
   - `Primary/Dark` → #7a2a1a

2. **Secundárias**
   - `Secondary/Default` → #D3B185
   - `Secondary/Light` → #e5c89f
   - `Secondary/Dark` → #c19f6c

3. **Accent (CTA)**
   - `Accent/Default` → #23af24
   - `Accent/Light` → #2bc42c
   - `Accent/Dark` → #1d8f1e

4. **Neutrals**
   - `Text/Primary` → #17252a
   - `Text/Secondary` → #4a5c63
   - `Text/Muted` → #8a9ca3
   - `Background/White` → #ffffff
   - `Background/Light` → #f8f9fa
   - `Background/Medium` → #e9ecef
   - `Footer` → #563524

5. **Functional**
   - `Success` → #23af24
   - `Error` → #dc3545
   - `Warning` → #ffc107
   - `Info` → #17a2b8

**Como criar:**
- Selecione um retângulo
- Fill > Solid Color > (cor)
- Botão "+" ao lado de "Fill"
- Nomeie seguindo padrão acima

#### 2.2 Text Styles

Criar estilos de texto:

1. **Heading 1 - Hero**
   - Font: Lobster Two
   - Weight: Bold (700)
   - Size: 56px
   - Line Height: 120%
   - Color: Primary/Default

2. **Heading 2 - Section Title**
   - Font: Lobster Two
   - Weight: Bold (700)
   - Size: 40px
   - Line Height: 120%
   - Color: Primary/Default

3. **Heading 3 - Subsection**
   - Font: Poppins
   - Weight: SemiBold (600)
   - Size: 28px
   - Line Height: 160%
   - Color: Text/Primary

4. **Heading 4 - Card Title**
   - Font: Poppins
   - Weight: SemiBold (600)
   - Size: 20px
   - Line Height: 160%
   - Color: Text/Primary

5. **Body - Default**
   - Font: Open Sans
   - Weight: Regular (400)
   - Size: 16px
   - Line Height: 160%
   - Color: Text/Primary

6. **Body - Small**
   - Font: Open Sans
   - Weight: Regular (400)
   - Size: 14px
   - Line Height: 160%
   - Color: Text/Secondary

7. **Menu/Button**
   - Font: Poppins
   - Weight: SemiBold (600)
   - Size: 16px
   - Line Height: 160%
   - Color: Text/Primary

**Como criar:**
- Text tool (T) > Digite texto
- Propriedades de texto (sidebar direita)
- Botão "+" em Text Styles
- Nomeie conforme acima

#### 2.3 Effect Styles (Sombras)

1. **Shadow/SM**
   - Type: Drop Shadow
   - X: 0, Y: 1, Blur: 2
   - Color: #000000, Opacity: 5%

2. **Shadow/MD**
   - Type: Drop Shadow
   - X: 0, Y: 4, Blur: 6
   - Color: #000000, Opacity: 10%

3. **Shadow/LG**
   - Type: Drop Shadow
   - X: 0, Y: 10, Blur: 15
   - Color: #000000, Opacity: 10%

4. **Shadow/Card**
   - Type: Drop Shadow
   - X: 0, Y: 4, Blur: 12
   - Color: #983421, Opacity: 10%

5. **Shadow/Card Hover**
   - Type: Drop Shadow
   - X: 0, Y: 8, Blur: 24
   - Color: #983421, Opacity: 15%

**Como criar:**
- Retângulo > Effects > "+"
- Drop Shadow > Configure
- Salve o estilo

#### 2.4 Grid e Layout System

**Desktop Frame (1280px):**
- Largura: 1280px
- Layout Grid:
  - Type: Columns
  - Count: 12
  - Margin: 40px
  - Gutter: 24px
  - Color: #983421, Opacity: 10%

**Mobile Frame (375px):**
- Largura: 375px
- Layout Grid:
  - Type: Columns
  - Count: 4
  - Margin: 16px
  - Gutter: 16px
  - Color: #983421, Opacity: 10%

---

### Etapa 3: Criação de Componentes (Page: Components)

#### 3.1 Button Components

**Button/Primary**
1. Frame: 200x48px
2. Background: #23af24 (Accent/Default)
3. Text: "Explorar Catálogo"
   - Style: Menu/Button
   - Color: White
4. Padding: 16px horizontal
5. Border Radius: 8px
6. Effect: Shadow/MD
7. Create Component (Cmd/Ctrl + Option/Alt + K)

**Variants:**
- Default State
- Hover State (Background: #2bc42c, Shadow/LG)
- Active State (Background: #1d8f1e)

**Button/Secondary**
1. Frame: 200x48px
2. Background: Transparent
3. Border: 2px, #983421
4. Text: "Ver Detalhes"
5. Border Radius: 8px
6. Create Component

**Variants:**
- Default State
- Hover State (Background: #983421, Text: White)

#### 3.2 Input Components

**Input/Text**
1. Frame: 400x48px
2. Background: #ffffff
3. Border: 1px, #dee2e6
4. Border Radius: 8px
5. Placeholder text: "Digite seu email..."
6. Padding: 16px

**Input/Textarea**
1. Frame: 400x120px
2. Background: #ffffff
3. Border: 1px, #dee2e6
4. Border Radius: 8px
5. Padding: 16px

#### 3.3 Product Card Component

**Card/Product**
1. Frame: 380x520px
2. Background: #ffffff
3. Border Radius: 16px
4. Effect: Shadow/Card

**Estrutura interna:**
- Image Container: 380x285px (aspect 4:3)
  - Placeholder: Rectangle (#D3B185)
- Badge: "SOB MEDIDA"
  - Position: Absolute, top-right (16px)
  - Background: #23af24
  - Text: White, 12px, Bold
  - Padding: 4px 16px
  - Border Radius: 999px
- Content Area: Padding 24px
  - Product Title: Heading 4
  - Price: Heading 3, Color: Primary
  - Button Group: 2 buttons horizontal

**Create Component com variants:**
- Default
- Hover (Shadow/Card Hover)

#### 3.4 Testimonial Card Component

**Card/Testimonial**
1. Frame: 380x320px
2. Background: #ffffff
3. Border Radius: 16px
4. Effect: Shadow/MD
5. Padding: 32px

**Estrutura:**
- Stars: ⭐⭐⭐⭐⭐ (Color: #23af24)
- Quote text: Body, Italic
- Author section:
  - Avatar: Circle, 48x48px
  - Name: Body/Small, Bold
  - Location: Body/Small, Muted

#### 3.5 Feature Card Component

**Card/Feature**
1. Frame: 280x240px
2. Background: #ffffff
3. Border: 1px, #f1f3f5
4. Border Radius: 16px
5. Padding: 32px
6. Text Align: Center

**Estrutura:**
- Icon Container: Circle, 64x64px, Background: #D3B185
- Title: Heading 4
- Description: Body/Small, Color: Secondary

---

### Etapa 4: Criação da Landing Page Desktop (1280px)

#### Frame Setup
1. Frame (F) > Desktop
2. Width: 1280px
3. Background: #ffffff
4. Layout Grid (12 columns)

#### Seção 1: Header + Hero (Height: 600px)

**Navbar (Fixed)**
1. Frame: 1280x80px
2. Background: #ffffff
3. Effect: Shadow/SM
4. Logo: 180x60px (placeholder)
5. Menu items: Horizontal auto-layout
   - Gap: 48px
   - Text Style: Menu/Button
6. CTA Button: Button/Primary

**Hero Section**
1. Background: Rectangle com imagem (overlay 10%)
2. Content: Center aligned
3. H1: "Mesas Rústicas Premium para Seus Eventos"
4. Subheading: Body text
5. Button Group:
   - Primary: "Explorar Catálogo"
   - Secondary: "WhatsApp"
6. Spacing: Auto-layout vertical, gap 24px

#### Seção 2: Diferenciais (Height: 400px)

1. Section Title: H2 "Por Que Escolher a Gente?"
2. Grid: 4 colunas
   - Auto-layout horizontal
   - Gap: 24px
   - Padding: 80px 0
3. Cards: Use Component "Card/Feature"
4. Conteúdo dos 4 cards (veja LANDING-PAGE-STRUCTURE.md)

#### Seção 3: Catálogo (Height: ~2000px)

1. Section Title: H2 "Nosso Catálogo"
2. Subtitle: Body text
3. Product Grid:
   - 3 colunas
   - Gap: 24px
   - Auto-layout vertical para linhas
4. Cards: Use Component "Card/Product" (13 produtos)
5. CTA Bottom: Button/Primary "Ver Todos os Modelos"

#### Seção 4: Sobre a Empresa (Height: 600px)

1. Layout: 2 colunas (50/50)
2. Left: Image (600x500px)
3. Right: Content
   - H2: "Quem Somos"
   - Body text (ver conteúdo)
   - 3 valores com icons
   - CTA: Button/Secondary

#### Seção 5: Depoimentos (Height: 500px)

1. Section Title: H2 "O Que Nossos Clientes Dizem"
2. Rating: ⭐ 4.9/5.0
3. Carousel:
   - 3 cards visíveis
   - Use Component "Card/Testimonial"
   - Navigation arrows
   - Dots indicator

#### Seção 6: Processo (Height: 500px)

1. Section Title: H2 "Como Funciona o Processo"
2. Steps: 4 cards horizontais
   - Auto-layout horizontal
   - Gap: 40px
   - Arrows between steps (→)
3. Cada step:
   - Number badge
   - Icon
   - Title
   - Description

#### Seção 7: Footer (Height: 400px)

1. Background: #563524
2. Layout: 4 colunas
3. Content:
   - Logo e descrição
   - Links navegação
   - Links produtos
   - Contato e social
4. Newsletter section
5. Copyright bottom

---

### Etapa 5: Versão Mobile (375px)

1. Duplicate Desktop frame
2. Resize to 375px width
3. Stack all sections vertically
4. Adjustments:
   - Navbar: Hamburger menu
   - Hero: Text smaller, stack buttons
   - Grid 3 cols → 1 col
   - Two columns → Stack
   - Font sizes: Use Auto-layout with constraints

**Mobile Specific Changes:**
- Padding: 16px (vs 40px desktop)
- Font sizes: Scale down (veja DESIGN-SYSTEM.md)
- Touch targets: Min 44x44px
- Carousel: 1 card visible

---

### Etapa 6: Protótipo Interativo

#### Criar interações:

1. **Navbar Links:**
   - On Click → Scroll To → Section

2. **Buttons "Explorar Catálogo":**
   - On Click → Scroll To → Catálogo Section

3. **Product Cards "Ver Detalhes":**
   - On Click → Navigate To → Product Detail (opcional)

4. **Carousel:**
   - Arrow Left → Previous card
   - Arrow Right → Next card

5. **Mobile Menu:**
   - Hamburger → Open overlay menu

**Como criar:**
- Prototype tab (sidebar direita)
- Select element > Drag connection
- Configure trigger and action

---

### Etapa 7: Export e Entregáveis

#### 7.1 Export Design Tokens (CSS)

1. Install Plugin: "Design Tokens"
2. Export colors, typography, spacing
3. Gerar CSS variables

#### 7.2 Export Assets

**Imagens:**
- Product images: PNG, 1200x900px
- Icons: SVG
- Logo: SVG + PNG (2x, 3x)

**Export settings:**
- Add export settings to frames
- 1x, 2x, 3x for retina

#### 7.3 Developer Handoff

1. Install Plugin: "Inspect" (Figma nativo)
2. Share link com desenvolvedores
3. Modo: "View only" ou "Can edit"
4. Code Panel: Ativo para ver CSS

---

## RECURSOS ADICIONAIS

### Plugins Recomendados:

1. **Iconify** - Ícones gratuitos
2. **Unsplash** - Imagens placeholder
3. **Autoflow** - Criar setas de fluxo
4. **Stark** - Verificar contraste/acessibilidade
5. **Content Reel** - Popular com dados falsos
6. **Lorem Ipsum** - Texto placeholder

### Fontes (Google Fonts):

1. **Lobster Two** (700)
   - Link: https://fonts.google.com/specimen/Lobster+Two

2. **Poppins** (400, 500, 600, 700)
   - Link: https://fonts.google.com/specimen/Poppins

3. **Open Sans** (400, 600, 700)
   - Link: https://fonts.google.com/specimen/Open+Sans

**Como adicionar no Figma:**
- Text properties > Font dropdown
- Search and select

### Imagens Sugeridas:

**Unsplash Keywords:**
- "rustic wooden table"
- "wooden furniture"
- "wedding table decoration"
- "rustic event"
- "artisan woodwork"

---

## CHECKLIST FINAL

Antes de enviar para desenvolvimento:

- [ ] Todas as cores estão em Color Styles
- [ ] Todos os textos usam Text Styles
- [ ] Componentes criados para elementos repetidos
- [ ] Desktop (1280px) completo
- [ ] Mobile (375px) completo
- [ ] Protótipo com interações básicas
- [ ] Acessibilidade verificada (contraste)
- [ ] Assets exportados (SVG, PNG)
- [ ] Design tokens exportados (CSS)
- [ ] Link compartilhado com permissões corretas
- [ ] Documentação de componentes
- [ ] Specifications para desenvolvedores

---

## COMPARTILHAMENTO

### Link Figma:
Após criar, compartilhar com:
- **Tipo:** Can view (desenvolvedores)
- **Modo:** Developer Mode ativado
- **Link público:** Para stakeholders

### Estrutura final de entrega:

```
Figma File: Luis Alves Mesas para Festas - LP
├── Page: 🎨 Design System
│   ├── Color Palette
│   ├── Typography Scale
│   ├── Spacing System
│   └── Effects
├── Page: 🖥 Desktop (1280px)
│   └── Frame: Landing Page Desktop
├── Page: 📱 Mobile (375px)
│   └── Frame: Landing Page Mobile
├── Page: 🧩 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   └── Navigation
└── Page: 📄 Documentation
    ├── Component Guidelines
    ├── Design Decisions
    └── Developer Notes
```

---

## TEMPO ESTIMADO

- **Setup Design System:** 2 horas
- **Criação de Componentes:** 3 horas
- **Landing Page Desktop:** 4 horas
- **Landing Page Mobile:** 2 horas
- **Protótipo:** 1 hora
- **Export e Documentação:** 1 hora

**Total:** ~13 horas

---

## SUPORTE E RECURSOS

### Tutoriais Figma:
- Figma Tutorial para Iniciantes: https://www.youtube.com/watch?v=FTFaQWZBqQ8
- Components e Variants: https://help.figma.com/hc/en-us/articles/360038662654
- Auto-layout: https://help.figma.com/hc/en-us/articles/360040451373

### Comunidade:
- Figma Community: https://www.figma.com/community
- Buscar por: "E-commerce Landing Page" para inspiração

---

**Guia criado em:** Novembro 2025
**Versão:** 1.0
**Autor:** Design System Team
**Contato:** ferramentas.starken@gmail.com
