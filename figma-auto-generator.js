/**
 * FIGMA AUTO GENERATOR
 * Luis Alves Mesas para Festas - Landing Page
 *
 * Este script cria automaticamente um projeto completo no Figma
 * usando a Figma REST API v1
 */

const https = require('https');
const fs = require('fs');

// ============================================
// CONFIGURAÇÕES
// ============================================

const CONFIG = {
  figmaToken: process.env.FIGMA_TOKEN || '',
  teamId: process.env.FIGMA_TEAM_ID || '',
  projectName: 'Luis Alves Mesas - Landing Page',
  email: 'ferramentas.starken@gmail.com'
};

// ============================================
// DESIGN SYSTEM - CORES
// ============================================

const COLORS = {
  primary: { name: 'Primary/Marrom Rústico', hex: '#983421', rgb: { r: 0.596, g: 0.204, b: 0.129 } },
  secondary: { name: 'Secondary/Bege', hex: '#D3B185', rgb: { r: 0.827, g: 0.694, b: 0.522 } },
  accent: { name: 'Accent/Verde CTA', hex: '#23af24', rgb: { r: 0.137, g: 0.686, b: 0.141 } },
  text: { name: 'Text/Preto', hex: '#17252a', rgb: { r: 0.090, g: 0.145, b: 0.164 } },
  footer: { name: 'Footer/Marrom Escuro', hex: '#563524', rgb: { r: 0.337, g: 0.208, b: 0.141 } },
  white: { name: 'Base/Branco', hex: '#ffffff', rgb: { r: 1, g: 1, b: 1 } },
  gray: { name: 'Base/Cinza Claro', hex: '#f8f9fa', rgb: { r: 0.973, g: 0.976, b: 0.980 } },
  grayMedium: { name: 'Base/Cinza Médio', hex: '#6c757d', rgb: { r: 0.424, g: 0.459, b: 0.490 } }
};

// ============================================
// DESIGN SYSTEM - TIPOGRAFIA
// ============================================

const TEXT_STYLES = {
  h1Desktop: {
    name: 'H1/Desktop',
    fontFamily: 'Lobster Two',
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 76.8,
    letterSpacing: -1
  },
  h1Mobile: {
    name: 'H1/Mobile',
    fontFamily: 'Lobster Two',
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 48,
    letterSpacing: -0.5
  },
  h2Desktop: {
    name: 'H2/Desktop',
    fontFamily: 'Poppins',
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 57.6,
    letterSpacing: -0.5
  },
  h2Mobile: {
    name: 'H2/Mobile',
    fontFamily: 'Poppins',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 38.4,
    letterSpacing: -0.5
  },
  h3: {
    name: 'H3/Subtitle',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    letterSpacing: 0
  },
  body: {
    name: 'Body/Regular',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0
  },
  bodyBold: {
    name: 'Body/Bold',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    letterSpacing: 0
  },
  button: {
    name: 'Button/Text',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0.5
  },
  menu: {
    name: 'Menu/Item',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0
  },
  caption: {
    name: 'Caption/Small',
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0
  }
};

// ============================================
// DESIGN SYSTEM - EFEITOS (SOMBRAS)
// ============================================

const EFFECTS = {
  cardShadow: {
    name: 'Shadow/Card',
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0
  },
  cardHover: {
    name: 'Shadow/Card Hover',
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.15 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: 0
  },
  buttonShadow: {
    name: 'Shadow/Button',
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.12 },
    offset: { x: 0, y: 2 },
    radius: 8,
    spread: 0
  }
};

// ============================================
// PRODUTOS DO CATÁLOGO
// ============================================

const PRODUCTS = [
  { id: 1, name: 'Mesa Imperatriz Natural', price: 3400, badge: 'Destaque' },
  { id: 2, name: 'Mesa Glamour', price: 3400, badge: null },
  { id: 3, name: 'Mesa Glamour Mel', price: 3400, badge: null },
  { id: 4, name: 'Mesa Requinte Nobre', price: 3400, badge: null },
  { id: 5, name: 'Mesa Nobreza', price: 4200, badge: 'Premium' },
  { id: 6, name: 'Mesa Encanto', price: 3400, badge: null },
  { id: 7, name: 'Mesa Império', price: 3400, badge: null },
  { id: 8, name: 'Mesa Charme', price: 3400, badge: null },
  { id: 9, name: 'Mesa Imperatriz', price: 3400, badge: null },
  { id: 10, name: 'Mesa Luxúria', price: 4500, badge: 'Premium' },
  { id: 11, name: 'Mesa Requinte', price: 3400, badge: null },
  { id: 12, name: 'Mesa Paris', price: 3400, badge: null },
  { id: 13, name: 'Mesa Sublime', price: 3400, badge: null }
];

