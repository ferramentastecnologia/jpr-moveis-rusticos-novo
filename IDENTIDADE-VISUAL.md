# 🎨 Identidade Visual - JPR Móveis Rústicos

Guia completo da paleta de cores e diretrizes visuais do site.

---

## 🌲 Conceito

A identidade visual da JPR Móveis Rústicos é inspirada na **natureza**, **madeira autêntica** e **artesanato tradicional**. As cores refletem:

- 🪵 **Madeira rústica** - tons quentes e naturais
- 🌿 **Natureza** - verdes orgânicos
- ☀️ **Conforto** - paleta acolhedora
- ✨ **Qualidade premium** - sofisticação natural

---

## 🎨 Paleta de Cores Principal

### Madeira Clara (Primary)
Representa a madeira natural e artesanato de qualidade.

```css
--primary: #C8A882          /* Tom quente de madeira clara */
--primary-light: #E5D4C1    /* Madeira clara suave */
--primary-dark: #A08968     /* Madeira envelhecida */
```

**Uso:**
- ✅ Botões secundários
- ✅ Backgrounds de seções
- ✅ Headers e destaques
- ✅ Elementos decorativos

**Exemplo visual:**
```
████████  #C8A882 - Primary
████████  #E5D4C1 - Light
████████  #A08968 - Dark
```

---

### Madeira Escura (Secondary)
Transmite tradição, solidez e elegância.

```css
--secondary: #5D4037        /* Marrom madeira escura */
--secondary-light: #8B6F61  /* Tom médio quente */
--secondary-dark: #3E2723   /* Marrom profundo */
```

**Uso:**
- ✅ Títulos principais
- ✅ Textos de destaque
- ✅ Rodapé
- ✅ Navegação
- ✅ Elementos de contraste

**Exemplo visual:**
```
████████  #5D4037 - Secondary
████████  #8B6F61 - Light
████████  #3E2723 - Dark
```

---

### Verde Floresta (Accent)
Representa natureza, crescimento e sustentabilidade.

```css
--accent: #2E7D32           /* Verde floresta natural */
--accent-light: #4CAF50     /* Verde vibrante */
--accent-dark: #1B5E20      /* Verde escuro */
```

**Uso:**
- ✅ Botões de ação (CTA)
- ✅ Links importantes
- ✅ Ícones de sucesso
- ✅ Badges e tags
- ✅ Hover states

**Exemplo visual:**
```
████████  #2E7D32 - Accent
████████  #4CAF50 - Light
████████  #1B5E20 - Dark
```

---

## 🎨 Cores Complementares

### Âmbar Quente
```css
--complementary-amber: #FFA726
```
**Uso:** Promoções, ofertas especiais, badges de desconto

### Terracota
```css
--complementary-terracota: #D84315
```
**Uso:** Alertas importantes, tags "novo", destaque forte

### Verde Sálvia
```css
--complementary-sage: #8D9B6D
```
**Uso:** Backgrounds alternativos, seções suaves

### Creme Natural
```css
--complementary-cream: #F5F1E8
```
**Uso:** Backgrounds neutros, cards, áreas de leitura

---

## ⚫ Cores Neutras (Texto e Backgrounds)

### Textos

```css
--text-primary: #2C2416     /* Texto principal escuro */
--text-secondary: #6B5D4F   /* Texto secundário */
--text-muted: #9E8A78       /* Texto suave */
```

**Hierarquia:**
1. **Primary** - Títulos, texto importante
2. **Secondary** - Subtítulos, corpo de texto
3. **Muted** - Legendas, notas, informações auxiliares

### Backgrounds

```css
--white: #FFFFFF            /* Branco puro */
--off-white: #FAF8F5        /* Branco levemente bege */
--gray-light: #F0EDE8       /* Cinza quente claro */
--gray-medium: #D4CFC7      /* Cinza quente médio */
--gray-dark: #8B8378        /* Cinza quente escuro */
```

---

## 🌈 Gradientes

### Gradiente Madeira
```css
--gradient-wood: linear-gradient(135deg, #C8A882 0%, #A08968 100%);
```
**Uso:** Headers, banners, seções hero

### Gradiente Floresta
```css
--gradient-forest: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
```
**Uso:** Botões especiais, CTAs premium

### Gradiente Quente
```css
--gradient-warm: linear-gradient(135deg, #F5F1E8 0%, #E5D4C1 100%);
```
**Uso:** Backgrounds suaves, seções alternadas

---

## 📐 Aplicações Práticas

### Botões

