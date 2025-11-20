/**
 * Products Routes
 * GET /api/produtos - Listar produtos
 * GET /api/produtos/:id - Detalhes do produto
 * POST /api/produtos - Criar produto (admin)
 * PUT /api/produtos/:id - Atualizar produto (admin)
 * DELETE /api/produtos/:id - Deletar produto (admin)
 */

const express = require('express');
const { query } = require('../models/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/produtos
 * Listar todos os produtos com filtros opcionais
 */
router.get('/', async (req, res) => {
    try {
        const { categoria, busca, pagina = 1, limite = 20 } = req.query;
        let filtro = 'ativo = true';
        let params = [];

        if (categoria) {
            filtro += ` AND categoria = $${params.length + 1}`;
            params.push(categoria);
        }

        if (busca) {
            filtro += ` AND (nome ILIKE $${params.length + 1} OR descricao ILIKE $${params.length + 2})`;
            params.push(`%${busca}%`, `%${busca}%`);
        }

        const offset = (pagina - 1) * limite;

        // Total de produtos
        const countResult = await query(`SELECT COUNT(*) FROM produtos WHERE ${filtro}`, params);
        const total = parseInt(countResult.rows[0].count);

        // Produtos paginados
        const result = await query(
            `SELECT id, nome, descricao, preco, desconto, categoria, imagem_url, estoque
             FROM produtos
             WHERE ${filtro}
             ORDER BY data_criacao DESC
             LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
            [...params, limite, offset]
        );

        res.json({
            total,
            pagina: parseInt(pagina),
            limite: parseInt(limite),
            produtos: result.rows,
            proxima_pagina: offset + parseInt(limite) < total
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            error: 'Erro ao buscar produtos'
        });
    }
});

/**
 * GET /api/produtos/:id
 * Detalhes de um produto específico
 */
router.get('/:id', async (req, res) => {
    try {
        const result = await query('SELECT * FROM produtos WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            error: 'Erro ao buscar produto'
        });
    }
});

/**
 * POST /api/produtos
 * Criar novo produto (apenas admin)
 */
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { nome, descricao, preco, desconto, categoria, imagem_url, estoque } = req.body;

        // Validações
        if (!nome || !preco) {
            return res.status(400).json({
                error: 'Nome e preço são obrigatórios'
            });
        }

        const result = await query(
            `INSERT INTO produtos (nome, descricao, preco, desconto, categoria, imagem_url, estoque)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [nome, descricao, preco, desconto || 0, categoria, imagem_url, estoque || 0]
        );

        res.status(201).json({
            message: 'Produto criado com sucesso',
            produto: result.rows[0]
        });

    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            error: 'Erro ao criar produto'
        });
    }
});

/**
 * PUT /api/produtos/:id
 * Atualizar produto (apenas admin)
 */
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { nome, descricao, preco, desconto, categoria, imagem_url, estoque, ativo } = req.body;

        const result = await query(
            `UPDATE produtos
             SET nome = COALESCE($1, nome),
                 descricao = COALESCE($2, descricao),
                 preco = COALESCE($3, preco),
                 desconto = COALESCE($4, desconto),
                 categoria = COALESCE($5, categoria),
                 imagem_url = COALESCE($6, imagem_url),
                 estoque = COALESCE($7, estoque),
                 ativo = COALESCE($8, ativo),
                 data_atualizacao = CURRENT_TIMESTAMP
             WHERE id = $9
             RETURNING *`,
            [nome, descricao, preco, desconto, categoria, imagem_url, estoque, ativo, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        res.json({
            message: 'Produto atualizado com sucesso',
            produto: result.rows[0]
        });

    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            error: 'Erro ao atualizar produto'
        });
    }
});

/**
 * DELETE /api/produtos/:id
 * Deletar produto (apenas admin)
 */
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const result = await query('DELETE FROM produtos WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        res.json({
            message: 'Produto deletado com sucesso',
            id: result.rows[0].id
        });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            error: 'Erro ao deletar produto'
        });
    }
});

module.exports = router;
