# Guia de Desenvolvimento Front-End - Luis Alves Mesas para Festas

## Stack Tecnológica Recomendada

### Opção 1: HTML/CSS/JavaScript Vanilla (Simples e Rápido)
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização (com CSS Variables do Design System)
- **JavaScript ES6+** - Interatividade
- **Netlify** - Hosting e deploy

### Opção 2: Framework Moderno (Escalável)
- **Next.js 14** - React framework com SSR
- **TailwindCSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Vercel** - Hosting otimizado para Next.js

---

## Estrutura de Arquivos (HTML/CSS/JS)

```
luis-alves-mesas/
├── index.html                    # Landing page principal
├── catalogo.html                 # Página de catálogo completo
├── produto.html                  # Template de produto individual
├── sobre.html                    # Página sobre a empresa
├── contato.html                  # Formulário de contato
├── css/
│   ├── reset.css                 # CSS reset
│   ├── design-tokens.css         # CSS variables do Design System
│   ├── components.css            # Estilos dos componentes
│   ├── layout.css                # Grid e layout
│   └── main.css                  # Estilos principais
├── js/
│   ├── main.js                   # JavaScript principal
│   ├── carousel.js               # Carousel de depoimentos
│   ├── product-catalog.js        # Lógica do catálogo
│   ├── form-validation.js        # Validação de formulários
│   └── whatsapp-integration.js   # Integração WhatsApp
├── assets/
│   ├── images/
│   │   ├── products/             # Imagens de produtos
│   │   ├── hero/                 # Imagens hero
│   │   ├── about/                # Imagens da empresa
│   │   └── icons/                # Ícones SVG
│   ├── fonts/                    # Fontes locais (backup)
│   └── data/
│       └── products.json         # Dados dos produtos
├── _redirects                    # Netlify redirects
├── netlify.toml                  # Configuração Netlify
└── README.md                     # Documentação
```

---

## 1. Setup Inicial - design-tokens.css

```css
/* /css/design-tokens.css */

/* ============================================
   DESIGN TOKENS - Luis Alves Mesas para Festas
   ============================================ */

:root {
  /* ========== COLORS ========== */

  /* Primary */
  --color-primary: #983421;
  --color-primary-light: #b64a32;
  --color-primary-dark: #7a2a1a;
  --color-primary-rgb: 152, 52, 33;

  /* Secondary */
  --color-secondary: #D3B185;
  --color-secondary-light: #e5c89f;
  --color-secondary-dark: #c19f6c;
  --color-secondary-rgb: 211, 177, 133;

  /* Accent */
  --color-accent: #23af24;
  --color-accent-light: #2bc42c;
  --color-accent-dark: #1d8f1e;
  --color-accent-rgb: 35, 175, 36;

  /* Neutrals */
  --color-text-primary: #17252a;
  --color-text-secondary: #4a5c63;
  --color-text-muted: #8a9ca3;
  --color-bg-white: #ffffff;
  --color-bg-light: #f8f9fa;
  --color-bg-medium: #e9ecef;
  --color-footer: #563524;

  /* Functional */
  --color-success: #23af24;
  --color-error: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;

  /* Borders */
  --color-border: #dee2e6;
  --color-border-light: #f1f3f5;

  /* ========== TYPOGRAPHY ========== */

  /* Font Families */
  --font-heading: 'Lobster Two', cursive;
  --font-menu: 'Poppins', sans-serif;
  --font-body: 'Open Sans', sans-serif;

  /* Font Sizes */
  --font-size-h1: clamp(2.5rem, 5vw, 3.5rem);
  --font-size-h2: clamp(2rem, 4vw, 2.5rem);
  --font-size-h3: clamp(1.5rem, 3vw, 1.75rem);
  --font-size-h4: clamp(1.125rem, 2vw, 1.25rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --font-size-xs: 0.75rem;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-base: 1.6;
  --line-height-relaxed: 1.8;

  /* ========== SPACING ========== */

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* ========== LAYOUT ========== */

  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  --section-padding-y: var(--space-4xl);
  --section-padding-x: var(--space-lg);

  /* ========== BORDERS ========== */

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* ========== SHADOWS ========== */

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
               0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
               0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
               0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 4px 12px rgba(152, 52, 33, 0.1);
  --shadow-card-hover: 0 8px 24px rgba(152, 52, 33, 0.15);

  /* ========== TRANSITIONS ========== */

  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  /* ========== Z-INDEX ========== */

  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  :root {
    --section-padding-y: var(--space-2xl);
    --section-padding-x: var(--space-md);
  }
}
```

---

