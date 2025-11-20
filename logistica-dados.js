/* ========================
   SISTEMA DE LOGÍSTICA JPR
   Gestão Completa de Pedidos e Entregas
   ======================== */

// ==================
// CONFIGURAÇÕES
// ==================

const CONFIG_LOGISTICA = {
    // Regiões e fretes
    regioes: {
        'Blumenau': { frete: 0, km_base: 0 },
        'Gaspar': { frete: 50, km_base: 15 },
        'Ilhota': { frete: 80, km_base: 25 },
        'Pomerode': { frete: 60, km_base: 18 },
        'Timbó': { frete: 70, km_base: 22 },
        'Brusque': { frete: 100, km_base: 35 },
        'Guabiruba': { frete: 90, km_base: 30 },
        'Jaraguá do Sul': { frete: 150, km_base: 60 },
        'Indaial': { frete: 85, km_base: 28 },
        'Rio do Sul': { frete: 200, km_base: 90 }
    },

    // Capacidade da Ducato
    ducato: {
        capacidade_max: 12, // mesas
        peso_max: 2000, // kg
        volume_max: 30 // m³
    },

    // Rotas semanais
    rotas_semana: {
        'SEGUNDA': ['Blumenau'],
        'TERCA': ['Gaspar', 'Ilhota'],
        'QUARTA': ['Pomerode', 'Timbó'],
        'QUINTA': ['Brusque', 'Guabiruba'],
        'SEXTA': ['Jaraguá do Sul', 'Indaial'],
        'SABADO': ['URGENTE']
    },

    // Períodos de entrega
    periodos: {
        'MANHA': '08:00 - 12:00',
        'TARDE': '13:00 - 18:00',
        'NOITE': '18:00 - 20:00'
    }
};

// ==================
// STATUS DE PEDIDOS
// ==================

const STATUS_PEDIDO = {
    NOVO_PEDIDO: {
        codigo: 'NOVO_PEDIDO',
        nome: 'Novo Pedido',
        cor: '#2196F3',
        icone: '🆕',
        ordem: 1
    },
    EM_ORCAMENTO: {
        codigo: 'EM_ORCAMENTO',
        nome: 'Em Orçamento',
        cor: '#9C27B0',
        icone: '💬',
        ordem: 2
    },
    AGUARDANDO_APROVACAO: {
        codigo: 'AGUARDANDO_APROVACAO',
        nome: 'Aguardando Aprovação',
        cor: '#FF9800',
        icone: '⏳',
        ordem: 3
    },
    AGUARDANDO_PAGAMENTO: {
        codigo: 'AGUARDANDO_PAGAMENTO',
        nome: 'Aguardando Pagamento',
        cor: '#FFC107',
        icone: '💰',
        ordem: 4
    },
    PAGAMENTO_CONFIRMADO: {
        codigo: 'PAGAMENTO_CONFIRMADO',
        nome: 'Pagamento Confirmado',
        cor: '#4CAF50',
        icone: '✅',
        ordem: 5
    },
    EM_PREPARACAO: {
        codigo: 'EM_PREPARACAO',
        nome: 'Em Preparação',
        cor: '#795548',
        icone: '🔨',
        ordem: 6
    },
    PRONTO_EXPEDICAO: {
        codigo: 'PRONTO_EXPEDICAO',
        nome: 'Pronto para Expedição',
        cor: '#607D8B',
        icone: '📦',
        ordem: 7
    },
    EM_TRANSITO: {
        codigo: 'EM_TRANSITO',
        nome: 'Em Trânsito',
        cor: '#3F51B5',
        icone: '🚚',
        ordem: 8
    },
    SAIU_ENTREGA: {
        codigo: 'SAIU_ENTREGA',
        nome: 'Saiu para Entrega',
        cor: '#00BCD4',
        icone: '📍',
        ordem: 9
    },
    ENTREGUE: {
        codigo: 'ENTREGUE',
        nome: 'Entregue',
        cor: '#8BC34A',
        icone: '✅',
        ordem: 10
    },
    FINALIZADO: {
        codigo: 'FINALIZADO',
        nome: 'Finalizado',
        cor: '#4CAF50',
        icone: '⭐',
        ordem: 11
    },
    CANCELADO: {
        codigo: 'CANCELADO',
        nome: 'Cancelado',
        cor: '#F44336',
        icone: '❌',
        ordem: 99
    },
    PROBLEMA: {
        codigo: 'PROBLEMA',
        nome: 'Problema',
        cor: '#E91E63',
        icone: '⚠️',
        ordem: 98
    }
};

