/**
 * Script para converter design-tokens.json em CSS Variables
 * Uso: node tokens-to-css.js
 */

const fs = require('fs');
const path = require('path');

// Ler arquivo de tokens
const tokensPath = path.join(__dirname, 'design-tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Funcao para converter objeto de tokens em CSS variables
function generateCSSVariables(obj, prefix = '') {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && value.value !== undefined) {
      // E um token final
      css += `  --${varName}: ${value.value};\n`;
    } else if (value && typeof value === 'object') {
      // E um grupo de tokens, recursao
      css += generateCSSVariables(value, varName);
    }
  }

  return css;
}

// Gerar CSS
let cssOutput = `/**
 * Design Tokens - Luis Alves Mesas
 * Generated from design-tokens.json
 * Date: ${new Date().toISOString().split('T')[0]}
 */

:root {
`;

// Processar cada categoria
for (const [category, values] of Object.entries(tokens)) {
  if (category !== '$schema') {
    cssOutput += `\n  /* ${category.toUpperCase()} */\n`;
    cssOutput += generateCSSVariables(values, category.replace(/([A-Z])/g, '-$1').toLowerCase());
  }
}

cssOutput += `}

/* ============================================
   UTILITY CLASSES
   ============================================ */

/* Text Colors */
.text-primary { color: var(--colors-primary-marrom-rustico); }
.text-secondary { color: var(--colors-secondary-bege); }
.text-accent { color: var(--colors-accent-verde); }
.text-muted { color: var(--colors-neutrals-text-muted); }

/* Background Colors */
.bg-primary { background-color: var(--colors-primary-marrom-rustico); }
.bg-secondary { background-color: var(--colors-secondary-bege); }
.bg-accent { background-color: var(--colors-accent-verde); }
.bg-white { background-color: var(--colors-neutrals-background-white); }
.bg-light { background-color: var(--colors-neutrals-background-light); }
.bg-footer { background-color: var(--colors-neutrals-footer); }

/* Typography */
.font-heading { font-family: var(--typography-fontfamilies-heading); }
.font-menu { font-family: var(--typography-fontfamilies-menu); }
.font-body { font-family: var(--typography-fontfamilies-body); }

.text-h1 { font-size: var(--typography-fontsizes-h1); }
.text-h2 { font-size: var(--typography-fontsizes-h2); }
.text-h3 { font-size: var(--typography-fontsizes-h3); }
.text-h4 { font-size: var(--typography-fontsizes-h4); }
.text-body { font-size: var(--typography-fontsizes-body); }
.text-small { font-size: var(--typography-fontsizes-small); }

.font-regular { font-weight: var(--typography-fontweights-regular); }
.font-medium { font-weight: var(--typography-fontweights-medium); }
.font-semibold { font-weight: var(--typography-fontweights-semibold); }
.font-bold { font-weight: var(--typography-fontweights-bold); }

/* Spacing */
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }

.m-xs { margin: var(--spacing-xs); }
.m-sm { margin: var(--spacing-sm); }
.m-md { margin: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }
.m-xl { margin: var(--spacing-xl); }

/* Border Radius */
.rounded-sm { border-radius: var(--borderradius-sm); }
.rounded-md { border-radius: var(--borderradius-md); }
.rounded-lg { border-radius: var(--borderradius-lg); }
.rounded-xl { border-radius: var(--borderradius-xl); }
.rounded-full { border-radius: var(--borderradius-full); }

/* Shadows */
.shadow-sm { box-shadow: var(--shadows-sm); }
.shadow-md { box-shadow: var(--shadows-md); }
.shadow-lg { box-shadow: var(--shadows-lg); }
.shadow-card { box-shadow: var(--shadows-card); }

/* Transitions */
.transition-fast { transition: all var(--transitions-fast); }
.transition-base { transition: all var(--transitions-base); }
.transition-slow { transition: all var(--transitions-slow); }

/* ============================================
   COMPONENT CLASSES
   ============================================ */

/* Button Primary */
.btn-primary {
  font-family: var(--typography-fontfamilies-menu);
  font-size: var(--typography-fontsizes-body);
  font-weight: var(--typography-fontweights-semibold);
  color: var(--colors-neutrals-background-white);
  background-color: var(--colors-accent-verde);
  border: none;
  border-radius: var(--borderradius-md);
  padding: var(--spacing-md) var(--spacing-xl);
  cursor: pointer;
  transition: var(--transitions-base);
  box-shadow: var(--shadows-md);
}

.btn-primary:hover {
  background-color: var(--colors-accent-verde-light);
  box-shadow: var(--shadows-lg);
  transform: translateY(-2px);
}

.btn-primary:active {
  background-color: var(--colors-accent-verde-dark);
  transform: translateY(0);
}

/* Button Secondary */
.btn-secondary {
  font-family: var(--typography-fontfamilies-menu);
  font-size: var(--typography-fontsizes-body);
  font-weight: var(--typography-fontweights-semibold);
  color: var(--colors-primary-marrom-rustico);
  background-color: transparent;
  border: 2px solid var(--colors-primary-marrom-rustico);
  border-radius: var(--borderradius-md);
  padding: var(--spacing-md) var(--spacing-xl);
  cursor: pointer;
  transition: var(--transitions-base);
}

.btn-secondary:hover {
  background-color: var(--colors-primary-marrom-rustico);
  color: var(--colors-neutrals-background-white);
  transform: translateY(-2px);
}

/* Product Card */
.product-card {
  background-color: var(--colors-neutrals-background-white);
  border-radius: var(--borderradius-lg);
  overflow: hidden;
  box-shadow: var(--shadows-card);
  transition: var(--transitions-base);
}

.product-card:hover {
  box-shadow: var(--shadows-cardhover);
  transform: translateY(-4px);
}

/* Container */
.container {
  width: 100%;
  max-width: var(--containers-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Section Padding */
.section {
  padding: var(--spacing-4xl) var(--spacing-lg);
}

/* ============================================
   RESPONSIVE UTILITIES
   ============================================ */

/* Mobile: max 767px */
@media (max-width: 767px) {
  :root {
    --typography-fontsizes-h1: 2.5rem;
    --typography-fontsizes-h2: 2rem;
    --typography-fontsizes-h3: 1.5rem;
  }

  .section {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
    --typography-fontsizes-h1: 3rem;
    --typography-fontsizes-h2: 2.25rem;
  }
}
`;

// Salvar arquivo CSS
const cssPath = path.join(__dirname, 'design-tokens.css');
fs.writeFileSync(cssPath, cssOutput, 'utf8');

console.log('✅ CSS Variables geradas com sucesso!');
console.log(`📄 Arquivo criado: ${cssPath}`);
console.log('');
console.log('Para usar em seu projeto:');
console.log('  <link rel="stylesheet" href="design-tokens.css">');
console.log('');
console.log('Exemplo de uso:');
console.log('  <button class="btn-primary">Solicitar Orçamento</button>');
console.log('  <div class="product-card">...</div>');
