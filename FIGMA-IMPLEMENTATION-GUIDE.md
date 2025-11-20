# Guia Completo de Implementacao no Figma - Luis Alves Mesas

## OBJETIVO
Criar arquivo Figma completo com Design System + Landing Page responsiva (Desktop 1280px e Mobile 375px)

---

## PASSO 1: CRIAR NOVO ARQUIVO FIGMA

### 1.1 Acesso e Configuracao Inicial
1. Acesse **Figma.com** com a conta: `ferramentas.starken@gmail.com`
2. Clique em **"New Design File"**
3. Renomeie para: **"Luis Alves Mesas - Landing Page"**
4. Configure as paginas:
   - Page 1: "Design System"
   - Page 2: "Landing Page - Desktop"
   - Page 3: "Landing Page - Mobile"
   - Page 4: "Components"

---

## PASSO 2: CRIAR DESIGN SYSTEM (Page 1)

### 2.1 Color Styles

**Como criar:**
1. Selecione ferramenta Rectangle (R)
2. Crie um retangulo 200x200px
3. Aplique a cor
4. No painel direito, clique nos 4 pontos ao lado de "Fill"
5. Clique em "+" para criar novo estilo
6. Nomeie conforme abaixo

**Cores para criar:**

#### Primary Colors
```
Nome: Primary/Marrom Rustico
Hex: #983421
Descricao: Cor principal da marca
```

```
Nome: Primary/Marrom Rustico Light
Hex: #b64a32
Descricao: Hover state
```

```
Nome: Primary/Marrom Rustico Dark
Hex: #7a2a1a
Descricao: Active state
```

#### Secondary Colors
```
Nome: Secondary/Bege
Hex: #D3B185
Descricao: Cor secundaria
```

```
Nome: Secondary/Bege Light
Hex: #e5c89f
Descricao: Hover state
```

#### Accent/CTA
```
Nome: Accent/Verde
Hex: #23af24
Descricao: Call-to-action principal
```

```
Nome: Accent/Verde Light
Hex: #2bc42c
Descricao: Hover state
```

#### Neutrals
```
Nome: Neutrals/Text Primary
Hex: #17252a
Descricao: Texto principal
```

```
Nome: Neutrals/Text Secondary
Hex: #4a5c63
Descricao: Texto secundario
```

```
Nome: Neutrals/Text Muted
Hex: #8a9ca3
Descricao: Texto desbotado
```

```
Nome: Neutrals/BG White
Hex: #ffffff
Descricao: Fundo branco
```

```
Nome: Neutrals/BG Light
Hex: #f8f9fa
Descricao: Fundo claro
```

```
Nome: Neutrals/Footer
Hex: #563524
Descricao: Marrom escuro footer
```

#### Borders
```
Nome: Borders/Default
Hex: #dee2e6
Descricao: Borda padrao
```

```
Nome: Borders/Light
Hex: #f1f3f5
Descricao: Borda clara
```

### 2.2 Text Styles

**Como criar:**
1. Selecione ferramenta Text (T)
2. Digite "Heading 1" e formate
3. Com texto selecionado, clique nos 4 pontos ao lado de "Text"
4. Clique em "+" para criar novo estilo
5. Nomeie conforme abaixo

**Fontes para importar:**
- Lobster Two (400, 700)
- Poppins (400, 500, 600, 700)
- Open Sans (400, 600, 700)

**Text Styles para criar:**

#### Headings
```
Nome: Heading/H1
Fonte: Lobster Two Bold
Tamanho: 56px (3.5rem)
Line Height: 120%
Color: Primary/Marrom Rustico
```

```
Nome: Heading/H2
Fonte: Lobster Two Bold
Tamanho: 40px (2.5rem)
Line Height: 120%
Color: Primary/Marrom Rustico
```

```
Nome: Heading/H3
Fonte: Poppins SemiBold
Tamanho: 28px (1.75rem)
Line Height: 160%
Color: Neutrals/Text Primary
```

```
Nome: Heading/H4
Fonte: Poppins SemiBold
Tamanho: 20px (1.25rem)
Line Height: 160%
Color: Neutrals/Text Primary
```

