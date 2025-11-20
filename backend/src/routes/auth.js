/**
 * Authentication Routes
 * POST /api/auth/register - Registro de novo usuário
 * POST /api/auth/login - Login
 * POST /api/auth/refresh - Refresh token
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../models/db');
const { verifyToken } = require('../middleware/auth');
const { enviarBoasVindas } = require('../services/email');

const router = express.Router();

/**
 * POST /api/auth/register
 * Registrar novo usuário
 */
router.post('/register', async (req, res) => {
    try {
        const { email, senha, nome, telefone } = req.body;

        // Validações
        if (!email || !senha || !nome) {
            return res.status(400).json({
                error: 'Campos obrigatórios faltando',
                required: ['email', 'senha', 'nome']
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                error: 'Senha muito curta',
                message: 'Mínimo 6 caracteres'
            });
        }

        // Verificar se email já existe
        const existing = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({
                error: 'Email já registrado',
                email: email
            });
        }

        // Hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        // Inserir usuário
        const result = await query(
            `INSERT INTO usuarios (email, senha_hash, nome, telefone, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, email, nome, role`,
            [email, senhaHash, nome, telefone || null, 'customer']
        );

        const usuario = result.rows[0];

        // Gerar JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Enviar email de boas-vindas (async, não bloqueia resposta)
        try {
            await enviarBoasVindas(usuario);
        } catch (emailError) {
            console.error('Aviso: Erro ao enviar email de boas-vindas:', emailError.message);
            // Não falhar o registro se email falhar
        }

        res.status(201).json({
            message: 'Usuário registrado com sucesso. Email de boas-vindas enviado!',
            token,
            user: usuario
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            error: 'Erro ao registrar usuário',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/login
 * Fazer login
 */
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validações
        if (!email || !senha) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        // Buscar usuário
        const result = await query(
            'SELECT id, email, senha_hash, nome, role FROM usuarios WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: 'Email ou senha inválidos'
            });
        }

        const usuario = result.rows[0];

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({
                error: 'Email ou senha inválidos'
            });
        }

        // Gerar JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Não retornar hash da senha
        delete usuario.senha_hash;

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: usuario
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Erro ao fazer login',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', verifyToken, async (req, res) => {
    try {
        const usuario = req.user;

        const novoToken = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Token renovado',
            token: novoToken
        });

    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({
            error: 'Erro ao renovar token'
        });
    }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', verifyToken, async (req, res) => {
    try {
        const result = await query(
            'SELECT id, email, nome, telefone, role, data_cadastro FROM usuarios WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            error: 'Erro ao buscar informações do usuário'
        });
    }
});

module.exports = router;
