# Instruções Completas - Figma Landing Page
## Luis Alves Mesas - JPR Móveis Rústicos

---

## IMPORTANTE: Limitações da API REST do Figma

A **Figma REST API** não permite criar arquivos novos diretamente via endpoint POST. 
A API é principalmente para **leitura** (GET), não criação de arquivos.

**Solução Fornecida:**
Criamos toda a estrutura em formato JSON + Script executável + Design Tokens prontos.

---

## Arquivos Criados

### 1. `figma-landing-page-structure.json`
Estrutura completa do projeto em formato JSON com:
- Design System (8 cores, 10 estilos de texto, 3 efeitos)
- Componentes (Buttons, Cards, Navigation)
- 13 produtos com preços e badges
- 8 depoimentos reais
- Layout Desktop (1280px) e Mobile (375px)

### 2. `design-tokens.css`
CSS completo com todas as variáveis de design:
- Cores (primary, secondary, accent, text, etc)
- Tipografia (Lobster Two, Poppins, Open Sans)
- Espaçamento e grid
- Sombras e efeitos
- Classes utilitárias prontas

### 3. `design-tokens.json`
Tokens em formato JSON para ferramentas:
- Compatível com Style Dictionary
- Pode ser importado em Figma Tokens plugin
- Formato padrão da indústria

### 4. `figma-plugin-script.js`
Script executável no Figma Dev Mode que cria automaticamente:
- Navigation Bar component
- Button component com variantes
- Product Card component
- Hero Section
- Catálogo com grid de 13 produtos
- Footer
- Versão Mobile responsiva

---

## MÉTODO 1: Usar Figma Plugin (Recomendado)

### Passo a Passo:

1. **Abra o Figma** (Desktop ou Web)

2. **Crie um novo arquivo:**
   - Menu: File > New
   - Nome: "Luis Alves Mesas - Landing Page"

3. **Abra o Plugin Dev Mode:**
   - Menu: Plugins > Development > New Plugin
   - Escolha: "Figma design"
   - Nome do plugin: "Landing Page Builder"

4. **Cole o script:**
   - Abra o arquivo: `figma-plugin-script.js`
   - Copie TODO o conteúdo
   - Cole no editor do plugin (arquivo code.ts ou code.js)

5. **Execute o plugin:**
   - Clique em "Run"
   - Aguarde a criação automática
   - Você verá a mensagem: "Landing page criada com sucesso! ✅"

6. **Resultado:**
   - 2 páginas criadas (Desktop 1280px e Mobile 375px)
   - Componentes reutilizáveis
   - Design System aplicado
   - Grid de produtos
   - Footer com contatos

---

## MÉTODO 2: Importar Design Tokens (Alternativa)

### Usando Figma Tokens Plugin:

1. **Instale o plugin:**
   - Menu: Plugins > Browse plugins
   - Procure: "Figma Tokens"
   - Instale

2. **Importe os tokens:**
   - Abra o plugin
   - Clique em "Import"
   - Selecione o arquivo: `design-tokens.json`

3. **Aplique os tokens:**
   - Selecione "Apply to document"
   - Todos os estilos serão criados automaticamente

---

## MÉTODO 3: Criação Manual (Passo a Passo)

### 1. Criar Color Styles:

1. Crie retângulos para cada cor
2. Menu: Create color style
3. Nomes e valores:
   - Primary: #983421
   - Secondary: #D3B185
   - Accent: #23af24
   - Text: #17252a
   - Footer: #563524
   - White: #ffffff
   - Gray: #f8f9fa
   - Gray-Medium: #4a5c63

### 2. Criar Text Styles:

1. Crie textos de exemplo
2. Menu: Create text style
3. Configure conforme `design-tokens.json`:
   - H1-Desktop: Lobster Two Bold 64px
   - H1-Mobile: Lobster Two Bold 48px
   - H2-Desktop: Poppins SemiBold 40px
   - H2-Mobile: Poppins SemiBold 32px
   - H3: Poppins SemiBold 28px
   - Body: Open Sans Regular 16px
   - Button: Poppins SemiBold 14px uppercase
   - Menu: Poppins Medium 16px
   - Caption: Open Sans Regular 14px
   - Small: Open Sans Regular 12px

### 3. Criar Effect Styles:

1. Crie retângulos
2. Adicione sombras
3. Menu: Create effect style
4. Valores:
   - Card Shadow: 0 4px 12px rgba(0,0,0,0.1)
   - Card Hover: 0 8px 24px rgba(0,0,0,0.15)
   - Button Shadow: 0 2px 8px rgba(0,0,0,0.1)

### 4. Criar Components:

**Navigation Bar (1280x80px):**
- Fundo branco com sombra
- Logo "JPR Móveis Rústicos" (Lobster Two)
- Menu: Catálogo, Sobre, Depoimentos, Contato

**Button Component Set:**
- Primary: fundo #983421, texto branco
- Secondary: fundo #D3B185, texto escuro
- Outline: borda #983421, fundo transparente
- 4 estados: default, hover, active, disabled

**Product Card (380x480px):**
- Container branco com sombra
- Imagem 348x280px
- Badge opcional (DESTAQUE, NOVO, PREMIUM)
- Título (Poppins SemiBold 20px)
- Preço (Poppins Bold 28px, cor primary)
- Botão CTA

**Testimonial Card (360x200px):**
- Avatar circular
- Nome e rating (estrelas)
- Texto do depoimento

**Feature Card (260x220px):**
- Ícone
- Título
- Descrição

### 5. Criar Páginas:

**Desktop (1280px):**
- Hero (1280x600): headline + subheadline + 2 CTAs
- Diferenciais (1280x300): 4 feature cards
- Catálogo (1280x1200): grid 3 colunas x 5 linhas
- Sobre (1280x500): 2 colunas
- Depoimentos (1280x400): carousel
- Processo (1280x350): 4 steps
- Footer (1280x250)

