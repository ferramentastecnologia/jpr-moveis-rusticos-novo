/**
 * Backend Sistema de Vouchers - JPR Móveis Rústicos
 *
 * Workflow:
 * 1. Cliente preenche dados e paga via Asaas
 * 2. Webhook do Asaas notifica este servidor
 * 3. Gera PDF do voucher com QR Code
 * 4. Envia por Email automaticamente
 * 5. Envia por WhatsApp automaticamente (opcional)
 */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { db, USE_POSTGRES } = require('./database');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Normaliza dados do banco para camelCase
 * PostgreSQL retorna nomes de colunas em lowercase
 * SQLite preserva o case original
 * Esta função padroniza para camelCase
 */
function normalizeOrderData(order) {
    if (!order) return null;
    return {
        id: order.id,
        externalReference: order.externalreference || order.externalReference,
        asaasPaymentId: order.asaaspaymentid || order.asaasPaymentId,
        voucherId: order.voucherid || order.voucherId,
        voucherName: order.vouchername || order.voucherName,
        voucherEmoji: order.voucheremoji || order.voucherEmoji,
        pricePerUnit: order.priceperunit || order.pricePerUnit,
        quantity: order.quantity,
        total: order.total,
        buyerName: order.buyername || order.buyerName,
        buyerEmail: order.buyeremail || order.buyerEmail,
        buyerPhone: order.buyerphone || order.buyerPhone,
        buyerCpf: order.buyercpf || order.buyerCpf,
        createdAt: order.createdat || order.createdAt
    };
}

// ============================================
// CONFIGURAÇÕES
// ============================================

const CONFIG = {
    // Asaas (Gateway de Pagamento)
    ASAAS_API_KEY: process.env.ASAAS_API_KEY || '',
    ASAAS_API_URL: process.env.ASAAS_API_URL || 'https://api.asaas.com/v3',
    ASAAS_SANDBOX: process.env.ASAAS_SANDBOX === 'true',

    // Email
    EMAIL_USER: process.env.EMAIL_USER || 'vouchers@rosamexicano.com.br',
    EMAIL_PASS: process.env.EMAIL_PASS || 'your_password',

    // WhatsApp WAHA API
    WAHA_API_URL: process.env.WAHA_API_URL || 'http://localhost:3001',
    WAHA_API_KEY: process.env.WAHA_API_KEY || 'YOUR_API_KEY',
    WAHA_SESSION: process.env.WAHA_SESSION || 'default',

    // App
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,

    // Admin Login
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'rosa2025',

    // Restaurante
    RESTAURANT_NAME: 'JPR Móveis Rústicos Blumenau',
    RESTAURANT_PHONE: '(47) 3288-3096',
    RESTAURANT_WHATSAPP: '(47) 99233-4348',
    RESTAURANT_ADDRESS: 'Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC'
};

// ============================================
// INICIALIZAÇÃO
// ============================================

const app = express();
app.use(express.json());
app.use(express.static('.')); // Servir arquivos estáticos

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Configurar transporte de Email (Gmail SMTP)
const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: CONFIG.EMAIL_USER,
        pass: CONFIG.EMAIL_PASS
    }
});

// ============================================
// BANCO DE DADOS (SQLite local / PostgreSQL produção)
// ============================================

// Database configurado em database.js
// Detecta automaticamente: SQLite (local) ou PostgreSQL (Railway)

// Funções auxiliares para queries assíncronas
const dbGet = async (sql, params = []) => {
    return await db.get(sql, params);
};

const dbAll = async (sql, params = []) => {
    return await db.all(sql, params);
};

const dbRun = async (sql, params = []) => {
    return await db.run(sql, params);
};

// ============================================
// GERADOR DE CÓDIGO ÚNICO
// ============================================

function generateVoucherCode() {
    const prefix = 'RM';
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    return `${prefix}-${random}-${timestamp}`;
}

// ============================================
// GERADOR DE PDF
// ============================================

/**
 * Gera PDF em memória (sem salvar em arquivo)
 * Melhor para ambientes sem sistema de arquivos persistente (como Railway)
 */
async function generateVoucherPDFBuffer(voucherData) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`📄 Iniciando geração de PDF em buffer para: ${voucherData.code}`);

            const chunks = [];
            const doc = new PDFDocument({ size: 'A4', margin: 30 });

            // Redirecionar output para chunks array
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
                const buffer = Buffer.concat(chunks);
                console.log(`✅ PDF em buffer gerado: ${(buffer.length / 1024).toFixed(2)} KB`);
                resolve(buffer);
            });
            doc.on('error', error => {
                console.error(`❌ Erro ao gerar PDF buffer:`, error);
                reject(error);
            });

            // Validar dados necessários
            if (!voucherData.code || !voucherData.buyer || !voucherData.voucherName) {
                throw new Error('Dados incompletos para gerar PDF');
            }

            const pageWidth = 595.28;
            const pageHeight = 841.89;

            // ========== HEADER GRADIENTE ==========
            doc.rect(0, 0, pageWidth, 140).fill('#E91E63');
            doc.rect(0, 0, pageWidth, 140).opacity(0.3).fill('#9C27B0');
            doc.opacity(1);

            // Logo ou emoji
            try {
                const logoPath = path.join(__dirname, 'images', 'logo.png');
                if (fs.existsSync(logoPath)) {
                    const logoWidth = 100;
                    const logoX = (pageWidth - logoWidth) / 2;
                    doc.image(logoPath, logoX, 35, { width: logoWidth });
                } else {
                    doc.fontSize(60).fillColor('#FFFFFF').text('🌮', 0, 30, { align: 'center' });
                    doc.fontSize(32).font('Helvetica-Bold').fillColor('#FFFFFF').text('JPR Móveis Rústicos', 0, 95, { align: 'center' });
                }
            } catch (logoError) {
                doc.fontSize(60).fillColor('#FFFFFF').text('🌮', 0, 30, { align: 'center' });
                doc.fontSize(32).font('Helvetica-Bold').fillColor('#FFFFFF').text('JPR Móveis Rústicos', 0, 95, { align: 'center' });
            }

            // ========== BOX PRINCIPAL - CÓDIGO DO VOUCHER ==========
            const boxY = 160;
            doc.roundedRect(50, boxY, pageWidth - 100, 120, 10).fill('#FFFFFF');
            doc.roundedRect(50, boxY, pageWidth - 100, 120, 10).lineWidth(2).stroke('#E91E63');

            doc.fontSize(11).font('Helvetica').fillColor('#9C27B0').text('CÓDIGO DO VOUCHER', 0, boxY + 20, { align: 'center' });
            doc.fontSize(20).font('Courier-Bold').fillColor('#E91E63').text(voucherData.code, 0, boxY + 45, { align: 'center' });
            doc.fontSize(10).font('Helvetica').fillColor('#666666').text(
                `Válido até ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}`,
                0, boxY + 85, { align: 'center' }
            );

            // ========== LAYOUT EM 2 COLUNAS ==========
            const col1X = 50;
            const contentY = 310;

            // QR Code
            try {
                const qrCodeDataURL = await QRCode.toDataURL(voucherData.code, { width: 180 });
                const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
                doc.image(qrCodeBuffer, col1X + 25, contentY, { width: 180 });
                doc.fontSize(9).fillColor('#666666').text('Escaneie para validar', col1X, contentY + 195, { width: 230, align: 'center' });
            } catch (qrError) {
                console.warn('⚠️ Erro ao gerar QR Code');
            }

            // Detalhes do voucher
            const col2X = 340;
            doc.fontSize(12).font('Helvetica-Bold').fillColor('#E91E63').text(voucherData.voucherName || 'Voucher', col2X, contentY);
            doc.fontSize(10).font('Helvetica').fillColor('#333333');
            doc.text(`Quantidade: ${voucherData.quantity} ${voucherData.quantity === 1 ? 'pessoa' : 'pessoas'}`, col2X, contentY + 30);
            doc.text(`Valor: R$ ${(voucherData.total || 0).toFixed(2)}`, col2X, contentY + 55);
            doc.text(`Cliente: ${voucherData.buyer.name || 'N/A'}`, col2X, contentY + 80);

            // Footer
            const footerY = 700;
            doc.fontSize(9).fillColor('#666666').text('JPR Móveis Rústicos Blumenau', 0, footerY, { align: 'center' });
            doc.fontSize(8).text('Rua Carlos Rischbieter, 64 - Victor Konder', 0, footerY + 20, { align: 'center' });
            doc.text('📞 (47) 3288-3096 | 📱 WhatsApp: (47) 99233-4348', 0, footerY + 40, { align: 'center' });

            doc.end();

        } catch (error) {
            console.error('❌ Erro ao gerar PDF buffer:', error);
            reject(error);
        }
    });
}