#### Primário (Call-to-Action)
```css
background: var(--accent);          /* Verde floresta */
color: var(--white);
```
**Exemplo:** "Comprar Agora", "Adicionar ao Carrinho"

#### Secundário
```css
background: var(--primary);         /* Madeira clara */
color: var(--secondary-dark);
```
**Exemplo:** "Ver Detalhes", "Saiba Mais"

#### Terciário (Outline)
```css
background: transparent;
border: 2px solid var(--secondary);
color: var(--secondary);
```
**Exemplo:** "Cancelar", "Voltar"

---

### Cards e Containers

#### Card Padrão
```css
background: var(--white);
border: 1px solid var(--gray-light);
box-shadow: var(--shadow-md);
```

#### Card Destacado
```css
background: var(--gradient-warm);
border-left: 4px solid var(--accent);
```

#### Card Promocional
```css
background: var(--complementary-cream);
border: 2px solid var(--complementary-amber);
```

---

### Seções da Página

#### Hero/Banner
```css
background: var(--gradient-wood);
color: var(--white);
```

#### Conteúdo Principal
```css
background: var(--white);
color: var(--text-primary);
```

#### Seções Alternadas
```css
background: var(--off-white);
color: var(--text-primary);
```

#### Rodapé
```css
background: var(--secondary-dark);
color: var(--off-white);
```

---

## ✅ Regras de Uso

### ✅ FAZER

1. **Contraste adequado** - Sempre garantir legibilidade
2. **Hierarquia visual** - Primary > Secondary > Accent
3. **Consistência** - Usar as variáveis CSS definidas
4. **Acessibilidade** - Mínimo de 4.5:1 para textos
5. **Harmonia** - Combinar cores da mesma família

### ❌ NÃO FAZER

1. ❌ Misturar muitas cores em um elemento
2. ❌ Usar cores fora da paleta sem aprovação
3. ❌ Texto claro em fundo claro
4. ❌ Ignorar variações (light/dark) disponíveis
5. ❌ Gradientes com mais de 2 cores

---

## 🎯 Exemplos de Combinações

### Combinação 1: Natural e Elegante
```css
background: var(--primary-light);
border-left: 4px solid var(--accent);
color: var(--text-primary);
```

### Combinação 2: Destaque Premium
```css
background: var(--gradient-wood);
color: var(--white);
border-bottom: 3px solid var(--accent);
```

### Combinação 3: Informativo Suave
```css
background: var(--complementary-cream);
color: var(--text-secondary);
border: 1px solid var(--gray-medium);
```

### Combinação 4: Ação Forte
```css
background: var(--accent);
color: var(--white);
box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
```

---

## 📊 Tabela de Contraste (Acessibilidade)

| Combinação | Contraste | Aprovado WCAG |
|------------|-----------|---------------|
| text-primary / white | 14.2:1 | ✅ AAA |
| text-secondary / off-white | 7.8:1 | ✅ AAA |
| accent / white | 5.1:1 | ✅ AA |
| secondary / primary-light | 4.8:1 | ✅ AA |

---

## 🖼️ Referências Visuais

### Inspiração de Madeira
- Carvalho envelhecido
- Cedro natural
- Nogueira polida

### Inspiração de Natureza
- Floresta de pinheiros
- Folhagem outonal
- Terra e argila

---

## 📝 Notas de Implementação

### Para Desenvolvedores

1. **Sempre use variáveis CSS:**
   ```css
   /* ✅ Correto */
   color: var(--text-primary);

   /* ❌ Errado */
   color: #2C2416;
   ```

2. **Use modificadores semânticos:**
   ```css
   .btn-primary { background: var(--accent); }
   .btn-secondary { background: var(--primary); }
   ```

3. **Aproveite os gradientes:**
   ```css
   .hero { background: var(--gradient-wood); }
   ```

### Para Designers

1. Use o Figma/Adobe XD com esta paleta
2. Exporte assets com cores exatas
3. Mantenha contraste mínimo de 4.5:1
4. Teste em modo escuro (se aplicável)

---

## 🔄 Atualizações

**Versão 2.0** - Janeiro 2025
- Nova paleta harmônica baseada em natureza
- Gradientes adicionados
- Melhor acessibilidade
- Cores complementares expandidas

**Versão 1.0** - Manual Original JPR
- Paleta inicial bege/marrom/teal

---

## 📞 Contato

Dúvidas sobre identidade visual:
- 📧 Email: contato@jprmoveis.com.br
- 📱 WhatsApp: (47) 99716-8814

---

**JPR Móveis Rústicos** - Artesanato que conta histórias 🪵✨
