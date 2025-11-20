# Projeto Figma - Luis Alves Mesas para Festas

## RESUMO EXECUTIVO

Este projeto contém toda a documentacao, design tokens e guias necessarios para criar uma landing page completa no Figma para **Luis Alves Mesas para Festas / JPR Moveis Rusticos**.

**Status:** Pronto para Implementacao
**Tempo Estimado:** 6-8 horas de trabalho no Figma
**Nivel de Dificuldade:** Intermediario

---

## ARQUIVOS DO PROJETO

### 1. Guias de Implementacao

#### FIGMA-IMPLEMENTATION-GUIDE.md
**O QUE E:** Guia passo-a-passo COMPLETO para criar o projeto no Figma
**QUANDO USAR:** Ao iniciar a criacao no Figma - siga todos os passos em ordem
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/FIGMA-IMPLEMENTATION-GUIDE.md`

**Conteudo:**
- Passo 1: Criar arquivo Figma
- Passo 2: Criar Design System (16 cores, 12 text styles, 5 sombras)
- Passo 3: Criar Componentes (7 componentes principais)
- Passo 4: Criar Landing Page Desktop (1280px, 7 secoes)
- Passo 5: Criar Landing Page Mobile (375px, 7 secoes adaptadas)
- Passo 6: Criar Prototipos Interativos
- Passo 7: Exportar Assets e Tokens
- Passo 8: Compartilhar e Documentar

#### FIGMA-PROJECT-SUMMARY.md
**O QUE E:** Resumo visual e especificacoes tecnicas do projeto
**QUANDO USAR:** Para referencia rapida durante a implementacao
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/FIGMA-PROJECT-SUMMARY.md`

**Conteudo:**
- Estrutura do arquivo Figma (4 pages)
- Especificacoes tecnicas (dimensoes, cores, tipografia)
- Descricao completa dos 7 componentes
- Conteudo das 7 secoes
- Interacoes e prototipos
- Metricas de sucesso

#### FIGMA-CHECKLIST.html
**O QUE E:** Checklist interativo para acompanhar progresso
**QUANDO USAR:** Abra em seu navegador e marque itens conforme completa
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/FIGMA-CHECKLIST.html`

**Como usar:**
```bash
# Abrir no navegador
open FIGMA-CHECKLIST.html
# ou
open -a "Google Chrome" FIGMA-CHECKLIST.html
```

**Features:**
- 60+ itens de checklist organizados por secao
- Salva progresso automaticamente (localStorage)
- Estatisticas em tempo real (completas, restantes, %)
- Barra de progresso visual
- Interface bonita e responsiva

---

### 2. Design Tokens

#### design-tokens.json
**O QUE E:** Tokens de design em formato JSON padrao
**QUANDO USAR:** Para exportar do Figma ou importar em ferramentas de design
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/design-tokens.json`

**Conteudo:**
- Colors (Primary, Secondary, Accent, Neutrals)
- Typography (Font families, sizes, weights, line heights)
- Spacing (8px base scale)
- Border Radius (sm, md, lg, xl, full)
- Shadows (sm, md, lg, card)
- Transitions (fast, base, slow)
- Breakpoints (sm, md, lg, xl, 2xl)

#### design-tokens.css
**O QUE E:** CSS Variables prontas para uso em desenvolvimento
**QUANDO USAR:** Incluir no projeto HTML/CSS para usar os tokens
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/design-tokens.css`

**Como usar:**
```html
<link rel="stylesheet" href="design-tokens.css">
```

**Exemplos:**
```css
/* Usar variaveis CSS */
.botao {
  background: var(--colors-accent-verde);
  padding: var(--spacing-md);
  border-radius: var(--borderradius-md);
}

/* Ou usar utility classes */
<button class="btn-primary">Solicitar Orcamento</button>
<div class="product-card shadow-card">...</div>
```

#### tokens-to-css.js
**O QUE E:** Script Node.js para converter JSON para CSS
**QUANDO USAR:** Se precisar regenerar o CSS apos mudancas no JSON
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/tokens-to-css.js`

**Como usar:**
```bash
node tokens-to-css.js
```

---

### 3. Documentacao de Referencia

#### DESIGN-SYSTEM.md
**O QUE E:** Especificacoes CSS detalhadas do Design System
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/DESIGN-SYSTEM.md`

**Conteudo:**
- Tokens de Design (cores, tipografia, spacing, sombras)
- Component Library (buttons, inputs, cards, navigation)
- Layout Grid System
- Responsive Breakpoints
- Accessibility Guidelines
- Animation Guidelines

#### LANDING-PAGE-STRUCTURE.md
**O QUE E:** Estrutura completa das 7 secoes da landing page
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/LANDING-PAGE-STRUCTURE.md`

**Conteudo:**
- Secao 1: Header + Hero (layout e conteudo)
- Secao 2: Diferenciais (4 feature cards)
- Secao 3: Catalogo de Produtos (13 produtos)
- Secao 4: Sobre a Empresa (2 colunas)
- Secao 5: Depoimentos (8 reviews)
- Secao 6: Processo de Compra (4 steps)
- Secao 7: Footer (4 colunas + newsletter)

