# Luis Alves Mesas para Festas - Design System & Landing Page

Design system completo e landing page e-commerce para Luis Alves Mesas para Festas - fabricante de mesas rústicas premium em SC/PR.

## Visão Geral do Projeto

**Cliente:** Luis Alves Mesas para Festas / JPR Móveis Rústicos Ltda
**Email Figma:** ferramentas.starken@gmail.com
**Tipo:** Landing Page E-commerce + Design System
**Status:** Documentação completa - Pronto para implementação no Figma

---

## Documentação Completa

### 1. DESIGN-SYSTEM.md
**Design tokens, componentes e guidelines**

Contém:
- CSS Variables (cores, tipografia, spacing)
- 10+ componentes reutilizáveis (buttons, cards, inputs, navigation)
- Grid system responsivo (12 colunas desktop, 4 mobile)
- Accessibility guidelines (WCAG AA)
- Animation e interaction guidelines

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/DESIGN-SYSTEM.md)

---

### 2. LANDING-PAGE-STRUCTURE.md
**Estrutura completa das 7 seções da landing page**

Seções:
1. Header + Hero (Navegação + Hero com CTAs)
2. Diferenciais (4 cards de benefícios)
3. Catálogo de Produtos (Grid com 13 mesas)
4. Sobre a Empresa (História e valores)
5. Depoimentos (Carousel com 8 reviews)
6. Processo de Compra (4 steps visuais)
7. Footer (Links, contato, newsletter)

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/LANDING-PAGE-STRUCTURE.md)

---

### 3. FIGMA-GUIDE.md
**Guia passo a passo para criar o design no Figma**

Instruções para:
- Setup de Color Styles (20+ cores)
- Setup de Text Styles (7 estilos)
- Criação de componentes com variants
- Layout Grid System
- Protótipo interativo
- Export de assets e design tokens
- Developer handoff

**Tempo estimado:** 13 horas

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/FIGMA-GUIDE.md)

---

### 4. PRODUCT-DATA.json
**Dados estruturados dos 13 produtos**

Contém informações de:
- 13 modelos de mesas com preços (R$ 3.400 - R$ 4.500)
- Dimensões, características, disponibilidade
- Categorias (Premium, Premium Plus, Top Premium)
- Formas de pagamento (PIX, Cartão, Boleto)
- Informações de entrega (SC/PR)
- Dados de contato e redes sociais

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/PRODUCT-DATA.json)

---

### 5. FRONTEND-DEVELOPMENT-GUIDE.md
**Guia completo de desenvolvimento front-end**

Instruções para:
- Stack tecnológica (HTML/CSS/JS ou Next.js)
- Estrutura de arquivos
- Implementação do Design System
- Módulos JavaScript (Carousel, Product Catalog)
- Performance optimization
- SEO best practices
- Deploy no Netlify

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/FRONTEND-DEVELOPMENT-GUIDE.md)

---

### 6. RESUMO-PROJETO-DESIGN.md
**Resumo executivo com todos os entregáveis**

Documento consolidado com:
- Visão geral do projeto
- Design tokens (CSS ready)
- Paleta de cores completa
- Lista de produtos
- Estrutura das seções
- Checklist de implementação
- Roadmap de desenvolvimento

[Ver arquivo completo →](/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/RESUMO-PROJETO-DESIGN.md)

---

## Quick Reference

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Marrom Rústico | `#983421` | Primária (títulos, links) |
| Bege/Tan | `#D3B185` | Secundária (ícones, detalhes) |
| Verde | `#23af24` | CTAs, botões principais |
| Preto | `#17252a` | Texto principal |
| Branco | `#ffffff` | Background |
| Marrom Footer | `#563524` | Footer background |

### Tipografia

```
Títulos (H1, H2): Lobster Two, weight 700
Menu/Subtítulos: Poppins, weight 600
Body text: Open Sans, weight 400
Line-height: 1.6
```

### Google Fonts URL

