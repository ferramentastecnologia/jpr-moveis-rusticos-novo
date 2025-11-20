/**
 * FIGMA PLUGIN SCRIPT GENERATOR
 * Luis Alves Mesas para Festas - Landing Page
 *
 * Este script gera o código do plugin Figma que cria
 * automaticamente todo o projeto dentro do Figma Desktop
 */

const fs = require('fs');

// ============================================
// GERADOR DE PLUGIN CODE
// ============================================

function generatePluginCode() {
  const pluginCode = `
// ============================================
// FIGMA PLUGIN - AUTO GENERATOR
// Luis Alves Mesas para Festas
// ============================================

// CONFIGURAÇÕES
const CONFIG = {
  projectName: 'Luis Alves Mesas - Landing Page',
  desktop: { width: 1280, height: 6000 },
  mobile: { width: 375, height: 5000 }
};

// CORES
const COLORS = {
  primary: { r: 0.596, g: 0.204, b: 0.129 },      // #983421
  secondary: { r: 0.827, g: 0.694, b: 0.522 },    // #D3B185
  accent: { r: 0.137, g: 0.686, b: 0.141 },       // #23af24
  text: { r: 0.090, g: 0.145, b: 0.164 },         // #17252a
  footer: { r: 0.337, g: 0.208, b: 0.141 },       // #563524
  white: { r: 1, g: 1, b: 1 },                    // #ffffff
  gray: { r: 0.973, g: 0.976, b: 0.980 },         // #f8f9fa
  grayMedium: { r: 0.424, g: 0.459, b: 0.490 }    // #6c757d
};

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function main() {
  console.log('🚀 Iniciando criação automática do projeto...');

  // Criar páginas
  const designSystemPage = figma.createPage();
  designSystemPage.name = '01 - Design System';

  const componentsPage = figma.createPage();
  componentsPage.name = '02 - Components';

  const desktopPage = figma.createPage();
  desktopPage.name = '03 - Landing Page Desktop';

  const mobilePage = figma.createPage();
  mobilePage.name = '04 - Landing Page Mobile';

  // ============================================
  // PAGE 1: DESIGN SYSTEM
  // ============================================
  figma.currentPage = designSystemPage;

  // Criar seção de cores
  const colorFrame = figma.createFrame();
  colorFrame.name = 'Color Styles';
  colorFrame.resize(1200, 400);
  colorFrame.x = 0;
  colorFrame.y = 0;
  colorFrame.fills = [{ type: 'SOLID', color: COLORS.white }];

  let colorX = 40;
  const colorData = [
    { name: 'Primary/Marrom Rústico', color: COLORS.primary, hex: '#983421' },
    { name: 'Secondary/Bege', color: COLORS.secondary, hex: '#D3B185' },
    { name: 'Accent/Verde CTA', color: COLORS.accent, hex: '#23af24' },
    { name: 'Text/Preto', color: COLORS.text, hex: '#17252a' },
    { name: 'Footer/Marrom Escuro', color: COLORS.footer, hex: '#563524' },
    { name: 'Base/Branco', color: COLORS.white, hex: '#ffffff' },
    { name: 'Base/Cinza Claro', color: COLORS.gray, hex: '#f8f9fa' },
    { name: 'Base/Cinza Médio', color: COLORS.grayMedium, hex: '#6c757d' }
  ];

  for (const { name, color, hex } of colorData) {
    const colorBox = figma.createRectangle();
    colorBox.resize(120, 120);
    colorBox.x = colorX;
    colorBox.y = 80;
    colorBox.fills = [{ type: 'SOLID', color }];
    colorBox.cornerRadius = 12;
    colorFrame.appendChild(colorBox);

    const colorLabel = figma.createText();
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    colorLabel.characters = name.split('/')[1] || name;
    colorLabel.fontSize = 14;
    colorLabel.x = colorX;
    colorLabel.y = 220;
    colorLabel.fills = [{ type: 'SOLID', color: COLORS.text }];
    colorFrame.appendChild(colorLabel);

    const colorHex = figma.createText();
    colorHex.characters = hex;
    colorHex.fontSize = 12;
    colorHex.x = colorX;
    colorHex.y = 245;
    colorHex.fills = [{ type: 'SOLID', color: COLORS.grayMedium }];
    colorFrame.appendChild(colorHex);

    colorX += 140;
  }

  // Criar seção de tipografia
  const typoFrame = figma.createFrame();
  typoFrame.name = 'Text Styles';
  typoFrame.resize(1200, 800);
  typoFrame.x = 0;
  typoFrame.y = 450;
  typoFrame.fills = [{ type: 'SOLID', color: COLORS.white }];

  const textStyles = [
    { name: 'H1/Desktop', family: 'Inter', size: 64, weight: 'Bold' },
    { name: 'H1/Mobile', family: 'Inter', size: 40, weight: 'Bold' },
    { name: 'H2/Desktop', family: 'Inter', size: 48, weight: 'Bold' },
    { name: 'H2/Mobile', family: 'Inter', size: 32, weight: 'Bold' },
    { name: 'H3/Subtitle', family: 'Inter', size: 24, weight: 'SemiBold' },
    { name: 'Body/Regular', family: 'Inter', size: 16, weight: 'Regular' },
    { name: 'Body/Bold', family: 'Inter', size: 16, weight: 'Bold' },
    { name: 'Button/Text', family: 'Inter', size: 18, weight: 'SemiBold' },
    { name: 'Menu/Item', family: 'Inter', size: 16, weight: 'Medium' },
    { name: 'Caption/Small', family: 'Inter', size: 14, weight: 'Regular' }
  ];

  let typoY = 80;
  for (const style of textStyles) {
    await figma.loadFontAsync({ family: style.family, style: style.weight });

    const text = figma.createText();
    text.characters = style.name + ' - ' + style.size + 'px';
    text.fontSize = style.size;
    text.fontName = { family: style.family, style: style.weight };
    text.x = 40;
    text.y = typoY;
    text.fills = [{ type: 'SOLID', color: COLORS.text }];
    typoFrame.appendChild(text);

    typoY += style.size + 20;
  }

  // ============================================
  // PAGE 2: COMPONENTS
  // ============================================
  figma.currentPage = componentsPage;

  // Criar componente de botão
  const buttonComponent = figma.createComponent();
  buttonComponent.name = 'Button/Primary';
  buttonComponent.resize(200, 56);

  const buttonBg = figma.createRectangle();
  buttonBg.resize(200, 56);
  buttonBg.fills = [{ type: 'SOLID', color: COLORS.accent }];
  buttonBg.cornerRadius = 8;
  buttonComponent.appendChild(buttonBg);

  await figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' });
  const buttonText = figma.createText();
  buttonText.characters = 'Button Text';
  buttonText.fontSize = 18;
  buttonText.fontName = { family: 'Inter', style: 'SemiBold' };
  buttonText.fills = [{ type: 'SOLID', color: COLORS.white }];
  buttonText.x = (200 - buttonText.width) / 2;
  buttonText.y = (56 - buttonText.height) / 2;
  buttonComponent.appendChild(buttonText);

  buttonComponent.x = 40;
  buttonComponent.y = 40;

  // Criar componente de Card de Produto
  const productCard = figma.createComponent();
  productCard.name = 'Product Card';
  productCard.resize(380, 480);
  productCard.x = 280;
  productCard.y = 40;

  const cardBg = figma.createRectangle();
  cardBg.resize(380, 480);
  cardBg.fills = [{ type: 'SOLID', color: COLORS.white }];
  cardBg.cornerRadius = 12;
  cardBg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    visible: true,
    blendMode: 'NORMAL'
  }];
  productCard.appendChild(cardBg);

  const cardImage = figma.createRectangle();
  cardImage.resize(340, 280);
  cardImage.x = 20;
  cardImage.y = 20;
  cardImage.fills = [{ type: 'SOLID', color: COLORS.gray }];
  cardImage.cornerRadius = 8;
  productCard.appendChild(cardImage);

  const cardTitle = figma.createText();
  cardTitle.characters = 'Mesa Imperatriz';
  cardTitle.fontSize = 20;
  cardTitle.fontName = { family: 'Inter', style: 'Bold' };
  cardTitle.fills = [{ type: 'SOLID', color: COLORS.text }];
  cardTitle.x = 20;
  cardTitle.y = 320;
  productCard.appendChild(cardTitle);

  const cardPrice = figma.createText();
  cardPrice.characters = 'R$ 3.400';
  cardPrice.fontSize = 24;
  cardPrice.fontName = { family: 'Inter', style: 'Bold' };
  cardPrice.fills = [{ type: 'SOLID', color: COLORS.primary }];
  cardPrice.x = 20;
  cardPrice.y = 360;
  productCard.appendChild(cardPrice);

  const cardButton = figma.createRectangle();
  cardButton.resize(340, 48);
  cardButton.x = 20;
  cardButton.y = 412;
  cardButton.fills = [{ type: 'SOLID', color: COLORS.accent }];
  cardButton.cornerRadius = 8;
  productCard.appendChild(cardButton);

  const cardButtonText = figma.createText();
  cardButtonText.characters = 'Ver Detalhes';
  cardButtonText.fontSize = 16;
  cardButtonText.fontName = { family: 'Inter', style: 'SemiBold' };
  cardButtonText.fills = [{ type: 'SOLID', color: COLORS.white }];
  cardButtonText.x = 20 + (340 - cardButtonText.width) / 2;
  cardButtonText.y = 424;
  productCard.appendChild(cardButtonText);

  // Criar componente de Card de Depoimento
  const testimonialCard = figma.createComponent();
  testimonialCard.name = 'Testimonial Card';
  testimonialCard.resize(360, 200);
  testimonialCard.x = 700;
  testimonialCard.y = 40;

  const testBg = figma.createRectangle();
  testBg.resize(360, 200);
  testBg.fills = [{ type: 'SOLID', color: COLORS.white }];
  testBg.cornerRadius = 12;
  testBg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true,
    blendMode: 'NORMAL'
  }];
  testimonialCard.appendChild(testBg);

  const testStars = figma.createText();
  testStars.characters = '★★★★★';
  testStars.fontSize = 20;
  testStars.fontName = { family: 'Inter', style: 'Regular' };
  testStars.fills = [{ type: 'SOLID', color: { r: 1, g: 0.8, b: 0 } }];
  testStars.x = 24;
  testStars.y = 24;
  testimonialCard.appendChild(testStars);

  const testText = figma.createText();
  testText.characters = 'Qualidade excepcional! A mesa é linda e resistente.';
  testText.fontSize = 14;
  testText.fontName = { family: 'Inter', style: 'Regular' };
  testText.fills = [{ type: 'SOLID', color: COLORS.text }];
  testText.x = 24;
  testText.y = 60;
  testText.resize(312, 60);
  testimonialCard.appendChild(testText);

  const testName = figma.createText();
  testName.characters = 'Maria Santos';
  testName.fontSize = 14;
  testName.fontName = { family: 'Inter', style: 'Bold' };
  testName.fills = [{ type: 'SOLID', color: COLORS.text }];
  testName.x = 24;
  testName.y = 150;
  testimonialCard.appendChild(testName);

  const testLocation = figma.createText();
  testLocation.characters = 'Florianópolis, SC';
  testLocation.fontSize = 12;
  testLocation.fontName = { family: 'Inter', style: 'Regular' };
  testLocation.fills = [{ type: 'SOLID', color: COLORS.grayMedium }];
  testLocation.x = 24;
  testLocation.y = 170;
  testimonialCard.appendChild(testLocation);

  // ============================================
  // PAGE 3: LANDING PAGE DESKTOP
  // ============================================
  figma.currentPage = desktopPage;

  const desktopFrame = figma.createFrame();
  desktopFrame.name = 'Desktop - 1280px';
  desktopFrame.resize(CONFIG.desktop.width, CONFIG.desktop.height);
  desktopFrame.fills = [{ type: 'SOLID', color: COLORS.white }];

  // Hero Section
  const heroSection = figma.createFrame();
  heroSection.name = 'Hero';
  heroSection.resize(1280, 600);
  heroSection.x = 0;
  heroSection.y = 0;
  heroSection.fills = [{ type: 'SOLID', color: COLORS.secondary }];
  desktopFrame.appendChild(heroSection);

  const heroTitle = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  heroTitle.characters = 'Mesas Rústicas Premium';
  heroTitle.fontSize = 64;
  heroTitle.fontName = { family: 'Inter', style: 'Bold' };
  heroTitle.fills = [{ type: 'SOLID', color: COLORS.text }];
  heroTitle.x = (1280 - heroTitle.width) / 2;
  heroTitle.y = 200;
  heroSection.appendChild(heroTitle);

  const heroSubtitle = figma.createText();
  heroSubtitle.characters = 'Transforme seu espaço com móveis de qualidade incomparável';
  heroSubtitle.fontSize = 24;
  heroSubtitle.fontName = { family: 'Inter', style: 'Regular' };
  heroSubtitle.fills = [{ type: 'SOLID', color: COLORS.text }];
  heroSubtitle.x = (1280 - heroSubtitle.width) / 2;
  heroSubtitle.y = 290;
  heroSection.appendChild(heroSubtitle);

  // CTAs
  const cta1 = figma.createRectangle();
  cta1.resize(240, 56);
  cta1.x = 440;
  cta1.y = 380;
  cta1.fills = [{ type: 'SOLID', color: COLORS.accent }];
  cta1.cornerRadius = 8;
  heroSection.appendChild(cta1);

  const cta1Text = figma.createText();
  cta1Text.characters = 'Explorar Catálogo';
  cta1Text.fontSize = 18;
  cta1Text.fontName = { family: 'Inter', style: 'SemiBold' };
  cta1Text.fills = [{ type: 'SOLID', color: COLORS.white }];
  cta1Text.x = 440 + (240 - cta1Text.width) / 2;
  cta1Text.y = 396;
  heroSection.appendChild(cta1Text);

  // Diferenciais Section
  const featuresSection = figma.createFrame();
  featuresSection.name = 'Diferenciais';
  featuresSection.resize(1280, 300);
  featuresSection.x = 0;
  featuresSection.y = 600;
  featuresSection.fills = [{ type: 'SOLID', color: COLORS.white }];
  desktopFrame.appendChild(featuresSection);

  const features = [
    { icon: '🏆', title: '7+ Anos Experiência', desc: 'Tradição e expertise' },
    { icon: '📦', title: 'Entrega SC/PR', desc: 'Todo o Sul do Brasil' },
    { icon: '🎨', title: 'Customização', desc: 'Sob medida para você' },
    { icon: '💳', title: 'Parcelamento 12x', desc: 'Sem juros' }
  ];

  let featureX = 80;
  for (const feature of features) {
    const featureCard = figma.createFrame();
    featureCard.resize(260, 220);
    featureCard.x = featureX;
    featureCard.y = 40;
    featureCard.fills = [{ type: 'SOLID', color: COLORS.gray }];
    featureCard.cornerRadius = 12;
    featuresSection.appendChild(featureCard);

    const icon = figma.createText();
    icon.characters = feature.icon;
    icon.fontSize = 48;
    icon.x = (260 - 48) / 2;
    icon.y = 40;
    featureCard.appendChild(icon);

    const title = figma.createText();
    title.characters = feature.title;
    title.fontSize = 18;
    title.fontName = { family: 'Inter', style: 'Bold' };
    title.fills = [{ type: 'SOLID', color: COLORS.text }];
    title.x = (260 - title.width) / 2;
    title.y = 120;
    featureCard.appendChild(title);

    const desc = figma.createText();
    desc.characters = feature.desc;
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };
    desc.fills = [{ type: 'SOLID', color: COLORS.grayMedium }];
    desc.x = (260 - desc.width) / 2;
    desc.y = 155;
    featureCard.appendChild(desc);

    featureX += 290;
  }

  // Catálogo Section Title
  const catalogTitle = figma.createText();
  catalogTitle.characters = 'Nosso Catálogo';
  catalogTitle.fontSize = 48;
  catalogTitle.fontName = { family: 'Inter', style: 'Bold' };
  catalogTitle.fills = [{ type: 'SOLID', color: COLORS.text }];
  catalogTitle.x = (1280 - catalogTitle.width) / 2;
  catalogTitle.y = 980;
  desktopFrame.appendChild(catalogTitle);

  // Nota sobre produtos (grid seria muito grande para criar aqui)
  const catalogNote = figma.createText();
  catalogNote.characters = '[Grid de 13 produtos - 3 colunas]\\nUsar instâncias do componente Product Card';
  catalogNote.fontSize = 16;
  catalogNote.fontName = { family: 'Inter', style: 'Regular' };
  catalogNote.fills = [{ type: 'SOLID', color: COLORS.grayMedium }];
  catalogNote.x = 80;
  catalogNote.y = 1080;
  desktopFrame.appendChild(catalogNote);

  // ============================================
  // PAGE 4: LANDING PAGE MOBILE
  // ============================================
  figma.currentPage = mobilePage;

  const mobileFrame = figma.createFrame();
  mobileFrame.name = 'Mobile - 375px';
  mobileFrame.resize(CONFIG.mobile.width, CONFIG.mobile.height);
  mobileFrame.fills = [{ type: 'SOLID', color: COLORS.white }];

  // Hero Mobile
  const heroMobile = figma.createFrame();
  heroMobile.name = 'Hero Mobile';
  heroMobile.resize(375, 500);
  heroMobile.x = 0;
  heroMobile.y = 0;
  heroMobile.fills = [{ type: 'SOLID', color: COLORS.secondary }];
  mobileFrame.appendChild(heroMobile);

  const heroTitleMobile = figma.createText();
  heroTitleMobile.characters = 'Mesas Rústicas\\nPremium';
  heroTitleMobile.fontSize = 40;
  heroTitleMobile.fontName = { family: 'Inter', style: 'Bold' };
  heroTitleMobile.fills = [{ type: 'SOLID', color: COLORS.text }];
  heroTitleMobile.textAlignHorizontal = 'CENTER';
  heroTitleMobile.x = 40;
  heroTitleMobile.y = 120;
  heroTitleMobile.resize(295, 100);
  heroMobile.appendChild(heroTitleMobile);

  const heroSubtitleMobile = figma.createText();
  heroSubtitleMobile.characters = 'Qualidade incomparável';
  heroSubtitleMobile.fontSize = 18;
  heroSubtitleMobile.fontName = { family: 'Inter', style: 'Regular' };
  heroSubtitleMobile.fills = [{ type: 'SOLID', color: COLORS.text }];
  heroSubtitleMobile.textAlignHorizontal = 'CENTER';
  heroSubtitleMobile.x = 40;
  heroSubtitleMobile.y = 240;
  heroSubtitleMobile.resize(295, 50);
  heroMobile.appendChild(heroSubtitleMobile);

  const ctaMobile = figma.createRectangle();
  ctaMobile.resize(295, 56);
  ctaMobile.x = 40;
  ctaMobile.y = 340;
  ctaMobile.fills = [{ type: 'SOLID', color: COLORS.accent }];
  ctaMobile.cornerRadius = 8;
  heroMobile.appendChild(ctaMobile);

  const ctaMobileText = figma.createText();
  ctaMobileText.characters = 'Ver Catálogo';
  ctaMobileText.fontSize = 18;
  ctaMobileText.fontName = { family: 'Inter', style: 'SemiBold' };
  ctaMobileText.fills = [{ type: 'SOLID', color: COLORS.white }];
  ctaMobileText.x = 40 + (295 - ctaMobileText.width) / 2;
  ctaMobileText.y = 356;
  heroMobile.appendChild(ctaMobileText);

  console.log('✅ Projeto criado com sucesso!');
  console.log('📋 Páginas criadas:');
  console.log('   1. Design System');
  console.log('   2. Components');
  console.log('   3. Landing Page Desktop');
  console.log('   4. Landing Page Mobile');

  figma.currentPage = designSystemPage;
  figma.viewport.scrollAndZoomIntoView([colorFrame, typoFrame]);

  figma.closePlugin('✅ Projeto Luis Alves Mesas criado com sucesso!');
}

main();
`;

  return pluginCode;
}

