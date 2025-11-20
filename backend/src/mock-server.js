/**
 * JPR MÓVEIS - MOCK SERVER PARA TESTES
 * Simula o backend sem PostgreSQL
 * Usa dados em memória para testes completos
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-development';

// ===========================
// MOCK DATA (In-Memory Database)
// ===========================
const mockDatabase = {
    usuarios: [
        {
            id: 1,
            email: 'joao@example.com',
            senha_hash: bcrypt.hashSync('senha123', 10),
            nome: 'João Silva',
            role: 'customer',
            criado_em: new Date()
        }
    ],
    produtos: [
        {
            id: 1,
            nome: 'Mesa Premium',
            descricao: 'Mesa rústica de madeira maciça',
            preco: 3500.00,
            desconto: 5,
            categoria: 'Mesas',
            estoque: 10,
            imagem_url: 'https://example.com/mesa.jpg'
        },
        {
            id: 2,
            nome: 'Cadeira Conforto',
            descricao: 'Cadeira com assento ergonômico',
            preco: 1200.00,
            desconto: 0,
            categoria: 'Cadeiras',
            estoque: 15,
            imagem_url: 'https://example.com/cadeira.jpg'
        },
        {
            id: 3,
            nome: 'Rack Madeira',
            descricao: 'Rack para TV em madeira maciça',
            preco: 2800.00,
            desconto: 10,
            categoria: 'Racks',
            estoque: 5,
            imagem_url: 'https://example.com/rack.jpg'
        }
    ],
    pedidos: [],
    avaliacoes: [],
    pagamentos: []
};

// ===========================
// MIDDLEWARE
// ===========================
app.use(helmet());
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// ===========================
// HEALTH CHECK
// ===========================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: 'mock-sandbox',
        message: 'Mock server running (no PostgreSQL required)'
    });
});

// ===========================
// AUTENTICAÇÃO
// ===========================

// Register
app.post('/api/auth/register', (req, res) => {
    try {
        const { email, senha, nome, telefone } = req.body;

        // Validações
        if (!email || !senha || !nome) {
            return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
        }

        // Verificar se usuário já existe
        const usuarioExistente = mockDatabase.usuarios.find(u => u.email === email);
        if (usuarioExistente) {
            return res.status(409).json({ error: 'Usuário já existe' });
        }

        // Criar novo usuário
        const novoUsuario = {
            id: mockDatabase.usuarios.length + 1,
            email,
            senha_hash: bcrypt.hashSync(senha, 10),
            nome,
            telefone: telefone || null,
            role: 'customer',
            criado_em: new Date()
        };

        mockDatabase.usuarios.push(novoUsuario);

        // Gerar token
        const token = jwt.sign(
            { id: novoUsuario.id, email: novoUsuario.email, role: novoUsuario.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Usuário registrado com sucesso. Email de boas-vindas enviado!',
            token,
            user: {
                id: novoUsuario.id,
                email: novoUsuario.email,
                nome: novoUsuario.nome,
                role: novoUsuario.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validações
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Procurar usuário
        const usuario = mockDatabase.usuarios.find(u => u.email === email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar senha
        if (!bcrypt.compareSync(senha, usuario.senha_hash)) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                role: usuario.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get me
app.get('/api/auth/me', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = mockDatabase.usuarios.find(u => u.id === decoded.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            role: usuario.role
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido' });
        }
        res.status(500).json({ error: error.message });
    }
});

// ===========================
// PRODUTOS
// ===========================

// Listar produtos
app.get('/api/produtos', (req, res) => {
    try {
        const { pagina = 1, limite = 10, categoria, busca } = req.query;
        let produtos = mockDatabase.produtos;

        // Filtrar por categoria
        if (categoria) {
            produtos = produtos.filter(p => p.categoria === categoria);
        }

        // Buscar por nome/descrição
        if (busca) {
            const termo = busca.toLowerCase();
            produtos = produtos.filter(p =>
                p.nome.toLowerCase().includes(termo) ||
                p.descricao.toLowerCase().includes(termo)
            );
        }

        // Paginação
        const offset = (pagina - 1) * limite;
        const total = produtos.length;
        const paginados = produtos.slice(offset, offset + parseInt(limite));

        res.json({
            total,
            pagina: parseInt(pagina),
            limite: parseInt(limite),
            proxima_pagina: offset + parseInt(limite) < total ? parseInt(pagina) + 1 : null,
            produtos: paginados
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get produto específico
app.get('/api/produtos/:id', (req, res) => {
    try {
        const produto = mockDatabase.produtos.find(p => p.id === parseInt(req.params.id));
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar produto (requer admin)
app.post('/api/produtos', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = mockDatabase.usuarios.find(u => u.id === decoded.id);

        if (!usuario || usuario.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado. Somente admin.' });
        }

        const { nome, descricao, preco, desconto, categoria, imagem_url, estoque } = req.body;

        if (!nome || !preco) {
            return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
        }

        const novoProduto = {
            id: mockDatabase.produtos.length + 1,
            nome,
            descricao: descricao || '',
            preco,
            desconto: desconto || 0,
            categoria: categoria || 'Geral',
            imagem_url: imagem_url || '',
            estoque: estoque || 0
        };

        mockDatabase.produtos.push(novoProduto);

        res.status(201).json({
            message: 'Produto criado com sucesso',
            produto: novoProduto
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===========================
// PEDIDOS
// ===========================

// Criar pedido
app.post('/api/pedidos', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = mockDatabase.usuarios.find(u => u.id === decoded.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const { itens } = req.body;

        if (!itens || itens.length === 0) {
            return res.status(400).json({ error: 'Pedido deve conter itens' });
        }

        // Calcular total
        let total = 0;
        const itensComDetalhes = itens.map(item => {
            const produto = mockDatabase.produtos.find(p => p.id === item.produto_id);
            if (!produto) {
                throw new Error(`Produto ${item.produto_id} não encontrado`);
            }

            if (produto.estoque < item.quantidade) {
                throw new Error(`Estoque insuficiente para ${produto.nome}`);
            }

            const preco_unitario = produto.preco;
            const subtotal = preco_unitario * item.quantidade;
            total += subtotal;

            return {
                produto_id: produto.id,
                produto_nome: produto.nome,
                quantidade: item.quantidade,
                preco_unitario,
                subtotal
            };
        });

        const pedido = {
            id: mockDatabase.pedidos.length + 1,
            numero_pedido: `PED-${Date.now()}`,
            usuario_id: usuario.id,
            status: 'pendente',
            total,
            itens: itensComDetalhes,
            criado_em: new Date(),
            atualizado_em: new Date()
        };

        // Descontar estoque
        itens.forEach(item => {
            const produto = mockDatabase.produtos.find(p => p.id === item.produto_id);
            if (produto) {
                produto.estoque -= item.quantidade;
            }
        });

        mockDatabase.pedidos.push(pedido);

        res.status(201).json({
            message: 'Pedido criado com sucesso',
            pedido: {
                id: pedido.id,
                numero_pedido: pedido.numero_pedido,
                status: pedido.status,
                total: pedido.total,
                criado_em: pedido.criado_em
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar pedidos do usuário
app.get('/api/pedidos', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = mockDatabase.usuarios.find(u => u.id === decoded.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const pedidosUsuario = mockDatabase.pedidos.filter(p => p.usuario_id === usuario.id);

        res.json(pedidosUsuario.map(p => ({
            id: p.id,
            numero_pedido: p.numero_pedido,
            status: p.status,
            total: p.total,
            criado_em: p.criado_em
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get pedido específico
app.get('/api/pedidos/:id', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const pedido = mockDatabase.pedidos.find(p => p.id === parseInt(req.params.id));

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        // Verificar acesso (dono do pedido ou admin)
        if (pedido.usuario_id !== decoded.id && decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===========================
// AVALIAÇÕES
// ===========================

// Criar avaliação
app.post('/api/avaliacoes', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { produto_id, rating, titulo, comentario } = req.body;

        if (!produto_id || !rating || !titulo) {
            return res.status(400).json({ error: 'Dados obrigatórios faltando' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating deve estar entre 1 e 5' });
        }

        const avaliacao = {
            id: mockDatabase.avaliacoes.length + 1,
            produto_id,
            usuario_id: decoded.id,
            rating,
            titulo,
            comentario: comentario || '',
            status: 'pendente',
            criado_em: new Date()
        };

        mockDatabase.avaliacoes.push(avaliacao);

        res.status(201).json({
            message: 'Avaliação criada com sucesso (pendente aprovação)',
            avaliacao: {
                id: avaliacao.id,
                status: avaliacao.status
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar avaliações aprovadas de um produto
app.get('/api/avaliacoes', (req, res) => {
    try {
        const { produto_id } = req.query;

        let avaliacoes = mockDatabase.avaliacoes.filter(a => a.status === 'aprovada');

        if (produto_id) {
            avaliacoes = avaliacoes.filter(a => a.id === parseInt(produto_id));
        }

        res.json({
            avaliacoes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===========================
// ERRO 404
// ===========================
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint não encontrado',
        path: req.path,
        method: req.method
    });
});

// ===========================
// INICIAR SERVIDOR
// ===========================
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log('✅ MOCK SERVER - JPR MÓVEIS RÚSTICOS');
    console.log(`${'='.repeat(50)}`);
    console.log(`🌐 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`⚠️  MODO: Mock (sem PostgreSQL)`);
    console.log(`🗄️  Dados em memória (não persistem)`);
    console.log(`\n📋 Endpoints disponíveis:`);
    console.log(`  ✅ GET  /health`);
    console.log(`  ✅ POST /api/auth/register`);
    console.log(`  ✅ POST /api/auth/login`);
    console.log(`  ✅ GET  /api/auth/me`);
    console.log(`  ✅ GET  /api/produtos`);
    console.log(`  ✅ GET  /api/produtos/:id`);
    console.log(`  ✅ POST /api/produtos (admin)`);
    console.log(`  ✅ POST /api/pedidos`);
    console.log(`  ✅ GET  /api/pedidos`);
    console.log(`  ✅ GET  /api/pedidos/:id`);
    console.log(`  ✅ POST /api/avaliacoes`);
    console.log(`  ✅ GET  /api/avaliacoes`);
    console.log(`${'='.repeat(50)}\n`);
});

module.exports = app;
