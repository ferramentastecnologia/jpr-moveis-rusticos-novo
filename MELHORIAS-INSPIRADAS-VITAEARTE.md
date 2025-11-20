# 🚀 Melhorias Inspiradas em Vita&Arte para JPR Novo

## 📋 Sumário de Implementações

Baseado na análise do ecommerce Vita&Arte, aqui estão as melhorias recomendadas para o frontend JPR com **código pronto para implementar**.

---

## 1️⃣ JSON-LD Schema (SEO)

### Por que é importante?
- Google entende melhor os produtos
- Rich snippets em resultados de busca
- Preço, avaliação, disponibilidade destacados

### Implementação no JPR

Adicione no `index-nova.html`:

```html
<!-- Antes do </head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JPR Móveis Rústicos",
  "url": "https://jpr-moveis.com.br",
  "logo": "logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "(47) 99716-8814",
    "url": "https://wa.me/5547997168814"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Luis Alves",
    "addressRegion": "SC",
    "postalCode": "88000-000",
    "addressCountry": "BR"
  }
}
</script>

<!-- Para cada produto -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Mesa Imperatriz Natural",
  "image": "mesa-imperatriz.jpg",
  "description": "Mesa rústica em madeira natural com acabamento premium",
  "brand": {
    "@type": "Brand",
    "name": "JPR Móveis Rústicos"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://jpr-moveis.com.br/mesa-imperatriz",
    "priceCurrency": "BRL",
    "price": "3400.00",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "JPR Móveis Rústicos"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "45"
  }
}
</script>
```

### Integração no `app-novo.js`:

```javascript
function renderizarJsonLd(produto) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": produto.nome,
        "description": produto.descricaoLonga,
        "brand": {"@type": "Brand", "name": "JPR Móveis Rústicos"},
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": produto.preco.toString(),
            "availability": "https://schema.org/InStock"
        }
    });
    document.head.appendChild(script);
}

// Chamar para cada produto ao carregar
produtos.forEach(produto => renderizarJsonLd(produto));
```

---

## 2️⃣ Google Analytics

### Adicionar Rastreamento

No `index-nova.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX'); // Substitua com seu ID
</script>
```

### Rastrear Eventos no `app-novo.js`:

```javascript
// Evento: Produto visualizado
function abrirModalProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);

    // Rastrear no Google Analytics
    gtag('event', 'view_item', {
        items: [{
            item_id: produto.id,
            item_name: produto.nome,
            price: produto.preco,
            currency: 'BRL'
        }]
    });

    // ... resto do código
}

// Evento: Produto adicionado ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);

    gtag('event', 'add_to_cart', {
        items: [{
            item_id: produto.id,
            item_name: produto.nome,
            price: produto.preco,
            quantity: 1
        }]
    });

    // ... resto do código
}

// Evento: Checkout iniciado
function finalizarCompra() {
    gtag('event', 'begin_checkout', {
        value: carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0),
        currency: 'BRL',
        items: carrinho.map(item => ({
            item_id: item.id,
            item_name: item.nome,
            price: item.preco,
            quantity: item.quantidade
        }))
    });

    // ... resto do código
}

// Evento: Compra realizada (em sucesso-compra.html)
function rastrearCompra() {
    const pedido = JSON.parse(localStorage.getItem('pedidoAtual'));

    gtag('event', 'purchase', {
        transaction_id: 'NUMERO_PEDIDO_' + Date.now(),
        value: pedido.total,
        currency: 'BRL',
        items: pedido.itens.map(item => ({
            item_id: item.id,
            item_name: item.nome,
            price: item.preco,
            quantity: item.quantidade
        }))
    });
}
```

---

## 3️⃣ hCaptcha em Formulários

### Implementação no `index-nova.html`:

```html
<!-- No formulário de contato -->
<form id="contato-form">
    <input type="text" placeholder="Seu Nome" required>
    <input type="email" placeholder="Seu Email" required>
    <textarea placeholder="Sua Mensagem" rows="5" required></textarea>

    <!-- hCaptcha -->
    <div class="h-captcha" data-sitekey="SEU_SITEKEY_AQUI"></div>

    <button type="submit" class="btn-primary">Enviar Mensagem</button>
</form>

<!-- Adicionar script hCaptcha -->
<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
```

### Validar no JavaScript:

```javascript
function inicializarFormularioContato() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar hCaptcha
        const hcaptchaToken = hcaptcha.getResponse();
        if (!hcaptchaToken) {
            alert('Por favor, complete o captcha!');
            return;
        }

        // Dados do formulário
        const dados = {
            nome: form.querySelector('input[placeholder="Seu Nome"]').value,
            email: form.querySelector('input[placeholder="Seu Email"]').value,
            mensagem: form.querySelector('textarea').value,
            hcaptchaToken: hcaptchaToken
        };

        // Enviar para backend
        try {
            const response = await fetch('/api/contato', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                mostrarNotificacao('✓ Mensagem enviada com sucesso!');
                form.reset();
                hcaptcha.reset();
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    });
}
```

---

## 4️⃣ Newsletter Signup

### Adicionar ao Footer (`index-nova.html`):

```html
<footer class="footer">
    <div class="container">
        <div style="margin-bottom: 30px;">
            <h3 style="color: var(--white); margin-bottom: 12px;">📧 Receba Novidades</h3>
            <form id="newsletter-form" style="display: flex; gap: 12px;">
                <input
                    type="email"
                    placeholder="Seu email"
                    required
                    style="flex: 1; padding: 12px; border: none; border-radius: 8px;"
                >
                <button
                    type="submit"
                    class="btn-primary"
                    style="padding: 12px 24px; white-space: nowrap;"
                >
                    Inscrever
                </button>
            </form>
        </div>

        <!-- Resto do footer -->
    </div>
</footer>
```

### Implementar no JavaScript:

```javascript
function inicializarNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            });

            if (response.ok) {
                mostrarNotificacao('✓ Email inscrito com sucesso!');
                form.reset();
            }
        } catch (error) {
            console.error('Erro:', error);
            mostrarNotificacao('Erro ao inscrever. Tente novamente.');
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    inicializarNewsletter();
});
```

---

## 5️⃣ Variantes de Produtos (Tamanho/Preço)

### Adicionar ao `data-produtos.js`:

```javascript
const produtos = [
    {
        id: 'mesa-001',
        nome: 'Mesa Imperatriz Natural',
        descricao: 'Mesa rústica em madeira natural com acabamento premium',
        // ... dados existentes ...

        // NOVO: Variantes
        variantes: [
            {
                id: 'var-001-180',
                tamanho: '180x100 cm',
                preco: 3400,
                precoFormatado: 'R$ 3.400,00',
                estoque: true
            },
            {
                id: 'var-001-220',
                tamanho: '220x100 cm',
                preco: 4200,
                precoFormatado: 'R$ 4.200,00',
                estoque: true
            },
            {
                id: 'var-001-250',
                tamanho: '250x120 cm',
                preco: 4500,
                precoFormatado: 'R$ 4.500,00',
                estoque: true
            }
        ]
    }
];
```

### Atualizar Modal do Produto:

```javascript
function abrirModalProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const emoji = emojisProdutos[produto.id] || '🪵';

    let variantesHtml = '';
    if (produto.variantes && produto.variantes.length > 0) {
        variantesHtml = `
            <div class="modal-specs">
                <h4 style="margin-bottom: 12px; color: #17252a;">Selecione o Tamanho</h4>
                <select id="variant-select" style="width: 100%; padding: 12px; border: 2px solid #D3B185; border-radius: 8px;">
                    ${produto.variantes.map(v => `
                        <option value="${v.id}" data-price="${v.preco}">
                            ${v.tamanho} - ${v.precoFormatado}
                        </option>
                    `).join('')}
                </select>
            </div>
        `;
    }

    const conteudo = `
        <div class="modal-product-content">
            <div class="modal-product-image">${emoji}</div>
            <div class="modal-product-info">
                <h2>${produto.nome}</h2>
                <div class="product-price" style="margin-bottom: 24px;" id="modal-price">
                    ${produto.precoFormatado}
                </div>

                <p style="margin-bottom: 16px; line-height: 1.8; color: #4a5c63;">
                    ${produto.descricaoLonga}
                </p>

                ${variantesHtml}

                <div class="modal-specs">
                    <!-- Resto do conteúdo -->
                </div>

                <div class="modal-actions">
                    <button class="btn-primary" onclick="adicionarAoCarrinho('${produto.id}'); fecharModalProduto();">
                        🛒 Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-product-content').innerHTML = conteudo;

    // Atualizar preço quando variante muda
    const variantSelect = document.getElementById('variant-select');
    if (variantSelect) {
        variantSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const preco = selectedOption.getAttribute('data-price');
            const precoFormatado = parseFloat(preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
            document.getElementById('modal-price').textContent = precoFormatado;
        });
    }

    document.getElementById('produto-modal').classList.add('active');
}
```

---

## 6️⃣ Carousel de Produtos em Destaque

### Criar novo arquivo `carousel.js`:

```javascript
class ProductCarousel {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        this.currentIndex = 0;
        this.itemsPerPage = options.itemsPerPage || 3;
        this.autoPlay = options.autoPlay !== false;

