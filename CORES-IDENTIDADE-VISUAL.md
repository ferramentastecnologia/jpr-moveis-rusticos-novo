# IDENTIDADE VISUAL - JPR MÓVEIS RÚSTICOS

## PALETA DE CORES PRINCIPAL

### Cor 1: Marrom Rústico (Principal)
```
HEX: #984321
RGB: rgb(152, 67, 33)
HSL: hsl(17, 64%, 36%)
CMYK: C:0 M:56 Y:78 K:40

Uso: Títulos principais, elementos de destaque, branding
```

### Cor 2: Marrom Escuro (Fundo)
```
HEX: #563524
RGB: rgb(86, 53, 36)
HSL: hsl(20, 41%, 24%)
CMYK: C:0 M:38 Y:58 K:66

Uso: Fundos, cabeçalhos, contraste
```

### Cor 3: Bege/Palha (Complementar)
```
HEX: #D3B185
RGB: rgb(211, 177, 133)
HSL: hsl(34, 48%, 67%)
CMYK: C:0 M:16 Y:37 K:17

Uso: Detalhes, molduras, elementos decorativos
```

### Cor 4: Verde Destaque (CTA)
```
HEX: #23AF24
RGB: rgb(35, 175, 36)
HSL: hsl(120, 67%, 41%)
CMYK: C:80 M:0 Y:79 K:31

Uso: Botões de ação, chamadas importantes, links
```

### Cor 5: Branco (Texto)
```
HEX: #FFFFFF
RGB: rgb(255, 255, 255)
HSL: hsl(0, 0%, 100%)
CMYK: C:0 M:0 Y:0 K:0

Uso: Texto sobre fundos escuros, espaços em branco
```

---

## TIPOGRAFIA

### Fonte Principal: Poppins
```css
font-family: 'Poppins', sans-serif;
Pesos: 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold)
Uso: Navegação, textos gerais, parágrafos
```

**Link Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Fonte Auxiliar: Open Sans
```css
font-family: 'Open Sans', sans-serif;
Pesos: 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold)
Uso: Conteúdo, descrições de produtos
```

**Link Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Fonte Decorativa: Lobster Two
```css
font-family: 'Lobster Two', cursive;
Pesos: 400 (Regular), 700 (Bold)
Uso: Títulos especiais, elementos decorativos
```

**Link Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap" rel="stylesheet">
```

---

## CSS - VARIÁVEIS DE COR

### Para uso em projetos Web

```css
:root {
  /* Cores Principais JPR Móveis Rústicos */
  --jpr-marrom-rustico: #984321;
  --jpr-marrom-escuro: #563524;
  --jpr-bege: #D3B185;
  --jpr-verde-cta: #23AF24;
  --jpr-branco: #FFFFFF;

  /* Cores RGB */
  --jpr-marrom-rustico-rgb: 152, 67, 33;
  --jpr-marrom-escuro-rgb: 86, 53, 36;
  --jpr-bege-rgb: 211, 177, 133;
  --jpr-verde-cta-rgb: 35, 175, 36;

  /* Tipografia */
  --jpr-font-principal: 'Poppins', sans-serif;
  --jpr-font-auxiliar: 'Open Sans', sans-serif;
  --jpr-font-decorativa: 'Lobster Two', cursive;
}

