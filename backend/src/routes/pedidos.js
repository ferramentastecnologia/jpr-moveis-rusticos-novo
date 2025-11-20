/**
 * Orders Routes
 * GET /api/pedidos - Listar pedidos (meus ou todos se admin)
 * GET /api/pedidos/:id - Detalhes do pedido
 * POST /api/pedidos - Criar novo pedido
 * PUT /api/pedidos/:id - Atualizar pedido (admin)
 */

const express = require('express');
const { query, transaction } = require('../models/db');
const { verifyToken, verifyAdmin, verifyCustomer } = require('../middleware/auth');
const { enviarConfirmacaoPedido, enviarAtualizacaoPedido } = require('../services/email');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

/**
 * GET /api/pedidos
 * Listar pedidos do usuário ou todos (se admin)
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        let sql, params;

        if (req.user.role === 'admin' || req.user.role === 'gerente') {
            // Admin vê todos os pedidos
            sql = `SELECT p.*, u.nome as usuario_nome, u.email
                   FROM pedidos p
                   JOIN usuarios u ON p.usuario_id = u.id
                   ORDER BY p.data_pedido DESC`;
            params = [];
        } else {
            // Cliente vê apenas seus pedidos
            sql = `SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY data_pedido DESC`;
            params = [req.user.id];
        }

        const result = await query(sql, params);
        res.json(result.rows);

    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            error: 'Erro ao buscar pedidos'
        });
    }
});

/**
 * GET /api/pedidos/:id
 * Detalhes de um pedido com itens
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const pedidoResult = await query('SELECT * FROM pedidos WHERE id = $1', [req.params.id]);

        if (pedidoResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Pedido não encontrado'
            });
        }

        const pedido = pedidoResult.rows[0];

        // Verificar permissão
        if (req.user.role !== 'admin' && req.user.role !== 'gerente' && pedido.usuario_id !== req.user.id) {
            return res.status(403).json({
                error: 'Acesso negado'
            });
        }

        // Buscar itens do pedido
        const itensResult = await query(
            `SELECT ip.*, p.nome as produto_nome
             FROM itens_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = $1`,
            [req.params.id]
        );

        res.json({
            ...pedido,
            itens: itensResult.rows
        });

    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({
            error: 'Erro ao buscar pedido'
        });
    }
});

/**
 * POST /api/pedidos
 * Criar novo pedido
 */
router.post('/', verifyToken, verifyCustomer, async (req, res) => {
    try {
        const { itens, cupom_desconto, endereco_entrega } = req.body;

        if (!itens || itens.length === 0) {
            return res.status(400).json({
                error: 'Pedido vazio',
                message: 'Adicione pelo menos um item'
            });
        }

        // Usar transaction para garantir integridade
        const result = await transaction(async (client) => {
            // Calcular total e verificar estoque
            let total = 0;
            for (const item of itens) {
                const prodResult = await client.query(
                    'SELECT preco, estoque FROM produtos WHERE id = $1 AND ativo = true',
                    [item.produto_id]
                );

                if (prodResult.rows.length === 0) {
                    throw new Error(`Produto ${item.produto_id} não encontrado ou inativo`);
                }

                const produto = prodResult.rows[0];
                if (produto.estoque < item.quantidade) {
                    throw new Error(`Estoque insuficiente para produto ${item.produto_id}`);
                }

                total += produto.preco * item.quantidade;
            }

            // Aplicar cupom de desconto
            let desconto_percentual = 0;
            let valor_desconto = 0;

            if (cupom_desconto) {
                const cupomResult = await client.query(
                    'SELECT percentual, valor FROM cupons WHERE codigo = $1 AND ativo = true AND data_fim >= CURRENT_DATE',
                    [cupom_desconto]
                );

                if (cupomResult.rows.length > 0) {
                    const cupom = cupomResult.rows[0];
                    if (cupom.percentual) {
                        desconto_percentual = cupom.percentual;
                        valor_desconto = (total * desconto_percentual) / 100;
                    } else if (cupom.valor) {
                        valor_desconto = cupom.valor;
                    }
                }
            }

            const total_final = total - valor_desconto;

            // Criar pedido
            const numeroPedido = `JPR-${Date.now()}`;
            const pedidoResult = await client.query(
                `INSERT INTO pedidos (usuario_id, numero_pedido, total, cupom_desconto, desconto_percentual, valor_desconto)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [req.user.id, numeroPedido, total_final, cupom_desconto || null, desconto_percentual, valor_desconto]
            );

            const pedido = pedidoResult.rows[0];

            // Inserir itens do pedido
            for (const item of itens) {
                const prodResult = await client.query(
                    'SELECT preco FROM produtos WHERE id = $1',
                    [item.produto_id]
                );
                const preco_unitario = prodResult.rows[0].preco;
                const subtotal = preco_unitario * item.quantidade;

                await client.query(
                    `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [pedido.id, item.produto_id, item.quantidade, preco_unitario, subtotal]
                );

                // Atualizar estoque
                await client.query(
                    'UPDATE produtos SET estoque = estoque - $1 WHERE id = $2',
                    [item.quantidade, item.produto_id]
                );
            }

            return pedido;
        });

        // Buscar dados do usuário e itens para enviar email
        try {
            const usuarioResult = await query(
                'SELECT id, email, nome FROM usuarios WHERE id = $1',
                [req.user.id]
            );

            const itensResult = await query(
                `SELECT ip.*, p.nome as produto_nome
                 FROM itens_pedido ip
                 JOIN produtos p ON ip.produto_id = p.id
                 WHERE ip.pedido_id = $1`,
                [result.id]
            );

            const usuario = usuarioResult.rows[0];

            // Enviar email de confirmação (async, não bloqueia)
            await enviarConfirmacaoPedido(result, usuario, itensResult.rows);
        } catch (emailError) {
            console.error('Aviso: Erro ao enviar email de confirmação:', emailError.message);
            // Não falhar o pedido se email falhar
        }

        res.status(201).json({
            message: 'Pedido criado com sucesso. Email de confirmação enviado!',
            pedido: result
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            error: 'Erro ao criar pedido',
            message: error.message
        });
    }
});

/**
 * PUT /api/pedidos/:id
 * Atualizar status do pedido (admin)
 */
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { status, rastreamento_codigo, observacoes } = req.body;

        const result = await query(
            `UPDATE pedidos
             SET status = COALESCE($1, status),
                 rastreamento_codigo = COALESCE($2, rastreamento_codigo),
                 observacoes = COALESCE($3, observacoes),
                 data_atualizacao = CURRENT_TIMESTAMP
             WHERE id = $4
             RETURNING *`,
            [status, rastreamento_codigo, observacoes, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Pedido não encontrado'
            });
        }

        const pedido = result.rows[0];

        // Enviar email de atualização se status mudou
        try {
            const usuarioResult = await query(
                'SELECT id, email, nome FROM usuarios WHERE id = $1',
                [pedido.usuario_id]
            );

            if (usuarioResult.rows.length > 0) {
                const usuario = usuarioResult.rows[0];
                await enviarAtualizacaoPedido(pedido, usuario);
            }
        } catch (emailError) {
            console.error('Aviso: Erro ao enviar email de atualização:', emailError.message);
            // Não falhar a atualização se email falhar
        }

        res.json({
            message: 'Pedido atualizado com sucesso. Email enviado ao cliente!',
            pedido
        });

    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({
            error: 'Erro ao atualizar pedido'
        });
    }
});

module.exports = router;
