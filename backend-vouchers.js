/**
 * Backend para Sistema de Vouchers - JPR Móveis Rústicos
 *
 * Este arquivo contém as funções para:
 * - Processar pagamentos via Mercado Pago
 * - Gerar códigos únicos de vouchers
 * - Enviar vouchers por Email e WhatsApp
 * - Validar e marcar vouchers como usados
 *
 * IMPORTANTE: Este é um código de exemplo. Em produção:
 * 1. Use variáveis de ambiente para credenciais
 * 2. Implemente banco de dados adequado (PostgreSQL, MongoDB, etc)
 * 3. Adicione validações de segurança
 * 4. Implemente logs e monitoramento
 * 5. Use HTTPS em todas as comunicações
 */

// ============================================
// DEPENDÊNCIAS
// ============================================
// npm install express mercadopago nodemailer axios qrcode

const express = require('express');
const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const axios = require('axios');
const QRCode = require('qrcode');

// ============================================
// CONFIGURAÇÕES
// ============================================

const CONFIG = {
    // Mercado Pago
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN || 'YOUR_MERCADOPAGO_ACCESS_TOKEN',

    // Email (usando Gmail como exemplo)
    EMAIL_HOST: 'smtp.gmail.com',
    EMAIL_PORT: 587,
    EMAIL_USER: process.env.EMAIL_USER || 'vouchers@rosamexicano.com.br',
    EMAIL_PASS: process.env.EMAIL_PASS || 'sua_senha_aqui',
    EMAIL_FROM: 'JPR Móveis Rústicos <vouchers@rosamexicano.com.br>',

    // WhatsApp (usando Evolution API ou similar)
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || 'http://localhost:8080',
    WHATSAPP_API_KEY: process.env.WHATSAPP_API_KEY || 'YOUR_API_KEY',
    WHATSAPP_INSTANCE: process.env.WHATSAPP_INSTANCE || 'rosamexicano',

    // Aplicação
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,

    // Restaurante
    RESTAURANT_NAME: 'JPR Móveis Rústicos',
    RESTAURANT_PHONE: '(47) 99999-9999',
    RESTAURANT_ADDRESS: 'Endereço do Restaurante, Blumenau - SC',
};

// ============================================
// INICIALIZAÇÃO
// ============================================

const app = express();
app.use(express.json());
app.use(express.static('.')); // Servir arquivos estáticos

// Configurar Mercado Pago
mercadopago.configure({
    access_token: CONFIG.MERCADOPAGO_ACCESS_TOKEN
});

// Configurar transporte de email
const emailTransporter = nodemailer.createTransport({
    host: CONFIG.EMAIL_HOST,
    port: CONFIG.EMAIL_PORT,
    secure: false,
    auth: {
        user: CONFIG.EMAIL_USER,
        pass: CONFIG.EMAIL_PASS
    }
});

// ============================================
// BANCO DE DADOS (SIMULADO)
// ============================================
// Em produção, use um banco de dados real

let vouchersDB = [];
let ordersDB = [];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Gerar código único de voucher
 */
function generateVoucherCode() {
    const prefix = 'RM';
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    return `${prefix}-${random}-${timestamp}`;
}

/**
 * Gerar QR Code do voucher
 */
async function generateQRCode(voucherCode) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(voucherCode, {
            width: 300,
            margin: 2,
            color: {
                dark: '#D32F2F',
                light: '#FFFFFF'
            }
        });
        return qrCodeDataURL;
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        return null;
    }
}

/**
 * Calcular data de validade (6 meses)
 */
function calculateExpiryDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date.toISOString();
}

// ============================================
// ENVIO DE VOUCHERS
// ============================================

/**
 * Enviar voucher por Email
 */