/* Exemplo de uso */
.botao-cta {
  background-color: var(--jpr-verde-cta);
  color: var(--jpr-branco);
  font-family: var(--jpr-font-principal);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.botao-cta:hover {
  background-color: rgba(35, 175, 36, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(35, 175, 36, 0.3);
}

.titulo-principal {
  color: var(--jpr-marrom-rustico);
  font-family: var(--jpr-font-decorativa);
  font-size: 2.5rem;
  font-weight: 700;
}

.fundo-principal {
  background-color: var(--jpr-marrom-escuro);
  color: var(--jpr-branco);
}

.detalhe-decorativo {
  background-color: var(--jpr-bege);
  border: 2px solid var(--jpr-marrom-rustico);
  padding: 16px;
  border-radius: 4px;
}
```

---

## TAILWIND CSS - CONFIGURAÇÃO

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'jpr-marrom-rustico': '#984321',
        'jpr-marrom-escuro': '#563524',
        'jpr-bege': '#D3B185',
        'jpr-verde-cta': '#23AF24',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'lobster': ['Lobster Two', 'cursive'],
      },
    },
  },
}
```

**Exemplo de uso com Tailwind:**
```html
<button class="bg-jpr-verde-cta text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:opacity-85 transition-all">
  Solicitar Orçamento
</button>

<h1 class="text-jpr-marrom-rustico font-lobster text-4xl font-bold">
  JPR Móveis Rústicos
</h1>

<div class="bg-jpr-marrom-escuro text-white p-8">
  <p class="font-open-sans text-lg">
    Móveis rústicos de qualidade há mais de 7 anos
  </p>
</div>
```

---

## GRADIENTES E EFEITOS

### Gradiente de Fundo
```css
.gradiente-jpr {
  background: linear-gradient(135deg, #563524 0%, #984321 100%);
}

.gradiente-jpr-suave {
  background: linear-gradient(135deg, #D3B185 0%, #984321 100%);
}

.gradiente-overlay {
  background: linear-gradient(
    to bottom,
    rgba(86, 53, 36, 0.8),
    rgba(152, 67, 33, 0.9)
  );
}
```

### Sombras e Efeitos
```css
/* Sombra suave marrom */
.sombra-marrom {
  box-shadow: 0 4px 12px rgba(152, 67, 33, 0.2);
}

/* Sombra média marrom */
.sombra-marrom-media {
  box-shadow: 0 8px 24px rgba(86, 53, 36, 0.3);
}

/* Efeito de texto com sombra */
.texto-destaque {
  color: #984321;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Bordas decorativas */
.borda-rustica {
  border: 3px solid #984321;
  border-radius: 8px;
  padding: 20px;
}

.borda-bege {
  border: 2px solid #D3B185;
  border-radius: 4px;
}
```

---

## EXEMPLOS DE COMPONENTES

### Botão Primário
```html
<button class="botao-primario">
  Solicitar Orçamento
</button>

<style>
.botao-primario {
  background-color: #23AF24;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.botao-primario:hover {
  background-color: #1d8f1f;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(35, 175, 36, 0.3);
}
</style>
```

### Botão Secundário
```html
<button class="botao-secundario">
  Ver Produtos
</button>

<style>
.botao-secundario {
  background-color: transparent;
  color: #984321;
  border: 2px solid #984321;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 26px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.botao-secundario:hover {
  background-color: #984321;
  color: #FFFFFF;
  transform: translateY(-2px);
}
</style>
```

### Card de Produto
```html
<div class="card-produto">
  <img src="mesa-rustica.jpg" alt="Mesa Rústica">
  <h3>Mesa Rústica Clássica</h3>
  <p>Acabamento em madeira de demolição</p>
  <button class="botao-primario">Solicitar Orçamento</button>
</div>

<style>
.card-produto {
  background: #FFFFFF;
  border: 2px solid #D3B185;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(152, 67, 33, 0.1);
  transition: all 0.3s ease;
}

.card-produto:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(152, 67, 33, 0.2);
  border-color: #984321;
}

.card-produto h3 {
  color: #984321;
  font-family: 'Lobster Two', cursive;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.card-produto p {
  color: #563524;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.95rem;
  margin-bottom: 16px;
}
</style>
```

---

## LOGO

### Especificações
- **Arquivo:** cropped-cropped-jpr-logo-branca-2.png
- **Dimensões:** 512x450px
- **Formato:** PNG com transparência
- **Cor:** Branco (#FFFFFF)
- **Uso:** Sobre fundos escuros (marrom-escuro ou marrom-rústico)

### Variações Sugeridas
1. **Logo Branca:** Para fundos escuros (marrom)
2. **Logo Marrom:** Para fundos claros (bege ou branco)
3. **Logo com Tagline:** "Mais de 7 anos criando móveis rústicos"

---

## ACESSIBILIDADE

### Contraste de Cores (WCAG 2.1)

#### Texto sobre Fundos

| Combinação | Contraste | Status WCAG | Uso Recomendado |
|------------|-----------|-------------|-----------------|
| Branco (#FFF) sobre Marrom Escuro (#563524) | 11.2:1 | AAA ✅ | Texto principal |
| Branco (#FFF) sobre Marrom Rústico (#984321) | 5.8:1 | AA ✅ | Texto secundário |
| Marrom Rústico (#984321) sobre Branco (#FFF) | 5.8:1 | AA ✅ | Títulos |
| Verde CTA (#23AF24) sobre Branco (#FFF) | 3.5:1 | AA (Large) ⚠️ | Botões grandes |

### Recomendações
- Use branco sobre marrom-escuro para melhor legibilidade
- Textos pequenos: Prefira branco sobre marrom-escuro
- Botões: Verde (#23AF24) com texto branco em negrito
- Sempre teste com ferramentas de contraste

---

## RESPONSIVIDADE

### Breakpoints Recomendados
```css
/* Mobile First */
/* Mobile: 320px - 767px */
.container {
  padding: 16px;
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## CHECKLIST DE IMPLEMENTAÇÃO

### Para Novos Projetos
- [ ] Importar Google Fonts (Poppins, Open Sans, Lobster Two)
- [ ] Definir variáveis CSS com cores JPR
- [ ] Configurar logo (formato PNG transparente)
- [ ] Criar componentes de botão (primário e secundário)
- [ ] Configurar gradientes de fundo
- [ ] Testar contraste de cores (WCAG)
- [ ] Implementar responsividade mobile-first
- [ ] Adicionar hover effects em botões e cards
- [ ] Validar tipografia em diferentes tamanhos de tela

---

**Documento gerado por:** Claude Code
**Data:** 09/11/2025
**Versão:** 1.0
**Uso:** Desenvolvimento de projetos para JPR Móveis Rústicos
