/* ========================
   ADMIN - DADOS E FUNÇÕES
   JPR Móveis Rústicos
   ======================== */

// Usuários admin (futuramente com autenticação real)
const usuariosAdmin = [
    {
        id: 1,
        nome: "Administrador JPR",
        email: "admin@jprmoveis.com.br",
        senha: "JPR2025#Admin", // Hash em produção!
        role: "admin",
        ativo: true,
        criadoEm: "2025-11-20",
        ultimoAcesso: "2025-11-20"
    },
    {
        id: 2,
        nome: "Gerente",
        email: "gerente@jprmoveis.com.br",
        senha: "JPR2025#Gerente",
        role: "gerente",
        ativo: true,
        criadoEm: "2025-11-20",
        ultimoAcesso: "2025-11-20"
    }
];

// Sessão do usuário logado
let usuarioLogado = null;

/**
 * Fazer login
 */
function fazerLogin(email, senha) {
    const usuario = usuariosAdmin.find(u => u.email === email && u.senha === senha);

    if (usuario && usuario.ativo) {
        usuarioLogado = { ...usuario };
        usuarioLogado.ultimoAcesso = new Date().toISOString().split('T')[0];

        // Salvar em sessionStorage (não persiste entre abas)
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        return true;
    }

    return false;
}

/**
 * Fazer logout
 */
function fazerLogout() {
    usuarioLogado = null;
    sessionStorage.removeItem('usuarioLogado');
}

/**
 * Verificar se está logado
 */
function verificarAutenticacao() {
    if (!usuarioLogado) {
        const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado') || 'null');
        if (usuario) {
            usuarioLogado = usuario;
            return true;
        }
        return false;
    }
    return true;
}

/**
 * Obter usuário logado
 */
function obterUsuarioLogado() {
    return usuarioLogado || JSON.parse(sessionStorage.getItem('usuarioLogado') || 'null');
}

/* ========================
   ESTATÍSTICAS E MÉTRICAS
   ======================== */

/**
 * Obter dashboard stats
 */
function obterDashboardStats() {
    const carrinho = JSON.parse(localStorage.getItem('cart') || '[]');
    const avaliacoesPendentes = JSON.parse(localStorage.getItem('avaliacoes-pendentes') || '[]');

    return {
        totalProdutos: 13,
        totalAvaliacoes: obterTotalAvaliacoes(),
        avaliacoesPendentes: avaliacoesPendentes.length,
        mediaAvaliacoes: obterMediaAvaliacoes(),
        carrinhosPendentes: carrinho.length > 0 ? 1 : 0,

        // Simulado (futuro: real do banco)
        vendidos: 47,
        receita: 158900,
        visitantesHoje: 342,
        conversion: 3.2
    };
}

/**
 * Obter histórico de vendas (simulado)
 */
function obterVendas() {
    return [
        { id: 1, cliente: "Maria Silva", produto: "Mesa Sublime", valor: 3400, data: "2024-11-10", status: "Entregue" },
        { id: 2, cliente: "João Santos", produto: "Mesa Glamour", valor: 3400, data: "2024-11-09", status: "Enviado" },
        { id: 3, cliente: "Ana Costa", produto: "Mesa Requinte Nobre", valor: 4200, data: "2024-11-08", status: "Preparação" },
        { id: 4, cliente: "Carlos Mendes", produto: "Mesa Luxúria", valor: 5600, data: "2024-11-07", status: "Confirmado" },
        { id: 5, cliente: "Fernanda Lima", produto: "Mesa Imperatriz", valor: 3800, data: "2024-11-06", status: "Entregue" },
        { id: 6, cliente: "Ricardo Souza", produto: "Mesa Paris", valor: 3400, data: "2024-11-05", status: "Entregue" },
        { id: 7, cliente: "Patricia Oliveira", produto: "Mesa Charme", valor: 2900, data: "2024-11-04", status: "Enviado" },
        { id: 8, cliente: "Bruno Costa", produto: "Mesa Nobreza", valor: 4100, data: "2024-11-03", status: "Preparação" }
    ];
}

/**
 * Obter venda por ID
 */
