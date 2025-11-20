# Landing Page Structure - Luis Alves Mesas para Festas

## Estrutura Completa das 7 Seções

---

## SECAO 1: HEADER + HERO

### Layout Desktop (1280px)
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO]              [Home] [Catálogo] [Sobre] [Contato]  [CTA]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     MESAS RÚSTICAS PREMIUM                                  │
│     PARA SEUS EVENTOS                                       │
│                                                             │
│     Transforme seu espaço com móveis de                     │
│     qualidade incomparável                                  │
│                                                             │
│     [Explorar Catálogo] [WhatsApp]                          │
│                                                             │
│                        [Hero Image - Mesa]                  │
└─────────────────────────────────────────────────────────────┘
```

### Layout Mobile (375px)
```
┌─────────────────────────┐
│ [LOGO]          [MENU]  │
├─────────────────────────┤
│                         │
│ MESAS RÚSTICAS          │
│ PREMIUM                 │
│                         │
│ Transforme seu espaço   │
│                         │
│ [Explorar Catálogo]     │
│                         │
│   [Hero Image]          │
└─────────────────────────┘
```

### Elementos:
- **Navigation Bar (Fixed)**
  - Logo: 180x60px
  - Menu items: Home, Catálogo, Sobre, Contato
  - CTA Button: "Solicitar Orçamento"
  - Mobile: Hamburger menu

- **Hero Section**
  - H1: "Mesas Rústicas Premium para Seus Eventos"
  - H2: "Transforme seu espaço com móveis de qualidade incomparável"
  - CTA Primary: "Explorar Catálogo" (scroll to catalog)
  - CTA Secondary: "Falar no WhatsApp"
  - Background: Hero image with overlay (opacity 0.1)

### Medidas:
- Height: 600px (desktop), 500px (mobile)
- Padding: 80px 0 (desktop), 40px 0 (mobile)

---

## SECAO 2: DIFERENCIAIS (4 CARDS)

### Layout Desktop
```
┌──────────────────────────────────────────────────────────┐
│               POR QUE ESCOLHER A GENTE?                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   🏆     │  │   📦     │  │   🎨     │  │   💳     ││
│  │          │  │          │  │          │  │          ││
│  │7+ Anos   │  │Entrega   │  │Customiza │  │Parcelam. ││
│  │Experiên. │  │SC/PR     │  │Sob Medida│  │12x Sem   ││
│  │          │  │          │  │          │  │Juros     ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (Stack)
```
┌───────────────────────┐
│  POR QUE ESCOLHER?    │
├───────────────────────┤
│  ┌─────────────────┐ │
│  │   🏆           │ │
│  │ 7+ Anos Exp.   │ │
│  └─────────────────┘ │
│  ┌─────────────────┐ │
│  │   📦           │ │
│  │ Entrega SC/PR  │ │
│  └─────────────────┘ │
│  ┌─────────────────┐ │
│  │   🎨           │ │
│  │ Sob Medida     │ │
│  └─────────────────┘ │
│  ┌─────────────────┐ │
│  │   💳           │ │
│  │ 12x Sem Juros  │ │
│  └─────────────────┘ │
└───────────────────────┘
```

### Conteúdo dos Cards:

#### Card 1: Experiência
- **Icon:** 🏆 (trophy)
- **Título:** "7+ Anos de Experiência"
- **Descrição:** "Tradição em móveis rústicos de alta qualidade"

#### Card 2: Entrega
- **Icon:** 📦 (truck)
- **Título:** "Entrega SC/PR"
- **Descrição:** "Entregamos em toda Santa Catarina e Paraná"

#### Card 3: Customização
- **Icon:** 🎨 (palette)
- **Título:** "Customização Sob Medida"
- **Descrição:** "Criamos o móvel perfeito para seu evento"

#### Card 4: Pagamento
- **Icon:** 💳 (credit card)
- **Título:** "Parcelamento 12x Sem Juros"
- **Descrição:** "Facilidade no pagamento via PIX ou Cartão"

### Medidas:
- Card width: 280px (desktop)
- Card height: 240px
- Gap between cards: 24px
- Padding: 80px 0

---

## SECAO 3: CATALOGO DE PRODUTOS