#### Body Text
```
Nome: Body/Large
Fonte: Open Sans Regular
Tamanho: 18px
Line Height: 160%
Color: Neutrals/Text Primary
```

```
Nome: Body/Regular
Fonte: Open Sans Regular
Tamanho: 16px
Line Height: 160%
Color: Neutrals/Text Primary
```

```
Nome: Body/Small
Fonte: Open Sans Regular
Tamanho: 14px
Line Height: 160%
Color: Neutrals/Text Secondary
```

#### Menu/Navigation
```
Nome: Menu/Regular
Fonte: Poppins SemiBold
Tamanho: 16px
Line Height: 160%
Color: Neutrals/Text Primary
```

#### Button Text
```
Nome: Button/Large
Fonte: Poppins SemiBold
Tamanho: 20px
Letter Spacing: 0.5px
Color: Neutrals/BG White
```

```
Nome: Button/Regular
Fonte: Poppins SemiBold
Tamanho: 16px
Letter Spacing: 0.5px
Color: Neutrals/BG White
```

### 2.3 Effect Styles (Sombras)

**Como criar:**
1. Crie um retangulo
2. No painel direito, em "Effects", clique em "+"
3. Selecione "Drop Shadow"
4. Configure conforme abaixo
5. Clique nos 4 pontos ao lado de "Effects"
6. Clique em "+" para criar estilo

**Efeitos para criar:**

```
Nome: Shadow/SM
X: 0, Y: 1, Blur: 2, Spread: 0
Color: #000000 com 5% opacity
```

```
Nome: Shadow/MD
X: 0, Y: 4, Blur: 6, Spread: -1
Color: #000000 com 10% opacity
```

```
Nome: Shadow/LG
X: 0, Y: 10, Blur: 15, Spread: -3
Color: #000000 com 10% opacity
```

```
Nome: Shadow/Card
X: 0, Y: 4, Blur: 12, Spread: 0
Color: #983421 com 10% opacity
```

```
Nome: Shadow/Card Hover
X: 0, Y: 8, Blur: 24, Spread: 0
Color: #983421 com 15% opacity
```

---

## PASSO 3: CRIAR COMPONENTES (Page 4)

### 3.1 Button Component

**Criar variantes:**
1. Crie um frame 200x56px
2. Adicione texto "Button"
3. Aplique estilos
4. Selecione frame + texto
5. Clique direito > "Create Component"
6. No painel direito, clique em "+" ao lado de Properties
7. Adicione propriedade "Type" com valores: Primary, Secondary, Outline

**Variante 1: Primary Button**
```
Dimensoes: Auto-layout (Horizontal)
Padding: 16px horizontal, 12px vertical
Gap: 8px
Background: Accent/Verde
Border Radius: 8px
Text: Button/Regular
Shadow: Shadow/MD
```

**Variante 2: Secondary Button**
```
Dimensoes: Auto-layout (Horizontal)
Padding: 16px horizontal, 12px vertical
Border: 2px solid Primary/Marrom Rustico
Background: Transparent
Border Radius: 8px
Text: Button/Regular (cor Primary/Marrom Rustico)
```

**Variante 3: Outline Button**
```
Dimensoes: Auto-layout (Horizontal)
Padding: 12px horizontal, 8px vertical
Border: 1px solid Borders/Default
Background: Neutrals/BG White
Border Radius: 8px
Text: Body/Small (cor Neutrals/Text Primary)
```

**Adicionar Interactive:**
- Hover: Transform Y: -2px, Shadow: Shadow/LG
- Active: Transform Y: 0px

### 3.2 Input Component

**Criar campo de texto:**
```
Dimensoes: 400x48px
Background: Neutrals/BG White
Border: 1px solid Borders/Default
Border Radius: 8px
Padding: 12px
Text: Body/Regular
Placeholder: Text Muted
```

**Estados:**
- Default: Border color Borders/Default
- Focus: Border color Primary/Marrom Rustico + Shadow (0 0 0 3px rgba(152,52,33,0.1))
- Error: Border color #dc3545

### 3.3 Product Card Component

