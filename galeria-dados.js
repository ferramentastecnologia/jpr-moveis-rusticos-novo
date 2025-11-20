/* ========================
   GALERIA - PROJETOS REALIZADOS
   JPR Móveis Rústicos
   ======================== */

const projetos = [
    {
        id: 1,
        titulo: "Sala de Jantar Clássica - Casa Luis Alves",
        descricao: "Mesa Sublime em tom caramelo com bancos rústicos em ambiente colonial com paredes bege e iluminação vintage.",
        ambiente: "Sala de Jantar",
        estilo: "Rústico Clássico",
        mesa: "Mesa Sublime",
        cor: "Caramelo",
        dimensoes: "1.80m x 1.00m",
        ano: 2024,
        imagem: "🏛️",
        antes: "Sala vazia com paredes sem acabamento",
        depois: "Sala completa com mesa, bancos e decoração",
        tags: ["Colonial", "Aconchego", "Tradicional", "Família"],
        avaliacao: 5,
        cliente: "Família Silva"
    },

    {
        id: 2,
        titulo: "Cozinha Moderna Rústica - Apartamento Centro",
        descricao: "Mesa Requinte Nobre em tom mel combinada com cozinha americana moderna. Espaço pequeno, máximo aproveitamento.",
        ambiente: "Cozinha",
        estilo: "Rústico Moderno",
        mesa: "Mesa Requinte Nobre",
        cor: "Mel",
        dimensoes: "1.40m x 0.80m",
        ano: 2024,
        imagem: "🍳",
        antes: "Cozinha vazia com piso de concreto",
        depois: "Integração perfeita mesa rústica + cozinha moderna",
        tags: ["Moderno", "Apartamento", "Funcional", "Claridão"],
        avaliacao: 5,
        cliente: "Casal João & Maria"
    },

    {
        id: 3,
        titulo: "Fazenda Familiar - Blumenau",
        descricao: "Mesa Glamour em tom tabaco escuro para 8 pessoas. Espaço amplo com pé-direito alto e janelas grandes.",
        ambiente: "Sala de Jantar",
        estilo: "Rústico Rural",
        mesa: "Mesa Glamour",
        cor: "Tabaco",
        dimensoes: "2.20m x 1.20m",
        ano: 2023,
        imagem: "🌾",
        antes: "Sala vazia de fazenda abandonada",
        depois: "Sala aconchegante para reunir toda a família",
        tags: ["Familiar", "Espaço Amplo", "Aconchego", "Reuniões"],
        avaliacao: 5,
        cliente: "Família Santos"
    },

    {
        id: 4,
        titulo: "Sala de Estar Sofisticada - Paraná",
        descricao: "Mesa Imperatriz com acabamento especial em tom caramelo. Espaço aberto integrado com sala de estar.",
        ambiente: "Sala de Estar",
        estilo: "Rústico Sofisticado",
        mesa: "Mesa Imperatriz",
        cor: "Caramelo",
        dimensoes: "1.60m x 0.90m",
        ano: 2024,
        imagem: "✨",
        antes: "Sala vazia com paredes cinzas",
        depois: "Ambiente sofisticado e acolhedor",
        tags: ["Sofisticação", "Elegância", "Moderno", "Minimalista"],
        avaliacao: 5,
        cliente: "Casal Costa"
    },

    {
        id: 5,
        titulo: "Loft Industrial - Florianópolis",
        descricao: "Mesa Requinte em tom mel com design reto. Combina rústico com industrial em espaço com vigas aparentes.",
        ambiente: "Loft",
        estilo: "Rústico Industrial",
        mesa: "Mesa Requinte",
        cor: "Mel",
        dimensoes: "1.70m x 0.95m",
        ano: 2024,
        imagem: "🏭",
        antes: "Loft vazio com paredes de concreto",
        depois: "Espaço moderno com toque rústico",
        tags: ["Industrial", "Loft", "Moderno", "Descontraído"],
        avaliacao: 5,
        cliente: "Profissional Autônomo"
    },

    {
        id: 6,
        titulo: "Casa de Praia Tropical - Paraná",
        descricao: "Mesa Glamour Mel em casa à beira-mar. Acabamento especial resistente a umidade. Design leve e arejado.",
        ambiente: "Casa de Praia",
        estilo: "Rústico Tropical",
        mesa: "Mesa Glamour Mel",
        cor: "Mel",
        dimensoes: "1.80m x 1.00m",
        ano: 2023,
        imagem: "🏖️",
        antes: "Área de refeições vazia com vista para mar",
        depois: "Espaço perfeito para reunir amigos",
        tags: ["Praia", "Tropical", "Leve", "Descontraído"],
        avaliacao: 5,
        cliente: "Família Rodriguez"
    },

    {
        id: 7,
        titulo: "Sítio Minimalista - Interior SC",
        descricao: "Mesa Nobreza em tom caramelo com linhas limpas. Integrada com decoração minimalista contemporânea.",
        ambiente: "Sítio",
        estilo: "Rústico Minimalista",
        mesa: "Mesa Nobreza",
        cor: "Caramelo",
        dimensoes: "1.50m x 0.85m",
        ano: 2024,
        imagem: "🌳",
        antes: "Área aberta sem mobiliário",
        depois: "Espaço zen para meditação e refeições",
        tags: ["Minimalista", "Natureza", "Tranquilidade", "Sustentável"],
        avaliacao: 5,
        cliente: "Casal Eco"
    },

    {
        id: 8,
        titulo: "Restaurante Boutique - Blumenau",
        descricao: "3 Mesas Encanto em tom tabaco. Espaço comercial com apenas 6 mesas. Ambiente intimista e sofisticado.",
        ambiente: "Restaurante",
        estilo: "Rústico Sofisticado",
        mesa: "Mesa Encanto",
        cor: "Tabaco",
        dimensoes: "1.20m x 0.80m (cada)",
        ano: 2023,
        imagem: "🍽️",
        antes: "Espaço vazio de restaurante novo",
        depois: "Ambiente gastronômico de alta qualidade",
        tags: ["Comercial", "Restaurante", "Intimista", "Premium"],
        avaliacao: 5,
        cliente: "Chef Marcelo"
    },

    {
        id: 9,
        titulo: "Casa Colonial Restaurada - Blumenau",
        descricao: "Mesa Requinte Nobre extensível em tom tabaco. Casa histórica de 1950 com elementos coloniais preservados.",
        ambiente: "Sala de Jantar",
        estilo: "Rústico Colonial",
        mesa: "Mesa Requinte Nobre Extensível",
        cor: "Tabaco",
        dimensoes: "1.60m → 2.40m",
        ano: 2023,
        imagem: "🏰",
        antes: "Casa abandonada com ruínas",
        depois: "Casa restaurada preservando história",
        tags: ["Colonial", "Histórico", "Preservação", "Elegância"],
        avaliacao: 5,
        cliente: "Fundação Histórica"
    },

    {
        id: 10,
        titulo: "Espaço Gourmet - Blumenau",
        descricao: "Mesa Luxúria em tom caramelo com bancada integrada. Espaço gourmet com churrasqueira e adega.",
        ambiente: "Espaço Gourmet",
        estilo: "Rústico Premium",
        mesa: "Mesa Luxúria",
        cor: "Caramelo",
        dimensoes: "2.00m x 1.10m",
        ano: 2024,
        imagem: "🍷",
        antes: "Quintal vazio com piscina",
        depois: "Área gourmet completa para entretenimento",
        tags: ["Premium", "Gourmet", "Entretenimento", "Luxo"],
        avaliacao: 5,
        cliente: "Empresário Silva"
    },

    {
        id: 11,
        titulo: "Casa Escandinava - Santa Catarina",
        descricao: "Mesa Sublime em tom mel com design minimalista. Integração perfeita com arquitetura escandinava moderna.",
        ambiente: "Sala de Jantar",
        estilo: "Rústico Escandinavo",
        mesa: "Mesa Sublime",
        cor: "Mel",
        dimensoes: "1.70m x 0.95m",
        ano: 2024,
        imagem: "❄️",
        antes: "Casa com móveis temporários",
        depois: "Ambiente aconchegante estilo nórdico",
        tags: ["Escandinavo", "Minimalista", "Aconchego", "Moderno"],
        avaliacao: 5,
        cliente: "Designer de Interiores"
    },

    {
        id: 12,
        titulo: "Pousada Boutique - Paraná",
        descricao: "8 Mesas Imperatriz em tom tabaco para espaço de refeição coletivas. Ambiente aconchegante para hóspedes.",
        ambiente: "Pousada",
        estilo: "Rústico Aconchegante",
        mesa: "Mesa Imperatriz",
        cor: "Tabaco",
        dimensoes: "1.40m x 0.80m (cada)",
        ano: 2023,
        imagem: "🏨",
        antes: "Pousada vazia sem identidade",
        depois: "Identidade visual rústica e acolhedora",
        tags: ["Hospedagem", "Aconchego", "Comercial", "Identidade"],
        avaliacao: 5,
        cliente: "Proprietária Paula"
    }
];