#### CORES-IDENTIDADE-VISUAL.md
**O QUE E:** Paleta de cores com codigos e exemplos de uso
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/CORES-IDENTIDADE-VISUAL.md`

**Conteudo:**
- Paleta principal (5 cores: marrom rustico, bege, verde, branco, marrom escuro)
- Tipografia (Lobster Two, Poppins, Open Sans)
- CSS Variables
- Tailwind Config
- Gradientes e efeitos
- Exemplos de componentes

#### PRODUCT-DATA.json
**O QUE E:** Dados estruturados dos 13 produtos do catalogo
**LOCALIZACAO:** `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/PRODUCT-DATA.json`

**Conteudo:**
- 13 produtos com nome, preco, descricao, dimensoes, caracteristicas
- Categorias (Premium, Premium Plus, Top Premium)
- Metodos de pagamento
- Regioes de entrega
- Contato e redes sociais

---

## INICIO RAPIDO

### Passo 1: Preparacao (10 minutos)
1. Abra o arquivo `FIGMA-CHECKLIST.html` no navegador
2. Leia o `FIGMA-PROJECT-SUMMARY.md` para visao geral
3. Tenha o `FIGMA-IMPLEMENTATION-GUIDE.md` aberto para referencia

### Passo 2: Acesso ao Figma
1. Acesse **Figma.com**
2. Login: `ferramentas.starken@gmail.com`
3. Clique em **"New Design File"**
4. Renomeie: **"Luis Alves Mesas - Landing Page"**

### Passo 3: Configuracao Inicial (30 minutos)
1. Crie 4 pages:
   - Page 1: "Design System"
   - Page 2: "Landing Page - Desktop"
   - Page 3: "Landing Page - Mobile"
   - Page 4: "Components"

2. Importe fontes Google:
   ```
   Lobster Two (400, 700)
   Poppins (400, 500, 600, 700)
   Open Sans (400, 600, 700)
   ```

### Passo 4: Design System (2-3 horas)
Siga **PASSO 2** do `FIGMA-IMPLEMENTATION-GUIDE.md`:
- [ ] Criar 16 Color Styles
- [ ] Criar 12 Text Styles
- [ ] Criar 5 Effect Styles
- [ ] Configurar Grid Layout

### Passo 5: Components (2-3 horas)
Siga **PASSO 3** do `FIGMA-IMPLEMENTATION-GUIDE.md`:
- [ ] Button (3 variantes)
- [ ] Input (3 estados)
- [ ] Product Card
- [ ] Feature Card
- [ ] Testimonial Card
- [ ] Navigation
- [ ] Footer

### Passo 6: Landing Pages (2-3 horas)
Siga **PASSOS 4 e 5** do `FIGMA-IMPLEMENTATION-GUIDE.md`:
- [ ] Desktop 1280px (7 secoes)
- [ ] Mobile 375px (7 secoes adaptadas)

### Passo 7: Prototipos (30 minutos)
Siga **PASSO 6** do `FIGMA-IMPLEMENTATION-GUIDE.md`:
- [ ] Configurar navegacao
- [ ] Adicionar hover states
- [ ] Configurar gestures mobile

### Passo 8: Export & Share (30 minutos)
Siga **PASSOS 7 e 8** do `FIGMA-IMPLEMENTATION-GUIDE.md`:
- [ ] Exportar design tokens
- [ ] Exportar assets (PNG, SVG)
- [ ] Ativar Dev Mode
- [ ] Compartilhar URL

---

## RECURSOS UTEIS

### Plugins Figma Recomendados
```
Unsplash - Imagens placeholder realistas
Iconify - Biblioteca de icons gratuita
Stark - Testar contraste e acessibilidade
Content Reel - Popular com conteudo mock
Design Tokens - Exportar tokens de design
Figmotion - Animacoes e micro-interacoes (opcional)
```

### Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Bibliotecas de Icons
- Lucide Icons: https://lucide.dev
- Font Awesome: https://fontawesome.com
- Heroicons: https://heroicons.com

### Ferramentas de Acessibilidade
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WAVE: https://wave.webaim.org/
- axe DevTools: https://www.deque.com/axe/

---

## ESPECIFICACOES TECNICAS

### Dimensoes
```
Desktop: 1280px width
Tablet: 768px - 1024px
Mobile: 375px width
```

### Paleta de Cores
```
Primary:    #983421 (Marrom Rustico)
Secondary:  #D3B185 (Bege)
Accent:     #23af24 (Verde CTA)
Text:       #17252a (Preto)
Background: #ffffff (Branco)
Footer:     #563524 (Marrom Escuro)
```

### Tipografia
```
Heading:    Lobster Two (cursive)
Menu:       Poppins (sans-serif)
Body:       Open Sans (sans-serif)