### Layout Desktop (Grid 3 colunas)
```
┌──────────────────────────────────────────────────────────┐
│                  NOSSO CATÁLOGO                          │
│         Escolha o modelo perfeito para você              │
├──────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │[SOB MEDIDA]│  │[SOB MEDIDA]│  │[SOB MEDIDA]│        │
│  │            │  │            │  │            │        │
│  │  [Image]   │  │  [Image]   │  │  [Image]   │        │
│  │            │  │            │  │            │        │
│  │Mesa Impera-│  │Mesa Glamour│  │Mesa Glamour│        │
│  │triz Natural│  │            │  │Mel         │        │
│  │            │  │            │  │            │        │
│  │R$ 3.400    │  │R$ 3.400    │  │R$ 3.400    │        │
│  │            │  │            │  │            │        │
│  │[Ver Detal.]│  │[Ver Detal.]│  │[Ver Detal.]│        │
│  │[Carrinho]  │  │[Carrinho]  │  │[Carrinho]  │        │
│  └────────────┘  └────────────┘  └────────────┘        │
│                                                          │
│  [Repetir para 13 modelos...]                           │
│                                                          │
│              [Ver Todos os Modelos]                      │
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (1 coluna)
```
┌───────────────────────┐
│   NOSSO CATÁLOGO      │
├───────────────────────┤
│  ┌─────────────────┐ │
│  │  [SOB MEDIDA]   │ │
│  │                 │ │
│  │    [Image]      │ │
│  │                 │ │
│  │Mesa Imperatriz  │ │
│  │Natural          │ │
│  │                 │ │
│  │R$ 3.400         │ │
│  │                 │ │
│  │[Ver Detalhes]   │ │
│  │[Carrinho]       │ │
│  └─────────────────┘ │
│                       │
│  [Repetir...]         │
└───────────────────────┘
```

### Lista Completa de Produtos:

1. **Mesa Imperatriz Natural** - R$ 3.400
   - Madeira natural com acabamento rústico
   - Dimensões: 2,20m x 1,00m

2. **Mesa Glamour** - R$ 3.400
   - Design elegante com detalhes sofisticados
   - Dimensões: 2,20m x 1,00m

3. **Mesa Glamour Mel** - R$ 3.400
   - Acabamento mel com verniz fosco
   - Dimensões: 2,20m x 1,00m

4. **Mesa Requinte Nobre** - R$ 3.400
   - Madeira nobre com design refinado
   - Dimensões: 2,20m x 1,00m

5. **Mesa Nobreza** - R$ 4.200
   - Premium: Madeira selecionada
   - Dimensões: 2,40m x 1,10m

6. **Mesa Encanto** - R$ 3.400
   - Design encantador com pés torneados
   - Dimensões: 2,20m x 1,00m

7. **Mesa Império** - R$ 3.400
   - Robustez e elegância
   - Dimensões: 2,20m x 1,00m

8. **Mesa Charme** - R$ 3.400
   - Charme rústico autêntico
   - Dimensões: 2,20m x 1,00m

9. **Mesa Imperatriz** - R$ 3.400
   - Versão clássica com acabamento premium
   - Dimensões: 2,20m x 1,00m

10. **Mesa Luxúria** - R$ 4.500
    - TOP: Madeira extra selecionada
    - Dimensões: 2,50m x 1,20m

11. **Mesa Requinte** - R$ 3.400
    - Requinte e sofisticação
    - Dimensões: 2,20m x 1,00m

12. **Mesa Paris** - R$ 3.400
    - Inspiração parisiense elegante
    - Dimensões: 2,20m x 1,00m

13. **Mesa Sublime** - R$ 3.400
    - Beleza sublime e atemporal
    - Dimensões: 2,20m x 1,00m

### Elementos do Card:
- **Badge:** "SOB MEDIDA" (top-right, verde)
- **Image:** 400x300px (aspect ratio 4:3)
- **Título:** Nome da mesa
- **Preço:** Fonte Lobster Two, 28px
- **Botões:**
  - Primary: "Ver Detalhes"
  - Secondary: "Adicionar ao Carrinho" (icon)

### Medidas:
- Card width: 380px (desktop)
- Gap: 24px
- Padding: 80px 0

---

## SECAO 4: SOBRE A EMPRESA

### Layout Desktop (2 colunas)
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ┌────────────────┐    ┌──────────────────────────┐    │
│  │                │    │  QUEM SOMOS               │    │
│  │                │    │                           │    │
│  │   [Imagem da   │    │  Luis Alves Mesas para   │    │
│  │   Oficina/     │    │  Festas é uma empresa    │    │
│  │   Produção]    │    │  familiar com mais de    │    │
│  │                │    │  7 anos de tradição...   │    │
│  │                │    │                           │    │
│  └────────────────┘    │  NOSSOS VALORES:          │    │
│                        │                           │    │
│                        │  ✓ Qualidade Artesanal   │    │
│                        │  ✓ Atendimento Pessoal.  │    │
│                        │  ✓ Sustentabilidade      │    │
│                        │                           │    │
│                        │  [Falar com Luis Alves]   │    │
│                        └──────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (Stack)
```
┌───────────────────────┐
│   QUEM SOMOS          │
├───────────────────────┤
│                       │
│   [Imagem Oficina]    │
│                       │
│ Luis Alves Mesas para │
│ Festas é uma empresa  │
│ familiar...           │
│                       │
│ NOSSOS VALORES:       │
│                       │
│ ✓ Qualidade Artesanal│
│ ✓ Atendimento Pessoal│
│ ✓ Sustentabilidade   │
│                       │
│ [Falar com Luis]      │
└───────────────────────┘
```

### Conteúdo:

#### Título
"Quem Somos"

#### Texto Principal
"Luis Alves Mesas para Festas é uma empresa familiar com mais de 7 anos de tradição na fabricação de móveis rústicos de alta qualidade. Localizados em Luis Alves - SC, atendemos toda Santa Catarina e Paraná com mesas artesanais que transformam eventos em momentos inesquecíveis.

Cada peça é cuidadosamente selecionada e trabalhada por artesãos experientes, garantindo não apenas beleza, mas durabilidade e exclusividade para seu evento especial."

#### Valores (3 itens com ícones)
1. **Qualidade Artesanal**
   - "Cada mesa é única, feita à mão com madeira selecionada"

2. **Atendimento Personalizado**
   - "Trabalhamos junto com você para criar a mesa perfeita"

3. **Sustentabilidade**
   - "Madeira de reflorestamento e processos eco-friendly"

### Medidas:
- Image: 600x500px
- Text column: 600px width
- Padding: 80px 0

---

## SECAO 5: DEPOIMENTOS/REVIEWS

### Layout Desktop (Carousel)
```
┌──────────────────────────────────────────────────────────┐
│           O QUE NOSSOS CLIENTES DIZEM                    │
│                  ⭐ 4.9/5.0                               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [<]  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  [>]│
│       │     "       │  │     "       │  │     "       │    │
│       │             │  │             │  │             │    │
│       │ Excelente!  │  │ As mesas    │  │ Superou     │    │
│       │ As mesas... │  │ ficaram...  │  │ expectati.. │    │
│       │             │  │             │  │             │    │
│       │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐⭐⭐     │    │
│       │             │  │             │  │             │    │
│       │ [Avatar]    │  │ [Avatar]    │  │ [Avatar]    │    │
│       │ Maria S.    │  │ João P.     │  │ Ana C.      │    │
│       │ Blumenau-SC │  │ Joinville-SC│  │ Curitiba-PR │    │
│       └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                          │
│                   [• • • • •]                            │
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (Carousel 1 card)
```
┌───────────────────────┐
│ O QUE NOSSOS CLIENTES │
│ DIZEM                 │
│     ⭐ 4.9/5.0         │
├───────────────────────┤
│  [<]         [>]      │
│  ┌─────────────────┐ │
│  │      "          │ │
│  │                 │ │
│  │ Excelente!      │ │
│  │ As mesas ficaram│ │
│  │ perfeitas...    │ │
│  │                 │ │
│  │ ⭐⭐⭐⭐⭐         │ │
│  │                 │ │
│  │ [Avatar]        │ │
│  │ Maria Silva     │ │
│  │ Blumenau-SC     │ │
│  └─────────────────┘ │
│                       │
│      [• • • • •]      │
└───────────────────────┘
```

