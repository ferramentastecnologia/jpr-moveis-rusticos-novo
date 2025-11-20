# Design System - Luis Alves Mesas para Festas

## Informações do Projeto

**Cliente:** Luis Alves Mesas para Festas / JPR Móveis Rústicos Ltda
**Email Figma:** ferramentas.starken@gmail.com
**Tipo:** E-commerce Landing Page + Design System
**Data:** Novembro 2025

---

## 1. Tokens de Design (CSS Variables)

### 1.1 Colors

```css
:root {
  /* Primary Colors */
  --color-primary: #983421;           /* Marrom Rústico */
  --color-primary-light: #b64a32;     /* Hover state */
  --color-primary-dark: #7a2a1a;      /* Active state */

  /* Secondary Colors */
  --color-secondary: #D3B185;         /* Bege/Tan */
  --color-secondary-light: #e5c89f;   /* Hover state */
  --color-secondary-dark: #c19f6c;    /* Active state */

  /* Accent/CTA */
  --color-accent: #23af24;            /* Verde */
  --color-accent-light: #2bc42c;      /* Hover state */
  --color-accent-dark: #1d8f1e;       /* Active state */

  /* Neutrals */
  --color-text-primary: #17252a;      /* Preto/Texto */
  --color-text-secondary: #4a5c63;    /* Texto secundário */
  --color-text-muted: #8a9ca3;        /* Texto desbotado */

  --color-bg-white: #ffffff;          /* Branco */
  --color-bg-light: #f8f9fa;          /* Background claro */
  --color-bg-medium: #e9ecef;         /* Background médio */

  --color-footer: #563524;            /* Marrom Escuro Footer */

  /* Functional Colors */
  --color-success: #23af24;
  --color-error: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;

  /* Borders & Dividers */
  --color-border: #dee2e6;
  --color-border-light: #f1f3f5;
  --color-divider: rgba(0, 0, 0, 0.1);
}
```

### 1.2 Typography

```css
:root {
  /* Font Families */
  --font-heading: 'Lobster Two', cursive;
  --font-menu: 'Poppins', sans-serif;
  --font-body: 'Open Sans', sans-serif;

  /* Font Sizes */
  --font-size-h1: 3.5rem;        /* 56px - Hero Headlines */
  --font-size-h2: 2.5rem;        /* 40px - Section Titles */
  --font-size-h3: 1.75rem;       /* 28px - Subsections */
  --font-size-h4: 1.25rem;       /* 20px - Card Titles */
  --font-size-body: 1rem;        /* 16px - Body Text */
  --font-size-small: 0.875rem;   /* 14px - Small Text */
  --font-size-xs: 0.75rem;       /* 12px - Extra Small */

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-base: 1.6;
  --line-height-relaxed: 1.8;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;
}

/* Typography Classes */
.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-primary);
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-primary);
}

.heading-3 {
  font-family: var(--font-menu);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-base);
  color: var(--color-text-primary);
}

.heading-4 {
  font-family: var(--font-menu);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-base);
  color: var(--color-text-primary);
}

.body-text {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  color: var(--color-text-primary);
}

.menu-text {
  font-family: var(--font-menu);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-base);
  color: var(--color-text-primary);
}
```

### 1.3 Spacing

```css
:root {
  /* Spacing Scale (8px base) */
  --space-xs: 0.25rem;     /* 4px */
  --space-sm: 0.5rem;      /* 8px */
  --space-md: 1rem;        /* 16px */
  --space-lg: 1.5rem;      /* 24px */
  --space-xl: 2rem;        /* 32px */
  --space-2xl: 3rem;       /* 48px */
  --space-3xl: 4rem;       /* 64px */
  --space-4xl: 6rem;       /* 96px */

  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  /* Section Padding */
  --section-padding-y: var(--space-4xl);
  --section-padding-x: var(--space-lg);
}
```

### 1.4 Border Radius

```css
:root {
  --radius-sm: 0.25rem;    /* 4px - Small elements */
  --radius-md: 0.5rem;     /* 8px - Cards, inputs */
  --radius-lg: 1rem;       /* 16px - Large cards */
  --radius-xl: 1.5rem;     /* 24px - Hero sections */
  --radius-full: 9999px;   /* Circular */
}
```