```html
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Breakpoints

```css
Mobile: 375px
Tablet: 768px
Desktop: 1280px
```

---

## Produtos (13 modelos)

1. Mesa Imperatriz Natural - R$ 3.400
2. Mesa Glamour - R$ 3.400
3. Mesa Glamour Mel - R$ 3.400
4. Mesa Requinte Nobre - R$ 3.400
5. **Mesa Nobreza - R$ 4.200** (Premium Plus)
6. Mesa Encanto - R$ 3.400
7. Mesa Império - R$ 3.400
8. Mesa Charme - R$ 3.400
9. Mesa Imperatriz - R$ 3.400
10. **Mesa Luxúria - R$ 4.500** (Top Premium)
11. Mesa Requinte - R$ 3.400
12. Mesa Paris - R$ 3.400
13. Mesa Sublime - R$ 3.400

---

## Estrutura do Projeto

```
jpr-moveis-rusticos/
├── README.md                          # Este arquivo
├── DESIGN-SYSTEM.md                   # Design tokens e componentes
├── LANDING-PAGE-STRUCTURE.md          # Estrutura das 7 seções
├── FIGMA-GUIDE.md                     # Guia para criar no Figma
├── PRODUCT-DATA.json                  # Dados dos 13 produtos
├── FRONTEND-DEVELOPMENT-GUIDE.md      # Guia de desenvolvimento
└── RESUMO-PROJETO-DESIGN.md           # Resumo executivo
```

---

## Como Usar Este Projeto

### Para Designers (Figma)

1. **Ler:** `FIGMA-GUIDE.md`
2. **Login:** ferramentas.starken@gmail.com no Figma
3. **Criar:** Novo arquivo "Luis Alves Mesas para Festas - LP"
4. **Seguir:** Passo a passo do guia (13 horas estimadas)
5. **Consultar:** `DESIGN-SYSTEM.md` e `LANDING-PAGE-STRUCTURE.md`

### Para Desenvolvedores (Front-end)

1. **Ler:** `FRONTEND-DEVELOPMENT-GUIDE.md`
2. **Setup:** Clone o projeto e instale dependências
3. **Implementar:** Design System (CSS Variables)
4. **Criar:** Componentes reutilizáveis
5. **Integrar:** Dados do `PRODUCT-DATA.json`
6. **Deploy:** Netlify seguindo o guia

### Para Stakeholders

1. **Ler:** `RESUMO-PROJETO-DESIGN.md`
2. **Revisar:** Paleta de cores, tipografia e estrutura
3. **Validar:** Lista de produtos e preços
4. **Aprovar:** Design no Figma quando concluído

---

## Roadmap

### Fase 1: Design (Você está aqui)
- [x] Design System completo
- [x] Estrutura das 7 seções
- [x] Dados dos produtos
- [ ] Criar frames no Figma (13h)
- [ ] Protótipo interativo
- [ ] Design review

### Fase 2: Desenvolvimento
- [ ] Setup HTML/CSS/JS
- [ ] Implementar componentes
- [ ] Integração WhatsApp
- [ ] Testes responsivos
- [ ] Otimização de performance

### Fase 3: Deploy
- [ ] Deploy Netlify
- [ ] Testes em dispositivos reais
- [ ] SEO validation
- [ ] Google Analytics setup

### Fase 4: Launch
- [ ] Domínio customizado
- [ ] Meta Pixel (Facebook Ads)
- [ ] Monitoramento de conversão

---

## Recursos Necessários

### Imagens
- [ ] Logo SVG (180x60px)
- [ ] 13 fotos de produtos (1200x900px, 4:3)
- [ ] Imagem hero (1920x800px desktop)
- [ ] Foto da oficina (600x500px)
- [ ] 8 avatars de clientes (48x48px)

### Ícones
Use Iconify ou Font Awesome:
- Trophy, Truck, Palette, Credit Card
- Star, Shopping Cart, Phone, WhatsApp
- Instagram, Facebook

---

## Contato

**Luis Alves Mesas para Festas**
- Telefone/WhatsApp: (47) 99716-8814
- Email: contato@luisalvesmesas.com.br
- Localização: Luis Alves - SC

**Design Team**
- Email Figma: ferramentas.starken@gmail.com

---

## Suporte

Dúvidas sobre:
- **Design System:** Ver `DESIGN-SYSTEM.md`
- **Figma:** Ver `FIGMA-GUIDE.md`
- **Desenvolvimento:** Ver `FRONTEND-DEVELOPMENT-GUIDE.md`
- **Produtos:** Ver `PRODUCT-DATA.json`
- **Geral:** Ver `RESUMO-PROJETO-DESIGN.md`

---

## Licença

Propriedade de Luis Alves Mesas para Festas / JPR Móveis Rústicos Ltda © 2025

---

**Desenvolvido com design thinking e atenção aos detalhes**
**Novembro 2025**