### Depoimentos (8 exemplos):

#### Depoimento 1
- **Nome:** Maria Silva
- **Localização:** Blumenau - SC
- **Rating:** 5 estrelas
- **Texto:** "Excelente! As mesas ficaram perfeitas para o casamento da minha filha. Qualidade impecável e entrega pontual. Super recomendo!"

#### Depoimento 2
- **Nome:** João Pedro
- **Localização:** Joinville - SC
- **Rating:** 5 estrelas
- **Texto:** "As mesas rústicas deram um charme especial ao nosso evento corporativo. Atendimento nota 10 do Luis Alves!"

#### Depoimento 3
- **Nome:** Ana Carolina
- **Localização:** Curitiba - PR
- **Rating:** 5 estrelas
- **Texto:** "Superou todas as expectativas! A customização foi exatamente como queríamos. Parabéns pelo trabalho artesanal!"

#### Depoimento 4
- **Nome:** Roberto Machado
- **Localização:** Florianópolis - SC
- **Rating:** 5 estrelas
- **Texto:** "Produto de alta qualidade. Investimento que vale a pena para quem busca elegância e rusticidade."

#### Depoimento 5
- **Nome:** Juliana Ferreira
- **Localização:** Balneário Camboriú - SC
- **Rating:** 5 estrelas
- **Texto:** "Adorei! As mesas foram o destaque da decoração do meu aniversário de 40 anos. Todos os convidados elogiaram."