**Estrutura:**
```
Dimensoes: 380x520px
Background: Neutrals/BG White
Border Radius: 16px
Shadow: Shadow/Card
Auto-layout: Vertical, gap 16px
```

**Elementos internos:**
1. **Image Container:**
   - Dimensoes: 380x285px (aspect ratio 4:3)
   - Border Radius: 16px 16px 0 0
   - Fill: Placeholder image

2. **Badge (optional):**
   - Position: Absolute, top-right (16px, 16px)
   - Background: Accent/Verde
   - Text: Body/Small (branco)
   - Padding: 4px 12px
   - Border Radius: 999px

3. **Content:**
   - Padding: 24px
   - Gap: 8px

4. **Title:**
   - Text: Heading/H4
   - Max width: 332px

5. **Price:**
   - Text: Heading/H3 (cor Primary/Marrom Rustico)
   - Font: Lobster Two

6. **Button Group:**
   - Auto-layout: Horizontal
   - Gap: 8px
   - 2 buttons: "Ver Detalhes" (Primary) + Icon button

**Interactive:**
- Hover: Transform Y: -4px, Shadow: Shadow/Card Hover

### 3.4 Feature Card Component

**Estrutura:**
```
Dimensoes: 280x240px
Background: Neutrals/BG White
Border: 1px solid Borders/Light
Border Radius: 16px
Padding: 32px
Auto-layout: Vertical, gap 16px, center aligned
```

**Elementos:**
1. **Icon Container:**
   - Dimensoes: 64x64px
   - Background: Secondary/Bege
   - Border Radius: 50%
   - Icon: 32x32px (cor Primary/Marrom Rustico)

2. **Title:**
   - Text: Heading/H4
   - Text align: center

3. **Description:**
   - Text: Body/Small
   - Text align: center
   - Color: Neutrals/Text Secondary

**Interactive:**
- Hover: Border color Primary/Marrom Rustico, Shadow: Shadow/LG, Transform Y: -4px

### 3.5 Testimonial Card Component

**Estrutura:**
```
Dimensoes: 380x320px
Background: Neutrals/BG White
Border Radius: 16px
Shadow: Shadow/MD
Padding: 32px
Auto-layout: Vertical, gap 16px
```

**Elementos:**
1. **Quote Icon:**
   - Text: " (aspas)
   - Font: Lobster Two
   - Size: 64px
   - Color: Secondary/Bege com 30% opacity
   - Position: Absolute, top-left

2. **Stars:**
   - 5 star icons
   - Color: Accent/Verde
   - Size: 20x20px each

3. **Review Text:**
   - Text: Body/Regular
   - Font Style: Italic
   - Line Height: 180%
   - Max lines: 4

4. **Author Section:**
   - Auto-layout: Horizontal, gap 12px
   - Avatar: 48x48px circle
   - Name: Body/Small SemiBold
   - Location: Body/Small (Text Muted)

### 3.6 Navigation Component

**Desktop Navigation:**
```
Dimensoes: 1280x80px (full width)
Background: Neutrals/BG White
Shadow: Shadow/SM
Auto-layout: Horizontal, space-between
Padding: 16px 24px
Position: Fixed top
```

**Elementos:**
1. **Logo:**
   - Height: 48px
   - Auto width

2. **Menu:**
   - Auto-layout: Horizontal, gap 48px
   - Menu items: Text style Menu/Regular
   - Active state: Border bottom 2px Primary/Marrom Rustico

3. **CTA Button:**
   - Button Primary component
   - Text: "Solicitar Orcamento"

**Mobile Navigation:**
```
Dimensoes: 375x64px
Hamburger menu icon: 24x24px
```

### 3.7 Footer Component

**Estrutura Desktop:**
```
Dimensoes: 1280x auto
Background: Neutrals/Footer
Color: Neutrals/BG White
Padding: 64px 24px 32px
Auto-layout: Vertical
```

**Secoes:**
1. **Footer Grid:**
   - Auto-layout: Horizontal, gap 48px
   - 4 colunas iguais

2. **Newsletter:**
   - Input + Button inline
   - Width: 500px