async function generateVoucherPDF(voucherData) {
    return new Promise(async (resolve, reject) => {
        let doc, stream, pdfPath;

        try {
            console.log(`📄 Iniciando geração de PDF para voucher: ${voucherData.code}`);

            const vouchersDir = path.join(__dirname, 'vouchers');
            console.log(`📁 Diretório de vouchers: ${vouchersDir}`);
            console.log(`📁 Diretório existe? ${fs.existsSync(vouchersDir)}`);

            // Criar diretório se não existir - CRÍTICO!
            if (!fs.existsSync(vouchersDir)) {
                console.log(`🔨 Criando diretório de vouchers...`);
                try {
                    fs.mkdirSync(vouchersDir, { recursive: true, mode: 0o755 });
                    console.log(`✅ Diretório de vouchers criado com sucesso: ${vouchersDir}`);
                } catch (mkdirError) {
                    console.error(`❌ ERRO CRÍTICO ao criar diretório: ${mkdirError.message}`);
                    throw new Error(`Não foi possível criar diretório de vouchers: ${mkdirError.message}`);
                }
            } else {
                console.log(`✅ Diretório de vouchers já existe`);
            }

            // Verificar permissões de escrita
            try {
                const testFile = path.join(vouchersDir, '.writetest');
                fs.writeFileSync(testFile, 'test');
                fs.unlinkSync(testFile);
                console.log(`✅ Permissões de escrita verificadas`);
            } catch (writeError) {
                console.error(`❌ ERRO: Sem permissão de escrita no diretório: ${writeError.message}`);
                throw new Error(`Sem permissão de escrita em ${vouchersDir}`);
            }

            pdfPath = path.join(vouchersDir, `${voucherData.code}.pdf`);
            console.log(`📄 Caminho do PDF: ${pdfPath}`);

            // Validar dados necessários
            if (!voucherData.code || !voucherData.buyer || !voucherData.voucherName) {
                throw new Error('Dados incompletos para gerar PDF');
            }

            doc = new PDFDocument({ size: 'A4', margin: 30 });
            stream = fs.createWriteStream(pdfPath);

            doc.pipe(stream);

            const pageWidth = 595.28; // A4 width
            const pageHeight = 841.89; // A4 height

            // ========== HEADER GRADIENTE ==========
            // Rosa para Roxo
            doc.rect(0, 0, pageWidth, 140).fill('#E91E63');
            doc.rect(0, 0, pageWidth, 140).opacity(0.3).fill('#9C27B0');
            doc.opacity(1);

            // Logo do JPR Móveis Rústicos centralizado
            try {
                const logoPath = path.join(__dirname, 'images', 'logo.png');
                if (fs.existsSync(logoPath)) {
                    // Logo centralizado no header (100px de largura)
                    const logoWidth = 100;
                    const logoX = (pageWidth - logoWidth) / 2;
                    doc.image(logoPath, logoX, 35, { width: logoWidth });
                    console.log('✅ Logo adicionado ao PDF');
                } else {
                    console.warn('⚠️ Logo não encontrado, usando texto padrão');
                    // Fallback: Emoji grande
                    doc.fontSize(60).fillColor('#FFFFFF').text('🌮', 0, 30, { align: 'center' });
                    // Nome do restaurante
                    doc.fontSize(32).font('Helvetica-Bold').fillColor('#FFFFFF').text('JPR Móveis Rústicos', 0, 95, { align: 'center' });
                }
            } catch (logoError) {
                console.error('❌ Erro ao adicionar logo:', logoError);
                // Fallback: Emoji grande
                doc.fontSize(60).fillColor('#FFFFFF').text('🌮', 0, 30, { align: 'center' });
                // Nome do restaurante
                doc.fontSize(32).font('Helvetica-Bold').fillColor('#FFFFFF').text('JPR Móveis Rústicos', 0, 95, { align: 'center' });
            }

            // ========== BOX PRINCIPAL - CÓDIGO DO VOUCHER ==========
            const boxY = 160;
            const boxHeight = 120;

            // Box com sombra
            doc.roundedRect(50, boxY, pageWidth - 100, boxHeight, 10).fill('#FFFFFF');
            doc.roundedRect(50, boxY, pageWidth - 100, boxHeight, 10).lineWidth(2).stroke('#E91E63');

            // Label "CÓDIGO DO VOUCHER"
            doc.fontSize(11).font('Helvetica').fillColor('#9C27B0').text('CÓDIGO DO VOUCHER', 0, boxY + 20, { align: 'center' });

            // Código em destaque
            doc.fontSize(20).font('Courier-Bold').fillColor('#E91E63').text(voucherData.code, 0, boxY + 45, { align: 'center' });

            // Data de validade
            doc.fontSize(10).font('Helvetica').fillColor('#666666').text(
                `Válido até ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}`,
                0, boxY + 85, { align: 'center' }
            );

            // ========== LAYOUT EM 2 COLUNAS ==========
            const col1X = 50;
            const col2X = 340;
            const contentY = 310;

            // COLUNA 1: QR CODE
            try {
                const qrCodeDataURL = await QRCode.toDataURL(voucherData.code, { width: 180 });
                const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
                doc.image(qrCodeBuffer, col1X + 25, contentY, { width: 180 });

                doc.fontSize(9).fillColor('#666666').text('Escaneie para validar', col1X, contentY + 195, { width: 230, align: 'center' });
                console.log('✅ QR Code gerado com sucesso');
            } catch (qrError) {
                console.warn('⚠️ Erro ao gerar QR Code');
            }

            // COLUNA 2: DETALHES
            let detailY = contentY;

            // Box de destaque do voucher
            doc.roundedRect(col2X, detailY, 205, 60, 5).fill('#F5F5F5');
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#E91E63').text('VOUCHER', col2X + 10, detailY + 10);
            doc.fontSize(13).font('Helvetica-Bold').fillColor('#1A1A1A').text(voucherData.voucherName, col2X + 10, detailY + 28, { width: 185 });

            detailY += 70;

            // Informações do voucher
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#666666').text('Quantidade:', col2X, detailY);
            doc.fontSize(10).font('Helvetica').fillColor('#1A1A1A').text(
                `${voucherData.quantity} ${voucherData.quantity === 1 ? 'pessoa' : 'pessoas'}`,
                col2X + 75, detailY
            );

            detailY += 18;
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#666666').text('Valor Pago:', col2X, detailY);
            doc.fontSize(10).font('Helvetica').fillColor('#E91E63').text(
                voucherData.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                col2X + 75, detailY
            );

            detailY += 30;

            // Comprador
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#9C27B0').text('COMPRADOR', col2X, detailY);
            detailY += 18;
            doc.fontSize(9).font('Helvetica').fillColor('#1A1A1A').text(voucherData.buyer.name || 'N/A', col2X, detailY, { width: 205 });
            detailY += 14;
            doc.fontSize(8).font('Helvetica').fillColor('#666666').text(voucherData.buyer.email || 'N/A', col2X, detailY, { width: 205 });
            detailY += 12;
            doc.fontSize(8).font('Helvetica').fillColor('#666666').text(voucherData.buyer.phone || 'N/A', col2X, detailY);

            // ========== COMO USAR ==========
            const instructY = 540;

            doc.roundedRect(50, instructY, pageWidth - 100, 110, 8).fill('#F9F9F9');

            doc.fontSize(13).font('Helvetica-Bold').fillColor('#E91E63').text('Como Usar Seu Voucher', 65, instructY + 15);

            const steps = [
                '1. Faça sua reserva: (47) 99233-4348',
                '2. Informe que possui um voucher',
                '3. Apresente este código no restaurante',
                '4. Aproveite sua experiência! 🎉'
            ];

            let stepY = instructY + 40;
            steps.forEach(step => {
                doc.fontSize(10).font('Helvetica').fillColor('#333333').text(step, 65, stepY);
                stepY += 16;
            });

            // ========== FOOTER ==========
            const footerY = 680;

            // Linha decorativa
            doc.moveTo(50, footerY).lineTo(pageWidth - 50, footerY).lineWidth(1).stroke('#E0E0E0');

            // Informações do restaurante
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#E91E63').text(CONFIG.RESTAURANT_NAME, 0, footerY + 15, { align: 'center' });
            doc.fontSize(9).font('Helvetica').fillColor('#666666').text(CONFIG.RESTAURANT_ADDRESS, 50, footerY + 35, { width: pageWidth - 100, align: 'center' });
            doc.fontSize(9).fillColor('#9C27B0').text(
                `${CONFIG.RESTAURANT_PHONE} | WhatsApp: ${CONFIG.RESTAURANT_WHATSAPP}`,
                0, footerY + 55, { align: 'center' }
            );
            doc.fontSize(8).fillColor('#999999').text('Seg-Dom: 18h às 00h', 0, footerY + 75, { align: 'center' });

            // Marca d'água discreta
            doc.fontSize(7).fillColor('#CCCCCC').text(
                `Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
                0, footerY + 95, { align: 'center' }
            );

            doc.end();

            stream.on('finish', () => {
                // Verificar se arquivo foi criado
                if (fs.existsSync(pdfPath)) {
                    const stats = fs.statSync(pdfPath);
                    console.log(`✅ PDF gerado com sucesso: ${pdfPath} (${(stats.size / 1024).toFixed(2)} KB)`);
                    resolve(pdfPath);
                } else {
                    reject(new Error('PDF não foi criado após finalização do stream'));
                }
            });

            stream.on('error', (error) => {
                console.error('❌ Erro no stream do PDF:', error);
                reject(error);
            });

        } catch (error) {
            console.error('❌ Erro ao gerar PDF:', error);
            // Limpar arquivo parcial se existir
            if (pdfPath && fs.existsSync(pdfPath)) {
                try {
                    fs.unlinkSync(pdfPath);
                } catch (unlinkError) {
                    console.error('Erro ao remover PDF parcial:', unlinkError);
                }
            }
            reject(error);
        }
    });
}

// ============================================
// ENVIO POR EMAIL
// ============================================

async function sendVoucherEmail(voucherData, pdfPath) {
    try {
        // Validar configuração de email
        if (!CONFIG.EMAIL_USER || CONFIG.EMAIL_USER === 'vouchers@rosamexicano.com.br') {
            console.warn('⚠️ Email não configurado. Pulando envio por email.');
            return { success: false, error: 'Email não configurado', skipped: true };
        }

        // Validar email do destinatário
        if (!voucherData.buyer?.email) {
            console.warn('⚠️ Email do destinatário não fornecido');
            return { success: false, error: 'Email do destinatário não fornecido', skipped: true };
        }

        // Validar se PDF existe
        if (!pdfPath || !fs.existsSync(pdfPath)) {
            console.error('❌ PDF não encontrado:', pdfPath);
            return { success: false, error: 'PDF não encontrado' };
        }

        console.log(`📧 Preparando envio de email para: ${voucherData.buyer.email}`);

        const mailOptions = {
            from: `"${CONFIG.RESTAURANT_NAME}" <${CONFIG.EMAIL_USER}>`,
            to: voucherData.buyer.email,
            subject: `🌮 Seu Voucher JPR Móveis Rústicos - ${voucherData.code}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #E91E63, #9C27B0); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0;">🌮 JPR Móveis Rústicos</h1>
                        <h2 style="margin: 10px 0;">Seu Voucher Chegou!</h2>
                    </div>

                    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
                        <p>Olá, <strong>${voucherData.buyer.name || 'Cliente'}</strong>!</p>

                        <p>Sua compra foi confirmada! Aqui está seu voucher:</p>

                        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #666; font-size: 12px;">CÓDIGO DO VOUCHER</p>
                            <p style="margin: 10px 0; font-size: 24px; font-weight: bold; color: #E91E63; font-family: monospace;">${voucherData.code}</p>
                        </div>

                        <h3>📋 Detalhes:</h3>
                        <ul>
                            <li><strong>Voucher:</strong> ${voucherData.voucherName}</li>
                            <li><strong>Quantidade:</strong> ${voucherData.quantity} ${voucherData.quantity === 1 ? 'pessoa' : 'pessoas'}</li>
                            <li><strong>Valor Pago:</strong> ${voucherData.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                            <li><strong>Validade:</strong> ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}</li>
                        </ul>

                        <h3>📝 Como Usar:</h3>
                        <ol>
                            <li>Faça sua reserva: ${CONFIG.RESTAURANT_WHATSAPP}</li>
                            <li>Informe que possui um voucher</li>
                            <li>Apresente o código no restaurante</li>
                            <li>Aproveite!</li>
                        </ol>

                        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <strong>Endereço:</strong> ${CONFIG.RESTAURANT_ADDRESS}<br>
                            <strong>Horário:</strong> Segunda a Domingo, 18h às 00h
                        </p>
                    </div>

                    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                        <p>© ${new Date().getFullYear()} JPR Móveis Rústicos Blumenau</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `voucher-${voucherData.code}.pdf`,
                    path: pdfPath
                }
            ]
        };

        // Verificar conexão com servidor de email antes de enviar
        try {
            await emailTransporter.verify();
            console.log('✅ Conexão com servidor de email verificada');
        } catch (verifyError) {
            console.error('❌ Erro ao verificar conexão com servidor de email:', verifyError.message);
            return { success: false, error: 'Servidor de email não acessível' };
        }

        const info = await emailTransporter.sendMail(mailOptions);
        console.log(`✅ Email enviado com sucesso para ${voucherData.buyer.email} - MessageID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('❌ Erro ao enviar email:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', error.response);
        }
        return { success: false, error: error.message };
    }
}

// ============================================
// ENVIO POR WHATSAPP (WAHA API - Link do PDF)
// ============================================

async function sendVoucherWhatsApp(voucherData, pdfPath) {
    try {
        // Validar configuração do WhatsApp
        if (!CONFIG.WAHA_API_URL || CONFIG.WAHA_API_KEY === 'YOUR_API_KEY') {
            console.warn('⚠️ WhatsApp não configurado. Pulando envio por WhatsApp.');
            return { success: false, error: 'WhatsApp não configurado', skipped: true };
        }

        // Validar telefone
        if (!voucherData.buyer?.phone) {
            console.warn('⚠️ Telefone não fornecido');
            return { success: false, error: 'Telefone não fornecido', skipped: true };
        }

        const phoneNumber = voucherData.buyer.phone.replace(/\D/g, '');

        console.log(`💬 Preparando envio WhatsApp para: ${phoneNumber}`);
        console.log(`📡 WAHA URL: ${CONFIG.WAHA_API_URL}`);

        // URL para download do PDF
        const pdfDownloadUrl = `${CONFIG.APP_URL}/api/download-pdf?code=${voucherData.code}`;

        // Mensagem de texto com link do PDF
        const textMessage = `
🌮 *JPR Móveis Rústicos*

Olá, *${voucherData.buyer.name}*! 🎉

✅ Seu voucher foi gerado com sucesso!

*CÓDIGO:* \`${voucherData.code}\`

📋 *Detalhes:*
• Voucher: ${voucherData.voucherName}
• Quantidade: ${voucherData.quantity} ${voucherData.quantity === 1 ? 'pessoa' : 'pessoas'}
• Valor Pago: ${voucherData.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
• Validade: ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}

📄 *Baixar PDF do Voucher:*
${pdfDownloadUrl}

📝 *Como usar:*
1️⃣ Faça sua reserva: ${CONFIG.RESTAURANT_WHATSAPP}
2️⃣ Informe que possui um voucher
3️⃣ Apresente o código no restaurante
4️⃣ Aproveite sua experiência!

📍 ${CONFIG.RESTAURANT_ADDRESS}
⏰ Seg-Dom: 18h às 00h

_Você também receberá o voucher por email!_ 📧
        `.trim();

        // Enviar mensagem de texto via WAHA API
        console.log('📤 Enviando mensagem com link do PDF...');

        const chatId = `${phoneNumber}@c.us`;

        await axios.post(
            `${CONFIG.WAHA_API_URL}/api/sendText`,
            {
                session: CONFIG.WAHA_SESSION,
                chatId: chatId,
                text: textMessage
            },
            {
                headers: {
                    'X-Api-Key': CONFIG.WAHA_API_KEY,
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 segundos timeout
            }
        );

        console.log(`✅ WhatsApp enviado com sucesso para ${phoneNumber}`);
        return { success: true };

    } catch (error) {
        console.error('❌ Erro ao enviar WhatsApp:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
        return { success: false, error: error.message };
    }
}

// ============================================
// ROTAS DA API
// ============================================

/**
 * POST /api/admin-login
 * Login administrativo
 */
app.post('/api/admin-login', (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('🔐 Tentativa de login:', username);

        // Validar credenciais
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Usuário e senha são obrigatórios'
            });
        }

        // Verificar credenciais
        if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
            // Gerar token simples (em produção, use JWT)
            const token = crypto.randomBytes(32).toString('hex');

            console.log('✅ Login bem-sucedido:', username);

            return res.json({
                success: true,
                token,
                username
            });
        } else {
            console.log('❌ Login falhou: credenciais inválidas');
            return res.status(401).json({
                success: false,
                error: 'Usuário ou senha incorretos'
            });
        }
    } catch (error) {
        console.error('❌ Erro no login:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });
    }
});