## 2. HTML Structure - index.html (Estrutura Base)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Luis Alves Mesas para Festas - Mesas rústicas premium para eventos em SC e PR. Customização sob medida, entrega garantida e parcelamento em 12x.">
  <meta name="keywords" content="mesas rústicas, móveis para festas, mesas de madeira, eventos SC, Luis Alves">

  <!-- Open Graph -->
  <meta property="og:title" content="Luis Alves Mesas para Festas - Mesas Rústicas Premium">
  <meta property="og:description" content="Transforme seu evento com mesas rústicas de alta qualidade. Customização sob medida e entrega em SC/PR.">
  <meta property="og:image" content="/assets/images/og-image.jpg">
  <meta property="og:url" content="https://luisalvesmesas.com.br">

  <title>Luis Alves Mesas para Festas | Mesas Rústicas Premium SC/PR</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/design-tokens.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/main.css">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/assets/images/favicon.png">
</head>
<body>

  <!-- HEADER + NAVBAR -->
  <header class="navbar" id="navbar">
    <div class="container">
      <div class="navbar-content">
        <a href="/" class="navbar-logo">
          <img src="/assets/images/logo.svg" alt="Luis Alves Mesas para Festas">
        </a>

        <nav class="navbar-menu" aria-label="Navegação principal">
          <ul>
            <li><a href="#home" class="navbar-link active">Home</a></li>
            <li><a href="#catalogo" class="navbar-link">Catálogo</a></li>
            <li><a href="#sobre" class="navbar-link">Sobre</a></li>
            <li><a href="#depoimentos" class="navbar-link">Depoimentos</a></li>
            <li><a href="#contato" class="navbar-link">Contato</a></li>
          </ul>
        </nav>

        <a href="https://wa.me/5547997168814?text=Olá! Gostaria de solicitar um orçamento."
           class="btn btn-primary"
           target="_blank"
           rel="noopener noreferrer">
          Solicitar Orçamento
        </a>

        <button class="navbar-toggle" aria-label="Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="hero" id="home">
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Mesas Rústicas Premium para Seus Eventos</h1>
        <p class="hero-subtitle">Transforme seu espaço com móveis de qualidade incomparável</p>
        <div class="hero-actions">
          <a href="#catalogo" class="btn btn-primary btn-lg">Explorar Catálogo</a>
          <a href="https://wa.me/5547997168814" class="btn btn-secondary btn-lg" target="_blank">
            <svg class="btn-icon" width="20" height="20" fill="currentColor">
              <use href="/assets/icons/sprite.svg#whatsapp"></use>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- DIFERENCIAIS -->
  <section class="section section-diferenciais">
    <div class="container">
      <h2 class="section-title text-center">Por Que Escolher a Gente?</h2>

      <div class="features-grid">
        <!-- Feature 1 -->
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" fill="currentColor">
              <use href="/assets/icons/sprite.svg#trophy"></use>
            </svg>
          </div>
          <h3 class="feature-title">7+ Anos de Experiência</h3>
          <p class="feature-description">Tradição em móveis rústicos de alta qualidade</p>
        </div>

        <!-- Feature 2 -->
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" fill="currentColor">
              <use href="/assets/icons/sprite.svg#truck"></use>
            </svg>
          </div>
          <h3 class="feature-title">Entrega SC/PR</h3>
          <p class="feature-description">Entregamos em toda Santa Catarina e Paraná</p>
        </div>

        <!-- Feature 3 -->
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" fill="currentColor">
              <use href="/assets/icons/sprite.svg#palette"></use>
            </svg>
          </div>
          <h3 class="feature-title">Customização Sob Medida</h3>
          <p class="feature-description">Criamos o móvel perfeito para seu evento</p>
        </div>

        <!-- Feature 4 -->
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" fill="currentColor">
              <use href="/assets/icons/sprite.svg#credit-card"></use>
            </svg>
          </div>
          <h3 class="feature-title">Parcelamento 12x Sem Juros</h3>
          <p class="feature-description">Facilidade no pagamento via PIX ou Cartão</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CATÁLOGO DE PRODUTOS -->
  <section class="section section-catalogo" id="catalogo">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">Nosso Catálogo</h2>
        <p class="section-subtitle">Escolha o modelo perfeito para você</p>
      </div>

      <div class="product-grid" id="product-grid">
        <!-- Products will be loaded via JavaScript -->
      </div>

      <div class="text-center" style="margin-top: var(--space-2xl);">
        <a href="/catalogo.html" class="btn btn-outline">Ver Todos os Modelos</a>
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section class="section section-sobre" id="sobre">
    <div class="container">
      <div class="sobre-grid">
        <div class="sobre-image">
          <img src="/assets/images/about/oficina.jpg" alt="Oficina Luis Alves Mesas">
        </div>
        <div class="sobre-content">
          <h2 class="section-title">Quem Somos</h2>
          <p>Luis Alves Mesas para Festas é uma empresa familiar com mais de 7 anos de tradição na fabricação de móveis rústicos de alta qualidade.</p>
          <p>Localizados em Luis Alves - SC, atendemos toda Santa Catarina e Paraná com mesas artesanais que transformam eventos em momentos inesquecíveis.</p>

          <h3 style="margin-top: var(--space-xl);">Nossos Valores</h3>
          <ul class="valores-list">
            <li>
              <svg width="20" height="20" fill="var(--color-accent)">
                <use href="/assets/icons/sprite.svg#check"></use>
              </svg>
              <strong>Qualidade Artesanal:</strong> Cada mesa é única, feita à mão com madeira selecionada
            </li>
            <li>
              <svg width="20" height="20" fill="var(--color-accent)">
                <use href="/assets/icons/sprite.svg#check"></use>
              </svg>
              <strong>Atendimento Personalizado:</strong> Trabalhamos junto com você para criar a mesa perfeita
            </li>
            <li>
              <svg width="20" height="20" fill="var(--color-accent)">
                <use href="/assets/icons/sprite.svg#check"></use>
              </svg>
              <strong>Sustentabilidade:</strong> Madeira de reflorestamento e processos eco-friendly
            </li>
          </ul>

          <a href="https://wa.me/5547997168814" class="btn btn-secondary" target="_blank" style="margin-top: var(--space-lg);">
            Falar com Luis Alves
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="section section-depoimentos" id="depoimentos">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">O Que Nossos Clientes Dizem</h2>
        <div class="rating">⭐ 4.9/5.0</div>
      </div>

      <div class="testimonials-carousel" id="testimonials-carousel">
        <!-- Testimonials will be loaded via JavaScript -->
      </div>
    </div>
  </section>

  <!-- PROCESSO -->
  <section class="section section-processo">
    <div class="container">
      <h2 class="section-title text-center">Como Funciona o Processo</h2>

      <div class="steps-grid">
        <!-- Steps will be here -->
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Footer content -->
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/main.js" defer></script>
  <script src="/js/carousel.js" defer></script>
  <script src="/js/product-catalog.js" defer></script>