3. **Bottom Bar:**
   - Border top: 1px solid rgba(255,255,255,0.1)
   - Padding top: 24px
   - Text: Body/Small (rgba(255,255,255,0.7))
   - Text align: center

---

## PASSO 4: CRIAR LANDING PAGE DESKTOP (Page 2)

### 4.1 Frame Desktop
1. Criar frame: 1280x7000px (aproximado)
2. Nome: "Desktop - Landing Page"
3. Background: Neutrals/BG Light

### 4.2 Secao 1: Header + Hero (1280x600px)

**Header (fixed):**
- Use Navigation Component
- Width: 1280px, Height: 80px

**Hero Section:**
```
Background: Image com overlay escuro (opacity 10%)
Height: 600px
Content: Centralizado
```

**Conteudo:**
1. **H1:** "Mesas Rusticas Premium para Seus Eventos"
   - Text: Heading/H1
   - Max width: 800px
   - Text align: center

2. **H2:** "Transforme seu espaco com moveis de qualidade incomparavel"
   - Text: Heading/H3
   - Color: Neutrals/Text Secondary
   - Max width: 600px

3. **CTA Group:**
   - Button Primary: "Explorar Catalogo"
   - Button Secondary: "Falar no WhatsApp"
   - Gap: 16px

### 4.3 Secao 2: Diferenciais (1280x400px)

```
Padding: 80px 24px
Background: Neutrals/BG White
```

**Titulo:**
- Text: Heading/H2
- "Por Que Escolher a Gente?"
- Text align: center
- Margin bottom: 48px

**Grid:**
- 4 Feature Cards em linha
- Gap: 24px
- Centralizados

**Cards (use Feature Card Component):**
1. Trophy icon + "7+ Anos de Experiencia"
2. Truck icon + "Entrega SC/PR"
3. Palette icon + "Customizacao Sob Medida"
4. Credit Card icon + "Parcelamento 12x Sem Juros"

### 4.4 Secao 3: Catalogo de Produtos (1280x auto)

```
Padding: 80px 24px
Background: Neutrals/BG Light
```

**Titulo:**
- Text: Heading/H2
- "Nosso Catalogo"
- Text align: center

**Subtitulo:**
- Text: Body/Large
- "Escolha o modelo perfeito para voce"
- Text align: center
- Margin bottom: 48px

**Grid:**
- 3 colunas x 5 linhas (15 cards, mas mostrar 13)
- Gap: 24px
- Use Product Card Component

**Produtos (criar 13 instancias):**
1. Mesa Imperatriz Natural - R$ 3.400
2. Mesa Glamour - R$ 3.400
3. Mesa Glamour Mel - R$ 3.400
4. Mesa Requinte Nobre - R$ 3.400
5. Mesa Nobreza - R$ 4.200 (badge "PREMIUM")
6. Mesa Encanto - R$ 3.400
7. Mesa Imperio - R$ 3.400
8. Mesa Charme - R$ 3.400
9. Mesa Imperatriz - R$ 3.400
10. Mesa Luxuria - R$ 4.500 (badge "TOP")
11. Mesa Requinte - R$ 3.400
12. Mesa Paris - R$ 3.400
13. Mesa Sublime - R$ 3.400

**CTA Final:**
- Button Primary: "Ver Todos os Modelos"
- Centralizado
- Margin top: 48px

### 4.5 Secao 4: Sobre a Empresa (1280x600px)

```
Padding: 80px 24px
Background: Neutrals/BG White
```

**Layout: 2 colunas (50/50)**

**Coluna Esquerda: Imagem**
- Dimensoes: 580x480px
- Border Radius: 16px
- Placeholder: "Imagem da oficina/producao"

**Coluna Direita: Conteudo**
- Max width: 580px
- Padding left: 48px

**Elementos:**
1. **Titulo:**
   - Text: Heading/H2
   - "Quem Somos"

2. **Texto:**
   - Text: Body/Regular
   - Line height: 180%
   - 2 paragrafos

3. **Valores (3 items):**
   - Icon + Titulo + Descricao
   - Gap: 16px entre items
   - Check icon (verde) + Bold title

4. **CTA:**
   - Button Primary: "Falar com Luis Alves"

### 4.6 Secao 5: Depoimentos (1280x500px)