function obterVendaPorId(id) {
    return obterVendas().find(v => v.id === id);
}

/**
 * Filtrar vendas
 */
function filtrarVendas(filtros) {
    let vendas = obterVendas();

    if (filtros.status) {
        vendas = vendas.filter(v => v.status === filtros.status);
    }

    if (filtros.produto) {
        vendas = vendas.filter(v => v.produto === filtros.produto);
    }

    if (filtros.mes) {
        // Filtrar por mês (simplificado)
        vendas = vendas.filter(v => v.data.startsWith(filtros.mes));
    }

    return vendas;
}

/**
 * Obter estatísticas de vendas
 */
function obterEstatisticasVendas() {
    const vendas = obterVendas();
    const total = vendas.reduce((sum, v) => sum + v.valor, 0);

    return {
        total: vendas.length,
        receita: total,
        receitaMedia: (total / vendas.length).toFixed(2),
        maiorVenda: Math.max(...vendas.map(v => v.valor)),
        menorVenda: Math.min(...vendas.map(v => v.valor)),
        porStatus: {
            confirmado: vendas.filter(v => v.status === "Confirmado").length,
            preparacao: vendas.filter(v => v.status === "Preparação").length,
            enviado: vendas.filter(v => v.status === "Enviado").length,
            entregue: vendas.filter(v => v.status === "Entregue").length
        }
    };
}

/**
 * Atualizar status de venda
 */
function atualizarStatusVenda(id, novoStatus) {
    const vendas = obterVendas();
    const venda = vendas.find(v => v.id === id);

    if (venda) {
        venda.status = novoStatus;
        // Em produção, salvar no banco
        return true;
    }

    return false;
}

/* ========================
   PRODUTOS
   ======================== */

/**
 * Obter todos os produtos para admin
 */
function obterProdutosAdmin() {
    // Tentar carregar de data-produtos.js (variável global 'produtos')
    if (typeof produtos !== 'undefined') {
        return produtos;
    }

    // Fallback: dados em localStorage
    const produtosStorage = localStorage.getItem('jpr_produtos');
    if (produtosStorage) {
        return JSON.parse(produtosStorage);
    }

    // Dados padrão se não houver nada
    return [
        { id: 1, nome: 'Mesa Glamour', preco: 3400, categoria: 'Premium', estoque: 5 },
        { id: 2, nome: 'Mesa Sublime', preco: 3400, categoria: 'Premium', estoque: 3 },
        { id: 3, nome: 'Mesa Paris', preco: 3400, categoria: 'Premium', estoque: 4 },
        { id: 4, nome: 'Mesa Imperatriz', preco: 4200, categoria: 'Premium', estoque: 2 },
        { id: 5, nome: 'Mesa Império', preco: 3800, categoria: 'Premium', estoque: 3 },
        { id: 6, nome: 'Mesa Nobreza', preco: 3600, categoria: 'Premium', estoque: 4 },
        { id: 7, nome: 'Mesa Luxúria', preco: 5200, categoria: 'Premium', estoque: 1 },
        { id: 8, nome: 'Mesa Requinte', preco: 3200, categoria: 'Premium', estoque: 5 },
        { id: 9, nome: 'Mesa Charme', preco: 2800, categoria: 'Premium', estoque: 6 },
        { id: 10, nome: 'Mesa Encanto', preco: 3000, categoria: 'Premium', estoque: 4 },
        { id: 11, nome: 'Mesa Glamour Mel', preco: 3500, categoria: 'Premium', estoque: 3 },
        { id: 12, nome: 'Mesa Imperatriz Natural', preco: 4300, categoria: 'Premium', estoque: 2 },
        { id: 13, nome: 'Mesa Requinte Nobre', preco: 3400, categoria: 'Premium', estoque: 3 }
    ];
}

/**
 * Adicionar produto
 */
function adicionarProduto(novoProduto) {
    const produtosAtuais = obterProdutosAdmin();
    const id = Math.max(...produtosAtuais.map(p => p.id || 0)) + 1;

    const produto = {
        id: id,
        ...novoProduto,
        criadoEm: new Date().toISOString().split('T')[0]
    };

    produtosAtuais.push(produto);
    localStorage.setItem('jpr_produtos', JSON.stringify(produtosAtuais));
    return produto;
}

