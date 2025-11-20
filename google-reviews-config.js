/* ========================
   GOOGLE REVIEWS INTEGRATION
   Integração com Google Places API para avaliações em tempo real
   ======================== */

/**
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 *
 * 1. Obter API Key do Google:
 *    - Acesse: https://console.cloud.google.com/
 *    - Crie um novo projeto ou selecione um existente
 *    - Ative "Places API" em "APIs & Services"
 *    - Crie credenciais (API Key)
 *    - Configure restrições para seu domínio (segurança)
 *
 * 2. Encontrar o Place ID da sua loja:
 *    - Acesse: https://developers.google.com/maps/documentation/places/web-service/place-id
 *    - Ou use: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *    - Pesquise "JPR Móveis Rústicos Blumenau"
 *    - Copie o Place ID retornado
 *
 * 3. Configure as variáveis abaixo
 */

const GOOGLE_CONFIG = {
    // IMPORTANTE: Substitua com sua API Key real
    apiKey: 'SUA_API_KEY_AQUI',

    // IMPORTANTE: Substitua com o Place ID da sua loja
    placeId: 'SEU_PLACE_ID_AQUI',

    // Configurações opcionais
    language: 'pt-BR',
    cacheTimeout: 3600000, // 1 hora em milissegundos
    maxReviews: 20 // Máximo de reviews para exibir
};

/**
 * Buscar reviews do Google
 */
async function buscarReviewsGoogle() {
    // Verificar se API está configurada
    if (GOOGLE_CONFIG.apiKey === 'SUA_API_KEY_AQUI' || GOOGLE_CONFIG.placeId === 'SEU_PLACE_ID_AQUI') {
        console.warn('⚠️ Google Reviews não configurado. Configure GOOGLE_CONFIG em google-reviews-config.js');
        return null;
    }

    try {
        // Verificar cache
        const cache = verificarCache();
        if (cache) {
            console.log('✅ Reviews carregados do cache');
            return cache;
        }

        // Buscar do Google Places API
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_CONFIG.placeId}&fields=name,rating,reviews,user_ratings_total&language=${GOOGLE_CONFIG.language}&key=${GOOGLE_CONFIG.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('❌ Erro ao buscar reviews do Google:', data.status);
            return null;
        }

        const reviews = processarReviewsGoogle(data.result);

        // Salvar em cache
        salvarCache(reviews);

        console.log('✅ Reviews do Google carregados:', reviews.total);
        return reviews;

    } catch (error) {
        console.error('❌ Erro ao buscar reviews:', error);
        return null;
    }
}

/**
 * Processar reviews do Google para formato do sistema
 */
function processarReviewsGoogle(result) {
    const reviews = {
        total: result.user_ratings_total || 0,
        rating: result.rating || 0,
        reviews: []
    };

    if (result.reviews && result.reviews.length > 0) {
        reviews.reviews = result.reviews.slice(0, GOOGLE_CONFIG.maxReviews).map((review, index) => ({
            id: `google_${index + 1}`,
            cliente: review.author_name,
            foto: review.profile_photo_url,
            rating: review.rating,
            titulo: gerarTituloDeReview(review.rating),
            comentario: review.text,
            data: new Date(review.time * 1000).toISOString(),
            verificado: true,
            fonte: 'Google',
            link: review.author_url,
            util: review.likes || 0,
            naoUtil: 0,
            cidade: extrairCidade(review.author_name) || 'Não informado',
            produto: 'Produto da Loja'
        }));
    }

    return reviews;
}

/**
 * Gerar título baseado no rating
 */
function gerarTituloDeReview(rating) {
    const titulos = {
        5: 'Excelente!',
        4: 'Muito Bom!',
        3: 'Bom',
        2: 'Regular',
        1: 'Insatisfeito'
    };
    return titulos[rating] || 'Avaliação';
}

/**
 * Extrair cidade do nome do autor (se disponível)
 */
