/* ========================
   AVALIAÇÕES - SISTEMA DE REVIEWS
   JPR Móveis Rústicos
   ======================== */

const avaliacoes = [
    {
        id: 1,
        cliente: "Maria Silva",
        email: "maria@email.com",
        cidade: "Luis Alves, SC",
        produto: "Mesa Sublime",
        rating: 5,
        titulo: "Excelente qualidade e acabamento perfeito!",
        comentario: "A mesa chegou conforme prometido e superou minhas expectativas. O acabamento é impecável, a madeira é de excelente qualidade e os bancos são muito confortáveis. Recomendo para todos que buscam qualidade. Minha família toda aprova!",
        data: "2024-11-08",
        verificado: true,
        fotos: [],
        util: 24,
        naoUtil: 1,
        resposta: {
            texto: "Muito obrigado pelo feedback, Maria! Ficamos felizes que a mesa superou suas expectativas. Esperamos recebê-la em breve para uma foto da mesa em seu ambiente! 🪵",
            data: "2024-11-09"
        }
    },

    {
        id: 2,
        cliente: "João Santos",
        email: "joao@email.com",
        cidade: "Blumenau, SC",
        produto: "Mesa Glamour",
        rating: 5,
        titulo: "Perfeito! Exatamente como esperava",
        comentario: "Adorei a mesa! O atendimento foi impecável, o pessoal respondeu todos os meus questionamentos sobre personalização. A entrega chegou rápida e a qualidade é nota 10. Montagem foi fácil e agora tenho uma mesa que vai durar décadas.",
        data: "2024-11-07",
        verificado: true,
        fotos: [],
        util: 18,
        naoUtil: 0,
        resposta: {
            texto: "Obrigado João! Fico feliz que aproveitou nosso atendimento e que a mesa está perfeita. Essa é nossa promessa: qualidade que dura gerações! 🙌",
            data: "2024-11-08"
        }
    },

    {
        id: 3,
        cliente: "Ana Costa",
        email: "ana@email.com",
        cidade: "Paraná",
        produto: "Mesa Requinte Nobre",
        rating: 5,
        titulo: "Melhor compra que fiz este ano",
        comentario: "Após 6 meses usando a mesa, continuo muito satisfeita. A madeira mantém seu brilho, os bancos são firmes e confortáveis, e o acabamento não apresentou nenhum problema. Vale cada centavo investido. Pensava em comprar uma mesa mais barata, mas agora vejo que economizei no longo prazo.",
        data: "2024-11-06",
        verificado: true,
        fotos: [],
        util: 32,
        naoUtil: 2,
        resposta: {
            texto: "Ana, seu feedback é precioso! Isso é exatamente o que pregamos: investimento em qualidade. Obrigado por confiar na JPR! 💚",
            data: "2024-11-07"
        }
    },

    {
        id: 4,
        cliente: "Carlos Mendes",
        email: "carlos@email.com",
        cidade: "Joinville, SC",
        produto: "Mesa Luxúria",
        rating: 5,
        titulo: "Restaurante adora! Clientes fazem elogios",
        comentario: "Comprei 4 mesas para meu restaurante boutique e foram as melhores compras que fiz. Os clientes comentam sobre a qualidade, o acabamento rústico cria uma atmosfera perfeita. A madeira é resistente e fácil de limpar. Investimento que valeu 100%.",
        data: "2024-11-05",
        verificado: true,
        fotos: [],
        util: 28,
        naoUtil: 1,
        resposta: {
            texto: "Carlos, que honra servir seu restaurante! Que os clientes continuem apreciando nossos móveis. Qualidade é nossa assinatura! 🍽️",
            data: "2024-11-06"
        }
    },

    {
        id: 5,
        cliente: "Fernanda Lima",
        email: "fernanda@email.com",
        cidade: "Brusque, SC",
        produto: "Mesa Imperatriz",
        rating: 5,
        titulo: "Atendimento impecável, produto excepcional",
        comentario: "Desde o primeiro contato até a entrega, tudo foi profissional. Consegui personalizar exatamente como queria, as cores combinaram perfeitamente com meu ambiente. A mesa está linda e todos os amigos que visitam elogiam. Voltaria a comprar com certeza!",
        data: "2024-11-04",
        verificado: true,
        fotos: [],
        util: 21,
        naoUtil: 0,
        resposta: {
            texto: "Fernanda, fico feliz que personalizamos exatamente como você queria! Sua mesa ficou belíssima. Nos vemos na próxima! 😊",
            data: "2024-11-05"
        }
    },

    {
        id: 6,
        cliente: "Ricardo Souza",
        email: "ricardo@email.com",
        cidade: "Santa Catarina",
        produto: "Mesa Paris",
        rating: 4,
        titulo: "Ótima qualidade com pequeno detalhe",
        comentario: "Adorei a mesa, qualidade excelente mesmo! Apenas um pequeno detalhe: um dos bancos chegou com um pequeno arranhão na parte inferior. Nada que prejudique a função, mas foi logo resolvido pela equipe. No geral, muito satisfeito!",
        data: "2024-11-03",
        verificado: true,
        fotos: [],
        util: 15,
        naoUtil: 1,
        resposta: {
            texto: "Ricardo, obrigado por pontuar! Lamentamos pelo arranhão, mas fico feliz que foi resolvido. Qualidade é nossa prioridade! 🙏",
            data: "2024-11-04"
        }
    },

    {
        id: 7,
        cliente: "Patricia Oliveira",
        email: "patricia@email.com",
        cidade: "Blumenau, SC",
        produto: "Mesa Charme",
        rating: 5,
        titulo: "Perfeito para pequenos apartamentos!",
        comentario: "Comprei a versão menor para meu apartamento e foi perfeita! Ocupa o espaço ideal, não é nem grande demais nem pequena. A qualidade rústica combinou com meu estilo escandinavo moderno. Recomendo para quem busca algo compacto mas de qualidade premium.",
        data: "2024-11-02",
        verificado: true,
        fotos: [],
        util: 19,
        naoUtil: 0,
        resposta: {
            texto: "Patricia, que bacana sua combinação de rústico com escandinavo! Ficou moderna e aconchegante. Obrigado por escolher a JPR! 🏠",
            data: "2024-11-03"
        }
    },

    {
        id: 8,
        cliente: "Bruno Costa",
        email: "bruno@email.com",
        cidade: "Itajaí, SC",
        produto: "Mesa Nobreza",
        rating: 5,
        titulo: "Investimento que vale a pena!",
        comentario: "Pensei bastante antes de fazer essa compra porque não é barata. Mas após 4 meses com a mesa, vejo que foi o melhor investimento em móvel que já fiz. Qualidade que dura anos e anos. Minha avó tinha uma mesa similar há 40 anos e ainda está perfeita!",
        data: "2024-11-01",
        verificado: true,
        fotos: [],
        util: 26,
        naoUtil: 0,
        resposta: {
            texto: "Bruno, histórias como essa nos inspiram! Móveis para gerações é nosso lema. Obrigado pela confiança! 👨‍👩‍👧‍👦",
            data: "2024-11-02"
        }
    }
];