// ============================================
// GERAR ARQUIVOS
// ============================================

function generateManifest() {
  const manifest = {
    name: 'Luis Alves Mesas Auto Generator',
    id: '1234567890',
    api: '1.0.0',
    main: 'code.js',
    editorType: ['figma'],
    ui: 'ui.html'
  };

  return JSON.stringify(manifest, null, 2);
}

function generateUI() {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Inter, sans-serif;
      padding: 20px;
      text-align: center;
    }
    button {
      background: #23af24;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover {
      background: #1e9620;
    }
  </style>
</head>
<body>
  <h2>Luis Alves Mesas</h2>
  <p>Criar Landing Page completa</p>
  <button onclick="parent.postMessage({pluginMessage: 'create'}, '*')">
    Criar Projeto
  </button>
</body>
</html>
`;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

function main() {
  console.log('🎨 FIGMA PLUGIN GENERATOR');
  console.log('═══════════════════════════════════════════\n');

  const pluginCode = generatePluginCode();
  const manifest = generateManifest();
  const ui = generateUI();

  // Salvar arquivos do plugin
  const pluginDir = '/Users/juanminni/meu-repositorio/jpr-moveis-rusticos/figma-plugin';

  // Criar diretório se não existir
  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir, { recursive: true });
  }

  fs.writeFileSync(`${pluginDir}/code.js`, pluginCode);
  fs.writeFileSync(`${pluginDir}/manifest.json`, manifest);
  fs.writeFileSync(`${pluginDir}/ui.html`, ui);

  console.log('✅ Plugin gerado com sucesso!');
  console.log('📁 Arquivos criados em: figma-plugin/');
  console.log('   - code.js (código principal)');
  console.log('   - manifest.json (configuração)');
  console.log('   - ui.html (interface)');
  console.log('');
  console.log('📋 Como usar:');
  console.log('');
  console.log('1. Abra o Figma Desktop');
  console.log('2. Vá em: Plugins > Development > Import plugin from manifest');
  console.log('3. Selecione o arquivo: figma-plugin/manifest.json');
  console.log('4. Execute o plugin: Plugins > Development > Luis Alves Mesas Auto Generator');
  console.log('5. Clique em "Criar Projeto"');
  console.log('');
  console.log('O plugin criará automaticamente:');
  console.log('  - Design System (cores, tipografia, efeitos)');
  console.log('  - Components (botões, cards, etc)');
  console.log('  - Landing Page Desktop (1280px)');
  console.log('  - Landing Page Mobile (375px)');
  console.log('');
  console.log('═══════════════════════════════════════════');
}

if (require.main === module) {
  main();
}

module.exports = { generatePluginCode, generateManifest, generateUI };