/**
 * Editar produto
 */
function editarProduto(id, atualizacoes) {
    const produtosAtuais = obterProdutosAdmin();
    const produto = produtosAtuais.find(p => p.id === id);

    if (produto) {
        Object.assign(produto, atualizacoes);
        produto.atualizadoEm = new Date().toISOString().split('T')[0];
        localStorage.setItem('jpr_produtos', JSON.stringify(produtosAtuais));
        return true;
    }

    return false;
}

/**
 * Deletar produto
 */
function deletarProduto(id) {
    const produtosAtuais = obterProdutosAdmin();
    const index = produtosAtuais.findIndex(p => p.id === id);

    if (index !== -1) {
        produtosAtuais.splice(index, 1);
        localStorage.setItem('jpr_produtos', JSON.stringify(produtosAtuais));
        return true;
    }

    return false;
}

/* ========================
   AVALIAÇÕES
   ======================== */

/**
 * Obter avaliações pendentes
 */
function obterAvaliacoesPendentes() {
    const pendentes = JSON.parse(localStorage.getItem('avaliacoes-pendentes') || '[]');
    return pendentes;
}

/**
 * Aprovar avaliação
 */
function aprovarAvaliacao(id) {
    const pendentes = obterAvaliacoesPendentes();
    const avaliacao = pendentes.find(a => a.id === id);

    if (avaliacao) {
        avaliacao.verificado = true;
        avaliacoes.push(avaliacao);

        const atualizados = pendentes.filter(a => a.id !== id);
        localStorage.setItem('avaliacoes-pendentes', JSON.stringify(atualizados));

        return true;
    }

    return false;
}

/**
 * Rejeitar avaliação
 */
function rejeitarAvaliacao(id) {
    const pendentes = obterAvaliacoesPendentes();
    const atualizados = pendentes.filter(a => a.id !== id);
    localStorage.setItem('avaliacoes-pendentes', JSON.stringify(atualizados));
    return true;
}

/**
 * Adicionar resposta à avaliação
 */
function adicionarRespostaAvaliacao(id, texto) {
    const avaliacao = obterAvaliacaoPorId(id);

    if (avaliacao) {
        avaliacao.resposta = {
            texto: texto,
            data: new Date().toISOString().split('T')[0]
        };
        return true;
    }

    return false;
}

/* ========================
   USUÁRIOS
   ======================== */

/**
 * Obter todos os usuários admin
 */
function obterUsuariosAdmin() {
    return usuariosAdmin;
}

/**
 * Adicionar novo usuário admin
 */
function adicionarUsuarioAdmin(novoUsuario) {
    const id = Math.max(...usuariosAdmin.map(u => u.id)) + 1;

    const usuario = {
        id: id,
        ...novoUsuario,
        ativo: true,
        criadoEm: new Date().toISOString().split('T')[0],
        ultimoAcesso: null
    };

    usuariosAdmin.push(usuario);
    return usuario;
}

/**
 * Editar usuário admin
 */
function editarUsuarioAdmin(id, atualizacoes) {
    const usuario = usuariosAdmin.find(u => u.id === id);

    if (usuario) {
        Object.assign(usuario, atualizacoes);
        return true;
    }

    return false;
}

/**
 * Deletar usuário admin
 */
function deletarUsuarioAdmin(id) {
    const index = usuariosAdmin.findIndex(u => u.id === id);

    if (index !== -1) {
        usuariosAdmin.splice(index, 1);
        return true;
    }

    return false;
}

/* ========================
   LOGS E ATIVIDADES
   ======================== */

/**
 * Registrar atividade
 */
function registrarAtividade(tipo, descricao) {
    const atividades = JSON.parse(localStorage.getItem('admin-atividades') || '[]');

    const atividade = {
        id: atividades.length + 1,
        usuario: usuarioLogado ? usuarioLogado.nome : 'Sistema',
        tipo: tipo, // 'produto', 'avaliacao', 'venda', 'usuario', etc
        descricao: descricao,
        data: new Date().toISOString(),
        ip: 'local'
    };

    atividades.unshift(atividade); // Mais recentes primeiro

    if (atividades.length > 1000) {
        atividades.pop(); // Manter últimas 1000
    }

    localStorage.setItem('admin-atividades', JSON.stringify(atividades));
}

