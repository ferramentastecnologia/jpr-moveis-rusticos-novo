/**
 * Figma Plugin Script - Luis Alves Mesas Landing Page
 * Este script pode ser executado no Figma Plugin Dev Mode
 * para criar automaticamente toda a estrutura do design
 */

// DESIGN SYSTEM - COLORS
const colors = {
  primary: { r: 152/255, g: 52/255, b: 33/255 },
  secondary: { r: 211/255, g: 177/255, b: 133/255 },
  accent: { r: 35/255, g: 175/255, b: 36/255 },
  text: { r: 23/255, g: 37/255, b: 42/255 },
  footer: { r: 86/255, g: 53/255, b: 36/255 },
  white: { r: 1, g: 1, b: 1 },
  gray: { r: 248/255, g: 249/255, b: 250/255 },
  grayMedium: { r: 74/255, g: 92/255, b: 99/255 }
};

// DESIGN SYSTEM - TYPOGRAPHY
const typography = {
  display: { family: "Lobster Two", style: "Bold" },
  headingSemiBold: { family: "Poppins", style: "SemiBold" },
  headingMedium: { family: "Poppins", style: "Medium" },
  bodyRegular: { family: "Open Sans", style: "Regular" }
};

// PRODUTOS DATA
const products = [
  { name: "Mesa Imperatriz Natural", price: "R$ 3.400", badge: "DESTAQUE" },
  { name: "Mesa Glamour", price: "R$ 3.200", badge: null },
  { name: "Mesa Glamour Mel", price: "R$ 3.250", badge: null },
  { name: "Mesa Requinte Nobre", price: "R$ 3.800", badge: "NOVO" },
  { name: "Mesa Nobreza", price: "R$ 4.200", badge: null },
  { name: "Mesa Encanto", price: "R$ 2.900", badge: null },
  { name: "Mesa Império", price: "R$ 3.600", badge: null },
  { name: "Mesa Charme", price: "R$ 3.100", badge: null },
  { name: "Mesa Imperatriz", price: "R$ 3.500", badge: null },
  { name: "Mesa Luxúria", price: "R$ 4.500", badge: "PREMIUM" },
  { name: "Mesa Requinte", price: "R$ 3.700", badge: null },
  { name: "Mesa Paris", price: "R$ 3.300", badge: null },
  { name: "Mesa Sublime", price: "R$ 3.900", badge: null }
];

// DEPOIMENTOS DATA
const testimonials = [
  { name: "Maria Silva", rating: 5.0, text: "Qualidade excepcional! A mesa transformou completamente nossa sala de jantar." },
  { name: "João Santos", rating: 4.9, text: "Atendimento impecável e produto de primeira linha. Super recomendo!" },
  { name: "Ana Costa", rating: 5.0, text: "A madeira é de uma qualidade impressionante. Valeu cada centavo investido." },
  { name: "Pedro Lima", rating: 4.8, text: "Mesa linda e resistente. Chegou no prazo e bem embalada." },
  { name: "Carla Mendes", rating: 5.0, text: "Artesanato de excelência! Todos os detalhes são perfeitos." },
  { name: "Roberto Alves", rating: 4.9, text: "Melhor investimento para nossa casa. A mesa é simplesmente magnífica." },
  { name: "Juliana Rocha", rating: 5.0, text: "Superou todas as expectativas. Produto premium de verdade!" },
  { name: "Marcos Ferreira", rating: 4.9, text: "Entrega rápida, produto exatamente como descrito. Nota 10!" }
];