H1: 56px (3.5rem)
H2: 40px (2.5rem)
H3: 28px (1.75rem)
H4: 20px (1.25rem)
Body: 16px (1rem)
Small: 14px (0.875rem)
```

### Grid System
```
Base: 8px
Columns: 12 (Desktop)
Gutter: 24px
Margin: 24px
Container Max Width: 1280px
```

---

## ESTRUTURA DO PROJETO

### Page 1: Design System
```
Color Styles (16)
├── Primary (marrom rustico + variantes)
├── Secondary (bege + variantes)
├── Accent (verde + variantes)
├── Neutrals (text + backgrounds)
└── Borders

Text Styles (12)
├── Heading/H1-H4
├── Body/Large, Regular, Small
├── Menu/Regular
└── Button/Large, Regular

Effect Styles (5)
├── Shadow/SM, MD, LG
└── Shadow/Card, Card Hover
```

### Page 2: Landing Desktop (1280px)
```
Header (80px)
Hero (600px)
Diferenciais (400px)
Catalogo (auto)
Sobre (600px)
Depoimentos (500px)
Processo (400px)
Footer (auto)
```

### Page 3: Landing Mobile (375px)
```
Header (64px)
Hero (500px)
Diferenciais (stack)
Catalogo (6 produtos)
Sobre (stack)
Depoimentos (carousel)
Processo (stack)
Footer (stack)
```

### Page 4: Components
```
Button (3 variantes)
Input (3 estados)
Product Card
Feature Card
Testimonial Card
Navigation (Desktop + Mobile)
Footer
```

---

## CHECKLIST GERAL

### Design System
- [ ] 16 color styles criados
- [ ] 12 text styles criados
- [ ] 5 effect styles criados
- [ ] Grid layout configurado

### Components
- [ ] 7 componentes principais criados
- [ ] Variantes configuradas
- [ ] Estados interativos adicionados
- [ ] Auto-layout configurado

### Landing Pages
- [ ] Desktop completo (7 secoes)
- [ ] Mobile completo (7 secoes adaptadas)
- [ ] 13 product cards populados
- [ ] 8 testimonial cards criados
- [ ] Imagens placeholder adicionadas

### Prototypes
- [ ] Desktop prototype com navegacao
- [ ] Mobile prototype com gestures
- [ ] Hover states configurados
- [ ] Transitions suaves

### Export
- [ ] Design tokens exportados (JSON)
- [ ] CSS variables geradas
- [ ] Assets exportados (PNG, SVG)
- [ ] Dev Mode ativado
- [ ] URL compartilhada

---

## FAQ

### Q: Preciso ter conta paga do Figma?
**A:** Nao, a conta gratuita e suficiente para este projeto.

### Q: Quanto tempo vai levar?
**A:** Entre 6-8 horas se seguir o guia passo-a-passo.

### Q: Preciso saber design?
**A:** Conhecimento basico do Figma e suficiente. O guia e detalhado.

### Q: Posso modificar cores/fontes?
**A:** Sim, mas recomendo manter a identidade visual definida.

### Q: Como exporto para desenvolvimento?
**A:** Use o Dev Mode do Figma ou exporte os design tokens em JSON/CSS.

### Q: E se eu travar em algum passo?
**A:** Consulte os exemplos no `FIGMA-IMPLEMENTATION-GUIDE.md` ou busque tutoriais do Figma no YouTube.

---

## PROXIMOS PASSOS APOS FIGMA

### 1. Content
- [ ] Fotografar produtos reais (1200x900px)
- [ ] Coletar depoimentos verdadeiros
- [ ] Escrever textos finais (SEO)
- [ ] Otimizar imagens (WebP < 200KB)

### 2. Development
- [ ] Converter design para HTML/CSS
- [ ] Implementar responsividade
- [ ] Adicionar JavaScript interactions
- [ ] Integrar backend (forms, database)

### 3. Testing
- [ ] Testar em devices reais
- [ ] Validar acessibilidade (WCAG AA)
- [ ] Performance testing (Lighthouse > 90)
- [ ] Browser compatibility

### 4. Deploy
- [ ] Configurar hosting (Netlify/Vercel)
- [ ] Setup custom domain
- [ ] SSL certificate
- [ ] Analytics (GA4)

---

## SUPORTE E CONTATO

**Email Figma:** ferramentas.starken@gmail.com
**Cliente:** Luis Alves Mesas para Festas
**Telefone Cliente:** (47) 99716-8814
**Localizacao:** Luis Alves - SC

**Documentacao Criada Por:** Claude Code (AI Assistant)
**Data:** 10/11/2025
**Versao:** 1.0

---

## LICENCA E USO

Este projeto foi criado especificamente para **Luis Alves Mesas para Festas / JPR Moveis Rusticos Ltda**.

Todos os design tokens, componentes e especificacoes podem ser usados livremente para o desenvolvimento da landing page e materiais de marketing da empresa.

---

**Boa sorte com a criacao no Figma! 🎨**

Se tiver duvidas, consulte:
1. FIGMA-IMPLEMENTATION-GUIDE.md (guia passo-a-passo)
2. FIGMA-CHECKLIST.html (acompanhe seu progresso)
3. FIGMA-PROJECT-SUMMARY.md (visao geral)
