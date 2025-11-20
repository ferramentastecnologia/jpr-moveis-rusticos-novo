/**
 * Users Routes
 * GET /api/usuarios/me - Dados do usuário logado
 * PUT /api/usuarios/me - Atualizar perfil
 * GET /api/usuarios - Listar usuários (admin)
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../models/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/usuarios/me
 * Dados do usuário logado
 */
router.get('/me', verifyToken, async (req, res) => {
    try {
        const result = await query(
            `SELECT id, email, nome, telefone, endereco, cidade, estado, cep, role, data_cadastro
             FROM usuarios WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            error: 'Erro ao buscar perfil'
        });
    }
});

/**
 * PUT /api/usuarios/me
 * Atualizar dados do usuário logado
 */
router.put('/me', verifyToken, async (req, res) => {
    try {
        const { nome, telefone, endereco, cidade, estado, cep, nova_senha } = req.body;

        let sql = `UPDATE usuarios SET nome = COALESCE($1, nome),
                                       telefone = COALESCE($2, telefone),
                                       endereco = COALESCE($3, endereco),
                                       cidade = COALESCE($4, cidade),
                                       estado = COALESCE($5, estado),
                                       cep = COALESCE($6, cep)`;
        let params = [nome, telefone, endereco, cidade, estado, cep];

        // Se nova senha foi fornecida
        if (nova_senha) {
            if (nova_senha.length < 6) {
                return res.status(400).json({
                    error: 'Senha muito curta',
                    message: 'Mínimo 6 caracteres'
                });
            }
            const senhaHash = await bcrypt.hash(nova_senha, 10);
            sql += `, senha_hash = $${params.length + 1}`;
            params.push(senhaHash);
        }

        sql += ` WHERE id = $${params.length + 1} RETURNING id, nome, email, role`;
        params.push(req.user.id);

        const result = await query(sql, params);

        res.json({
            message: 'Perfil atualizado com sucesso',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            error: 'Erro ao atualizar perfil'
        });
    }
});

/**
 * GET /api/usuarios
 * Listar usuários (apenas admin)
 */
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const result = await query(
            `SELECT id, email, nome, telefone, role, ativo, data_cadastro
             FROM usuarios
             ORDER BY data_cadastro DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            error: 'Erro ao buscar usuários'
        });
    }
});

module.exports = router;