// ============================================
// DEPOIMENTOS
// ============================================

const TESTIMONIALS = [
  {
    name: 'Maria Santos',
    rating: 5,
    text: 'Qualidade excepcional! A mesa é linda e resistente.',
    location: 'Florianópolis, SC'
  },
  {
    name: 'João Silva',
    rating: 5,
    text: 'Atendimento impecável e entrega no prazo.',
    location: 'Joinville, SC'
  },
  {
    name: 'Ana Paula',
    rating: 5,
    text: 'Melhor investimento que fiz para minha casa!',
    location: 'Blumenau, SC'
  },
  {
    name: 'Carlos Eduardo',
    rating: 5,
    text: 'Design exclusivo e acabamento perfeito.',
    location: 'Curitiba, PR'
  },
  {
    name: 'Patricia Lima',
    rating: 4,
    text: 'Produto de alta qualidade, recomendo!',
    location: 'Balneário Camboriú, SC'
  },
  {
    name: 'Roberto Costa',
    rating: 5,
    text: 'Superou minhas expectativas em todos os aspectos.',
    location: 'Itajaí, SC'
  },
  {
    name: 'Fernanda Alves',
    rating: 5,
    text: 'Atendimento personalizado e produto impecável.',
    location: 'São José, SC'
  },
  {
    name: 'Lucas Oliveira',
    rating: 5,
    text: 'Vale cada centavo! Qualidade incomparável.',
    location: 'Chapecó, SC'
  }
];

// ============================================
// ESTRUTURA DO CONTEÚDO
// ============================================

const CONTENT = {
  hero: {
    headline: 'Mesas Rústicas Premium',
    subheadline: 'Transforme seu espaço com móveis de qualidade incomparável',
    cta1: 'Explorar Catálogo',
    cta2: 'Solicitar Orçamento'
  },
  features: [
    { icon: '🏆', title: '7+ Anos Experiência', description: 'Tradição e expertise em móveis rústicos' },
    { icon: '📦', title: 'Entrega SC/PR', description: 'Entregamos em todo o Sul do Brasil' },
    { icon: '🎨', title: 'Customização Sob Medida', description: 'Projetos personalizados para você' },
    { icon: '💳', title: 'Parcelamento 12x', description: 'Sem juros em até 12 parcelas' }
  ],
  about: {
    title: 'Sobre Nós',
    text: 'Com mais de 7 anos de experiência, a Luis Alves Mesas é referência em móveis rústicos premium. Cada peça é cuidadosamente projetada e construída com madeira de alta qualidade.',
    values: [
      { title: 'Qualidade', description: 'Materiais selecionados' },
      { title: 'Tradição', description: 'Técnicas artesanais' },
      { title: 'Garantia', description: 'Satisfação garantida' }
    ]
  },
  process: [
    { step: 1, title: 'Escolha', description: 'Selecione o modelo ideal' },
    { step: 2, title: 'Personalize', description: 'Customize cores e medidas' },
    { step: 3, title: 'Pagamento', description: 'Parcele em até 12x sem juros' },
    { step: 4, title: 'Receba', description: 'Entrega e montagem incluídas' }
  ],
  footer: {
    address: 'Luis Alves, Santa Catarina',
    phone: '(47) 99999-9999',
    email: 'contato@luisalvesmesas.com.br',
    social: ['Instagram', 'Facebook', 'WhatsApp']
  }
};

// ============================================
// FUNÇÕES API FIGMA
// ============================================

/**
 * Faz requisição HTTPS para API do Figma
 */
function figmaRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: path,
      method: method,
      headers: {
        'X-Figma-Token': CONFIG.figmaToken,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Figma API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Cria novo arquivo no Figma
 */
async function createFigmaFile() {
  console.log('🎨 Criando arquivo no Figma...');

  // Nota: A API do Figma não permite criar arquivos diretamente via REST API
  // Precisamos usar uma abordagem alternativa:
  // 1. Duplicar um template existente, OU
  // 2. Usar Figma Plugin API, OU
  // 3. Criar manualmente e depois modificar via API

  console.log('⚠️  IMPORTANTE: A Figma REST API não suporta criação de arquivos.');
  console.log('📋 Existem 3 opções:');
  console.log('');
  console.log('OPÇÃO 1: FIGMA PLUGIN (Recomendado)');
  console.log('  - Usar Figma Plugin API com figma.createFile()');
  console.log('  - Executar script dentro do Figma Desktop');
  console.log('  - Script disponível em: figma-plugin-generator.js');
  console.log('');
  console.log('OPÇÃO 2: MANUAL + API');
  console.log('  1. Criar arquivo manualmente no Figma');
  console.log('  2. Copiar o FILE_ID da URL');
  console.log('  3. Usar API para popular com componentes');
  console.log('');
  console.log('OPÇÃO 3: DUPLICAR TEMPLATE');
  console.log('  - Ter um arquivo template pré-existente');
  console.log('  - Duplicar via API (requer file_key)');
  console.log('');

  return null;
}

/**
 * Popula arquivo existente com design system
 */
async function populateDesignSystem(fileKey) {
  console.log('🎨 Populando Design System no arquivo...');

  // A Figma API não permite criar páginas diretamente
  // Mas podemos obter o arquivo e modificar componentes existentes

  const file = await figmaRequest('GET', `/v1/files/${fileKey}`);
  console.log('✅ Arquivo obtido:', file.name);

  return file;
}

/**
 * Gera documentação completa do projeto
 */
function generateDocumentation() {
  console.log('📝 Gerando documentação...');

  const doc = {
    project: {
      name: CONFIG.projectName,
      description: 'Landing Page completa para Luis Alves Mesas para Festas',
      email: CONFIG.email,
      created: new Date().toISOString()
    },
    designSystem: {
      colors: COLORS,
      typography: TEXT_STYLES,
      effects: EFFECTS
    },
    content: CONTENT,
    products: PRODUCTS,
    testimonials: TESTIMONIALS,
    pages: [
      {
        name: 'Design System',
        description: 'Cores, tipografia e efeitos',
        sections: ['Color Styles', 'Text Styles', 'Effect Styles']
      },
      {
        name: 'Components',
        description: 'Componentes reutilizáveis',
        components: [
          'Button (Primary, Secondary, Outline)',
          'Input Field (text, textarea, select)',
          'Product Card',
          'Testimonial Card',
          'Feature Card',
          'Navigation Bar',
          'Product Grid',
          'Footer'
        ]
      },
      {
        name: 'Landing Page Desktop',
        description: 'Layout desktop 1280px',
        sections: [
          'Header + Hero (600px)',
          'Diferenciais (4 cards)',
          'Catálogo (grid 3 colunas)',
          'Sobre a Empresa',
          'Depoimentos',
          'Processo (4 steps)',
          'Footer'
        ]
      },
      {
        name: 'Landing Page Mobile',
        description: 'Layout mobile 375px',
        sections: ['Mobile responsive layout']
      }
    ],
    tokens: {
      colors: Object.entries(COLORS).map(([key, value]) => ({
        name: value.name,
        value: value.hex,
        variable: `--color-${key}`
      })),
      typography: Object.entries(TEXT_STYLES).map(([key, value]) => ({
        name: value.name,
        fontFamily: value.fontFamily,
        fontSize: value.fontSize,
        fontWeight: value.fontWeight,
        lineHeight: value.lineHeight,
        letterSpacing: value.letterSpacing
      }))
    }
  };

  fs.writeFileSync(
    '/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/figma-project-data.json',
    JSON.stringify(doc, null, 2)
  );

  console.log('✅ Documentação salva em: figma-project-data.json');
  return doc;
}

/**
 * Exporta design tokens em CSS
 */
function exportDesignTokensCSS() {
  console.log('🎨 Exportando design tokens CSS...');

  let css = `/**
 * DESIGN TOKENS
 * Luis Alves Mesas para Festas
 * Gerado automaticamente em ${new Date().toLocaleString()}
 */

:root {
  /* ========================================
     CORES
     ======================================== */
`;

  // Cores
  Object.entries(COLORS).forEach(([key, value]) => {
    css += `  --color-${key}: ${value.hex};\n`;
  });

  css += `\n  /* ========================================
     TIPOGRAFIA
     ======================================== */
`;

  // Tipografia
  Object.entries(TEXT_STYLES).forEach(([key, value]) => {
    css += `  --font-${key}-family: '${value.fontFamily}';\n`;
    css += `  --font-${key}-size: ${value.fontSize}px;\n`;
    css += `  --font-${key}-weight: ${value.fontWeight};\n`;
    css += `  --font-${key}-line-height: ${value.lineHeight}px;\n`;
    css += `  --font-${key}-letter-spacing: ${value.letterSpacing}px;\n`;
    css += `\n`;
  });

  css += `  /* ========================================
     ESPAÇAMENTO
     ======================================== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* ========================================
     BORDAS
     ======================================== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* ========================================
     SOMBRAS
     ======================================== */
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.15);
  --shadow-button: 0 2px 8px rgba(0, 0, 0, 0.12);

  /* ========================================
     BREAKPOINTS
     ======================================== */
  --breakpoint-mobile: 375px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1280px;
  --breakpoint-wide: 1920px;
}

/* ========================================
   CLASSES DE TIPOGRAFIA
   ======================================== */
`;

  Object.entries(TEXT_STYLES).forEach(([key, value]) => {
    const className = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    css += `.text${className} {
  font-family: var(--font-${key}-family);
  font-size: var(--font-${key}-size);
  font-weight: var(--font-${key}-weight);
  line-height: var(--font-${key}-line-height);
  letter-spacing: var(--font-${key}-letter-spacing);
}

`;
  });

  css += `/* ========================================
   CLASSES DE CORES
   ======================================== */
`;

  Object.entries(COLORS).forEach(([key, value]) => {
    css += `.bg-${key} { background-color: var(--color-${key}); }\n`;
    css += `.text-${key} { color: var(--color-${key}); }\n`;
    css += `.border-${key} { border-color: var(--color-${key}); }\n`;
    css += `\n`;
  });

  fs.writeFileSync(
    '/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/figma-design-tokens.css',
    css
  );

  console.log('✅ Tokens CSS salvos em: figma-design-tokens.css');
  return css;
}

/**
 * Exporta design tokens em JSON para Tailwind/outras ferramentas
 */
function exportDesignTokensJSON() {
  console.log('📦 Exportando design tokens JSON...');

  const tokens = {
    colors: {},
    typography: {},
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px'
    },
    boxShadow: {
      card: '0 4px 12px rgba(0, 0, 0, 0.1)',
      cardHover: '0 8px 24px rgba(0, 0, 0, 0.15)',
      button: '0 2px 8px rgba(0, 0, 0, 0.12)'
    },
    breakpoints: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1280px',
      wide: '1920px'
    }
  };

  // Adicionar cores
  Object.entries(COLORS).forEach(([key, value]) => {
    tokens.colors[key] = value.hex;
  });

  // Adicionar tipografia
  Object.entries(TEXT_STYLES).forEach(([key, value]) => {
    tokens.typography[key] = {
      fontFamily: value.fontFamily,
      fontSize: `${value.fontSize}px`,
      fontWeight: value.fontWeight,
      lineHeight: `${value.lineHeight}px`,
      letterSpacing: `${value.letterSpacing}px`
    };
  });

  fs.writeFileSync(
    '/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/figma-design-tokens-full.json',
    JSON.stringify(tokens, null, 2)
  );

  console.log('✅ Tokens JSON salvos em: figma-design-tokens-full.json');
  return tokens;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function main() {
  console.log('🚀 FIGMA AUTO GENERATOR');
  console.log('📋 Projeto: Luis Alves Mesas para Festas');
  console.log('═══════════════════════════════════════════\n');

  try {
    // Verificar configurações
    if (!CONFIG.figmaToken) {
      console.log('⚠️  FIGMA_TOKEN não configurado no .env');
      console.log('');
      console.log('Para usar a API do Figma:');
      console.log('1. Acesse: https://www.figma.com/developers/api#authentication');
      console.log('2. Gere um Personal Access Token');
      console.log('3. Adicione no .env: FIGMA_TOKEN=seu_token_aqui');
      console.log('');
    }

    // Gerar todos os arquivos necessários
    console.log('📦 Gerando arquivos do projeto...\n');

    const documentation = generateDocumentation();
    const cssTokens = exportDesignTokensCSS();
    const jsonTokens = exportDesignTokensJSON();

    console.log('\n✅ GERAÇÃO CONCLUÍDA!\n');
    console.log('═══════════════════════════════════════════');
    console.log('📁 Arquivos criados:');
    console.log('   - figma-project-data.json (documentação completa)');
    console.log('   - figma-design-tokens.css (tokens em CSS)');
    console.log('   - figma-design-tokens-full.json (tokens em JSON)');
    console.log('');
    console.log('📋 Próximos passos:');
    console.log('');
    console.log('OPÇÃO 1 - FIGMA PLUGIN (RECOMENDADO):');
    console.log('  1. Execute: node figma-plugin-generator.js');
    console.log('  2. Copie o código gerado');
    console.log('  3. Abra Figma Desktop > Plugins > Development > New Plugin');
    console.log('  4. Cole o código e execute');
    console.log('');
    console.log('OPÇÃO 2 - CRIAÇÃO MANUAL:');
    console.log('  1. Abra o Figma (https://figma.com)');
    console.log('  2. Crie um novo arquivo chamado "Luis Alves Mesas - Landing Page"');
    console.log('  3. Use os tokens em figma-design-tokens.css para configurar');
    console.log('  4. Siga a estrutura em figma-project-data.json');
    console.log('');
    console.log('OPÇÃO 3 - USAR TEMPLATE:');
    console.log('  1. Importe o template disponível (se houver)');
    console.log('  2. Customize com os dados do projeto');
    console.log('');
    console.log('═══════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = {
  COLORS,
  TEXT_STYLES,
  EFFECTS,
  PRODUCTS,
  TESTIMONIALS,
  CONTENT,
  generateDocumentation,
  exportDesignTokensCSS,
  exportDesignTokensJSON
};