/* ========================
   FUNÇÕES AUXILIARES
   ======================== */

/**
 * Obter avaliação por ID
 */
function obterAvaliacaoPorId(id) {
    return avaliacoes.find(a => a.id === parseInt(id));
}

/**
 * Obter avaliações por produto
 */
function obterAvaliacoesPorProduto(produto) {
    return avaliacoes.filter(a => a.produto === produto);
}

/**
 * Obter avaliações por rating
 */
function obterAvaliacoesPorRating(rating) {
    return avaliacoes.filter(a => a.rating === rating);
}

/**
 * Obter média de avaliações
 */
function obterMediaAvaliacoes() {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((total, a) => total + a.rating, 0);
    return (soma / avaliacoes.length).toFixed(1);
}

/**
 * Obter total de avaliações
 */
function obterTotalAvaliacoes() {
    return avaliacoes.length;
}

/**
 * Obter distribuição de ratings
 */
function obterDistribuicaoRatings() {
    const distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    avaliacoes.forEach(a => {
        distribuicao[a.rating]++;
    });
    return distribuicao;
}

/**
 * Obter avaliações verificadas
 */
function obterAvaliacoesVerificadas() {
    return avaliacoes.filter(a => a.verificado);
}

/**
 * Obter avaliações ordenadas por úteis
 */
function obterAvaliacoesPopulares(limite = 5) {
    return [...avaliacoes]
        .sort((a, b) => (b.util - b.naoUtil) - (a.util - a.naoUtil))
        .slice(0, limite);
}

/**
 * Obter avaliações mais recentes
 */