function extrairCidade(authorName) {
    // Lógica simples - pode ser melhorada
    const cidadesRegiao = ['Blumenau', 'Gaspar', 'Ilhota', 'Pomerode', 'Timbó', 'Brusque'];

    for (const cidade of cidadesRegiao) {
        if (authorName.toLowerCase().includes(cidade.toLowerCase())) {
            return cidade;
        }
    }

    return null;
}

/**
 * Verificar cache de reviews
 */
function verificarCache() {
    try {
        const cache = localStorage.getItem('google_reviews_cache');
        if (!cache) return null;

        const parsed = JSON.parse(cache);
        const agora = Date.now();

        // Verificar se cache expirou
        if (agora - parsed.timestamp > GOOGLE_CONFIG.cacheTimeout) {
            localStorage.removeItem('google_reviews_cache');
            return null;
        }

        return parsed.data;
    } catch (error) {
        return null;
    }
}

/**
 * Salvar reviews em cache
 */
function salvarCache(reviews) {
    try {
        const cache = {
            timestamp: Date.now(),
            data: reviews
        };
        localStorage.setItem('google_reviews_cache', JSON.stringify(cache));
    } catch (error) {
        console.error('Erro ao salvar cache:', error);
    }
}

/**
 * Limpar cache manualmente
 */
function limparCacheReviews() {
    localStorage.removeItem('google_reviews_cache');
    console.log('✅ Cache de reviews limpo');
}

/**
 * Calcular estatísticas dos reviews do Google
 */
function calcularEstatisticasGoogle(reviews) {
    if (!reviews || !reviews.reviews || reviews.reviews.length === 0) {
        return null;
    }

    const total = reviews.reviews.length;
    const ratings = reviews.reviews.map(r => r.rating);

    // Contar por estrela
    const count5 = ratings.filter(r => r === 5).length;
    const count4 = ratings.filter(r => r === 4).length;
    const count3 = ratings.filter(r => r === 3).length;
    const count2 = ratings.filter(r => r === 2).length;
    const count1 = ratings.filter(r => r === 1).length;

    return {
        total: reviews.total, // Total geral do Google
        totalExibidos: total,
        media: reviews.rating,
        verificadas: total,
        comResposta: 0, // Google não fornece esse dado
        percentual5: Math.round((count5 / total) * 100),
        percentual4: Math.round((count4 / total) * 100),
        percentual3: Math.round((count3 / total) * 100),
        percentual2: Math.round((count2 / total) * 100),
        percentual1: Math.round((count1 / total) * 100)
    };
}

/**
 * Mesclar reviews do Google com reviews locais
 */
function mesclarReviews(reviewsGoogle, reviewsLocais) {
    if (!reviewsGoogle || !reviewsGoogle.reviews) {
        return reviewsLocais;
    }

    // Combinar reviews
    const todoReviews = [
        ...reviewsGoogle.reviews,
        ...reviewsLocais.filter(r => !r.fonte || r.fonte !== 'Google')
    ];

    // Ordenar por data (mais recentes primeiro)
    todoReviews.sort((a, b) => new Date(b.data) - new Date(a.data));

    return todoReviews;
}

/**
 * Widget de Badge do Google
 */
function criarGoogleBadge(rating, total) {
    return `
        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png" alt="Google" style="height: 16px;">
            <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-weight: 700; color: #333;">${rating.toFixed(1)}</span>
                <span style="color: #FFA500;">★★★★★</span>
            </div>
            <span style="color: #666; font-size: 12px;">${total} avaliações</span>
        </div>
    `;
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GOOGLE_CONFIG,
        buscarReviewsGoogle,
        calcularEstatisticasGoogle,
        mesclarReviews,
        limparCacheReviews,
        criarGoogleBadge
    };
}

// Disponibilizar globalmente
window.buscarReviewsGoogle = buscarReviewsGoogle;
window.calcularEstatisticasGoogle = calcularEstatisticasGoogle;
window.mesclarReviews = mesclarReviews;
window.limparCacheReviews = limparCacheReviews;
window.criarGoogleBadge = criarGoogleBadge;
window.GOOGLE_CONFIG = GOOGLE_CONFIG;