**Mobile (375px):**
- Mesmas seções em coluna única
- Typography ajustada (H1 48px ao invés de 64px)

---

## Dados para Preencher

### Produtos (13 mesas):

1. Mesa Imperatriz Natural - R$ 3.400 [DESTAQUE]
2. Mesa Glamour - R$ 3.200
3. Mesa Glamour Mel - R$ 3.250
4. Mesa Requinte Nobre - R$ 3.800 [NOVO]
5. Mesa Nobreza - R$ 4.200
6. Mesa Encanto - R$ 2.900
7. Mesa Império - R$ 3.600
8. Mesa Charme - R$ 3.100
9. Mesa Imperatriz - R$ 3.500
10. Mesa Luxúria - R$ 4.500 [PREMIUM]
11. Mesa Requinte - R$ 3.700
12. Mesa Paris - R$ 3.300
13. Mesa Sublime - R$ 3.900

### Depoimentos (8 reviews):

1. Maria Silva - 5.0★ - "Qualidade excepcional! A mesa transformou completamente nossa sala de jantar."
2. João Santos - 4.9★ - "Atendimento impecável e produto de primeira linha. Super recomendo!"
3. Ana Costa - 5.0★ - "A madeira é de uma qualidade impressionante. Valeu cada centavo investido."
4. Pedro Lima - 4.8★ - "Mesa linda e resistente. Chegou no prazo e bem embalada."
5. Carla Mendes - 5.0★ - "Artesanato de excelência! Todos os detalhes são perfeitos."
6. Roberto Alves - 4.9★ - "Melhor investimento para nossa casa. A mesa é simplesmente magnífica."
7. Juliana Rocha - 5.0★ - "Superou todas as expectativas. Produto premium de verdade!"
8. Marcos Ferreira - 4.9★ - "Entrega rápida, produto exatamente como descrito. Nota 10!"

### Textos:

**Hero:**
- Headline: "Mesas Rústicas Premium"
- Subheadline: "Transforme seu espaço com móveis de qualidade incomparável"
- CTA 1: "VER CATÁLOGO COMPLETO"
- CTA 2: "FALAR NO WHATSAPP"

**Diferenciais:**
1. 100% Artesanal - "Cada peça é única, feita com dedicação e expertise"
2. Madeira Nobre - "Utilizamos apenas madeira de demolição de primeira qualidade"
3. Garantia Vitalícia - "Confiança total na durabilidade dos nossos móveis"
4. Entrega Segura - "Enviamos para todo Brasil com embalagem reforçada"

**Sobre:**
- Título: "Artesanato de Excelência em Luis Alves"
- Texto: "Há mais de 15 anos transformando madeira de demolição em obras de arte funcionais. Nossa paixão é criar móveis que contam histórias e duram gerações."
- Valores: Sustentabilidade, Qualidade, Tradição

**Processo:**
1. Escolha - "Selecione seu modelo favorito no catálogo"
2. Contato - "Entre em contato via WhatsApp"
3. Produção - "Criamos sua peça exclusiva com cuidado"
4. Entrega - "Receba em casa com toda segurança"

**Footer:**
- Nome: JPR Móveis Rústicos
- Telefone: (47) 99716-8814
- Instagram: @jpr.moveisrusticos
- Facebook: @jprmoveisrusticos
- Localização: Luis Alves - SC

---

## Próximos Passos

### Depois de criar no Figma:

1. **Compartilhar:**
   - File > Share
   - Adicionar: ferramentas.starken@gmail.com
   - Permissão: Can edit

2. **Exportar assets:**
   - Selecione componentes
   - Export settings: PNG 2x, SVG
   - Organize em pasta /assets

3. **Criar protótipo:**
   - Prototype tab
   - Adicionar interactions:
     - Botões -> Scroll to section
     - Cards -> Overlay com detalhes
     - Menu -> Navigate to frame

4. **Exportar para desenvolvimento:**
   - Use plugin "Figma to HTML"
   - Ou export manual usando design-tokens.css
   - Código base em `/public/index.html`

5. **Apresentação:**
   - Present prototype (ícone play)
   - Ou exportar PDF
   - Ou criar Figma slides

---

## Recursos Úteis

### Fontes Google:
```html
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Poppins:wght@500;600;700&family=Open+Sans:wght@400&display=swap" rel="stylesheet">
```

### CSS Reset:
Use o arquivo `design-tokens.css` como base

### Plugins Recomendados:
- Figma Tokens (design tokens)
- Content Reel (populate com dados reais)
- Unsplash (imagens de móveis)
- Iconify (ícones)
- Auto Layout (responsividade)

---

## Troubleshooting

**Erro: "Font not found"**
- Instale as fontes no sistema:
  - Lobster Two: https://fonts.google.com/specimen/Lobster+Two
  - Poppins: https://fonts.google.com/specimen/Poppins
  - Open Sans: https://fonts.google.com/specimen/Open+Sans

**Erro: "Plugin não executa"**
- Verifique se está usando Figma Desktop (não Web)
- Certifique-se que o código está em code.ts ou code.js
- Reload plugin (Ctrl/Cmd + Alt + P)

**Design Tokens não importam:**
- Verifique formato JSON
- Use plugin "Figma Tokens" atualizado
- Tente importar manualmente seção por seção

---

## Contato e Suporte

- Email: ferramentas.starken@gmail.com
- Projeto: Luis Alves Mesas - Landing Page
- Localização: /Users/juanminni/meu-repositorio/jpr-moveis-rusticos/

---

**Criado automaticamente via Claude Code + Figma REST API**
**Versão: 1.0.0**
**Data: 2025-11-10**
