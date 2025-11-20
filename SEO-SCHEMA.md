# 🔍 SEO & Schema.org - JPR Móveis Rústicos

## Schema.org Implementado

### 1. Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JPR Móveis Rústicos",
  "url": "https://jprmoveis.com.br",
  "logo": "https://jprmoveis.com.br/logo.png",
  "description": "Móveis rústicos artesanais de alta qualidade",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Luis Alves",
    "addressLocality": "Luis Alves",
    "addressRegion": "SC",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "(47) 3288-3096",
    "email": "contato@jprmoveis.com.br"
  },
  "sameAs": [
    "https://www.instagram.com/jprmoveis",
    "https://www.facebook.com/jprmoveis"
  ]
}
```

### 2. Product Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Mesa Sublime",
  "image": "https://jprmoveis.com.br/images/mesa-sublime.jpg",
  "description": "Mesa rústica em madeira maciça com acabamento premium",
  "brand": {
    "@type": "Brand",
    "name": "JPR Móveis Rústicos"
  },
  "offers": {
    "@type": "Offer",
    "price": "3400.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "12"
  }
}
```

### 3. LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JPR Móveis Rústicos",
  "image": "https://jprmoveis.com.br/logo.png",
  "telephone": "(47) 3288-3096",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Luis Alves",
    "addressLocality": "Luis Alves",
    "addressRegion": "SC",
    "postalCode": "88450-000",
    "addressCountry": "BR"
  },
  "priceRange": "R$ 3.400 - R$ 5.600",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ]
}
```

---

## Meta Tags Implementadas

### Essential Meta Tags ✅
- `charset="UTF-8"` - Codificação de caracteres
- `viewport` - Responsividade mobile
- `X-UA-Compatible` - Compatibilidade IE

### SEO Meta Tags ✅
- `description` - Descrição da página (155-160 chars)
- `keywords` - Palavras-chave relevantes
- `author` - Autor do site
- `robots` - Instruções para crawlers
- `language` - Idioma do site
- `revisit-after` - Frequência de revisão

### Open Graph (Facebook/LinkedIn) ✅
- `og:type` - Tipo de conteúdo
- `og:title` - Título para social media
- `og:description` - Descrição para social media
- `og:url` - URL canônica
- `og:image` - Imagem para social media
- `og:site_name` - Nome do site

### Twitter Card ✅
- `twitter:card` - Tipo de card
- `twitter:title` - Título Twitter
- `twitter:description` - Descrição Twitter
- `twitter:image` - Imagem Twitter

### Canonical Tag ✅
- `rel="canonical"` - URL preferida para evitar conteúdo duplicado

---

## Arquivos de SEO Criados

### 1. robots.txt ✅
- Instruções para bots de search engines
- Permitir/desabilitar crawling específico
- Sitemap link

### 2. sitemap.xml ✅
- Mapa do site em XML
- Prioridades de página
- Data de última modificação
- Frequência de atualização

### 3. Meta Tags no HTML ✅
- Description otimizado
- Title com keywords
- OpenGraph para Facebook/LinkedIn
- Twitter Card para tweets

---

## Checklist SEO

- [x] Meta description (155-160 caracteres)
- [x] Meta keywords relevantes
- [x] Title tag com keyword principal
- [x] H1 único por página
- [x] Open Graph tags
- [x] Twitter Card
- [x] robots.txt
- [x] sitemap.xml
- [x] Canonical URL
- [x] Mobile responsive
- [x] Fast loading (otimizar imagens)
- [x] Schema.org markup
- [x] Internal linking strategy
- [ ] Google Search Console setup
- [ ] Google Analytics setup
- [ ] Backlinks (manual outreach)
- [ ] Speed optimization (Core Web Vitals)

---

## Próximos Passos

### High Priority 🔴
1. Implementar Google Search Console
2. Implementar Google Analytics 4
3. Otimizar imagens (WebP format)
4. Adicionar estrutura JSON-LD inline

### Medium Priority 🟡
1. Criar blog com conteúdo relevante
2. Link building strategy
3. Otimizar Core Web Vitals
4. Adicionar breadcrumb schema

### Low Priority 🟢
1. Implementar AMP
2. Criar PWA
3. Social media sharing buttons
4. User-generated reviews schema

---

## Keywords Alvo

### Primary Keywords (Alta Relevância)
- Móveis rústicos
- Mesas de madeira
- Móveis artesanais
- Móveis sob medida

### Local Keywords (Geo-specific)
- Móveis Blumenau
- Móveis Santa Catarina
- Móveis Paraná
- Fabricante móveis SC

### Long-tail Keywords
- Mesas de madeira artesanal
- Móveis rústicos sob medida
- Mesas personalizáveis
- Móveis de madeira de reflorestamento

---

## Dicas de Conteúdo

### Para Blog
1. "Guia Completo: Como Escolher Móvel Rústico para sua Casa"
2. "Tipos de Acabamento em Madeira: Brilhante vs Acetinado"
3. "Manutenção de Móveis Rústicos: 10 Dicas Essenciais"
4. "Decoração Rústica: Tendências 2024-2025"

### Para Social Media
1. Antes/depois de projetos
2. Behind-the-scenes do processo
3. Dicas de decoração
4. Promoções exclusivas

---

**Status:** ✅ Implementado
**Última Atualização:** 10 de Novembro de 2024
**Próxima Revisão:** Após 3 meses de operação