/**
 * Obter últimas atividades
 */
function obterUltimasAtividades(limite = 10) {
    const atividades = JSON.parse(localStorage.getItem('admin-atividades') || '[]');
    return atividades.slice(0, limite);
}

/* ========================
   RELATÓRIOS
   ======================== */

/**
 * Gerar relatório de vendas
 */
function gerarRelatorioVendas(dataInicio, dataFim) {
    const vendas = obterVendas().filter(v => v.data >= dataInicio && v.data <= dataFim);

    return {
        periodo: { inicio: dataInicio, fim: dataFim },
        totalVendas: vendas.length,
        receita: vendas.reduce((sum, v) => sum + v.valor, 0),
        vendas: vendas,
        detalhes: {
            porProduto: agruparVendasPorProduto(vendas),
            porStatus: agruparVendasPorStatus(vendas),
            vendaporDia: agruparVendasPorDia(vendas)
        }
    };
}

/**
 * Agrupar vendas por produto
 */
function agruparVendasPorProduto(vendas) {
    const grupos = {};

    vendas.forEach(v => {
        if (!grupos[v.produto]) {
            grupos[v.produto] = { quantidade: 0, receita: 0 };
        }
        grupos[v.produto].quantidade++;
        grupos[v.produto].receita += v.valor;
    });

    return grupos;
}

/**
 * Agrupar vendas por status
 */
function agruparVendasPorStatus(vendas) {
    const grupos = {};

    vendas.forEach(v => {
        if (!grupos[v.status]) {
            grupos[v.status] = 0;
        }
        grupos[v.status]++;
    });

    return grupos;
}

/**
 * Agrupar vendas por dia
 */
function agruparVendasPorDia(vendas) {
    const grupos = {};

    vendas.forEach(v => {
        if (!grupos[v.data]) {
            grupos[v.data] = 0;
        }
        grupos[v.data]++;
    });

    return grupos;
}

/**
 * Gerar relatório de avaliações
 */
function gerarRelatorioAvaliacoes() {
    return {
        total: obterTotalAvaliacoes(),
        media: obterMediaAvaliacoes(),
        verificadas: obterAvaliacoesVerificadas().length,
        pendentes: obterAvaliacoesPendentes().length,
        comResposta: avaliacoes.filter(a => a.resposta).length,
        semaResposta: avaliacoes.filter(a => !a.resposta).length,
        distribuicao: obterDistribuicaoRatings(),
        ultimas: obterAvaliacoesRecentes(5)
    };
}

/* ========================
   BACKUP E EXPORTAÇÃO
   ======================== */

/**
 * Exportar dados em JSON
 */
function exportarDadosJSON() {
    const dados = {
        produtos: produtosData,
        vendas: obterVendas(),
        avaliacoes: avaliacoes,
        usuarios: usuariosAdmin,
        dataExportacao: new Date().toISOString()
    };

    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-jpr-${new Date().getTime()}.json`;
    link.click();

    return true;
}

/**
 * Exportar relatório em CSV
 */
function exportarRelatorioCSV(tipo = 'vendas') {
    let dados = [];
    let cabecalho = [];

    if (tipo === 'vendas') {
        const vendas = obterVendas();
        cabecalho = ['ID', 'Cliente', 'Produto', 'Valor', 'Data', 'Status'];
        dados = vendas.map(v => [v.id, v.cliente, v.produto, v.valor, v.data, v.status]);
    } else if (tipo === 'avaliacoes') {
        cabecalho = ['Cliente', 'Produto', 'Rating', 'Título', 'Data', 'Verificado'];
        dados = avaliacoes.map(a => [a.cliente, a.produto, a.rating, a.titulo, a.data, a.verificado ? 'Sim' : 'Não']);
    }

    let csv = cabecalho.join(',') + '\n';
    dados.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-${tipo}-${new Date().getTime()}.csv`;
    link.click();

    return true;
}