### 1.5 Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
               0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
               0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
               0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Product Card Shadow */
  --shadow-card: 0 4px 12px rgba(152, 52, 33, 0.1);
  --shadow-card-hover: 0 8px 24px rgba(152, 52, 33, 0.15);
}
```

### 1.6 Transitions

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## 2. Component Library

### 2.1 Buttons

```css
/* Primary Button */
.btn-primary {
  font-family: var(--font-menu);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-bg-white);
  background-color: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background-color: var(--color-accent-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn-primary:active {
  background-color: var(--color-accent-dark);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  font-family: var(--font-menu);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  background-color: transparent;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-bg-white);
  transform: translateY(-2px);
}

/* Outline Button */
.btn-outline {
  font-family: var(--font-menu);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Icon Button */
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  border: none;
  background-color: var(--color-bg-white);
  color: var(--color-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: var(--color-primary);
  color: var(--color-bg-white);
  box-shadow: var(--shadow-md);
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-small);
}

.btn-lg {
  padding: var(--space-lg) var(--space-2xl);
  font-size: var(--font-size-h4);
}
```

### 2.2 Input Fields

```css
/* Text Input */
.input-text {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  width: 100%;
  transition: all var(--transition-base);
}

.input-text:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(152, 52, 33, 0.1);
}

.input-text::placeholder {
  color: var(--color-text-muted);
}

/* Input Group */
.input-group {
  margin-bottom: var(--space-lg);
}

.input-label {
  font-family: var(--font-menu);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--space-sm);
}

/* Textarea */
.input-textarea {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  width: 100%;
  min-height: 120px;
  resize: vertical;
  transition: all var(--transition-base);
}

.input-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(152, 52, 33, 0.1);
}

/* Select */
.input-select {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  width: 100%;
  cursor: pointer;
  transition: all var(--transition-base);
}

.input-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(152, 52, 33, 0.1);
}
```

### 2.3 Product Card

```css
.product-card {
  background-color: var(--color-bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  position: relative;
}

.product-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}

.product-card-image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.product-card-badge {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  background-color: var(--color-accent);
  color: var(--color-bg-white);
  font-family: var(--font-menu);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
}

.product-card-content {
  padding: var(--space-lg);
}

.product-card-title {
  font-family: var(--font-menu);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.product-card-price {
  font-family: var(--font-heading);
  font-size: var(--font-size-h3);
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.product-card-actions {
  display: flex;
  gap: var(--space-sm);
}
```

### 2.4 Testimonial Card

```css
.testimonial-card {
  background-color: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-md);
  position: relative;
}

.testimonial-card::before {
  content: '"';
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--color-secondary);
  position: absolute;
  top: var(--space-md);
  left: var(--space-lg);
  opacity: 0.3;
}

.testimonial-stars {
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.testimonial-text {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.testimonial-author-name {
  font-family: var(--font-menu);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.testimonial-author-location {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
```

### 2.5 Feature Card

```css
.feature-card {
  background-color: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border-light);
}

.feature-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-lg);
  font-size: 2rem;
}

.feature-title {
  font-family: var(--font-menu);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.feature-description {
  font-family: var(--font-body);
  font-size: var(--font-size-small);
  line-height: var(--line-height-base);
  color: var(--color-text-secondary);
}
```

### 2.6 Navigation

```css
.navbar {
  background-color: var(--color-bg-white);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  height: 48px;
}

.navbar-menu {
  display: flex;
  gap: var(--space-2xl);
  list-style: none;
}

.navbar-link {
  font-family: var(--font-menu);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

.navbar-link:hover {
  color: var(--color-primary);
}

.navbar-link.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
```

### 2.7 Footer

```css
.footer {
  background-color: var(--color-footer);
  color: var(--color-bg-white);
  padding: var(--space-4xl) var(--space-lg) var(--space-xl);
}

.footer-container {
  max-width: var(--container-xl);
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer-column-title {
  font-family: var(--font-menu);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-lg);
}

.footer-link {
  font-family: var(--font-body);
  font-size: var(--font-size-small);
  color: var(--color-bg-white);
  text-decoration: none;
  transition: color var(--transition-base);
  display: block;
  margin-bottom: var(--space-sm);
}

.footer-link:hover {
  color: var(--color-secondary);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-lg);
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--font-size-small);
  color: rgba(255, 255, 255, 0.7);
}
```

---

## 3. Layout Grid System

```css
/* Container */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.container-fluid {
  width: 100%;
  padding: 0 var(--space-lg);
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--space-lg);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Flexbox Utilities */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }
```

---

## 4. Responsive Breakpoints

```css
/* Mobile First Approach */
:root {
  --breakpoint-sm: 640px;   /* Small devices */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large screens */
}