```
Padding: 80px 24px
Background: Neutrals/BG Light
```

**Titulo:**
- Text: Heading/H2
- "O Que Nossos Clientes Dizem"
- Text align: center

**Rating:**
- Stars (5) + "4.9/5.0"
- Text align: center
- Margin bottom: 48px

**Carousel:**
- 3 Testimonial Cards visiveis
- Gap: 24px
- Arrows: Left/Right (32x32px)
- Dots indicator: 5 dots

**Cards (criar 8, mostrar 3):**
Use Testimonial Card Component com conteudo real

### 4.7 Secao 6: Processo de Compra (1280x400px)

```
Padding: 80px 24px
Background: Neutrals/BG White
```

**Titulo:**
- Text: Heading/H2
- "Como Funciona o Processo"
- Text align: center
- Margin bottom: 48px

**Steps: 4 cards horizontais**
- Width: 280px cada
- Gap: 40px
- Arrow entre cards (16x16px)

**Step Cards:**
1. **Step 1:**
   - Number: "1" (circle, 48x48px, Primary/Marrom Rustico)
   - Icon: Search (32x32px)
   - Title: "Escolha a Mesa"
   - Description: "Navegue nosso catalogo..."

2. **Step 2:**
   - Number: "2"
   - Icon: Ruler (32x32px)
   - Title: "Personalize"
   - Description: "Defina dimensoes..."

3. **Step 3:**
   - Number: "3"
   - Icon: Credit Card (32x32px)
   - Title: "Pagamento"
   - Description: "PIX a vista com desconto..."

4. **Step 4:**
   - Number: "4"
   - Icon: Truck (32x32px)
   - Title: "Entrega"
   - Description: "Agendamos a entrega..."

### 4.8 Secao 7: Footer (1280x auto)

Use Footer Component com todo conteudo:
- 4 colunas: Logo + Navegacao + Produtos + Contato
- Newsletter
- Copyright

---

## PASSO 5: CRIAR LANDING PAGE MOBILE (Page 3)

### 5.1 Frame Mobile
1. Criar frame: 375x auto px
2. Nome: "Mobile - Landing Page"
3. Background: Neutrals/BG Light

### 5.2 Adaptar Secoes para Mobile

**Regras gerais:**
- Padding lateral: 16px
- Secoes verticais (stack)
- Heading H1: 40px (2.5rem)
- Heading H2: 32px (2rem)
- Cards: Full width (343px)
- Gap entre secoes: 48px

**Secao 1: Hero**
- Height: 500px
- H1: 40px, max 2 linhas
- Buttons: Stack vertical, full width

**Secao 2: Diferenciais**
- Cards: Stack vertical
- 4 cards, gap 16px

**Secao 3: Catalogo**
- Cards: 1 coluna
- Mostrar 6 produtos + "Ver Mais"

**Secao 4: Sobre**
- Stack vertical
- Imagem: Full width
- Conteudo abaixo

**Secao 5: Depoimentos**
- Carousel: 1 card visivel
- Swipe horizontal

**Secao 6: Processo**
- Stack vertical
- 4 steps com arrow down entre eles

**Secao 7: Footer**
- Stack vertical
- Colunas empilhadas

---

## PASSO 6: CRIAR PROTOTIPOS INTERATIVOS

### 6.1 Desktop Prototype

**Navegacao:**
1. Header menu items > Scroll to section
2. Hero CTA "Explorar Catalogo" > Scroll to products
3. Hero CTA "Falar no WhatsApp" > Open WhatsApp
4. Product cards "Ver Detalhes" > Product detail page (criar frame)
5. Footer links > Scroll to sections

**Hover States:**
- Adicionar hover em todos os botoes
- Product cards: Scale 1.02, Shadow increase
- Feature cards: Border color change

### 6.2 Mobile Prototype

**Navegacao:**
1. Hamburger menu > Open menu overlay
2. Menu items > Scroll to section + Close menu
3. Carousel: Swipe left/right (drag interaction)
4. Smooth scroll entre secoes

---

## PASSO 7: EXPORTAR ASSETS E TOKENS

### 7.1 Exportar Tokens de Design