// ==================
// CLASSE PEDIDO
// ==================

class Pedido {
    constructor(dados) {
        this.id = dados.id || this.gerarId();
        this.data = dados.data || new Date().toISOString();
        this.numero = dados.numero || this.gerarNumero();

        this.cliente = {
            nome: dados.cliente?.nome || '',
            whatsapp: dados.cliente?.whatsapp || '',
            email: dados.cliente?.email || '',
            cpf: dados.cliente?.cpf || '',
            endereco: {
                rua: dados.cliente?.endereco?.rua || '',
                numero: dados.cliente?.endereco?.numero || '',
                complemento: dados.cliente?.endereco?.complemento || '',
                bairro: dados.cliente?.endereco?.bairro || '',
                cidade: dados.cliente?.endereco?.cidade || 'Blumenau',
                estado: 'SC',
                cep: dados.cliente?.endereco?.cep || ''
            }
        };

        this.produto = {
            modelo: dados.produto?.modelo || '',
            tamanho: dados.produto?.tamanho || '',
            quantidade: dados.produto?.quantidade || 1,
            valor_unitario: dados.produto?.valor_unitario || 0,
            valor_total: 0
        };

        this.frete = {
            valor: 0,
            distancia: 0,
            regiao: this.cliente.endereco.cidade
        };

        this.pagamento = {
            metodo: dados.pagamento?.metodo || '',
            status: dados.pagamento?.status || 'PENDENTE',
            valor_total: 0,
            data_pagamento: null,
            comprovante: null
        };

        this.status = dados.status || 'NOVO_PEDIDO';

        this.entrega = {
            data_programada: null,
            periodo: 'MANHA',
            rota_id: null,
            motorista: null,
            data_efetiva: null,
            foto_comprovante: null,
            assinatura: null,
            observacoes: dados.entrega?.observacoes || ''
        };

        this.historico = dados.historico || [{
            data: new Date().toISOString(),
            status: 'NOVO_PEDIDO',
            user: 'sistema',
            observacao: 'Pedido criado'
        }];

        this.calcularValores();
    }

    gerarId() {
        return `PED-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    gerarNumero() {
        const ano = new Date().getFullYear();
        const sequencial = (Math.floor(Math.random() * 9999) + 1).toString().padStart(4, '0');
        return `${ano}${sequencial}`;
    }

    calcularValores() {
        // Valor do produto
        this.produto.valor_total = this.produto.valor_unitario * this.produto.quantidade;

        // Calcular frete
        const regiao = CONFIG_LOGISTICA.regioes[this.cliente.endereco.cidade];
        if (regiao) {
            this.frete.valor = regiao.frete;
            this.frete.distancia = regiao.km_base;
        }

        // Valor total
        this.pagamento.valor_total = this.produto.valor_total + this.frete.valor;
    }

    alterarStatus(novoStatus, user = 'admin', observacao = '') {
        const statusAnterior = this.status;
        this.status = novoStatus;

        this.historico.push({
            data: new Date().toISOString(),
            status: novoStatus,
            status_anterior: statusAnterior,
            user: user,
            observacao: observacao
        });

        // Salvar no localStorage
        salvarPedido(this);

        // Notificar cliente via WhatsApp (futuro)
        this.notificarCliente(novoStatus);
    }

    notificarCliente(status) {
        // Aqui vai a integração com WhatsApp
        console.log(`Notificar cliente ${this.cliente.nome} sobre status: ${status}`);

        const mensagens = {
            PAGAMENTO_CONFIRMADO: `✅ Pagamento confirmado!\n\nPedido #${this.numero} está sendo preparado.\n\nPrevisão de entrega: ${this.entrega.data_programada || 'A definir'}`,
            EM_TRANSITO: `🚚 Sua mesa está a caminho!\n\nPrevisão: ${this.entrega.periodo}\nMotorista: ${this.entrega.motorista || 'A definir'}`,
            ENTREGUE: `✅ Entrega realizada!\n\nObrigado pela preferência! 🙏\n\nAvalie sua experiência: [LINK]`
        };

        // Simular envio
        if (mensagens[status]) {
            console.log(`WhatsApp para ${this.cliente.whatsapp}:`, mensagens[status]);
        }
    }

    toJSON() {
        return {
            id: this.id,
            numero: this.numero,
            data: this.data,
            cliente: this.cliente,
            produto: this.produto,
            frete: this.frete,
            pagamento: this.pagamento,
            status: this.status,
            entrega: this.entrega,
            historico: this.historico
        };
    }
}