#### Depoimento 6
- **Nome:** Carlos Henrique
- **Localização:** Ponta Grossa - PR
- **Rating:** 4 estrelas
- **Texto:** "Muito bom! Entrega dentro do prazo e produto conforme anunciado. Recomendo para eventos especiais."

#### Depoimento 7
- **Nome:** Fernanda Costa
- **Localização:** Itajaí - SC
- **Rating:** 5 estrelas
- **Texto:** "Qualidade excepcional! O Luis é super atencioso e trabalhou conosco em cada detalhe. Nota 1000!"

#### Depoimento 8
- **Nome:** Marcos Antônio
- **Localização:** Londrina - PR
- **Rating:** 5 estrelas
- **Texto:** "Comprei 6 mesas para meu buffet. Estou muito satisfeito com a durabilidade e beleza dos móveis. Parceria de sucesso!"

### Medidas:
- Card width: 380px
- Card height: 320px
- Gap: 24px
- Padding: 80px 0

---

## SECAO 6: PROCESSO DE COMPRA (4 STEPS)

### Layout Desktop (Horizontal)
```
┌──────────────────────────────────────────────────────────┐
│              COMO FUNCIONA O PROCESSO                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ──>  ┌──────────┐  ──>  ┌──────────┐  ──>  ┌──────────┐│
│  │    1     │       │    2     │       │    3     │       │    4     ││
│  │  [Icon]  │       │  [Icon]  │       │  [Icon]  │       │  [Icon]  ││
│  │          │       │          │       │          │       │          ││
│  │ Escolha  │       │Personal. │       │Pagamento │       │ Entrega  ││
│  │ a Mesa   │       │          │       │PIX/Cartão│       │SC/PR     ││
│  │          │       │          │       │          │       │          ││
│  │Navegue..│       │Dimensões,│       │12x Sem.. │       │Agende... ││
│  └──────────┘       └──────────┘       └──────────┘       └──────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (Vertical)
```
┌───────────────────────┐
│ COMO FUNCIONA         │
├───────────────────────┤
│  ┌─────────────────┐ │
│  │      1          │ │
│  │    [Icon]       │ │
│  │                 │ │
│  │ Escolha a Mesa  │ │
│  │ Navegue nosso.. │ │
│  └─────────────────┘ │
│         ↓             │
│  ┌─────────────────┐ │
│  │      2          │ │
│  │    [Icon]       │ │
│  │                 │ │
│  │ Personalize     │ │
│  │ Dimensões...    │ │
│  └─────────────────┘ │
│         ↓             │
│  ┌─────────────────┐ │
│  │      3          │ │
│  │    [Icon]       │ │
│  │                 │ │
│  │ Pagamento       │ │
│  │ PIX ou 12x...   │ │
│  └─────────────────┘ │
│         ↓             │
│  ┌─────────────────┐ │
│  │      4          │ │
│  │    [Icon]       │ │
│  │                 │ │
│  │ Entrega         │ │
│  │ Agendamos...    │ │
│  └─────────────────┘ │
└───────────────────────┘
```

### Conteúdo dos Steps:

#### Step 1: Escolha a Mesa
- **Icon:** 🔍 (search/eye)
- **Título:** "Escolha a Mesa"
- **Descrição:** "Navegue nosso catálogo e escolha o modelo que mais combina com seu evento"

#### Step 2: Personalize
- **Icon:** 📐 (ruler/tools)
- **Título:** "Personalize"
- **Descrição:** "Defina dimensões, acabamento e detalhes especiais para sua mesa"

#### Step 3: Pagamento
- **Icon:** 💳 (credit card)
- **Título:** "Pagamento"
- **Descrição:** "PIX à vista com desconto ou parcele em até 12x sem juros no cartão"

#### Step 4: Entrega
- **Icon:** 🚚 (truck)
- **Título:** "Entrega"
- **Descrição:** "Agendamos a entrega em toda SC e PR no prazo combinado"

### Medidas:
- Step width: 280px
- Step height: 300px
- Gap: 40px
- Padding: 80px 0

---

## SECAO 7: FOOTER

### Layout Desktop
```
┌──────────────────────────────────────────────────────────┐
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐│
│  │  LUIS ALVES   │  │  NAVEGAÇÃO    │  │  PRODUTOS     │  │  CONTATO      ││
│  │  MESAS        │  │               │  │               │  │               ││
│  │               │  │  - Home       │  │  - Catálogo   │  │  (47) 99716-  ││
│  │  [Logo]       │  │  - Catálogo   │  │  - Sob Medida │  │   8814        ││
│  │               │  │  - Sobre Nós  │  │  - Pagamento  │  │               ││
│  │  Mesas rúst.  │  │  - Contato    │  │  - Entrega    │  │  Luis Alves   ││
│  │  para eventos │  │               │  │               │  │  SC           ││
│  │  especiais    │  │               │  │               │  │               ││
│  │               │  │               │  │               │  │  [Instagram]  ││
│  │               │  │               │  │               │  │  [Facebook]   ││
│  │               │  │               │  │               │  │  [WhatsApp]   ││
│  └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘│
├──────────────────────────────────────────────────────────┤
│                 NEWSLETTER                               │
│  ┌────────────────────────────────────────────────┐     │
│  │ [Email]                          [Inscrever-se]│     │
│  └────────────────────────────────────────────────┘     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  © 2025 Luis Alves Mesas para Festas - JPR Móveis       │
│  Rústicos Ltda. Todos os direitos reservados.           │
│                                                          │
│  Desenvolvido com ❤ em Luis Alves - SC                  │
└──────────────────────────────────────────────────────────┘
```

### Layout Mobile (Stack)
```
┌───────────────────────┐
│  LUIS ALVES MESAS     │
│                       │
│  [Logo]               │
│                       │
│  Mesas rústicas para  │
│  eventos especiais    │
├───────────────────────┤
│  NAVEGAÇÃO            │
│  - Home               │
│  - Catálogo           │
│  - Sobre Nós          │
│  - Contato            │
├───────────────────────┤
│  CONTATO              │
│  (47) 99716-8814      │
│  Luis Alves - SC      │
│                       │
│  [Instagram]          │
│  [Facebook]           │
│  [WhatsApp]           │
├───────────────────────┤
│  NEWSLETTER           │
│  ┌─────────────────┐ │
│  │ [Email]         │ │
│  │ [Inscrever-se]  │ │
│  └─────────────────┘ │
├───────────────────────┤
│  © 2025 Luis Alves    │
│  Mesas para Festas    │
└───────────────────────┘
```

### Conteúdo do Footer:

#### Coluna 1: Logo e Descrição
- Logo: 180x60px
- Tagline: "Mesas rústicas de alta qualidade para eventos especiais"

#### Coluna 2: Navegação
- Home
- Catálogo
- Sobre Nós
- Processo de Compra
- Contato
- Política de Privacidade
- Termos de Uso

#### Coluna 3: Produtos
- Catálogo Completo
- Mesas Sob Medida
- Parcelamento
- Área de Entrega
- Perguntas Frequentes

#### Coluna 4: Contato
- **Telefone:** (47) 99716-8814
- **Endereço:** Luis Alves - SC
- **Email:** contato@luisalvesmesas.com.br
- **Horário:** Seg-Sex: 8h-18h | Sáb: 8h-12h

#### Redes Sociais
- Instagram: @luisalvesmesas
- Facebook: /luisalvesmesas
- WhatsApp: (47) 99716-8814

#### Newsletter
- Input: "Seu melhor email"
- Button: "Inscrever-se"
- Texto: "Receba novidades e ofertas exclusivas"

#### Copyright
"© 2025 Luis Alves Mesas para Festas - JPR Móveis Rústicos Ltda. Todos os direitos reservados.

Desenvolvido com ❤ em Luis Alves - SC"

### Medidas:
- Padding: 64px 0 32px
- Column gap: 48px
- Bottom padding: 32px

---

## CONSIDERACOES GERAIS

### Responsividade:
- Desktop: 1280px+
- Tablet: 768px - 1279px
- Mobile: 375px - 767px

### Performance:
- Lazy loading de imagens
- Minificação de CSS/JS
- Compressão de imagens (WebP)
- CDN para fontes

### SEO:
- Meta tags otimizadas
- Schema.org markup (Product, Organization)
- Open Graph tags
- Alt text descritivo em imagens
- URLs amigáveis

### Acessibilidade:
- Contraste WCAG AA
- Navegação por teclado
- ARIA labels
- Textos alternativos
- Focus states visíveis

---

**Estrutura criada em:** Novembro 2025
**Versão:** 1.0