// FUNÇÃO PRINCIPAL
async function createLandingPage() {
  
  // 1. Criar página Desktop
  const desktopPage = figma.createPage();
  desktopPage.name = "Desktop (1280px)";
  
  // 2. Criar Navigation Bar Component
  const navbar = figma.createComponent();
  navbar.name = "Navigation Bar";
  navbar.resize(1280, 80);
  
  const navBg = figma.createRectangle();
  navBg.resize(1280, 80);
  navBg.fills = [{ type: 'SOLID', color: colors.white }];
  navBg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true
  }];
  navbar.appendChild(navBg);
  
  const logo = figma.createText();
  await figma.loadFontAsync(typography.display);
  logo.characters = "JPR Móveis Rústicos";
  logo.fontSize = 20;
  logo.fontName = typography.display;
  logo.fills = [{ type: 'SOLID', color: colors.primary }];
  logo.x = 80;
  logo.y = 28;
  navbar.appendChild(logo);
  
  // 3. Criar Button Component com variantes
  const buttonSet = figma.createComponentSet();
  buttonSet.name = "Button";
  
  const buttonPrimary = figma.createComponent();
  buttonPrimary.name = "variant=Primary,state=Default";
  buttonPrimary.resize(280, 56);
  
  const btnBg = figma.createRectangle();
  btnBg.resize(280, 56);
  btnBg.cornerRadius = 8;
  btnBg.fills = [{ type: 'SOLID', color: colors.primary }];
  btnBg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true
  }];
  buttonPrimary.appendChild(btnBg);
  
  const btnText = figma.createText();
  await figma.loadFontAsync(typography.headingSemiBold);
  btnText.characters = "VER CATÁLOGO";
  btnText.fontSize = 14;
  btnText.fontName = typography.headingSemiBold;
  btnText.letterSpacing = { value: 1, unit: 'PIXELS' };
  btnText.textCase = 'UPPER';
  btnText.fills = [{ type: 'SOLID', color: colors.white }];
  btnText.textAlignHorizontal = 'CENTER';
  btnText.x = 90;
  btnText.y = 20;
  buttonPrimary.appendChild(btnText);
  
  buttonSet.appendChild(buttonPrimary);
  
  // 4. Criar Product Card Component
  const productCard = figma.createComponent();
  productCard.name = "Product Card";
  productCard.resize(380, 480);
  
  const cardBg = figma.createRectangle();
  cardBg.resize(380, 480);
  cardBg.cornerRadius = 12;
  cardBg.fills = [{ type: 'SOLID', color: colors.white }];
  cardBg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    visible: true
  }];
  productCard.appendChild(cardBg);
  
  const cardImage = figma.createRectangle();
  cardImage.resize(348, 280);
  cardImage.cornerRadius = 8;
  cardImage.fills = [{ type: 'SOLID', color: colors.gray }];
  cardImage.x = 16;
  cardImage.y = 16;
  productCard.appendChild(cardImage);
  
  const cardTitle = figma.createText();
  await figma.loadFontAsync(typography.headingSemiBold);
  cardTitle.characters = "Mesa Imperatriz Natural";
  cardTitle.fontSize = 20;
  cardTitle.fontName = typography.headingSemiBold;
  cardTitle.fills = [{ type: 'SOLID', color: colors.text }];
  cardTitle.x = 24;
  cardTitle.y = 320;
  cardTitle.resize(332, cardTitle.height);
  productCard.appendChild(cardTitle);
  
  const cardPrice = figma.createText();
  await figma.loadFontAsync({ family: "Poppins", style: "Bold" });
  cardPrice.characters = "R$ 3.400";
  cardPrice.fontSize = 28;
  cardPrice.fontName = { family: "Poppins", style: "Bold" };
  cardPrice.fills = [{ type: 'SOLID', color: colors.primary }];
  cardPrice.x = 24;
  cardPrice.y = 400;
  productCard.appendChild(cardPrice);
  
  // 5. Criar Hero Frame
  const heroFrame = figma.createFrame();
  heroFrame.name = "Hero Section";
  heroFrame.resize(1280, 600);
  heroFrame.fills = [{ type: 'SOLID', color: colors.gray }];
  heroFrame.x = 0;
  heroFrame.y = 100;
  
  const heroHeadline = figma.createText();
  await figma.loadFontAsync(typography.display);
  heroHeadline.characters = "Mesas Rústicas Premium";
  heroHeadline.fontSize = 64;
  heroHeadline.fontName = typography.display;
  heroHeadline.fills = [{ type: 'SOLID', color: colors.primary }];
  heroHeadline.textAlignHorizontal = 'CENTER';
  heroHeadline.x = 240;
  heroHeadline.y = 180;
  heroHeadline.resize(800, heroHeadline.height);
  heroFrame.appendChild(heroHeadline);
  
  const heroSubheadline = figma.createText();
  await figma.loadFontAsync(typography.bodyRegular);
  heroSubheadline.characters = "Transforme seu espaço com móveis de qualidade incomparável";
  heroSubheadline.fontSize = 20;
  heroSubheadline.fontName = typography.bodyRegular;
  heroSubheadline.fills = [{ type: 'SOLID', color: colors.text }];
  heroSubheadline.textAlignHorizontal = 'CENTER';
  heroSubheadline.x = 290;
  heroSubheadline.y = 280;
  heroSubheadline.resize(700, heroSubheadline.height);
  heroFrame.appendChild(heroSubheadline);
  
  desktopPage.appendChild(heroFrame);
  
  // 6. Criar Catálogo Frame com grid de produtos
  const catalogFrame = figma.createFrame();
  catalogFrame.name = "Catálogo Section";
  catalogFrame.resize(1280, 1200);
  catalogFrame.fills = [{ type: 'SOLID', color: colors.white }];
  catalogFrame.x = 0;
  catalogFrame.y = 750;
  
  const catalogTitle = figma.createText();
  await figma.loadFontAsync(typography.headingSemiBold);
  catalogTitle.characters = "Catálogo Completo";
  catalogTitle.fontSize = 40;
  catalogTitle.fontName = typography.headingSemiBold;
  catalogTitle.fills = [{ type: 'SOLID', color: colors.text }];
  catalogTitle.textAlignHorizontal = 'CENTER';
  catalogTitle.x = 390;
  catalogTitle.y = 60;
  catalogTitle.resize(500, catalogTitle.height);
  catalogFrame.appendChild(catalogTitle);
  
  // Grid de produtos (3 colunas x 5 linhas = 15 produtos)
  let row = 0;
  let col = 0;
  const startX = 80;
  const startY = 160;
  const gap = 30;
  
  for (let i = 0; i < Math.min(products.length, 13); i++) {
    const product = products[i];
    const instance = productCard.createInstance();
    
    instance.x = startX + (col * (380 + gap));
    instance.y = startY + (row * (480 + gap));
    
    catalogFrame.appendChild(instance);
    
    col++;
    if (col >= 3) {
      col = 0;
      row++;
    }
  }
  
  desktopPage.appendChild(catalogFrame);
  
  // 7. Criar Footer Frame
  const footerFrame = figma.createFrame();
  footerFrame.name = "Footer";
  footerFrame.resize(1280, 250);
  footerFrame.fills = [{ type: 'SOLID', color: colors.footer }];
  footerFrame.x = 0;
  footerFrame.y = 3000;
  
  const footerText = figma.createText();
  await figma.loadFontAsync(typography.bodyRegular);
  footerText.characters = "JPR Móveis Rústicos - Luis Alves, SC\n(47) 99716-8814\n@jpr.moveisrusticos";
  footerText.fontSize = 16;
  footerText.fontName = typography.bodyRegular;
  footerText.fills = [{ type: 'SOLID', color: colors.white }];
  footerText.textAlignHorizontal = 'CENTER';
  footerText.lineHeight = { value: 160, unit: 'PERCENT' };
  footerText.x = 440;
  footerText.y = 80;
  footerText.resize(400, footerText.height);
  footerFrame.appendChild(footerText);
  
  desktopPage.appendChild(footerFrame);
  
  // 8. Criar página Mobile
  const mobilePage = figma.createPage();
  mobilePage.name = "Mobile (375px)";
  
  // Hero Mobile
  const heroMobile = figma.createFrame();
  heroMobile.name = "Hero Mobile";
  heroMobile.resize(375, 500);
  heroMobile.fills = [{ type: 'SOLID', color: colors.gray }];
  
  const heroMobileHeadline = figma.createText();
  await figma.loadFontAsync(typography.display);
  heroMobileHeadline.characters = "Mesas Rústicas Premium";
  heroMobileHeadline.fontSize = 48;
  heroMobileHeadline.fontName = typography.display;
  heroMobileHeadline.fills = [{ type: 'SOLID', color: colors.primary }];
  heroMobileHeadline.textAlignHorizontal = 'CENTER';
  heroMobileHeadline.x = 20;
  heroMobileHeadline.y = 100;
  heroMobileHeadline.resize(335, heroMobileHeadline.height);
  heroMobile.appendChild(heroMobileHeadline);
  
  mobilePage.appendChild(heroMobile);
  
  figma.viewport.scrollAndZoomIntoView([desktopPage, mobilePage]);
  figma.notify('Landing page criada com sucesso! ✅');
}

// Executar função principal
createLandingPage();
