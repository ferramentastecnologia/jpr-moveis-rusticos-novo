// ========================
// GERENCIAMENTO DO CARRINHO
// ========================
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Atualizar contador do carrinho
function atualizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrinho.length;
    renderizarCarrinho();
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    // Salvar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();

    // Mostrar notificação
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// ========================
// CUPONS DE DESCONTO
// ========================
const cuponsValidos = {
    'PRIMEIRACOMPRA10': { desconto: 10, tipo: 'percentual', descricao: 'Primeira Compra - 10% OFF' },
    'BLACKFRIDAY20': { desconto: 20, tipo: 'percentual', descricao: 'Black Friday - 20% OFF' },
    'NATAL15': { desconto: 15, tipo: 'percentual', descricao: 'Natal - 15% OFF' },
    'FRETE50': { desconto: 50, tipo: 'fixo', descricao: 'R$ 50 de desconto no frete' },
    'NOVASJPR': { desconto: 5, tipo: 'percentual', descricao: 'Clientes Novas - 5% OFF' }
};

let cupomAplicado = null;
let desconto = 0;

function aplicarCupom() {
    const couponInput = document.getElementById('coupon-input');
    const cupomMsg = document.getElementById('coupon-message');
    const codigoCupom = couponInput.value.toUpperCase().trim();

    // Limpar mensagem anterior
    cupomMsg.textContent = '';
    cupomMsg.className = 'coupon-message';

    // Validar cupom
    if (!codigoCupom) {
        cupomMsg.textContent = 'Por favor, insira um código de cupom';
        cupomMsg.classList.add('error');
        return;
    }

    if (!cuponsValidos[codigoCupom]) {
        cupomMsg.textContent = '❌ Cupom inválido ou expirado';
        cupomMsg.classList.add('error');
        return;
    }

    // Aplicar cupom
    const cupomInfo = cuponsValidos[codigoCupom];
    cupomAplicado = codigoCupom;

    // Calcular desconto
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    if (cupomInfo.tipo === 'percentual') {
        desconto = (subtotal * cupomInfo.desconto) / 100;
    } else {
        desconto = cupomInfo.desconto;
    }

    // Mensagem de sucesso
    cupomMsg.textContent = `✓ ${cupomInfo.descricao} aplicado com sucesso!`;
    cupomMsg.classList.add('success');

    // Atualizar exibição do carrinho
    atualizarCarrinhoComDesconto();

    // Desabilitar input e botão
    couponInput.disabled = true;
    document.querySelector('.coupon-btn').disabled = true;
    document.querySelector('.coupon-btn').textContent = 'Cupom Aplicado';

    // Mostrar botão de remover
    document.getElementById('coupon-remove').style.display = 'block';

    // Mostrar notificação
    mostrarNotificacao(`Cupom "${codigoCupom}" aplicado!`);
}

