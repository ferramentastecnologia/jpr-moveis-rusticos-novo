/**
 * Payments Routes - Asaas Integration
 * POST /api/pagamentos/criar - Criar pagamento via Asaas
 * GET /api/pagamentos/:id - Status do pagamento
 * POST /api/pagamentos/webhook - Webhook do Asaas
 */

const express = require('express');
const axios = require('axios');
const { query, transaction } = require('../models/db');
const { verifyToken } = require('../middleware/auth');
const { enviarConfirmacaoPagamento } = require('../services/email');

const router = express.Router();

const ASAAS_API = axios.create({
    baseURL: process.env.ASAAS_API_URL,
    headers: {
        'access_token': process.env.ASAAS_API_KEY
    }
});

/**
 * POST /api/pagamentos/criar
 * Criar pagamento no Asaas
 */
router.post('/criar', verifyToken, async (req, res) => {
    try {
        const { pedido_id, metodo, valor } = req.body;

        if (!pedido_id || !metodo || !valor) {
            return res.status(400).json({
                error: 'Campos obrigatórios faltando',
                required: ['pedido_id', 'metodo', 'valor']
            });
        }

        // Verificar se pedido existe
        const pedidoResult = await query('SELECT * FROM pedidos WHERE id = $1', [pedido_id]);
        if (pedidoResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Pedido não encontrado'
            });
        }

        const pedido = pedidoResult.rows[0];

        // Dados do cliente para Asaas
        const usuarioResult = await query('SELECT * FROM usuarios WHERE id = $1', [pedido.usuario_id]);
        const usuario = usuarioResult.rows[0];

        try {
            // Criar cobrança no Asaas
            const asaasPayment = await ASAAS_API.post('/payments', {
                customer: usuario.email,
                email: usuario.email,
                name: usuario.nome,
                phone: usuario.telefone || '11999999999',
                billingType: metodo.toUpperCase(), // PIX, CREDIT_CARD, BOLETO
                value: valor,
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                description: `Pedido ${pedido.numero_pedido} - JPR Móveis`,
                externalReference: `PEDIDO-${pedido_id}`,
                notificationUrl: `${process.env.FRONTEND_PROD_URL}/api/pagamentos/webhook`
            });

            // Salvar pagamento no banco
            const pagtoResult = await query(
                `INSERT INTO pagamentos (pedido_id, asaas_id, usuario_id, metodo, valor, status, descricao)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [pedido_id, asaasPayment.data.id, usuario.id, metodo, valor, asaasPayment.data.status, asaasPayment.data.description]
            );

            res.json({
                message: 'Pagamento criado com sucesso',
                pagamento: pagtoResult.rows[0],
                asaas_data: asaasPayment.data
            });

        } catch (asaasError) {
            console.error('Asaas API error:', asaasError.response?.data || asaasError.message);
            res.status(400).json({
                error: 'Erro ao processar pagamento',
                details: asaasError.response?.data || asaasError.message
            });
        }

    } catch (error) {
        console.error('Create payment error:', error);
        res.status(500).json({
            error: 'Erro ao criar pagamento'
        });
    }
});

/**
 * GET /api/pagamentos/:id
 * Status do pagamento
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const result = await query('SELECT * FROM pagamentos WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Pagamento não encontrado'
            });
        }

        const pagamento = result.rows[0];

        // Buscar status atualizado no Asaas
        try {
            const asaasData = await ASAAS_API.get(`/payments/${pagamento.asaas_id}`);

            // Atualizar status localmente se mudou
            if (asaasData.data.status !== pagamento.status) {
                await query(
                    'UPDATE pagamentos SET status = $1 WHERE id = $2',
                    [asaasData.data.status, req.params.id]
                );
            }

            res.json({
                ...pagamento,
                asaas_status: asaasData.data.status
            });
        } catch (asaasError) {
            console.error('Asaas sync error:', asaasError.message);
            res.json(pagamento);
        }

    } catch (error) {
        console.error('Get payment error:', error);
        res.status(500).json({
            error: 'Erro ao buscar pagamento'
        });
    }
});

/**
 * POST /api/pagamentos/webhook
 * Webhook do Asaas para atualizar status de pagamento
 */
router.post('/webhook', async (req, res) => {
    try {
        const { id, status, externalReference } = req.body;

        if (!externalReference) {
            return res.status(400).json({
                error: 'externalReference obrigatória'
            });
        }

        const pedido_id = externalReference.replace('PEDIDO-', '');

        // Buscar pagamento
        const pagtoResult = await query(
            'SELECT * FROM pagamentos WHERE asaas_id = $1',
            [id]
        );

        if (pagtoResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Pagamento não encontrado'
            });
        }

        // Atualizar status do pagamento
        await query(
            'UPDATE pagamentos SET status = $1, data_pagamento = CURRENT_TIMESTAMP WHERE asaas_id = $2',
            [status, id]
        );

        // Se pagamento foi confirmado, atualizar status do pedido
        if (status === 'CONFIRMED') {
            await query(
                'UPDATE pedidos SET status = $1 WHERE id = $2',
                ['confirmado', pedido_id]
            );

            // Enviar email de confirmação de pagamento
            try {
                const pagamento = pagtoResult.rows[0];
                const pedidoResult = await query('SELECT * FROM pedidos WHERE id = $1', [pedido_id]);
                const usuarioResult = await query('SELECT * FROM usuarios WHERE id = $1', [pagamento.usuario_id]);

                if (pedidoResult.rows.length > 0 && usuarioResult.rows.length > 0) {
                    const pedido = pedidoResult.rows[0];
                    const usuario = usuarioResult.rows[0];
                    await enviarConfirmacaoPagamento(pagamento, usuario, pedido);
                }
            } catch (emailError) {
                console.error('Aviso: Erro ao enviar email de confirmação de pagamento:', emailError.message);
                // Não falhar o webhook se email falhar
            }
        }

        res.json({
            message: 'Webhook processado com sucesso',
            status: status
        });

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({
            error: 'Erro ao processar webhook'
        });
    }
});

module.exports = router;
