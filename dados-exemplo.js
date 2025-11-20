/* ========================
   DADOS DE EXEMPLO - JPR MÓVEIS
   Gerar vendas e clientes de exemplo
   ======================== */

// Importar dados de produtos
const produtosDisponiveis = [
    { modelo: 'Mesa Glamour', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3400, 3500, 3600] },
    { modelo: 'Mesa Sublime', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3400, 3500, 3600] },
    { modelo: 'Mesa Paris', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3400, 3500, 3600] },
    { modelo: 'Mesa Imperatriz', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [4200, 4400, 4600] },
    { modelo: 'Mesa Império', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3800, 4000, 4200] },
    { modelo: 'Mesa Nobreza', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3600, 3800, 4000] },
    { modelo: 'Mesa Luxúria', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [5200, 5400, 5600] },
    { modelo: 'Mesa Requinte', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3200, 3400, 3600] },
    { modelo: 'Mesa Charme', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [2800, 3000, 3200] },
    { modelo: 'Mesa Encanto', tamanhos: ['2.0m', '2.5m', '3.0m'], precos: [3000, 3200, 3400] }
];

const cidadesDisponiveis = ['Blumenau', 'Gaspar', 'Ilhota', 'Pomerode', 'Timbó', 'Brusque', 'Guabiruba', 'Jaraguá do Sul', 'Indaial'];

const statusDisponiveis = [
    'NOVO_PEDIDO',
    'AGUARDANDO_PAGAMENTO',
    'PAGAMENTO_CONFIRMADO',
    'EM_PREPARACAO',
    'PRONTO_EXPEDICAO',
    'EM_TRANSITO',
    'ENTREGUE'
];

const metodosPagamento = ['PIX', 'Cartão de Crédito', 'Boleto', 'Transferência'];

// Clientes de exemplo
const clientesExemplo = [
    {
        nome: 'Maria Silva Santos',
        whatsapp: '47999123456',
        email: 'maria.silva@email.com',
        cpf: '123.456.789-00'
    },
    {
        nome: 'João Pedro Oliveira',
        whatsapp: '47998234567',
        email: 'joao.pedro@email.com',
        cpf: '234.567.890-11'
    },
    {
        nome: 'Ana Carolina Souza',
        whatsapp: '47997345678',
        email: 'ana.souza@email.com',
        cpf: '345.678.901-22'
    },
    {
        nome: 'Carlos Eduardo Lima',
        whatsapp: '47996456789',
        email: 'carlos.lima@email.com',
        cpf: '456.789.012-33'
    },
    {
        nome: 'Juliana Costa Ferreira',
        whatsapp: '47995567890',
        email: 'juliana.costa@email.com',
        cpf: '567.890.123-44'
    },
    {
        nome: 'Roberto Alves Pereira',
        whatsapp: '47994678901',
        email: 'roberto.alves@email.com',
        cpf: '678.901.234-55'
    },
    {
        nome: 'Fernanda Martins',
        whatsapp: '47993789012',
        email: 'fernanda.martins@email.com',
        cpf: '789.012.345-66'
    },
    {
        nome: 'Paulo Ricardo Santos',
        whatsapp: '47992890123',
        email: 'paulo.ricardo@email.com',
        cpf: '890.123.456-77'
    }
];

function gerarPedidoExemplo(index) {
    const cliente = clientesExemplo[index % clientesExemplo.length];
    const cidade = cidadesDisponiveis[Math.floor(Math.random() * cidadesDisponiveis.length)];
    const produto = produtosDisponiveis[Math.floor(Math.random() * produtosDisponiveis.length)];
    const tamanhoIndex = Math.floor(Math.random() * produto.tamanhos.length);

    // Data entre 1-30 dias atrás
    const diasAtras = Math.floor(Math.random() * 30);
    const data = new Date();
    data.setDate(data.getDate() - diasAtras);

    const pedido = {
        cliente: {
            nome: cliente.nome,
            whatsapp: cliente.whatsapp,
            email: cliente.email,
            cpf: cliente.cpf,
            endereco: {
                rua: `Rua das ${['Flores', 'Palmeiras', 'Acácias', 'Hortênsias', 'Rosas'][Math.floor(Math.random() * 5)]}`,
                numero: String(Math.floor(Math.random() * 999) + 100),
                complemento: Math.random() > 0.5 ? `Casa ${Math.floor(Math.random() * 5) + 1}` : '',
                bairro: ['Centro', 'Vila Nova', 'Jardim Europa', 'Ponta Aguda'][Math.floor(Math.random() * 4)],
                cidade: cidade,
                cep: `89${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
            }
        },
        produto: {
            modelo: produto.modelo,
            tamanho: produto.tamanhos[tamanhoIndex],
            quantidade: 1,
            valor_unitario: produto.precos[tamanhoIndex]
        },
        pagamento: {
            metodo: metodosPagamento[Math.floor(Math.random() * metodosPagamento.length)],
            status: Math.random() > 0.2 ? 'CONFIRMADO' : 'PENDENTE'
        },
        status: statusDisponiveis[Math.floor(Math.random() * statusDisponiveis.length)],
        entrega: {
            periodo: ['MANHA', 'TARDE', 'NOITE'][Math.floor(Math.random() * 3)],
            observacoes: Math.random() > 0.5 ? 'Portão azul, favor buzinar' : ''
        }
    };

    return pedido;
}

function gerarDadosExemplo(quantidade = 20) {
    if (typeof Pedido === 'undefined') {
        console.error('Classe Pedido não encontrada. Certifique-se de carregar logistica-dados.js primeiro');
        return;
    }

    const pedidosGerados = [];

    for (let i = 0; i < quantidade; i++) {
        const dadosPedido = gerarPedidoExemplo(i);
        const pedido = new Pedido(dadosPedido);
        salvarPedido(pedido);
        pedidosGerados.push(pedido);
    }

    console.log(`✅ ${quantidade} pedidos de exemplo gerados com sucesso!`);
    console.log('📊 Resumo:');
    console.log(`- Clientes: ${clientesExemplo.length} diferentes`);
    console.log(`- Produtos: ${produtosDisponiveis.length} modelos`);
    console.log(`- Cidades: ${cidadesDisponiveis.length} atendidas`);

    return pedidosGerados;
}

function limparDadosExemplo() {
    if (confirm('Tem certeza que deseja limpar TODOS os pedidos?\n\nEsta ação não pode ser desfeita!')) {
        localStorage.removeItem('jpr_pedidos');
        localStorage.removeItem('jpr_rotas');
        console.log('✅ Todos os dados foram limpos');
        window.location.reload();
    }
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        produtosDisponiveis,
        gerarDadosExemplo,
        limparDadosExemplo
    };
}

// Disponibilizar globalmente
window.gerarDadosExemplo = gerarDadosExemplo;
window.limparDadosExemplo = limparDadosExemplo;