/* Media Queries */
@media (max-width: 640px) {
  /* Mobile styles */
  :root {
    --font-size-h1: 2.5rem;   /* 40px */
    --font-size-h2: 2rem;     /* 32px */
    --font-size-h3: 1.5rem;   /* 24px */
    --section-padding-y: var(--space-2xl);
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  /* Tablet styles */
  :root {
    --font-size-h1: 3rem;     /* 48px */
    --font-size-h2: 2.25rem;  /* 36px */
  }
}
```

---

## 5. Accessibility Guidelines

### 5.1 Color Contrast

- Text on white background: Minimum 4.5:1 ratio
- Primary text (#17252a) on white: 14.3:1 (AAA)
- Primary button (#23af24) text: Ensure white text
- Links: Underline on hover for clarity

### 5.2 Focus States

```css
/* Keyboard Navigation */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to Content */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--space-md);
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

### 5.3 ARIA Labels

```html
<!-- Example Usage -->
<button aria-label="Adicionar ao carrinho">
  <svg><!-- Cart icon --></svg>
</button>

<nav aria-label="Navegação principal">
  <!-- Navigation items -->
</nav>

<img src="mesa.jpg" alt="Mesa Imperatriz Natural em madeira rústica com acabamento natural">
```

---

## 6. Animation Guidelines

### 6.1 Micro-interactions

```css
/* Hover Effects */
.interactive {
  transition: all var(--transition-base);
}

.interactive:hover {
  transform: translateY(-2px);
}

/* Button Click Feedback */
.btn:active {
  transform: scale(0.98);
}

/* Loading States */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Slide In Animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInUp 0.6s ease-out;
}
```

---

## 7. Icon System

### Recommended Icon Library: Lucide Icons or Font Awesome

```html
<!-- Example Icons Needed -->
<i class="icon-trophy"></i>       <!-- Experiência -->
<i class="icon-truck"></i>        <!-- Entrega -->
<i class="icon-palette"></i>      <!-- Customização -->
<i class="icon-credit-card"></i>  <!-- Pagamento -->
<i class="icon-star"></i>         <!-- Reviews -->
<i class="icon-shopping-cart"></i><!-- Carrinho -->
<i class="icon-phone"></i>        <!-- Telefone -->
<i class="icon-instagram"></i>    <!-- Instagram -->
<i class="icon-facebook"></i>     <!-- Facebook -->
```

---

## 8. Image Guidelines

### 8.1 Product Images

- **Aspect Ratio:** 4:3 (1200x900px recommended)
- **Format:** WebP with JPG fallback
- **Optimization:** Compress to < 200KB
- **Alt Text:** Descriptive (e.g., "Mesa Imperatriz Natural em madeira maciça com acabamento natural e pés torneados")

### 8.2 Hero Images

- **Desktop:** 1920x800px
- **Mobile:** 768x600px
- **Format:** WebP with JPG fallback
- **Optimization:** Compress to < 400KB

---

## 9. Form Validation States

```css
/* Success State */
.input-success {
  border-color: var(--color-success);
}

.input-success:focus {
  box-shadow: 0 0 0 3px rgba(35, 175, 36, 0.1);
}

/* Error State */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Error Message */
.error-message {
  font-family: var(--font-body);
  font-size: var(--font-size-small);
  color: var(--color-error);
  margin-top: var(--space-xs);
}

/* Success Message */
.success-message {
  font-family: var(--font-body);
  font-size: var(--font-size-small);
  color: var(--color-success);
  margin-top: var(--space-xs);
}
```

---

## 10. Print Styles

```css
@media print {
  .no-print {
    display: none !important;
  }

  body {
    font-size: 12pt;
    color: black;
  }

  a {
    text-decoration: underline;
  }

  .container {
    max-width: 100%;
  }
}
```

---

**Documentação completa criada em:** Novembro 2025
**Versão:** 1.0
**Última atualização:** 2025-11-09
