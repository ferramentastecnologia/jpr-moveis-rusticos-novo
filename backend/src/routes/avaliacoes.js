/**
 * Reviews/Ratings Routes
 * GET /api/avaliacoes - Listar avaliações de um produto
 * POST /api/avaliacoes - Criar avaliação
 * PUT /api/avaliacoes/:id/resposta - Responder avaliação (admin)
 */

const express = require('express');
const { query } = require('../models/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/avaliacoes?produto_id=id
 * Listar avaliações de um produto
 */
router.get('/', async (req, res) => {
    try {
        const { produto_id, pagina = 1, limite = 10 } = req.query;

        if (!produto_id) {
            return res.status(400).json({
                error: 'produto_id é obrigatório'
            });
        }

        const offset = (pagina - 1) * limite;

        // Total
        const countResult = await query(
            'SELECT COUNT(*) FROM avaliacoes WHERE produto_id = $1 AND status = $2',
            [produto_id, 'aprovada']
        );
        const total = parseInt(countResult.rows[0].count);

        // Avaliações
        const result = await query(
            `SELECT a.*, u.nome as usuario_nome
             FROM avaliacoes a
             JOIN usuarios u ON a.usuario_id = u.id
             WHERE a.produto_id = $1 AND a.status = $2
             ORDER BY a.data_criacao DESC
             LIMIT $3 OFFSET $4`,
            [produto_id, 'aprovada', limite, offset]
        );

        // Calcular média
        const mediaResult = await query(
            'SELECT AVG(rating) as media, COUNT(*) as total FROM avaliacoes WHERE produto_id = $1 AND status = $2',
            [produto_id, 'aprovada']
        );

        const media = parseFloat(mediaResult.rows[0].media) || 0;

        res.json({
            produto_id: parseInt(produto_id),
            media: Math.round(media * 10) / 10,
            total,
            pagina: parseInt(pagina),
            limite: parseInt(limite),
            avaliacoes: result.rows
        });

    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({
            error: 'Erro ao buscar avaliações'
        });
    }
});

/**
 * POST /api/avaliacoes
 * Criar nova avaliação
 */
router.post('/', verifyToken, async (req, res) => {
    try {
        const { produto_id, rating, titulo, comentario } = req.body;

        // Validações
        if (!produto_id || !rating || !titulo) {
            return res.status(400).json({
                error: 'Campos obrigatórios faltando',
                required: ['produto_id', 'rating', 'titulo']
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                error: 'Rating deve estar entre 1 e 5'
            });
        }

        // Verificar se produto existe
        const prodResult = await query('SELECT id FROM produtos WHERE id = $1', [produto_id]);
        if (prodResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        // Verificar se usuário já avaliou este produto
        const existingResult = await query(
            'SELECT id FROM avaliacoes WHERE usuario_id = $1 AND produto_id = $2',
            [req.user.id, produto_id]
        );

        if (existingResult.rows.length > 0) {
            return res.status(400).json({
                error: 'Você já avaliou este produto'
            });
        }

        // Criar avaliação
        const result = await query(
            `INSERT INTO avaliacoes (usuario_id, produto_id, rating, titulo, comentario, status)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [req.user.id, produto_id, rating, titulo, comentario || null, 'pendente']
        );

        res.status(201).json({
            message: 'Avaliação enviada com sucesso. Aguardando aprovação.',
            avaliacao: result.rows[0]
        });

    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({
            error: 'Erro ao criar avaliação'
        });
    }
});

/**
 * PUT /api/avaliacoes/:id/resposta
 * Admin responde uma avaliação
 */
router.put('/:id/resposta', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { resposta_empresa, aprovar } = req.body;

        const result = await query(
            `UPDATE avaliacoes
             SET resposta_empresa = $1,
                 data_resposta = CURRENT_TIMESTAMP,
                 status = $2
             WHERE id = $3
             RETURNING *`,
            [resposta_empresa, aprovar ? 'aprovada' : 'rejeitada', req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Avaliação não encontrada'
            });
        }

        res.json({
            message: 'Avaliação atualizada com sucesso',
            avaliacao: result.rows[0]
        });

    } catch (error) {
        console.error('Update review error:', error);
        res.status(500).json({
            error: 'Erro ao atualizar avaliação'
        });
    }
});

/**
 * POST /api/avaliacoes/:id/util
 * Marcar avaliação como útil
 */
router.post('/:id/util', async (req, res) => {
    try {
        const result = await query(
            'UPDATE avaliacoes SET util_count = util_count + 1 WHERE id = $1 RETURNING *',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Avaliação não encontrada'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Mark useful error:', error);
        res.status(500).json({
            error: 'Erro ao marcar como útil'
        });
    }
});

module.exports = router;