/* ========================
   FUNÇÕES AUXILIARES
   ======================== */

/**
 * Obter projeto por ID
 */
function obterProjetoPorId(id) {
    return projetos.find(p => p.id === parseInt(id));
}

/**
 * Obter projetos por estilo
 */
function obterProjetosPorEstilo(estilo) {
    return projetos.filter(p => p.estilo === estilo);
}

/**
 * Obter projetos por ambiente
 */
function obterProjetosPorAmbiente(ambiente) {
    return projetos.filter(p => p.ambiente === ambiente);
}

/**
 * Obter projetos por cor
 */
function obterProjetosPorCor(cor) {
    return projetos.filter(p => p.cor === cor);
}

/**
 * Obter estilos únicos
 */
function obterEstilos() {
    return [...new Set(projetos.map(p => p.estilo))];
}

/**
 * Obter ambientes únicos
 */
function obterAmbientes() {
    return [...new Set(projetos.map(p => p.ambiente))];
}

/**
 * Obter cores únicas
 */
function obterCores() {
    return [...new Set(projetos.map(p => p.cor))];
}

/**
 * Obter mesas únicas
 */
function obterMesas() {
    return [...new Set(projetos.map(p => p.mesa))];
}

/**
 * Buscar projetos por termo
 */
function buscarProjetos(termo) {
    const termoLower = termo.toLowerCase();
    return projetos.filter(p =>
        p.titulo.toLowerCase().includes(termoLower) ||
        p.descricao.toLowerCase().includes(termoLower) ||
        p.cliente.toLowerCase().includes(termoLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(termoLower))
    );
}

/**
 * Obter projetos populares (com melhor avaliação)
 */
function obterProjetosPopulares(limite = 3) {
    return projetos.sort((a, b) => b.avaliacao - a.avaliacao).slice(0, limite);
}

/**
 * Obter projetos recentes
 */
function obterProjetosRecentes(limite = 6) {
    return [...projetos].sort((a, b) => b.ano - a.ano).slice(0, limite);
}

/**
 * Filtrar projetos por múltiplos critérios
 */
function filtrarProjetos(filtros) {
    let resultado = [...projetos];

    if (filtros.estilo) {
        resultado = resultado.filter(p => p.estilo === filtros.estilo);
    }

    if (filtros.ambiente) {
        resultado = resultado.filter(p => p.ambiente === filtros.ambiente);
    }

    if (filtros.cor) {
        resultado = resultado.filter(p => p.cor === filtros.cor);
    }

    if (filtros.mesa) {
        resultado = resultado.filter(p => p.mesa === filtros.mesa);
    }

    if (filtros.termo) {
        resultado = resultado.filter(p =>
            p.titulo.toLowerCase().includes(filtros.termo.toLowerCase()) ||
            p.descricao.toLowerCase().includes(filtros.termo.toLowerCase())
        );
    }

    return resultado;
}