</body>
</html>
```

---

## 3. JavaScript - product-catalog.js

```javascript
// /js/product-catalog.js

class ProductCatalog {
  constructor() {
    this.products = [];
    this.container = document.getElementById('product-grid');
    this.init();
  }

  async init() {
    await this.loadProducts();
    this.renderProducts();
  }

  async loadProducts() {
    try {
      const response = await fetch('/assets/data/products.json');
      const data = await response.json();
      this.products = data.produtos;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  renderProducts(limit = 6) {
    if (!this.container) return;

    const productsToRender = limit ? this.products.slice(0, limit) : this.products;

    this.container.innerHTML = productsToRender.map(product => this.createProductCard(product)).join('');

    // Add event listeners
    this.addEventListeners();
  }

  createProductCard(product) {
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card-image-container">
          <img
            src="/assets/images/products/${product.imagem}"
            alt="${product.nome}"
            class="product-card-image"
            loading="lazy"
          >
          <span class="product-card-badge">${product.badge}</span>
        </div>
        <div class="product-card-content">
          <h3 class="product-card-title">${product.nome}</h3>
          <p class="product-card-description">${product.descricao}</p>
          <div class="product-card-price">${product.precoFormatado}</div>
          <div class="product-card-actions">
            <button class="btn btn-primary btn-sm btn-ver-detalhes">Ver Detalhes</button>
            <button class="btn btn-outline btn-sm btn-carrinho" aria-label="Adicionar ao carrinho">
              <svg width="16" height="16" fill="currentColor">
                <use href="/assets/icons/sprite.svg#shopping-cart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    // Ver detalhes buttons
    document.querySelectorAll('.btn-ver-detalhes').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const productId = card.dataset.productId;
        this.viewProductDetails(productId);
      });
    });

    // Carrinho buttons
    document.querySelectorAll('.btn-carrinho').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const productId = card.dataset.productId;
        this.addToCart(productId);
      });
    });
  }

  viewProductDetails(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      // Redirect to product page or open modal
      window.location.href = `/produto.html?id=${product.slug}`;
    }
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      // WhatsApp integration
      const message = `Olá! Tenho interesse na ${product.nome} (${product.precoFormatado}). Gostaria de mais informações.`;
      const whatsappUrl = `https://wa.me/5547997168814?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCatalog();
});
```

---

## 4. JavaScript - carousel.js (Testimonials)