**No Figma:**
1. Instale plugin: "Design Tokens"
2. Va em Plugins > Design Tokens
3. Export as JSON
4. Save como: `design-tokens.json`

### 7.2 Exportar Assets

**Logos:**
- Logo branca: PNG 512x450px @2x
- Logo marrom: PNG 512x450px @2x
- Favicon: PNG 512x512px

**Icons:**
- Exportar icons como SVG
- 24x24px, 32x32px, 48x48px

**Product Images:**
- Placeholders: 1200x900px
- Format: JPG, quality 85%

### 7.3 Gerar CSS Variables

**Usar plugin:**
1. Instale: "CSS Gen" ou "Style Dictionary"
2. Selecione todos os color styles
3. Export as CSS variables
4. Copie para arquivo CSS

---

## PASSO 8: COMPARTILHAR E DOCUMENTAR

### 8.1 Configurar Permissoes
1. No Figma, clique em "Share"
2. Configure como "Anyone with the link can view"
3. Copie URL do arquivo

### 8.2 Criar Dev Mode Link
1. Ative Dev Mode (toggle no canto superior direito)
2. Copie URL do Dev Mode
3. Compartilhe com desenvolvedores

### 8.3 Adicionar Documentacao
1. Na Page 1 (Design System), adicione frames com:
   - Color palette visual
   - Typography scale
   - Spacing scale
   - Component usage examples
   - Responsive breakpoints

---

## CHECKLIST FINAL

### Design System
- [ ] 16 color styles criados
- [ ] 12 text styles criados
- [ ] 5 effect styles (sombras) criados
- [ ] Grid layout configurado (8px base)

### Components
- [ ] Button (3 variantes)
- [ ] Input (3 estados)
- [ ] Product Card
- [ ] Feature Card
- [ ] Testimonial Card
- [ ] Navigation (desktop + mobile)
- [ ] Footer

### Landing Pages
- [ ] Desktop 1280px completo (7 secoes)
- [ ] Mobile 375px completo (7 secoes)
- [ ] 13 product cards populados
- [ ] 8 testimonial cards criados
- [ ] Todas imagens placeholder adicionadas

### Prototypes
- [ ] Desktop prototype com navegacao
- [ ] Mobile prototype com gestures
- [ ] Hover states configurados
- [ ] Transitions suaves

### Export
- [ ] Design tokens JSON exportado
- [ ] CSS variables geradas
- [ ] Assets exportados (PNG, SVG)
- [ ] Dev Mode ativado

### Documentation
- [ ] README no arquivo Figma
- [ ] Component documentation
- [ ] Responsive guide
- [ ] Color contrast checklist

---

## PROXIMOS PASSOS APOS FIGMA

### 1. Development
- Converter design para HTML/CSS
- Implementar responsividade
- Adicionar interacoes JavaScript
- Integrar com backend

### 2. Content
- Fotografar produtos reais
- Coletar depoimentos verdadeiros
- Escrever textos finais
- Otimizar SEO

### 3. Testing
- Testar em devices reais
- Validar acessibilidade (WCAG)
- Performance testing
- Browser compatibility

### 4. Deploy
- Configurar hosting
- Setup domain
- SSL certificate
- Analytics integration

---

## RECURSOS UTEIS

### Plugins Figma Recomendados
- **Unsplash:** Imagens placeholder realistas
- **Iconify:** Biblioteca de icons gratuita
- **Stark:** Testar contraste e acessibilidade
- **Content Reel:** Popular com conteudo mock
- **Design Tokens:** Exportar tokens
- **Figmotion:** Animacoes e micro-interacoes

### Fonts Google
```html
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Icons
- Lucide Icons: https://lucide.dev
- Font Awesome: https://fontawesome.com
- Heroicons: https://heroicons.com

---

## CONTATO E SUPORTE

**Email Figma:** ferramentas.starken@gmail.com
**Projeto:** Luis Alves Mesas para Festas
**Data Criacao:** Novembro 2025
**Versao:** 1.0

---

**Documento criado por:** Claude Code
**Data:** 10/11/2025
**Tempo estimado de implementacao:** 6-8 horas