function atualizarCarrinhoComDesconto() {
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const total = subtotal - desconto;

    document.getElementById('carrinho-subtotal').textContent = subtotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const discountRow = document.getElementById('discount-row');
    if (desconto > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('carrinho-discount').textContent = '-' + desconto.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    document.getElementById('carrinho-total-value').textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function removerCupom() {
    cupomAplicado = null;
    desconto = 0;

    const couponInput = document.getElementById('coupon-input');
    const cupomMsg = document.getElementById('coupon-message');

    couponInput.value = '';
    couponInput.disabled = false;
    couponInput.focus();

    document.querySelector('.coupon-btn').disabled = false;
    document.querySelector('.coupon-btn').textContent = 'Aplicar';

    cupomMsg.textContent = '';
    cupomMsg.className = 'coupon-message';

    // Esconder botão de remover
    document.getElementById('coupon-remove').style.display = 'none';

    document.getElementById('discount-row').style.display = 'none';

    // Atualizar total sem desconto
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('carrinho-subtotal').textContent = subtotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    document.getElementById('carrinho-total-value').textContent = subtotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    mostrarNotificacao('Cupom removido');
}

// Renderizar carrinho
function renderizarCarrinho() {
    const carrinhoItems = document.getElementById('carrinho-items');
    const carrinhoTotal = document.getElementById('carrinho-total-value');
    const carrinhoSubtotal = document.getElementById('carrinho-subtotal');

    if (carrinho.length === 0) {
        carrinhoItems.innerHTML = '<div class="carrinho-empty">Seu carrinho está vazio</div>';
        carrinhoTotal.textContent = 'R$ 0,00';
        if (carrinhoSubtotal) carrinhoSubtotal.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    carrinhoItems.innerHTML = carrinho.map(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        return `
            <div class="carrinho-item">
                <div class="carrinho-item-info">
                    <h4>${item.nome}</h4>
                    <p class="carrinho-item-price">${item.precoFormatado} x ${item.quantidade}</p>
                </div>
                <button class="carrinho-item-remove" onclick="removerDoCarrinho('${item.id}')">🗑️</button>
            </div>
        `;
    }).join('');

    // Mostrar subtotal
    if (carrinhoSubtotal) {
        carrinhoSubtotal.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // Calcular e mostrar total com desconto
    const totalComDesconto = total - desconto;
    carrinhoTotal.textContent = totalComDesconto.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Toggle carrinho lateral
function toggleCarrinho() {
    const modal = document.getElementById('carrinho-modal');
    modal.classList.toggle('active');
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Salvar carrinho no localStorage para a página de checkout
    localStorage.setItem('carrinhoCheckout', JSON.stringify(carrinho));

    // Redirecionar para checkout (página existente ou nova)
    window.location.href = 'checkout-novo.html';
}

// ========================
// GERENCIAMENTO DE PRODUTOS
// ========================

let filtroAtivo = 'todas';

// Renderizar grid de produtos - MELHORADO
function renderizarProdutos(filtro = 'todas', termoBusca = '') {
    const grid = document.getElementById('products-grid');

    let produtosFiltrados = filtro === 'todas'
        ? produtos
        : produtos.filter(p => p.categoria === filtro);

    // Aplicar busca
    if (termoBusca.trim()) {
        const termo = termoBusca.toLowerCase();
        produtosFiltrados = produtosFiltrados.filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo) ||
            p.categoria.toLowerCase().includes(termo)
        );
    }

    // Se nenhum produto encontrado
    if (produtosFiltrados.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Nenhum produto encontrado</div>';
        return;
    }

    grid.innerHTML = produtosFiltrados.map(produto => {
        const emoji = emojisProdutos[produto.id] || '🪵';
        const badgeClass = produto.categoria === 'Top Premium'
            ? 'top'
            : produto.categoria === 'Premium Plus'
            ? 'premium'
            : '';

        // Simular ratings
        const ratings = {
            'mesa-001': { stars: 5, count: 8 },
            'mesa-002': { stars: 5, count: 12 },
            'mesa-003': { stars: 4, count: 5 },
            'mesa-004': { stars: 5, count: 10 }
        };
        const rating = ratings[produto.id] || { stars: 5, count: 0 };
        const stars = '⭐'.repeat(rating.stars);

        return `
            <div class="product-card">
                <div class="product-badges">
                    ${produto.badge ? `<span class="product-badge ${badgeClass}">${produto.badge}</span>` : ''}
                </div>
                <div class="product-image-container">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                    <div class="quick-actions">
                        <button class="btn-wishlist" onclick="toggleWishlist(event)">❤️</button>
                        <button class="btn-compare" onclick="compareProducts(event)">⚖️</button>
                    </div>
                </div>
                <div class="product-header">
                    <h3 class="product-name">${produto.nome}</h3>
                    <span class="product-category">${produto.categoria}</span>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="count">(${rating.count})</span>
                    </div>
                    <p class="product-description">${produto.descricao}</p>
                    <div class="product-info">
                        <span class="stock">✅ ${produto.disponibilidade}</span>
                        <span class="delivery">📦 ${produto.prazoEntrega}</span>
                    </div>

                    <!-- SELETOR DE TAMANHO -->
                    <div class="product-sizes-section">
                        <label class="sizes-label">Tamanhos:</label>
                        <div class="product-sizes">
                            ${produto.tamanhos ? produto.tamanhos.map((t, idx) => `
                                <button class="size-option ${idx === 0 ? 'active' : ''}" onclick="selecionarTamanhoCard(event, '${produto.id}', '${t.tamanho}', ${t.preco}, '${t.precoFormatado}')">
                                    <span class="size-label">${t.tamanho}</span>
                                    <span class="size-price">${t.precoFormatado}</span>
                                </button>
                            `).join('') : '<span class="price-range">A partir de</span>'}
                        </div>
                    </div>

                    <!-- PREÇO DINÂMICO -->
                    <div class="product-price-display" data-product-id="${produto.id}">
                        <span class="price-label">Preço:</span>
                        <span class="product-price" data-price="${produto.preco}">${produto.precoFormatado}</span>
                    </div>
                </div>
                <div class="product-footer">
                    <button class="btn-adicionar" onclick="adicionarAoCarrinhoRapido('${produto.id}', event)">
                        🛒 Adicionar
                    </button>
                    <button class="btn-detalhes" onclick="abrirModalProduto('${produto.id}')">
                        📋 Mais detalhes
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Abrir modal do produto - MELHORADO com galeria e detalhes
function abrirModalProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const emoji = emojisProdutos[produto.id] || '🪵';

    // Simulação de galeria (3 variações do produto)
    const galeria = [emoji, emoji, emoji];
    const variantes = ['Natural', 'Escuro', 'Médio'];

    // Simulação de reviews
    const reviews = [
        { nome: 'Carlos M.', estrelas: 5, texto: 'Excelente qualidade! Produto chegou perfeito.' },
        { nome: 'Marina S.', estrelas: 5, texto: 'Muito bom mesmo, recomendo bastante.' },
        { nome: 'João P.', estrelas: 4, texto: 'Bom custo-benefício, atendimento impecável.' }
    ];

    // Calcular frete
    const resultadoFrete = calcularFrete('Blumenau'); // Usa cidade padrão para exibição

    const conteudo = `
        <div class="modal-product-modern">
            <!-- SEÇÃO ESQUERDA: Galeria -->
            <div class="modal-left-section">
                <div class="modal-main-image-modern">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="modal-image-large">
                    ${produto.badge ? `<div class="product-badge-large">${produto.badge}</div>` : ''}
                </div>
            </div>

            <!-- SEÇÃO DIREITA: Informações com Tabs -->
            <div class="modal-right-section">
                <!-- Header Superior - COMPACTO -->
                <div class="modal-header-modern" style="padding: 12px 0; margin-bottom: 8px;">
                    <div>
                        <h2 class="product-title-modal" style="font-size: 22px; margin: 0 0 4px 0;">${produto.nome}</h2>
                        <span class="modal-category-modern" style="font-size: 12px;">${produto.categoria}</span>
                    </div>
                    <div class="modal-rating-modern" style="font-size: 13px;">
                        <span class="stars">⭐⭐⭐⭐⭐</span>
                        <span class="rating-count">(${reviews.length})</span>
                    </div>
                </div>

                <!-- Preço e Frete - COMPACTO -->
                <div class="price-highlight-section" style="margin-bottom: 12px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                    <div class="price-main" style="font-size: 28px;">${produto.precoFormatado}</div>
                    <div class="availability-badge-modern" style="font-size: 12px;">
                        <span class="badge-dot"></span>
                        ${produto.disponibilidade}
                    </div>
                    ${resultadoFrete.gratis ? `
                        <div style="
                            background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                            color: white;
                            padding: 6px 14px;
                            border-radius: 30px;
                            font-weight: 700;
                            font-size: 12px;
                            display: inline-flex;
                            align-items: center;
                            gap: 6px;
                            box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
                            animation: pulse 2s infinite;
                        ">
                            <span style="font-size: 14px;">🚚</span>
                            FRETE GRÁTIS
                        </div>
                    ` : ''}
                </div>

                <!-- Seletores FIXOS (Fora do scroll) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; padding: 0 4px;">
                    <!-- Seletor de Tamanho -->
                    <div class="size-selector-modern">
                        <h4 style="font-size: 12px; margin: 0 0 6px 0; font-weight: 600; color: #5D4037;">Tamanho</h4>
                        <div class="size-options" style="display: flex; flex-direction: column; gap: 4px;">
                            ${produto.tamanhos ? produto.tamanhos.map((tamanho, idx) => `
                                <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selecionarTamanho(this, ${tamanho.preco}, '${tamanho.precoFormatado}')" style="padding: 6px 8px; font-size: 11px; border-radius: 6px;">
                                    <span class="size-text">${tamanho.tamanho}</span>
                                    <span class="size-price" style="font-weight: 600;">${tamanho.precoFormatado}</span>
                                </button>
                            `).join('') : '<p style="font-size: 11px;">Sob consulta</p>'}
                        </div>
                    </div>

                    <!-- Seletor de Acabamento -->
                    <div class="finish-selector-modern">
                        <h4 style="font-size: 12px; margin: 0 0 6px 0; font-weight: 600; color: #5D4037;">Acabamento</h4>
                        <div class="finish-options" style="display: flex; flex-direction: column; gap: 4px;">
                            ${variantes.map((variante, idx) => `
                                <button class="finish-btn ${idx === 0 ? 'active' : ''}" onclick="selecionarVariante(this, '${variante}')" style="padding: 6px 8px; font-size: 11px; border-radius: 6px;">
                                    <span class="finish-name">${variante}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Tabs de Navegação - COMPACTAS -->
                <div class="modal-tabs-container" style="gap: 6px; margin-bottom: 10px;">
                    <button class="modal-tab-btn active" onclick="mudarAbaModal(this, 'descricao')" style="padding: 6px 10px; font-size: 12px;">
                        📝 Descrição
                    </button>
                    <button class="modal-tab-btn" onclick="mudarAbaModal(this, 'especificacoes')" style="padding: 6px 10px; font-size: 12px;">
                        📐 Especificações
                    </button>
                    <button class="modal-tab-btn" onclick="mudarAbaModal(this, 'entrega')" style="padding: 6px 10px; font-size: 12px;">
                        🚚 Entrega
                    </button>
                    <button class="modal-tab-btn" onclick="mudarAbaModal(this, 'avaliacoes')" style="padding: 6px 10px; font-size: 12px;">
                        ⭐ Avaliações
                    </button>
                </div>

                <!-- Conteúdo das Abas - COM SCROLL -->
                <div class="modal-tabs-content" style="max-height: 140px; overflow-y: auto; padding-right: 8px; padding-bottom: 4px; margin-bottom: 6px;">
                    <!-- ABA 1: Descrição -->
                    <div class="modal-tab-pane active" id="descricao">
                        <p class="description-text" style="font-size: 11px; line-height: 1.3; margin: 0 0 8px 0; color: #5D4037;">${produto.descricaoLonga}</p>

                        <!-- Características - 2 COLUNAS -->
                        <div class="characteristics-modern">
                            <h4 style="font-size: 11px; margin: 0 0 5px 0; font-weight: 600; color: #5D4037;">Características</h4>
                            <ul class="char-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; list-style: none; padding: 0; margin: 0;">
                                ${produto.caracteristicas.map(car => `
                                    <li class="char-item" style="display: flex; align-items: start; gap: 4px; font-size: 10px; line-height: 1.3;">
                                        <span class="char-icon" style="color: #2E7D32; font-weight: bold; flex-shrink: 0; font-size: 11px;">✓</span>
                                        <span style="word-break: break-word;">${car}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- ABA 2: Especificações - GRID COMPACTO -->
                    <div class="modal-tab-pane" id="especificacoes">
                        <div class="specs-modern" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div class="spec-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="spec-icon" style="font-size: 18px;">📏</span>
                                <span class="spec-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Comprimento</span>
                                <span class="spec-value" style="font-weight: 600; font-size: 13px;">${produto.dimensoes.comprimento}</span>
                            </div>
                            <div class="spec-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="spec-icon" style="font-size: 18px;">↔️</span>
                                <span class="spec-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Largura</span>
                                <span class="spec-value" style="font-weight: 600; font-size: 13px;">${produto.dimensoes.largura}</span>
                            </div>
                            <div class="spec-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="spec-icon" style="font-size: 18px;">↕️</span>
                                <span class="spec-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Altura</span>
                                <span class="spec-value" style="font-weight: 600; font-size: 13px;">${produto.dimensoes.altura}</span>
                            </div>
                            <div class="spec-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="spec-icon" style="font-size: 18px;">⬚</span>
                                <span class="spec-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Espessura</span>
                                <span class="spec-value" style="font-weight: 600; font-size: 13px;">${produto.dimensoes.espessura}</span>
                            </div>
                        </div>
                    </div>

                    <!-- ABA 3: Entrega - GRID COMPACTO -->
                    <div class="modal-tab-pane" id="entrega">
                        <div class="delivery-info-modern" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div class="delivery-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="delivery-icon" style="font-size: 20px;">📦</span>
                                <span class="delivery-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Prazo</span>
                                <span class="delivery-value" style="font-weight: 600; font-size: 12px;">${produto.prazoEntrega}</span>
                            </div>
                            <div class="delivery-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="delivery-icon" style="font-size: 20px;">🛡️</span>
                                <span class="delivery-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Garantia</span>
                                <span class="delivery-value" style="font-weight: 600; font-size: 12px;">2 Anos</span>
                            </div>
                            <div class="delivery-card" style="padding: 10px; background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); border-radius: 8px; text-align: center; color: white;">
                                <span class="delivery-icon" style="font-size: 20px;">🚚</span>
                                <span class="delivery-label" style="display: block; font-size: 11px; opacity: 0.9; margin: 4px 0;">Frete</span>
                                <span class="delivery-value" style="font-weight: 700; font-size: 12px;">${resultadoFrete.gratis ? 'GRÁTIS' : 'Calcular'}</span>
                            </div>
                            <div class="delivery-card" style="padding: 10px; background: #F5F1E8; border-radius: 8px; text-align: center;">
                                <span class="delivery-icon" style="font-size: 20px;">🔒</span>
                                <span class="delivery-label" style="display: block; font-size: 11px; color: #6B5D4F; margin: 4px 0;">Seguro</span>
                                <span class="delivery-value" style="font-weight: 600; font-size: 12px;">Incluído</span>
                            </div>
                        </div>
                    </div>

                    <!-- ABA 4: Avaliações - COMPACTA -->
                    <div class="modal-tab-pane" id="avaliacoes">
                        <div class="reviews-modern" style="display: flex; flex-direction: column; gap: 10px;">
                            ${reviews.map(review => `
                                <div class="review-card" style="background: #F5F1E8; padding: 10px; border-radius: 8px;">
                                    <div class="review-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                        <span class="review-author" style="font-weight: 600; font-size: 13px;">${review.nome}</span>
                                        <span class="review-stars" style="font-size: 12px;">${'⭐'.repeat(review.estrelas)}</span>
                                    </div>
                                    <p class="review-text" style="font-size: 12px; margin: 0; line-height: 1.4;">${review.texto}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Botões de Ação - OTIMIZADOS -->
                <div class="modal-actions-modern" style="display: grid; grid-template-columns: 2.5fr 1fr; gap: 6px; margin-top: 6px;">
                    <button class="btn-primary-modal" onclick="adicionarAoCarrinho('${produto.id}'); fecharModalProduto();" style="padding: 9px 10px; font-size: 12px; font-weight: 600; border-radius: 8px;">
                        <span class="btn-icon" style="font-size: 14px;">🛒</span>
                        <span>Adicionar ao Carrinho</span>
                    </button>
                    <button class="btn-secondary-modal" onclick="toggleWishlistModal(this)" style="padding: 9px 10px; font-size: 18px; border-radius: 8px;">
                        <span class="btn-icon">❤️</span>
                    </button>
                </div>

                <!-- Trust Badges - OTIMIZADOS -->
                <div class="trust-badges-modern" style="display: flex; gap: 4px; justify-content: space-around; margin-top: 5px; padding-top: 5px; border-top: 1px solid #E5D4C1;">
                    <div class="trust-badge" style="text-align: center; font-size: 8px; line-height: 1.2;">
                        <span style="font-size: 12px; display: block;">🔐</span>
                        <small>Compra Segura</small>
                    </div>
                    <div class="trust-badge" style="text-align: center; font-size: 8px; line-height: 1.2;">
                        <span style="font-size: 12px; display: block;">📱</span>
                        <small>WhatsApp</small>
                    </div>
                    <div class="trust-badge" style="text-align: center; font-size: 8px; line-height: 1.2;">
                        <span style="font-size: 12px; display: block;">✓</span>
                        <small>Entrega OK</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-product-content').innerHTML = conteudo;
    document.getElementById('produto-modal').classList.add('active');
}

// Funções auxiliares para o modal
function selecionarImagemModal(indice) {
    const thumbnails = document.querySelectorAll('.modal-thumbnail-modern');
    thumbnails.forEach((t, idx) => {
        t.classList.toggle('active', idx === indice);
    });
}

// Função para mudar abas no modal
function mudarAbaModal(botao, abaId) {
    // Remover ativo de todos os botões
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    botao.classList.add('active');

    // Remover ativo de todos os painéis
    document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    // Adicionar ativo ao painel correto
    const painel = document.getElementById(abaId);
    if (painel) {
        painel.classList.add('active');
    }
}

function selecionarTamanho(btn, preco, precoFormatado) {
    const buttons = btn.parentElement.querySelectorAll('.size-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Atualizar preço na seção de preço
    const priceSection = document.querySelector('.price-main');
    if (priceSection) {
        priceSection.textContent = precoFormatado;
    }

    mostrarNotificacao(`Tamanho selecionado: ${btn.querySelector('.size-text').textContent}`);
}

function selecionarVariante(btn, variante) {
    const buttons = btn.parentElement.querySelectorAll('.finish-btn, .variant-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mostrarNotificacao(`Acabamento "${variante}" selecionado!`);
}

// Selecionar tamanho direto no card
function selecionarTamanhoCard(event, produtoId, tamanho, preco, precoFormatado) {
    event.preventDefault();

    // Remover ativo de todos os botões de tamanho deste produto
    const card = event.target.closest('.product-card');
    const buttons = card.querySelectorAll('.size-option');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Adicionar ativo ao selecionado
    event.target.closest('.size-option').classList.add('active');

    // Atualizar preço dinâmico
    const priceDisplay = card.querySelector('.product-price');
    priceDisplay.textContent = precoFormatado;
    priceDisplay.dataset.price = preco;

    // Armazenar tamanho selecionado no card
    card.dataset.selectedSize = tamanho;
    card.dataset.selectedPrice = preco;

    mostrarNotificacao(`${tamanho} selecionado - ${precoFormatado}`);
}

// Adicionar ao carrinho com tamanho pré-selecionado
function adicionarAoCarrinhoRapido(produtoId, event) {
    const card = event.target.closest('.product-card');
    const selectedSize = card.dataset.selectedSize || (card.querySelector('.size-option.active') ?
        card.querySelector('.size-option.active').querySelector('.size-label').textContent : null);

    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === produtoId && item.tamanhoSelecionado === selectedSize);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            tamanhoSelecionado: selectedSize,
            quantidade: 1,
            precoSelecionado: card.dataset.selectedPrice || produto.preco
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    mostrarNotificacao(`${produto.nome} (${selectedSize || 'Padrão'}) adicionado ao carrinho! ✅`);
}

function toggleWishlistModal(btn) {
    btn.textContent = btn.textContent === '❤️ Salvar para Depois' ? '🤍 Removido' : '❤️ Salvar para Depois';
    mostrarNotificacao(btn.textContent === '❤️ Salvar para Depois' ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
}

// Fechar modal do produto
function fecharModalProduto() {
    document.getElementById('produto-modal').classList.remove('active');
}

// ========================
// FAQ - TOGGLE
// ========================
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');

    // Fechar todas as FAQs abertas
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Abrir apenas se não estava aberta
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// ========================
// FILTROS E BUSCA - MELHORADO
// ========================

let termoBuscaAtual = '';

function inicializarFiltros() {
    const botoesFiltro = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    // Filtros por categoria
    botoesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
            botoesFiltro.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroAtivo = btn.getAttribute('data-filter');
            renderizarProdutos(filtroAtivo, termoBuscaAtual);
        });
    });

    // Busca em tempo real
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            termoBuscaAtual = e.target.value;
            renderizarProdutos(filtroAtivo, termoBuscaAtual);
        });
    }

    // Ordenação
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            ordenarProdutos(e.target.value);
        });
    }
}

function ordenarProdutos(tipo) {
    const grid = document.getElementById('products-grid');
    const items = Array.from(grid.children);

    items.sort((a, b) => {
        const precoa = parseFloat(a.querySelector('.product-price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const precob = parseFloat(b.querySelector('.product-price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));

        switch(tipo) {
            case 'preco-menor':
                return precoa - precob;
            case 'preco-maior':
                return precob - precoa;
            default:
                return 0;
        }
    });

    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(item));
}

// Wishlist
function toggleWishlist(event) {
    event.stopPropagation();
    const btn = event.target;
    btn.textContent = btn.textContent === '❤️' ? '🤍' : '❤️';
    mostrarNotificacao(btn.textContent === '❤️' ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
}

// Comparar produtos
function compareProducts(event) {
    event.stopPropagation();
    mostrarNotificacao('Funcionalidade de comparação em breve!');
}

// ========================
// NOTIFICAÇÕES
// ========================

function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);

    // Remover após 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
function adicionarEstilosAnimacao() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================
// FORMULÁRIO DE CONTATO
// ========================

function inicializarFormularioContato() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = new FormData(form);
        const dados = {
            nome: form.querySelector('input[placeholder="Seu Nome"]').value,
            email: form.querySelector('input[placeholder="Seu Email"]').value,
            mensagem: form.querySelector('textarea').value
        };

        // Aqui você pode enviar os dados para o backend
        console.log('Dados do formulário:', dados);

        // Mostrar mensagem de sucesso
        mostrarNotificacao('✓ Mensagem enviada com sucesso!');
        form.reset();
    });
}

// ========================
// NEWSLETTER
// ========================
function inscreverNewsletter(event) {
    event.preventDefault();

    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Por favor, insira um email válido';
        message.className = 'newsletter-message error';
        return;
    }

    // Simular envio
    message.textContent = 'Processando...';
    message.className = 'newsletter-message';

    setTimeout(() => {
        // Salvar no localStorage (em produção seria uma API)
        let inscricoes = JSON.parse(localStorage.getItem('newsLetterInscritos')) || [];
        inscricoes.push({
            email,
            data: new Date().toISOString()
        });
        localStorage.setItem('newsLetterInscritos', JSON.stringify(inscricoes));

        // Mensagem de sucesso
        message.textContent = '✓ Parabéns! Você foi inscrito com sucesso. Fique de olho na sua caixa de email!';
        message.className = 'newsletter-message success';

        // Limpar input
        document.getElementById('newsletter-email').value = '';

        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            message.textContent = '';
            message.className = 'newsletter-message';
        }, 5000);
    }, 800);
}

// ========================
// SCROLL PARA SEÇÃO
// ========================

function scrollTo(sectionId) {
    const elemento = document.getElementById(sectionId);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================
// INICIALIZAÇÃO
// ========================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes
    adicionarEstilosAnimacao();
    renderizarProdutos();
    atualizarCarrinho();
    inicializarFiltros();
    inicializarFormularioContato();

    // Fechar modais ao clicar fora
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('produto-modal');
        if (e.target === modal) {
            fecharModalProduto();
        }
    });

    // Fechar carrinho ao clicar fora
    document.addEventListener('click', (e) => {
        const carrinhoModal = document.getElementById('carrinho-modal');
        const btnCarrinho = document.querySelector('.btn-carrinho');

        if (carrinhoModal.classList.contains('active') &&
            !carrinhoModal.contains(e.target) &&
            !btnCarrinho.contains(e.target)) {
            toggleCarrinho();
        }
    });
});