// ==================
// CLASSE ROTA
// ==================

class Rota {
    constructor(dados) {
        this.id = dados.id || this.gerarId();
        this.data = dados.data || new Date().toISOString().split('T')[0];
        this.dia_semana = dados.dia_semana || this.getDiaSemana();

        this.motorista = {
            nome: dados.motorista?.nome || '',
            telefone: dados.motorista?.telefone || '',
            cnh: dados.motorista?.cnh || ''
        };

        this.veiculo = {
            tipo: 'Ducato',
            placa: dados.veiculo?.placa || 'ABC-1234',
            km_inicial: dados.veiculo?.km_inicial || 0,
            km_final: dados.veiculo?.km_final || null
        };

        this.pedidos = dados.pedidos || [];
        this.status = dados.status || 'PLANEJADA';

        this.inicio = dados.inicio || null;
        this.fim = dados.fim || null;

        this.combustivel = {
            inicial: dados.combustivel?.inicial || 0,
            abastecido: dados.combustivel?.abastecido || 0,
            final: dados.combustivel?.final || null
        };

        this.resumo = {
            total_pedidos: 0,
            total_entregas: 0,
            km_total: 0,
            tempo_total: null,
            custo_combustivel: 0
        };
    }

    gerarId() {
        const data = new Date().toISOString().split('T')[0].replace(/-/g, '');
        return `ROTA-${data}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }

    getDiaSemana() {
        const dias = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
        return dias[new Date().getDay()];
    }

    adicionarPedido(pedidoId, ordem = null) {
        const pedido = buscarPedido(pedidoId);
        if (!pedido) return false;

        const novaOrdem = ordem || this.pedidos.length + 1;

        this.pedidos.push({
            id: pedidoId,
            ordem: novaOrdem,
            horario_previsto: this.calcularHorario(novaOrdem),
            status: 'PENDENTE',
            horario_inicio: null,
            horario_conclusao: null
        });

        // Atualizar pedido
        pedido.entrega.rota_id = this.id;
        pedido.entrega.motorista = this.motorista.nome;
        salvarPedido(pedido);

        this.atualizarResumo();
        salvarRota(this);
        return true;
    }

    removerPedido(pedidoId) {
        this.pedidos = this.pedidos.filter(p => p.id !== pedidoId);
        this.reordenar();
        this.atualizarResumo();
        salvarRota(this);
    }

    reordenar() {
        this.pedidos.forEach((p, index) => {
            p.ordem = index + 1;
            p.horario_previsto = this.calcularHorario(index + 1);
        });
    }

    calcularHorario(ordem) {
        const horaInicio = 8; // 08:00
        const tempoPorEntrega = 1.5; // 1h30min
        const horas = horaInicio + ((ordem - 1) * tempoPorEntrega);
        const h = Math.floor(horas);
        const m = Math.floor((horas - h) * 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }

    atualizarResumo() {
        this.resumo.total_pedidos = this.pedidos.length;

        // Calcular km total
        let kmTotal = 0;
        this.pedidos.forEach(p => {
            const pedido = buscarPedido(p.id);
            if (pedido) {
                kmTotal += pedido.frete.distancia;
            }
        });
        this.resumo.km_total = kmTotal;

        // Calcular custo combustível (média 8km/l, R$ 6,50/l)
        const litros = kmTotal / 8;
        this.resumo.custo_combustivel = litros * 6.50;
    }

    iniciarRota() {
        this.status = 'EM_ANDAMENTO';
        this.inicio = new Date().toISOString();
        this.veiculo.km_inicial = this.veiculo.km_inicial || 0;
        salvarRota(this);
    }

    finalizarRota() {
        this.status = 'FINALIZADA';
        this.fim = new Date().toISOString();

        // Calcular tempo total
        const inicio = new Date(this.inicio);
        const fim = new Date(this.fim);
        const diff = fim - inicio;
        const horas = Math.floor(diff / 1000 / 60 / 60);
        const minutos = Math.floor((diff / 1000 / 60) % 60);
        this.resumo.tempo_total = `${horas}h ${minutos}min`;

        this.resumo.total_entregas = this.pedidos.filter(p => p.status === 'ENTREGUE').length;

        salvarRota(this);
    }

    toJSON() {
        return {
            id: this.id,
            data: this.data,
            dia_semana: this.dia_semana,
            motorista: this.motorista,
            veiculo: this.veiculo,
            pedidos: this.pedidos,
            status: this.status,
            inicio: this.inicio,
            fim: this.fim,
            combustivel: this.combustivel,
            resumo: this.resumo
        };
    }
}

// ==================
// FUNÇÕES DE ARMAZENAMENTO
// ==================

function salvarPedido(pedido) {
    const pedidos = listarPedidos();
    const index = pedidos.findIndex(p => p.id === pedido.id);

    if (index >= 0) {
        pedidos[index] = pedido.toJSON();
    } else {
        pedidos.push(pedido.toJSON());
    }

    localStorage.setItem('jpr_pedidos', JSON.stringify(pedidos));
}

function buscarPedido(id) {
    const pedidos = listarPedidos();
    const dados = pedidos.find(p => p.id === id);
    return dados ? new Pedido(dados) : null;
}

function listarPedidos(filtros = {}) {
    const pedidos = JSON.parse(localStorage.getItem('jpr_pedidos') || '[]');

    let resultado = pedidos;

    // Filtrar por status
    if (filtros.status) {
        resultado = resultado.filter(p => p.status === filtros.status);
    }

    // Filtrar por data
    if (filtros.data_inicio) {
        resultado = resultado.filter(p => p.data >= filtros.data_inicio);
    }

    if (filtros.data_fim) {
        resultado = resultado.filter(p => p.data <= filtros.data_fim);
    }

    // Filtrar por cidade
    if (filtros.cidade) {
        resultado = resultado.filter(p => p.cliente.endereco.cidade === filtros.cidade);
    }

    return resultado;
}

function salvarRota(rota) {
    const rotas = listarRotas();
    const index = rotas.findIndex(r => r.id === rota.id);

    if (index >= 0) {
        rotas[index] = rota.toJSON();
    } else {
        rotas.push(rota.toJSON());
    }

    localStorage.setItem('jpr_rotas', JSON.stringify(rotas));
}

function buscarRota(id) {
    const rotas = listarRotas();
    const dados = rotas.find(r => r.id === id);
    return dados ? new Rota(dados) : null;
}

function listarRotas(filtros = {}) {
    const rotas = JSON.parse(localStorage.getItem('jpr_rotas') || '[]');

    let resultado = rotas;

    if (filtros.status) {
        resultado = resultado.filter(r => r.status === filtros.status);
    }

    if (filtros.data) {
        resultado = resultado.filter(r => r.data === filtros.data);
    }

    return resultado;
}

// ==================
// FUNÇÕES AUXILIARES
// ==================

function calcularFrete(cidade) {
    const regiao = CONFIG_LOGISTICA.regioes[cidade];
    return regiao ? regiao.frete : 0;
}

function obterCidadesAtendidas() {
    return Object.keys(CONFIG_LOGISTICA.regioes);
}

function gerarRelatorioVendas(periodo = 'mes') {
    const pedidos = listarPedidos();
    const agora = new Date();

    let dataInicio;
    switch(periodo) {
        case 'dia':
            dataInicio = new Date(agora.setHours(0,0,0,0)).toISOString();
            break;
        case 'semana':
            dataInicio = new Date(agora.setDate(agora.getDate() - 7)).toISOString();
            break;
        case 'mes':
        default:
            dataInicio = new Date(agora.setMonth(agora.getMonth() - 1)).toISOString();
    }

    const pedidosPeriodo = pedidos.filter(p => p.data >= dataInicio);

    const relatorio = {
        total_pedidos: pedidosPeriodo.length,
        valor_total: pedidosPeriodo.reduce((sum, p) => sum + p.pagamento.valor_total, 0),
        ticket_medio: 0,
        por_status: {},
        por_cidade: {},
        por_produto: {}
    };

    relatorio.ticket_medio = relatorio.valor_total / relatorio.total_pedidos || 0;

    // Agrupar por status
    pedidosPeriodo.forEach(p => {
        relatorio.por_status[p.status] = (relatorio.por_status[p.status] || 0) + 1;
        relatorio.por_cidade[p.cliente.endereco.cidade] = (relatorio.por_cidade[p.cliente.endereco.cidade] || 0) + 1;
        relatorio.por_produto[p.produto.modelo] = (relatorio.por_produto[p.produto.modelo] || 0) + 1;
    });

    return relatorio;
}

// ==================
// EXPORTAR
// ==================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG_LOGISTICA,
        STATUS_PEDIDO,
        Pedido,
        Rota,
        salvarPedido,
        buscarPedido,
        listarPedidos,
        salvarRota,
        buscarRota,
        listarRotas,
        calcularFrete,
        obterCidadesAtendidas,
        gerarRelatorioVendas
    };
}