async function sendVoucherEmail(voucherData) {
    try {
        const qrCodeDataURL = await generateQRCode(voucherData.code);

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #D32F2F, #FF6F00); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: white; padding: 30px; border: 1px solid #ddd; border-top: none; }
                    .voucher-code { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
                    .code { font-size: 24px; font-weight: bold; color: #D32F2F; font-family: 'Courier New', monospace; letter-spacing: 2px; }
                    .qr-code { text-align: center; margin: 20px 0; }
                    .qr-code img { max-width: 200px; }
                    .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    .button { display: inline-block; padding: 15px 30px; background: #D32F2F; color: white; text-decoration: none; border-radius: 8px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌮 ${CONFIG.RESTAURANT_NAME}</h1>
                        <h2>Seu Voucher Chegou!</h2>
                    </div>
                    <div class="content">
                        <p>Olá, <strong>${voucherData.buyer.name}</strong>!</p>
                        <p>Parabéns! Sua compra foi confirmada e seu voucher está pronto para ser utilizado.</p>

                        <div class="details">
                            <h3>📋 Detalhes do Voucher:</h3>
                            <ul>
                                <li><strong>Tipo:</strong> ${voucherData.voucher.emoji} ${voucherData.voucher.title}</li>
                                <li><strong>Valor:</strong> R$ ${voucherData.voucher.price.toFixed(2)}</li>
                                <li><strong>Validade:</strong> ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}</li>
                            </ul>
                        </div>

                        <div class="voucher-code">
                            <p style="margin: 0; font-size: 14px; color: #666;">SEU CÓDIGO:</p>
                            <p class="code">${voucherData.code}</p>
                        </div>

                        ${qrCodeDataURL ? `
                            <div class="qr-code">
                                <p style="font-size: 14px; color: #666;">OU USE O QR CODE:</p>
                                <img src="${qrCodeDataURL}" alt="QR Code do Voucher">
                            </div>
                        ` : ''}

                        <h3>📝 Como Usar:</h3>
                        <ol>
                            <li>Faça sua reserva pelo telefone ${CONFIG.RESTAURANT_PHONE}</li>
                            <li>Informe que possui um voucher</li>
                            <li>Apresente este código no restaurante</li>
                            <li>Aproveite sua refeição!</li>
                        </ol>

                        <div style="text-align: center;">
                            <a href="https://wa.me/5547999999999?text=Olá! Gostaria de fazer uma reserva usando meu voucher ${voucherData.code}"
                               class="button">💬 Fazer Reserva via WhatsApp</a>
                        </div>

                        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <strong>Importante:</strong> Guarde este email! Você precisará do código para usar seu voucher.<br>
                            Validade: 6 meses a partir da data da compra.
                        </p>
                    </div>
                    <div class="footer">
                        <p><strong>${CONFIG.RESTAURANT_NAME}</strong></p>
                        <p>${CONFIG.RESTAURANT_ADDRESS}</p>
                        <p>📞 ${CONFIG.RESTAURANT_PHONE}</p>
                        <p>Horário: Ter-Dom 11h às 23h | Segunda: Fechado</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const mailOptions = {
            from: CONFIG.EMAIL_FROM,
            to: voucherData.buyer.email,
            subject: `🌮 Seu Voucher ${CONFIG.RESTAURANT_NAME} - ${voucherData.code}`,
            html: htmlContent
        };

        const info = await emailTransporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Enviar voucher por WhatsApp
 */
async function sendVoucherWhatsApp(voucherData) {
    try {
        // Limpar número de telefone
        const phoneNumber = voucherData.buyer.phone.replace(/\D/g, '');

        const message = `
🌮 *${CONFIG.RESTAURANT_NAME}*

Olá, *${voucherData.buyer.name}*! 🎉

Seu voucher foi gerado com sucesso!

📋 *Detalhes do Voucher:*
• *Tipo:* ${voucherData.voucher.emoji} ${voucherData.voucher.title}
• *Valor:* R$ ${voucherData.voucher.price.toFixed(2)}
• *Código:* \`${voucherData.code}\`
• *Validade:* ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}

📝 *Como usar:*
1️⃣ Faça sua reserva pelo telefone ${CONFIG.RESTAURANT_PHONE}
2️⃣ Informe que possui um voucher
3️⃣ Apresente o código no restaurante
4️⃣ Aproveite sua refeição!

💡 *Dica:* Guarde este código com segurança!

📍 ${CONFIG.RESTAURANT_ADDRESS}
⏰ Ter-Dom: 11h às 23h | Seg: Fechado
`;

        // Exemplo usando Evolution API
        const response = await axios.post(
            `${CONFIG.WHATSAPP_API_URL}/message/sendText/${CONFIG.WHATSAPP_INSTANCE}`,
            {
                number: phoneNumber,
                textMessage: {
                    text: message
                }
            },
            {
                headers: {
                    'apikey': CONFIG.WHATSAPP_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('WhatsApp enviado:', response.data);
        return { success: true, data: response.data };

    } catch (error) {
        console.error('Erro ao enviar WhatsApp:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// ROTAS DA API
// ============================================

/**
 * POST /api/process-payment
 * Processar pagamento e criar voucher
 */
app.post('/api/process-payment', async (req, res) => {
    try {
        const { voucher, buyer, payment, isGift, giftData } = req.body;

        // 1. Processar pagamento no Mercado Pago
        const paymentData = {
            transaction_amount: payment.amount,
            token: payment.token,
            description: `Voucher ${voucher.title} - JPR Móveis Rústicos`,
            installments: 1,
            payment_method_id: payment.paymentMethodId,
            issuer_id: payment.issuerId,
            payer: {
                email: buyer.email,
                identification: {
                    type: 'CPF',
                    number: buyer.cpf
                }
            }
        };

        const mpPayment = await mercadopago.payment.create(paymentData);

        if (mpPayment.body.status === 'approved') {
            // 2. Gerar voucher
            const voucherCode = generateVoucherCode();
            const expiryDate = calculateExpiryDate();

            const voucherRecord = {
                code: voucherCode,
                voucher: voucher,
                buyer: buyer,
                isGift: isGift,
                giftData: giftData,
                purchaseDate: new Date().toISOString(),
                expiryDate: expiryDate,
                status: 'active',
                used: false,
                paymentId: mpPayment.body.id,
                orderId: `RM-${Date.now()}`
            };

            // 3. Salvar no banco de dados
            vouchersDB.push(voucherRecord);
            ordersDB.push({
                orderId: voucherRecord.orderId,
                voucherCode: voucherCode,
                status: 'completed',
                timestamp: new Date().toISOString()
            });

            // 4. Enviar voucher por Email e WhatsApp
            const emailResult = await sendVoucherEmail(voucherRecord);
            const whatsappResult = await sendVoucherWhatsApp(voucherRecord);

            // 5. Retornar sucesso
            res.json({
                success: true,
                voucherCode: voucherCode,
                orderId: voucherRecord.orderId,
                emailSent: emailResult.success,
                whatsappSent: whatsappResult.success,
                message: 'Voucher criado e enviado com sucesso!'
            });

        } else {
            res.status(400).json({
                success: false,
                error: 'Pagamento não aprovado',
                status: mpPayment.body.status
            });
        }

    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/validate-voucher
 * Validar código de voucher
 */
app.post('/api/validate-voucher', async (req, res) => {
    try {
        const { code } = req.body;

        const voucher = vouchersDB.find(v => v.code === code);

        if (!voucher) {
            return res.json({
                valid: false,
                reason: 'not_found',
                message: 'Voucher não encontrado'
            });
        }

        if (voucher.used) {
            return res.json({
                valid: false,
                reason: 'already_used',
                message: 'Voucher já utilizado',
                voucher: voucher
            });
        }

        const today = new Date();
        const expiryDate = new Date(voucher.expiryDate);

        if (today > expiryDate) {
            return res.json({
                valid: false,
                reason: 'expired',
                message: 'Voucher expirado',
                voucher: voucher
            });
        }

        res.json({
            valid: true,
            voucher: voucher,
            message: 'Voucher válido!'
        });

    } catch (error) {
        console.error('Erro ao validar voucher:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/use-voucher
 * Marcar voucher como utilizado
 */
app.post('/api/use-voucher', async (req, res) => {
    try {
        const { code, usedBy } = req.body;

        const voucher = vouchersDB.find(v => v.code === code);

        if (!voucher) {
            return res.status(404).json({
                success: false,
                error: 'Voucher não encontrado'
            });
        }

        if (voucher.used) {
            return res.status(400).json({
                success: false,
                error: 'Voucher já utilizado'
            });
        }

        voucher.used = true;
        voucher.usedDate = new Date().toISOString();
        voucher.usedBy = usedBy || 'Sistema';

        res.json({
            success: true,
            message: 'Voucher marcado como utilizado',
            voucher: voucher
        });

    } catch (error) {
        console.error('Erro ao usar voucher:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/vouchers
 * Listar todos os vouchers (admin)
 */
app.get('/api/vouchers', (req, res) => {
    res.json({
        success: true,
        vouchers: vouchersDB,
        total: vouchersDB.length
    });
});

/**
 * POST /api/resend-voucher
 * Reenviar voucher por email e WhatsApp
 */
app.post('/api/resend-voucher', async (req, res) => {
    try {
        const { code } = req.body;

        const voucher = vouchersDB.find(v => v.code === code);

        if (!voucher) {
            return res.status(404).json({
                success: false,
                error: 'Voucher não encontrado'
            });
        }

        const emailResult = await sendVoucherEmail(voucher);
        const whatsappResult = await sendVoucherWhatsApp(voucher);

        res.json({
            success: true,
            emailSent: emailResult.success,
            whatsappSent: whatsappResult.success,
            message: 'Voucher reenviado!'
        });

    } catch (error) {
        console.error('Erro ao reenviar voucher:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(CONFIG.PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   🌮 Sistema de Vouchers - JPR Móveis Rústicos      ║
║   Servidor rodando na porta ${CONFIG.PORT}               ║
╚════════════════════════════════════════════════╝

📡 Endpoints disponíveis:
   POST /api/process-payment
   POST /api/validate-voucher
   POST /api/use-voucher
   POST /api/resend-voucher
   GET  /api/vouchers

🔧 Configurações:
   - Mercado Pago: ${CONFIG.MERCADOPAGO_ACCESS_TOKEN ? '✓ Configurado' : '✗ Não configurado'}
   - Email: ${CONFIG.EMAIL_USER ? '✓ Configurado' : '✗ Não configurado'}
   - WhatsApp: ${CONFIG.WHATSAPP_API_URL ? '✓ Configurado' : '✗ Não configurado'}

🌐 Frontend disponível em: http://localhost:${CONFIG.PORT}
    `);
});

module.exports = app;