```javascript
// /js/carousel.js

class TestimonialsCarousel {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.currentIndex = 0;
    this.testimonials = [];
    this.init();
  }

  async init() {
    await this.loadTestimonials();
    this.render();
    this.attachEvents();
    this.startAutoplay();
  }

  async loadTestimonials() {
    // Mock data - replace with API call if needed
    this.testimonials = [
      {
        name: "Maria Silva",
        location: "Blumenau - SC",
        rating: 5,
        text: "Excelente! As mesas ficaram perfeitas para o casamento da minha filha. Qualidade impecável e entrega pontual. Super recomendo!",
        avatar: "/assets/images/testimonials/avatar-1.jpg"
      },
      {
        name: "João Pedro",
        location: "Joinville - SC",
        rating: 5,
        text: "As mesas rústicas deram um charme especial ao nosso evento corporativo. Atendimento nota 10 do Luis Alves!",
        avatar: "/assets/images/testimonials/avatar-2.jpg"
      },
      {
        name: "Ana Carolina",
        location: "Curitiba - PR",
        rating: 5,
        text: "Superou todas as expectativas! A customização foi exatamente como queríamos. Parabéns pelo trabalho artesanal!",
        avatar: "/assets/images/testimonials/avatar-3.jpg"
      }
    ];
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-btn carousel-btn-prev" aria-label="Anterior">
          <svg width="24" height="24" fill="currentColor">
            <use href="/assets/icons/sprite.svg#chevron-left"></use>
          </svg>
        </button>

        <div class="carousel-track">
          ${this.testimonials.map((testimonial, index) => this.createTestimonialCard(testimonial, index)).join('')}
        </div>

        <button class="carousel-btn carousel-btn-next" aria-label="Próximo">
          <svg width="24" height="24" fill="currentColor">
            <use href="/assets/icons/sprite.svg#chevron-right"></use>
          </svg>
        </button>
      </div>

      <div class="carousel-indicators">
        ${this.testimonials.map((_, index) => `
          <button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir para depoimento ${index + 1}"></button>
        `).join('')}
      </div>
    `;
  }

  createTestimonialCard(testimonial, index) {
    const stars = '⭐'.repeat(testimonial.rating);

    return `
      <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="testimonial-stars">${stars}</div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
          <div>
            <div class="testimonial-author-name">${testimonial.name}</div>
            <div class="testimonial-author-location">${testimonial.location}</div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const prevBtn = this.container.querySelector('.carousel-btn-prev');
    const nextBtn = this.container.querySelector('.carousel-btn-next');
    const indicators = this.container.querySelectorAll('.carousel-indicator');

    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goTo(index);
      });
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.update();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.update();
  }

  goTo(index) {
    this.currentIndex = index;
    this.update();
  }

  update() {
    const cards = this.container.querySelectorAll('.testimonial-card');
    const indicators = this.container.querySelectorAll('.carousel-indicator');

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === this.currentIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoplay() {
    setInterval(() => this.next(), 5000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsCarousel('#testimonials-carousel');
});
```

---

## 5. Performance Optimization

### 5.1 Lazy Loading de Imagens

```javascript
// Adicionar ao main.js
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}
```

### 5.2 CSS Minification

```bash
# Usar PostCSS ou cssnano
npm install cssnano postcss-cli --save-dev
npx postcss css/main.css -o css/main.min.css
```

### 5.3 Image Optimization

```bash
# Usar Sharp ou ImageMagick
npm install sharp --save-dev

# Script para converter para WebP
node scripts/convert-to-webp.js
```

---

## 6. SEO Best Practices

### 6.1 Schema.org Markup

```html
<!-- Adicionar ao <head> ou antes do </body> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Luis Alves Mesas para Festas",
  "image": "https://luisalvesmesas.com.br/assets/images/logo.jpg",
  "description": "Mesas rústicas premium para eventos em SC e PR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Luis Alves",
    "addressLocality": "Luis Alves",
    "addressRegion": "SC",
    "postalCode": "88000-000",
    "addressCountry": "BR"
  },
  "telephone": "+55-47-99716-8814",
  "priceRange": "R$ 3.400 - R$ 4.500",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  }
}
</script>
```

---

## 7. Deploy no Netlify

### 7.1 netlify.toml

```toml
[build]
  publish = "."
  command = "echo 'No build command'"

[[redirects]]
  from = "/produto/:slug"
  to = "/produto.html?id=:slug"
  status = 200

[[redirects]]
  from = "/catalogo"
  to = "/catalogo.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 7.2 Deploy Steps

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Deploy
netlify deploy --prod
```

---

## 8. Testing Checklist

- [ ] Responsividade testada em: Mobile, Tablet, Desktop
- [ ] Navegação funcional em todos os links
- [ ] Formulários com validação
- [ ] Integração WhatsApp funcionando
- [ ] Imagens carregando corretamente
- [ ] Performance: Lighthouse score > 90
- [ ] SEO: Meta tags e Schema.org
- [ ] Acessibilidade: WCAG AA compliance
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge

---

**Guia criado em:** Novembro 2025
**Versão:** 1.0