function obterAvaliacoesRecentes(limite = 5) {
    return [...avaliacoes]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, limite);
}

/**
 * Adicionar nova avaliação
 */
function adicionarAvaliacao(novaAvaliacao) {
    const id = Math.max(...avaliacoes.map(a => a.id)) + 1;
    const avaliacao = {
        id: id,
        cliente: novaAvaliacao.cliente,
        email: novaAvaliacao.email,
        cidade: novaAvaliacao.cidade || "Não informado",
        produto: novaAvaliacao.produto,
        rating: parseInt(novaAvaliacao.rating),
        titulo: novaAvaliacao.titulo,
        comentario: novaAvaliacao.comentario,
        data: new Date().toISOString().split('T')[0],
        verificado: false, // Aguardando moderação
        fotos: novaAvaliacao.fotos || [],
        util: 0,
        naoUtil: 0,
        resposta: null
    };

    avaliacoes.push(avaliacao);

    // Salvar em localStorage para persistência
    localStorage.setItem('avaliacoes-pendentes', JSON.stringify(
        avaliacoes.filter(a => !a.verificado)
    ));

    return avaliacao;
}

/**
 * Contar avaliações úteis
 */
function marcarComoUtil(id) {
    const avaliacao = obterAvaliacaoPorId(id);
    if (avaliacao) {
        avaliacao.util += 1;
    }
}

/**
 * Contar avaliações não úteis
 */
function marcarComoNaoUtil(id) {
    const avaliacao = obterAvaliacaoPorId(id);
    if (avaliacao) {
        avaliacao.naoUtil += 1;
    }
}

/**
 * Buscar avaliações por termo
 */
function buscarAvaliacoes(termo) {
    const termoLower = termo.toLowerCase();
    return avaliacoes.filter(a =>
        a.cliente.toLowerCase().includes(termoLower) ||
        a.titulo.toLowerCase().includes(termoLower) ||
        a.comentario.toLowerCase().includes(termoLower) ||
        a.produto.toLowerCase().includes(termoLower) ||
        a.cidade.toLowerCase().includes(termoLower)
    );
}

/**
 * Obter estatísticas de avaliações
 */
function obterEstatisticasAvaliacoes() {
    const distribuicao = obterDistribuicaoRatings();
    const total = obterTotalAvaliacoes();

    return {
        total: total,
        media: obterMediaAvaliacoes(),
        percentual5: total > 0 ? ((distribuicao[5] / total) * 100).toFixed(0) : 0,
        percentual4: total > 0 ? ((distribuicao[4] / total) * 100).toFixed(0) : 0,
        percentual3: total > 0 ? ((distribuicao[3] / total) * 100).toFixed(0) : 0,
        percentual2: total > 0 ? ((distribuicao[2] / total) * 100).toFixed(0) : 0,
        percentual1: total > 0 ? ((distribuicao[1] / total) * 100).toFixed(0) : 0,
        distribuicao: distribuicao,
        verificadas: obterAvaliacoesVerificadas().length,
        comResposta: avaliacoes.filter(a => a.resposta).length
    };
}

/**
 * Filtrar avaliações por múltiplos critérios
 */
function filtrarAvaliacoes(filtros) {
    let resultado = [...avaliacoes];

    if (filtros.rating) {
        resultado = resultado.filter(a => a.rating === parseInt(filtros.rating));
    }

    if (filtros.produto) {
        resultado = resultado.filter(a => a.produto === filtros.produto);
    }

    if (filtros.verificado !== undefined) {
        resultado = resultado.filter(a => a.verificado === filtros.verificado);
    }

    if (filtros.termo) {
        resultado = resultado.filter(a =>
            a.cliente.toLowerCase().includes(filtros.termo.toLowerCase()) ||
            a.titulo.toLowerCase().includes(filtros.termo.toLowerCase()) ||
            a.comentario.toLowerCase().includes(filtros.termo.toLowerCase())
        );
    }

    if (filtros.ordenar === 'util') {
        resultado.sort((a, b) => (b.util - b.naoUtil) - (a.util - a.naoUtil));
    } else if (filtros.ordenar === 'recente') {
        resultado.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else if (filtros.ordenar === 'rating') {
        resultado.sort((a, b) => b.rating - a.rating);
    }

    return resultado;
}

/**
 * Obter produtos únicos
 */
function obterProdutosComAvaliacoes() {
    return [...new Set(avaliacoes.map(a => a.produto))];
}