        if (this.container) {
            this.init();
        }
    }

    init() {
        this.render();
        if (this.autoPlay) {
            setInterval(() => this.next(), 5000);
        }
    }

    render() {
        const items = this.container.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            item.style.display = i >= this.currentIndex && i < this.currentIndex + this.itemsPerPage
                ? 'block'
                : 'none';
        });
    }

    next() {
        const items = this.container.querySelectorAll('.carousel-item');
        this.currentIndex = (this.currentIndex + 1) % (items.length - this.itemsPerPage + 1);
        this.render();
    }

    prev() {
        const items = this.container.querySelectorAll('.carousel-item');
        this.currentIndex = (this.currentIndex - 1 + (items.length - this.itemsPerPage + 1))
            % (items.length - this.itemsPerPage + 1);
        this.render();
    }
}

// Usar no HTML
// <div class="carousel">
//   <div class="carousel-item">...</div>
//   <div class="carousel-item">...</div>
// </div>

// E no JavaScript:
// new ProductCarousel('.carousel', {itemsPerPage: 3, autoPlay: true});
```

---

## 7️⃣ Busca de Produtos

### Adicionar ao `index-nova.html`:

```html
<div class="search-container" style="padding: 20px; background: var(--gray-light);">
    <input
        type="text"
        id="search-input"
        placeholder="🔍 Buscar mesas..."
        style="width: 100%; max-width: 500px; padding: 12px; border: 2px solid var(--gray-medium); border-radius: 8px; margin: 0 auto; display: block;"
    >
    <div id="search-results"></div>
</div>
```

### Implementar Busca:

```javascript
function inicializarBusca() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    if (!input) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            resultsContainer.innerHTML = '';
            return;
        }

        const resultados = produtos.filter(p =>
            p.nome.toLowerCase().includes(query) ||
            p.descricao.toLowerCase().includes(query) ||
            p.categoria.toLowerCase().includes(query)
        );

        if (resultados.length === 0) {
            resultsContainer.innerHTML = '<p style="padding: 20px; color: #999;">Nenhum produto encontrado</p>';
            return;
        }

        resultsContainer.innerHTML = `
            <div style="padding: 20px;">
                <strong>${resultados.length} produtos encontrados:</strong>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
                    ${resultados.map(p => `
                        <div class="product-card" onclick="abrirModalProduto('${p.id}')">
                            <div class="product-header">
                                <h3 class="product-name">${p.nome}</h3>
                                <div class="product-price">${p.precoFormatado}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    inicializarBusca();
});
```

---

## 📝 Checklist de Implementação

### Fase 1 (Semana 1)
- [ ] Implementar JSON-LD Schema
- [ ] Adicionar Google Analytics
- [ ] Newsletter signup no footer

### Fase 2 (Semana 2)
- [ ] hCaptcha em formulários
- [ ] Variantes de produtos (tamanho/preço)
- [ ] Busca de produtos

### Fase 3 (Semana 3)
- [ ] Carousel de produtos
- [ ] Integrar com backend
- [ ] Testes de performance

### Fase 4 (Semana 4)
- [ ] Facebook Pixel (optional)
- [ ] PWA manifest
- [ ] Deploy em produção

---

## 🎯 Prioridades

**🔴 Alta Prioridade:**
1. JSON-LD Schema (SEO)
2. Google Analytics (métricas)
3. Newsletter (marketing)

**🟡 Média Prioridade:**
4. hCaptcha (segurança)
5. Variantes de produtos (vendas)
6. Busca (usabilidade)

**🟢 Baixa Prioridade:**
7. Carousel (visual)
8. Facebook Pixel (retargeting)

---

**Status:** ✅ Pronto para implementar
**Data:** Novembro 2024
**Baseado em:** Análise Vita&Arte