/**
 * GET /health
 * Verifica se o servidor está online
 */
app.get('/health', (req, res) => {
    return res.json({
        status: 'ok',
        env: process.env.NODE_ENV || 'development',
        port: CONFIG.PORT,
        time: new Date().toISOString()
    });
});

/**
 * GET /api/download-pdf
 * Faz o download do PDF do voucher pelo código
 * Uso: /api/download-pdf?code=RM-XXXX
 */
app.get('/api/download-pdf', async (req, res) => {
    try {
        const code = (req.query.code || '').toString();
        if (!code) {
            return res.status(400).json({ success: false, error: 'Parâmetro ?code é obrigatório' });
        }

        console.log(`📥 Tentando baixar PDF para código: ${code}`);

        const vouchersDir = path.join(__dirname, 'vouchers');
        const pdfPath = path.join(vouchersDir, `${code}.pdf`);

        console.log(`📂 Caminho esperado: ${pdfPath}`);
        console.log(`📂 Diretório vouchers existe? ${fs.existsSync(vouchersDir)}`);

        // Verificar se o arquivo existe
        if (!fs.existsSync(pdfPath)) {
            console.error(`❌ PDF não encontrado em: ${pdfPath}`);

            // Listar arquivos disponíveis
            if (fs.existsSync(vouchersDir)) {
                const files = fs.readdirSync(vouchersDir);
                console.log(`📁 Arquivos no diretório vouchers (total: ${files.length}):`, files.slice(0, 10));

                // Tentar gerar o PDF sob demanda
                console.log(`🔄 Tentando gerar PDF sob demanda para: ${code}`);
                const voucher = await dbGet(`SELECT * FROM vouchers WHERE code = ?`, [code]);

                if (!voucher) {
                    return res.status(404).json({ success: false, error: 'Voucher não encontrado no banco de dados' });
                }

                // Montar dados do voucher
                const voucherData = {
                    code: voucher.code,
                    voucherName: voucher.vouchername || voucher.voucherName,
                    voucherEmoji: voucher.voucheremoji || voucher.voucherEmoji || '🎫',
                    buyer: {
                        name: voucher.buyername || voucher.buyerName,
                        email: voucher.buyeremail || voucher.buyerEmail,
                        phone: voucher.buyerphone || voucher.buyerPhone
                    },
                    quantity: voucher.quantity || 1,
                    total: voucher.total || voucher.value || 0,
                    purchaseDate: voucher.purchasedate || voucher.purchaseDate,
                    expiryDate: voucher.expirydate || voucher.expiryDate || voucher.useuntil || voucher.useUntil,
                    used: voucher.used === 1 || voucher.used === true,
                    status: voucher.status || 'active'
                };

                try {
                    console.log(`📄 Gerando PDF em memória para: ${voucherData.code}`);
                    const pdfBuffer = await generateVoucherPDFBuffer(voucherData);
                    console.log(`✅ PDF gerado em memória: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);

                    if (pdfBuffer && pdfBuffer.length > 0) {
                        console.log(`✅ Enviando PDF diretamente para o cliente...`);
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', `attachment; filename="voucher-${code}.pdf"`);
                        res.setHeader('Content-Length', pdfBuffer.length);
                        res.end(pdfBuffer);
                        console.log(`✅ PDF enviado com sucesso para: ${code}`);
                        return;
                    } else {
                        console.error(`❌ PDF buffer vazio`);
                    }
                } catch (pdfError) {
                    console.error(`❌ Erro ao gerar PDF em memória: ${pdfError.message}`);
                    console.error(`Stack: ${pdfError.stack}`);
                    return res.status(500).json({
                        success: false,
                        error: `Erro ao gerar PDF: ${pdfError.message}`
                    });
                }
            } else {
                console.error(`❌ Diretório vouchers não existe: ${vouchersDir}`);
            }

            return res.status(404).json({ success: false, error: 'PDF não encontrado e não foi possível gerar' });
        }

        console.log(`✅ PDF encontrado, enviando...`);

        // Enviar o PDF como arquivo
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="voucher-${code}.pdf"`);
        res.setHeader('Content-Length', fs.statSync(pdfPath).size);

        const fileStream = fs.createReadStream(pdfPath);
        fileStream.on('error', (error) => {
            console.error('❌ Erro ao ler arquivo PDF:', error);
            if (!res.headersSent) {
                res.status(500).json({ success: false, error: 'Erro ao ler arquivo' });
            }
        });

        fileStream.pipe(res);
        console.log(`✅ PDF enviado com sucesso para: ${code}`);

    } catch (error) {
        console.error('❌ Erro no endpoint download-pdf:', error);
        if (!res.headersSent) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * GET /api/test-pdf
 * Gera um PDF de teste (sem enviar email) e retorna detalhes
 * Uso: /api/test-pdf
 */
app.get('/api/test-pdf', async (req, res) => {
    try {
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 6);

        const voucherData = {
            code: `RM-PDF-${Date.now().toString(36).toUpperCase()}`,
            voucherId: 'teste-pdf',
            voucherName: '🧪 Teste de PDF',
            voucherEmoji: '🧪',
            pricePerUnit: 1,
            quantity: 1,
            total: 1,
            buyer: {
                name: 'Teste PDF',
                email: 'teste@example.com',
                phone: '(47) 99999-9999'
            },
            purchaseDate: new Date().toISOString(),
            expiryDate: expiry.toISOString(),
            status: 'active',
            used: false,
            paymentId: 'TEST-PDF',
            orderId: 'TEST-PDF'
        };

        const pdfPath = await generateVoucherPDF(voucherData);

        return res.json({
            success: true,
            message: 'PDF gerado com sucesso',
            code: voucherData.code,
            pdfPath,
            hint: 'Abra o caminho no servidor ou devolva via rota de download dedicada'
        });
    } catch (error) {
        console.error('❌ Erro no teste de PDF:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * GET /api/debug/vouchers-list
 * Debug - Lista todos os vouchers e PDFs existentes
 */
app.get('/api/debug/vouchers-list', async (req, res) => {
    try {
        const vouchers = await dbAll(`SELECT id, code, vouchername, buyername FROM vouchers LIMIT 10`);

        const vouchersDir = path.join(__dirname, 'vouchers');
        let pdfFiles = [];

        if (fs.existsSync(vouchersDir)) {
            pdfFiles = fs.readdirSync(vouchersDir).filter(f => f.endsWith('.pdf'));
        }

        return res.json({
            vouchers: vouchers || [],
            pdfFiles: pdfFiles,
            vouchersDir: vouchersDir,
            dirExists: fs.existsSync(vouchersDir)
        });
    } catch (error) {
        console.error('❌ Erro no debug:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * GET /api/test-email
 * Gera um PDF de teste e envia por email para validar a configuração
 * Uso: /api/test-email?to=seu-email@dominio.com
 */
app.get('/api/test-email', async (req, res) => {
    try {
        const to = (req.query.to || CONFIG.EMAIL_USER || '').toString();

        if (!to) {
            return res.status(400).json({ success: false, error: 'Defina ?to=email@dominio.com ou configure EMAIL_USER no ambiente' });
        }

        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 6);

        const voucherData = {
            code: `RM-TEST-${Date.now().toString(36).toUpperCase()}`,
            voucherId: 'teste',
            voucherName: '🧪 Teste de Envio',
            voucherEmoji: '🧪',
            pricePerUnit: 1,
            quantity: 1,
            total: 1,
            buyer: {
                name: 'Teste Automático',
                email: to,
                phone: '(47) 99999-9999'
            },
            purchaseDate: new Date().toISOString(),
            expiryDate: expiry.toISOString(),
            status: 'active',
            used: false,
            paymentId: 'TEST',
            orderId: 'TEST'
        };

        // 1) Gera PDF
        const pdfPath = await generateVoucherPDF(voucherData);

        // 2) Envia email
        const emailResult = await sendVoucherEmail(voucherData, pdfPath);

        return res.json({
            success: !!emailResult.success,
            to,
            code: voucherData.code,
            pdfPath,
            email: emailResult
        });
    } catch (error) {
        console.error('❌ Erro no teste de email:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * POST /api/create-payment
 * Criar cobrança no Asaas
 */
app.post('/api/create-payment', async (req, res) => {
    try {
        const { voucherId, voucherName, voucherEmoji, pricePerUnit, quantity, total, buyer } = req.body;

        const externalReference = `RM-${Date.now()}`;

        // Validar dados obrigatórios
        if (!buyer.name || !buyer.email) {
            return res.status(400).json({
                success: false,
                error: 'Nome e email do comprador são obrigatórios'
            });
        }

        console.log('📱 Criando cobrança no Asaas');

        // Primeiro, criar ou buscar cliente no Asaas
        console.log('🔍 Criando cliente no Asaas...');

        const customerData = {
            name: buyer.name,
            email: buyer.email,
            mobilePhone: buyer.phone ? buyer.phone.replace(/\D/g, '') : undefined,
            cpfCnpj: buyer.cpf ? buyer.cpf.replace(/\D/g, '') : undefined,
            externalReference: `BUYER-${buyer.email}`
        };

        const customerResponse = await axios.post(
            `${CONFIG.ASAAS_API_URL}/customers`,
            customerData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': CONFIG.ASAAS_API_KEY
                }
            }
        );

        const customerId = customerResponse.data.id;
        console.log('✅ Cliente criado no Asaas:', customerId);

        // Agora criar a cobrança (com PIX e checkout para cartão)
        const paymentData = {
            customer: customerId,
            billingType: 'UNDEFINED', // UNDEFINED permite múltiplas formas de pagamento (PIX + CARTÃO)
            value: total,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Vencimento em 7 dias
            description: `${quantity}x ${voucherName} - JPR Móveis Rústicos Blumenau`,
            externalReference: externalReference,
            postalService: false,
            reminders: {
                email: false,  // Desabilitar lembretes automáticos
                sms: false
            },
            enableCheckout: true // Habilitar checkout (PIX + Cartão)
        };

        console.log('Dados enviados para Asaas:', paymentData);

        const response = await axios.post(
            `${CONFIG.ASAAS_API_URL}/payments`,
            paymentData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': CONFIG.ASAAS_API_KEY
                }
            }
        );

        console.log('✅ Cobrança criada no Asaas:', response.data);

        const asaasPaymentId = response.data.id;
        let invoiceUrl = response.data.invoiceUrl;

        // Se não tiver invoiceUrl, gerar manualmente
        if (!invoiceUrl) {
            // Tentar gerar URL de checkout do Asaas
            invoiceUrl = `https://www.asaas.com/i/${asaasPaymentId}`;
            console.log('⚠️ invoiceUrl não foi retornado, usando padrão:', invoiceUrl);
        }

        console.log('📋 Invoice URL:', invoiceUrl);

        // Salvar pedido pendente no banco
        await dbRun(`
            INSERT INTO orders (
                externalReference, asaasPaymentId, voucherId, voucherName, voucherEmoji,
                pricePerUnit, quantity, total, buyerName, buyerEmail, buyerPhone, buyerCpf
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            externalReference,
            asaasPaymentId,
            voucherId,
            voucherName,
            voucherEmoji,
            pricePerUnit,
            quantity,
            total,
            buyer.name,
            buyer.email,
            buyer.phone || '',
            buyer.cpf || ''
        ]);

        console.log(`💾 Pedido salvo: ${externalReference} | Asaas ID: ${asaasPaymentId}`);

        res.json({
            success: true,
            paymentUrl: invoiceUrl, // URL do checkout Asaas
            paymentId: asaasPaymentId, // ID para buscar QR Code
            asaasPaymentId, // Compatibilidade
            externalReference,
            orderId: externalReference
        });

    } catch (error) {
        console.error('❌ Erro ao criar pagamento:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.errors?.[0]?.description || error.message,
            details: error.response?.data
        });
    }
});

/**
 * POST /api/process-card-payment
 * Processa pagamento com cartão de forma transparente via Asaas
 * O Asaas notificará via webhook quando o pagamento for confirmado
 */
app.post('/api/process-card-payment', async (req, res) => {
    try {
        const { paymentId, card, buyer } = req.body;

        if (!paymentId || !card) {
            return res.status(400).json({
                success: false,
                error: 'Dados incompletos: paymentId e card são obrigatórios'
            });
        }

        console.log('💳 Processando pagamento com cartão via Asaas:', paymentId);

        // Confirmar o pagamento com os dados do cartão
        const response = await axios.post(
            `${CONFIG.ASAAS_API_URL}/payments/${paymentId}`,
            {
                billingType: 'CREDIT_CARD',
                creditCard: {
                    holderName: card.holderName,
                    number: card.number,
                    expiryMonth: parseInt(card.expiryMonth),
                    expiryYear: parseInt(card.expiryYear),
                    ccv: card.ccv
                }
            },
            {
                headers: {
                    'access_token': CONFIG.ASAAS_API_KEY
                }
            }
        );

        console.log('✅ Pagamento processado:', response.data);

        res.json({
            success: true,
            message: 'Pagamento processado com sucesso',
            paymentId: paymentId,
            status: response.data.status
        });
    } catch (error) {
        console.error('❌ Erro ao processar cartão:', error.response?.data || error.message);

        const errorMsg = error.response?.data?.errors?.[0]?.description || error.message;

        res.status(500).json({
            success: false,
            error: errorMsg,
            message: 'Verifique os dados do cartão e tente novamente'
        });
    }
});

/**
 * POST /api/webhook
 * Webhook do Asaas para notificações de pagamento
 *
 * Asaas envia:
 * {
 *   "event": "PAYMENT_CONFIRMED" ou "PAYMENT_RECEIVED",
 *   "payment": {
 *     "id": "pay_xxxxxxxx",
 *     "externalReference": "RM-123456",
 *     "value": 50.00,
 *     "status": "CONFIRMED" ou "RECEIVED",
 *     "billingType": "PIX" ou "CREDIT_CARD" ou "BOLETO"
 *   }
 * }
 */
app.post('/api/webhook', async (req, res) => {
    try {
        console.log('📥 Webhook recebido do Asaas:', JSON.stringify(req.body, null, 2));

        // Responder IMEDIATAMENTE com sucesso (dentro de 1 segundo)
        res.status(200).send('OK');

        // Dados do webhook Asaas
        const webhookData = req.body;
        const event = webhookData.event;
        const payment = webhookData.payment;

        // Validar campos obrigatórios
        if (!event || !payment) {
            console.error('❌ Webhook inválido: falta event ou payment');
            return;
        }

        // Processar apenas pagamentos confirmados ou recebidos
        if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
            console.log(`ℹ️ Evento ignorado: ${event}`);
            return;
        }

        const externalReference = payment.externalReference;

        if (!externalReference) {
            console.error('❌ Webhook sem externalReference');
            return;
        }

        console.log(`🔍 Buscando pedido: ${externalReference}`);

        // IMPORTANTE: PostgreSQL converte nomes de coluna para lowercase!
        // Precisamos tentar ambas as variações
        let order = await dbGet(`
            SELECT * FROM orders WHERE externalreference = ?
        `, [externalReference]);

        if (!order) {
            console.log(`⚠️ Tentando com uppercase: ${externalReference}`);
            order = await dbGet(`
                SELECT * FROM orders WHERE externalReference = ?
            `, [externalReference]);
        }

        // Normalizar dados (compatibilidade PostgreSQL/SQLite)
        order = normalizeOrderData(order);

        console.log(`📋 Pedido buscado do banco:`, order);

        if (!order) {
            console.error(`❌ Pedido não encontrado: ${externalReference}`);
            // Listar TODOS os pedidos para entender a estrutura
            const allOrders = await dbAll(`SELECT * FROM orders LIMIT 10`);
            console.error(`📊 Total de pedidos no banco:`, allOrders.length);
            console.error(`📊 Primeiros pedidos:`, allOrders.slice(0, 3).map(o => ({
                id: o.id || o.ID,
                externalRef: o.externalreference || o.externalReference || 'MISSING',
                buyerName: o.buyername || o.buyerName || 'MISSING'
            })));
            return;
        }

        console.log(`✅ Pedido encontrado - Buyer: ${order.buyerName}, Email: ${order.buyerEmail}, Phone: ${order.buyerPhone}`);

        // Verificar se já foi processado (buscar voucher associado)
        const existingVoucher = await dbGet(`
            SELECT * FROM vouchers WHERE orderid = ? OR orderId = ?
        `, [externalReference, externalReference]);

        if (existingVoucher) {
            console.log(`⚠️ Pedido já foi processado: ${externalReference}`);
            return;
        }

        console.log(`✅ Processando pagamento aprovado para pedido: ${externalReference}`);

        // Gerar voucher
        const voucherCode = generateVoucherCode();
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);

        const purchaseDate = new Date().toISOString();
        const expiryDateISO = expiryDate.toISOString();

        const voucherData = {
            code: voucherCode,
            voucherId: order.voucherId,
            voucherName: order.voucherName,
            voucherEmoji: order.voucherEmoji,
            pricePerUnit: order.pricePerUnit,
            quantity: order.quantity,
            total: order.total,
            buyer: {
                name: order.buyerName,
                email: order.buyerEmail,
                phone: order.buyerPhone
            },
            purchaseDate: purchaseDate,
            expiryDate: expiryDateISO,
            status: 'active',
            used: false,
            paymentId: payment.id,
            orderId: externalReference,
            asaasPaymentId: payment.id
        };

        // Salvar voucher no banco
        const voucherInsertValues = [
            voucherCode,
            order.voucherId,
            order.voucherName,
            order.voucherEmoji,
            order.pricePerUnit,
            order.quantity,
            order.total,
            order.buyerName,
            order.buyerEmail,
            order.buyerPhone,
            purchaseDate,
            expiryDateISO,
            'active',
            0, // used = false
            payment.id,
            externalReference
        ];

        console.log(`💾 Salvando voucher com dados:`, {
            code: voucherCode,
            buyerName: order.buyerName,
            buyerEmail: order.buyerEmail,
            buyerPhone: order.buyerPhone,
            orderId: externalReference
        });

        await dbRun(`
            INSERT INTO vouchers (
                code, voucherId, voucherName, voucherEmoji, pricePerUnit, quantity, total,
                buyerName, buyerEmail, buyerPhone, purchaseDate, expiryDate, status, used, paymentId, orderId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, voucherInsertValues);

        console.log(`✅ Voucher salvo com sucesso: ${voucherCode}`);

        // Processar geração de PDF e envios de forma sequencial com tratamento de erros
        try {
            // 1. Gerar PDF
            console.log(`📄 Gerando PDF do voucher: ${voucherCode}...`);
            const pdfPath = await generateVoucherPDF(voucherData);
            console.log(`✅ PDF gerado: ${pdfPath}`);

            // ⚠️ EMAIL E WHATSAPP DESABILITADOS - Cliente baixa PDF diretamente
            // 2. Enviar por email (DESABILITADO)
            // try {
            //     console.log(`📧 Enviando email para: ${voucherData.buyer.email}...`);
            //     const emailResult = await sendVoucherEmail(voucherData, pdfPath);
            //     if (emailResult.success) {
            //         console.log('✅ Email enviado com sucesso');
            //     } else if (emailResult.skipped) {
            //         console.log('⚠️ Envio de email pulado (não configurado ou sem destinatário)');
            //     } else {
            //         console.error('❌ Falha ao enviar email:', emailResult.error);
            //     }
            // } catch (emailError) {
            //     console.error('❌ Erro ao enviar email (continuando):', emailError.message);
            // }

            // 3. Enviar por WhatsApp (DESABILITADO)
            // try {
            //     console.log(`💬 Enviando WhatsApp para: ${voucherData.buyer.phone}...`);
            //     const whatsappResult = await sendVoucherWhatsApp(voucherData, pdfPath);
            //     if (whatsappResult.success) {
            //         console.log('✅ WhatsApp enviado com sucesso');
            //     } else {
            //         console.error('❌ Falha ao enviar WhatsApp:', whatsappResult.error);
            //     }
            // } catch (whatsappError) {
            //     console.error('❌ Erro ao enviar WhatsApp (continuando):', whatsappError.message);
            // }

            console.log('📝 Email e WhatsApp desabilitados - Cliente baixa PDF na página de sucesso');

            console.log(`🎉 Voucher processado com sucesso! Código: ${voucherCode}`);

        } catch (processError) {
            console.error('❌ Erro ao processar voucher após pagamento aprovado:', processError);
            // Não reverter o status do pedido, pois o pagamento foi confirmado
            // O voucher foi criado, mas pode ter falhado na geração de PDF/envio
        }

    } catch (error) {
        console.error('❌ Erro no webhook:', error);
        // Sempre responder 200 para o Asaas, mesmo com erro interno
        // Isso evita que o Asaas tente reenviar o webhook repetidamente
    }
});

/**
 * POST /api/admin/reset-database
 * ⚠️ APENAS PARA DESENVOLVIMENTO - Limpa todos os vouchers e orders
 * NÃO usar em produção real!
 */
app.post('/api/admin/reset-database', async (req, res) => {
    try {
        console.log('🔴 RESETANDO BANCO DE DADOS...');

        // Deletar todos os vouchers
        await dbRun(`DELETE FROM vouchers`);
        console.log('✅ Vouchers deletados');

        // Deletar todos os orders
        await dbRun(`DELETE FROM orders`);
        console.log('✅ Orders deletados');

        res.json({
            success: true,
            message: 'Banco de dados resetado com sucesso',
            vouchersDeleted: 'all',
            ordersDeleted: 'all',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Erro ao resetar banco:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * GET /api/vouchers
 * Listar vouchers (admin)
 */
app.get('/api/vouchers', async (req, res) => {
    try {
        const vouchers = await dbAll(`SELECT * FROM vouchers ORDER BY createdat DESC`);

        // Converter campos do banco para formato original
        // Normalizar para camelCase (compatibilidade PostgreSQL/SQLite)
        const formattedVouchers = vouchers.map(v => ({
            ...v,
            buyer: {
                name: v.buyername || v.buyerName,
                email: v.buyeremail || v.buyerEmail,
                phone: v.buyerphone || v.buyerPhone
            },
            used: v.used === 1 || v.used === true
        }));

        res.json({
            success: true,
            vouchers: formattedVouchers
        });
    } catch (error) {
        console.error('❌ Erro ao listar vouchers:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * POST /api/validate-voucher
 * Validar voucher
 */
app.post('/api/validate-voucher', async (req, res) => {
    try {
        const { code } = req.body;

        // Normalizar código (remover espaços e converter para uppercase)
        const normalizedCode = code.trim().toUpperCase();

        const voucher = await dbGet(`SELECT * FROM vouchers WHERE UPPER(code) = ?`, [normalizedCode]);

        if (!voucher) {
            console.log(`❌ Voucher não encontrado: ${normalizedCode}`);
            return res.json({ valid: false, reason: 'not_found' });
        }

        console.log(`✅ Voucher encontrado: ${voucher.code}`);

        // Converter campos do banco (normalizar lowercase do PostgreSQL)
        const formattedVoucher = {
            ...voucher,
            buyer: {
                name: voucher.buyerName || voucher.buyername,
                email: voucher.buyerEmail || voucher.buyeremail,
                phone: voucher.buyerPhone || voucher.buyerphone
            },
            used: voucher.used === 1 || voucher.used === true
        };

        if (formattedVoucher.used) {
            return res.json({ valid: false, reason: 'already_used', voucher: formattedVoucher });
        }

        const today = new Date();
        const expiryDate = new Date(voucher.expiryDate);

        if (today > expiryDate) {
            return res.json({ valid: false, reason: 'expired', voucher: formattedVoucher });
        }

        res.json({ valid: true, voucher: formattedVoucher });
    } catch (error) {
        console.error('❌ Erro ao validar voucher:', error);
        res.status(500).json({ valid: false, error: error.message });
    }
});

/**
 * POST /api/vouchers/use
 * Marcar voucher como utilizado
 */
app.post('/api/vouchers/use', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ success: false, error: 'Código não fornecido' });
        }

        // Normalizar código
        const normalizedCode = code.trim().toUpperCase();

        // Buscar voucher
        const voucher = await dbGet(`SELECT * FROM vouchers WHERE UPPER(code) = ?`, [normalizedCode]);

        if (!voucher) {
            console.log(`❌ Voucher não encontrado para marcar como usado: ${normalizedCode}`);
            return res.status(404).json({ success: false, error: 'Voucher não encontrado' });
        }

        // Verificar se já foi usado
        if (voucher.used === 1 || voucher.used === true) {
            console.log(`⚠️ Voucher já estava marcado como usado: ${voucher.code}`);
            return res.json({ success: false, error: 'Voucher já foi utilizado' });
        }

        // Marcar como usado
        const now = new Date().toISOString();
        const result = await dbRun(
            `UPDATE vouchers SET used = 1, usedDate = ? WHERE id = ?`,
            [now, voucher.id]
        );

        if (result.changes === 0) {
            throw new Error('Falha ao atualizar voucher: nenhuma linha foi modificada');
        }

        console.log(`✅ Voucher marcado como usado: ${voucher.code} em ${now}`);

        res.json({
            success: true,
            message: 'Voucher marcado como utilizado',
            voucher: {
                ...voucher,
                used: true,
                usedDate: now  // Corrigido para usedDate (camelCase)
            }
        });
    } catch (error) {
        console.error('❌ Erro ao marcar voucher como usado:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * GET /api/pix-qrcode
 * Buscar QR Code PIX de um pagamento do Asaas
 */
app.get('/api/pix-qrcode/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;

        console.log(`🔍 Buscando QR Code PIX para pagamento: ${paymentId}`);

        // Primeiro, verificar se o pagamento existe
        const paymentResponse = await axios.get(
            `${CONFIG.ASAAS_API_URL}/payments/${paymentId}`,
            {
                headers: {
                    'access_token': CONFIG.ASAAS_API_KEY
                }
            }
        );

        const payment = paymentResponse.data;
        console.log(`✅ Pagamento encontrado. Status: ${payment.status}, BillingType: ${payment.billingType}`);

        // Verificar se é PIX ou UNDEFINED (que aceita PIX)
        if (payment.billingType !== 'PIX' && payment.billingType !== 'UNDEFINED') {
            return res.status(400).json({
                success: false,
                error: `Este pagamento não suporta PIX. Tipo: ${payment.billingType}`
            });
        }

        // Buscar QR Code com retry (Asaas às vezes demora para gerar)
        let qrCodeResponse;
        let retries = 3;
        let lastError;

        while (retries > 0) {
            try {
                qrCodeResponse = await axios.get(
                    `${CONFIG.ASAAS_API_URL}/payments/${paymentId}/pixQrCode`,
                    {
                        headers: {
                            'access_token': CONFIG.ASAAS_API_KEY
                        }
                    }
                );

                // Se conseguiu, verificar se tem dados válidos
                if (qrCodeResponse.data && qrCodeResponse.data.encodedImage && qrCodeResponse.data.payload) {
                    console.log('✅ QR Code PIX gerado com sucesso');
                    return res.json({
                        success: true,
                        ...qrCodeResponse.data
                    });
                }
            } catch (error) {
                lastError = error;
                retries--;
                if (retries > 0) {
                    console.log(`⏳ QR Code não pronto, tentando novamente... (${retries} tentativas restantes)`);
                    // Aguardar 1 segundo antes de tentar novamente
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }

        // Se chegou aqui, não conseguiu após retries
        throw lastError;
    } catch (error) {
        console.error('❌ Erro ao buscar QR Code PIX:', error.response?.data || error.message);

        const errorMessage = error.response?.data?.errors?.[0]?.description
            || error.response?.data?.message
            || error.message;

        res.status(error.response?.status || 500).json({
            success: false,
            error: errorMessage,
            details: error.response?.data
        });
    }
});

/**
 * POST /api/process-payment-manually
 * Processar pagamento manualmente quando webhook falhar
 * Uso: POST /api/process-payment-manually { "paymentId": "pay_xxx" }
 */
app.post('/api/process-payment-manually', async (req, res) => {
    try {
        const { paymentId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ success: false, error: 'paymentId é obrigatório' });
        }

        console.log(`🔧 Processamento manual do pagamento: ${paymentId}`);

        // 1. Buscar pagamento no Asaas
        const paymentResponse = await axios.get(
            `${CONFIG.ASAAS_API_URL}/payments/${paymentId}`,
            {
                headers: {
                    'access_token': CONFIG.ASAAS_API_KEY
                }
            }
        );

        const payment = paymentResponse.data;
        console.log('📋 Pagamento encontrado:', payment);

        // 2. Verificar se está pago
        if (payment.status !== 'RECEIVED' && payment.status !== 'CONFIRMED') {
            return res.status(400).json({
                success: false,
                error: `Pagamento não está confirmado. Status: ${payment.status}`
            });
        }

        // 3. Buscar pedido no banco (se não existir, criar a partir dos dados do Asaas)
        let order = await dbGet(`
            SELECT * FROM orders WHERE asaasPaymentId = ?
        `, [paymentId]);

        if (!order) {
            console.log('⚠️ Pedido não encontrado no banco local, criando a partir do Asaas...');

            // Extrair dados da descrição do pagamento
            // Formato: "BLACK: Crdito Dobrado R5R10 - 1x" ou "Nome do Voucher - Qx"
            const description = payment.description || '';
            const quantityMatch = description.match(/(\d+)x$/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

            // Buscar customer no Asaas para pegar dados do comprador
            const customerResponse = await axios.get(
                `${CONFIG.ASAAS_API_URL}/customers/${payment.customer}`,
                {
                    headers: {
                        'access_token': CONFIG.ASAAS_API_KEY
                    }
                }
            );

            const customer = customerResponse.data;

            // Criar pedido no banco local
            await dbRun(`
                INSERT INTO orders (
                    externalReference, asaasPaymentId, voucherId, voucherName, voucherEmoji,
                    pricePerUnit, quantity, total, buyerName, buyerEmail, buyerPhone, buyerCpf
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                payment.externalReference || `RM-${Date.now()}`,
                payment.id,
                'voucher-magico', // ID padrão (pode ser ajustado)
                description.replace(/\s*-\s*\d+x$/, ''), // Remove " - Qx" do final
                '💎', // Emoji padrão
                payment.value / quantity,
                quantity,
                payment.value,
                customer.name,
                customer.email,
                customer.mobilePhone || customer.phone,
                customer.cpfCnpj
            ]);

            // Buscar pedido recém criado
            order = await dbGet(`
                SELECT * FROM orders WHERE asaasPaymentId = ?
            `, [paymentId]);

            console.log('✅ Pedido criado no banco local a partir do Asaas');
        }

        // 4. Verificar se voucher já foi criado
        const existingVoucher = await dbGet(`
            SELECT * FROM vouchers WHERE paymentId = ?
        `, [paymentId]);

        if (existingVoucher) {
            return res.json({
                success: true,
                message: 'Voucher já foi criado anteriormente',
                code: existingVoucher.code
            });
        }

        // 5. Gerar voucher
        const voucherCode = generateVoucherCode();
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);

        const voucherData = {
            code: voucherCode,
            voucherId: order.voucherId,
            voucherName: order.voucherName,
            voucherEmoji: order.voucherEmoji,
            pricePerUnit: order.pricePerUnit,
            quantity: order.quantity,
            total: order.total,
            buyer: {
                name: order.buyerName,
                email: order.buyerEmail,
                phone: order.buyerPhone
            },
            purchaseDate: new Date().toISOString(),
            expiryDate: expiryDate.toISOString(),
            status: 'active',
            used: false,
            paymentId: paymentId,
            orderId: order.externalReference
        };

        // 6. Salvar voucher
        await dbRun(`
            INSERT INTO vouchers (
                code, voucherId, voucherName, voucherEmoji, pricePerUnit, quantity, total,
                buyerName, buyerEmail, buyerPhone, purchaseDate, expiryDate, status, used, paymentId, orderId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            voucherCode,
            order.voucherId,
            order.voucherName,
            order.voucherEmoji,
            order.pricePerUnit,
            order.quantity,
            order.total,
            order.buyerName,
            order.buyerEmail,
            order.buyerPhone,
            voucherData.purchaseDate,
            voucherData.expiryDate,
            'active',
            0,
            paymentId,
            order.externalReference
        ]);

        // 7. Gerar PDF
        const pdfPath = await generateVoucherPDF(voucherData);

        console.log(`✅ Voucher processado manualmente: ${voucherCode}`);

        res.json({
            success: true,
            message: 'Voucher criado com sucesso',
            code: voucherCode,
            pdfUrl: `${CONFIG.APP_URL}/api/download-pdf?code=${voucherCode}`
        });

    } catch (error) {
        console.error('❌ Erro ao processar pagamento manualmente:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data
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

📡 Endpoints:
   POST /api/create-payment (Criar pagamento Asaas)
   POST /api/webhook (Webhook Asaas)
   GET  /api/vouchers (Listar vouchers)
   POST /api/validate-voucher (Validar voucher)

🌐 Frontend: http://localhost:${CONFIG.PORT}/index.html

🔧 Configurar:
   - Asaas API: ${CONFIG.ASAAS_API_KEY && CONFIG.ASAAS_API_KEY !== 'YOUR_ASAAS_KEY' ? '✅' : '❌'}
   - Email: ${CONFIG.EMAIL_USER && CONFIG.EMAIL_USER !== 'vouchers@rosamexicano.com.br' ? '✅' : '❌'}
   - WhatsApp (WAHA): ${CONFIG.WAHA_API_URL && CONFIG.WAHA_API_KEY && CONFIG.WAHA_API_KEY !== 'YOUR_API_KEY' ? '✅' : '❌'}
    `);
});

module.exports = app;
