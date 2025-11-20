/* ========================
   CALCULADORA DE FRETE JPR
   Sistema de cálculo e exibição de frete
   ======================== */

const FRETE_CONFIG = {
    cidadesFreteGratis: ['Blumenau', 'Luiz Alves'],

    tabelaFrete: {
        // Santa Catarina - Frete Grátis
        'Blumenau': 0,
        'Luiz Alves': 0,

        // Santa Catarina - Com Frete
        'Gaspar': 50,
        'Ilhota': 80,
        'Pomerode': 60,
        'Timbó': 70,
        'Brusque': 100,
        'Guabiruba': 90,
        'Indaial': 85,
        'Itajaí': 70,
        'Balneário Camboriú': 90,
        'Navegantes': 75,

        // Santa Catarina - Mais distantes
        'Jaraguá do Sul': 150,
        'Rio do Sul': 200,
        'Florianópolis': 250,

        // Paraná
        'Curitiba': 300,
        'Joinville': 180,
        'Paranaguá': 320
    }
};

/**
 * Verifica se cidade tem frete grátis
 */
function temFreteGratis(cidade) {
    if (!cidade) return false;

    const cidadeNormalizada = cidade.trim();
    return FRETE_CONFIG.cidadesFreteGratis.some(c =>
        cidadeNormalizada.toLowerCase().includes(c.toLowerCase())
    );
}

/**
 * Calcula valor do frete
 */
function calcularFrete(cidade) {
    if (!cidade) return { valor: null, gratis: false };

    const cidadeNormalizada = cidade.trim();

    // Busca exata
    if (FRETE_CONFIG.tabelaFrete[cidadeNormalizada] !== undefined) {
        const valor = FRETE_CONFIG.tabelaFrete[cidadeNormalizada];
        return {
            valor: valor,
            gratis: valor === 0,
            cidade: cidadeNormalizada
        };
    }

    // Busca parcial
    for (const [cidadeTabela, valor] of Object.entries(FRETE_CONFIG.tabelaFrete)) {
        if (cidadeNormalizada.toLowerCase().includes(cidadeTabela.toLowerCase())) {
            return {
                valor: valor,
                gratis: valor === 0,
                cidade: cidadeTabela
            };
        }
    }

    // Cidade não encontrada - consultar
    return {
        valor: null,
        gratis: false,
        cidade: cidadeNormalizada,
        consultarVendedor: true
    };
}

/**
 * Formata mensagem de frete
 */
function formatarMensagemFrete(resultadoFrete) {
    if (!resultadoFrete || !resultadoFrete.cidade) {
        return 'Consulte o frete para sua região';
    }

    if (resultadoFrete.gratis) {
        return `🎉 FRETE GRÁTIS para ${resultadoFrete.cidade}!`;
    }

    if (resultadoFrete.consultarVendedor) {
        return `📞 Consulte o frete via WhatsApp`;
    }

    return `Frete: R$ ${resultadoFrete.valor.toFixed(2).replace('.', ',')}`;
}

/**
 * Cria badge de frete grátis
 */
function criarBadgeFreteGratis() {
    return `
        <div class="badge-frete-gratis" style="
            background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
            animation: pulse 2s infinite;
        ">
            <span style="font-size: 18px;">🚚</span>
            FRETE GRÁTIS
        </div>
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        </style>
    `;
}

/**
 * Cria banner de frete grátis para regiões
 */
function criarBannerFreteGratis() {
    const cidades = FRETE_CONFIG.cidadesFreteGratis.join(' e ');

    return `
        <div class="banner-frete-gratis" style="
            background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 6px 20px rgba(46, 125, 50, 0.3);
        ">
            <div style="font-size: 32px; margin-bottom: 8px;">🚚✨</div>
            <div style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
                FRETE GRÁTIS
            </div>
            <div style="font-size: 14px; opacity: 0.95;">
                Para ${cidades} e região
            </div>
            <div style="font-size: 12px; margin-top: 12px; opacity: 0.8;">
                Outras cidades de SC e PR: consulte o valor
            </div>
        </div>
    `;
}

/**
 * Cria calculadora de frete interativa
 */
function criarCalculadoraFrete() {
    return `
        <div class="calculadora-frete" style="
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 20px auto;
        ">
            <h3 style="color: #5D4037; margin-bottom: 16px; text-align: center;">
                🚚 Calcule o Frete
            </h3>

            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; color: #6B5D4F; font-weight: 600;">
                    Sua Cidade:
                </label>
                <select id="frete-cidade-select" style="
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #E5D4C1;
                    border-radius: 8px;
                    font-size: 15px;
                    font-family: inherit;
                ">
                    <option value="">Selecione sua cidade...</option>
                    ${Object.keys(FRETE_CONFIG.tabelaFrete).map(cidade =>
                        `<option value="${cidade}">${cidade}</option>`
                    ).join('')}
                </select>
            </div>

            <div id="frete-resultado" style="
                padding: 16px;
                background: #F5F1E8;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
                display: none;
            "></div>
        </div>

        <script>
            document.getElementById('frete-cidade-select').addEventListener('change', function(e) {
                const cidade = e.target.value;
                const resultado = document.getElementById('frete-resultado');

                if (!cidade) {
                    resultado.style.display = 'none';
                    return;
                }

                const frete = calcularFrete(cidade);
                resultado.style.display = 'block';

                if (frete.gratis) {
                    resultado.style.background = 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)';
                    resultado.style.color = 'white';
                    resultado.innerHTML = '🎉 FRETE GRÁTIS!';
                } else {
                    resultado.style.background = '#F5F1E8';
                    resultado.style.color = '#5D4037';
                    resultado.innerHTML = 'Frete: R$ ' + frete.valor.toFixed(2).replace('.', ',');
                }
            });
        </script>
    `;
}

/**
 * Adiciona informação de frete no produto
 */
function adicionarInfoFreteProduto(elementoProduto, cidade) {
    const frete = calcularFrete(cidade || 'Blumenau');

    const badgeHTML = frete.gratis ? `
        <div class="produto-frete-badge" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: #2E7D32;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10;
        ">
            🚚 FRETE GRÁTIS
        </div>
    ` : '';

    return badgeHTML;
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        temFreteGratis,
        calcularFrete,
        formatarMensagemFrete,
        criarBadgeFreteGratis,
        criarBannerFreteGratis,
        criarCalculadoraFrete,
        adicionarInfoFreteProduto,
        FRETE_CONFIG
    };
}

// Disponibilizar globalmente
window.temFreteGratis = temFreteGratis;
window.calcularFrete = calcularFrete;
window.formatarMensagemFrete = formatarMensagemFrete;
window.criarBadgeFreteGratis = criarBadgeFreteGratis;
window.criarBannerFreteGratis = criarBannerFreteGratis;
window.criarCalculadoraFrete = criarCalculadoraFrete;
window.adicionarInfoFreteProduto = adicionarInfoFreteProduto;
window.FRETE_CONFIG = FRETE_CONFIG;
