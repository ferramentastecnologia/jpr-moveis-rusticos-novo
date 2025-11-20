/**
 * Script de Teste - Email e WhatsApp
 * Sistema de Vouchers JPR Móveis Rústicos
 *
 * Este script testa a configuração de envio de emails e WhatsApp
 */

require('dotenv').config();
const nodemailer = require('nodemailer');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Cores para output no terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Configurações
const CONFIG = {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL,
    WHATSAPP_API_KEY: process.env.WHATSAPP_API_KEY,
    WHATSAPP_INSTANCE: process.env.WHATSAPP_INSTANCE
};

// ============================================
// TESTE 1: Verificar Variáveis de Ambiente
// ============================================
async function testEnvironmentVars() {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📋 TESTE 1: Verificando Variáveis de Ambiente', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    const checks = {
        'EMAIL_USER': CONFIG.EMAIL_USER,
        'EMAIL_PASS': CONFIG.EMAIL_PASS ? '***' + CONFIG.EMAIL_PASS.slice(-4) : undefined,
        'WHATSAPP_API_URL': CONFIG.WHATSAPP_API_URL,
        'WHATSAPP_API_KEY': CONFIG.WHATSAPP_API_KEY ? '***' + CONFIG.WHATSAPP_API_KEY.slice(-4) : undefined,
        'WHATSAPP_INSTANCE': CONFIG.WHATSAPP_INSTANCE
    };

    let allConfigured = true;

    for (const [key, value] of Object.entries(checks)) {
        if (value && value !== '') {
            log(`✅ ${key}: ${value}`, 'green');
        } else {
            log(`❌ ${key}: não configurado`, 'red');
            if (!key.includes('WHATSAPP')) {
                allConfigured = false;
            }
        }
    }

    return allConfigured;
}

// ============================================
// TESTE 2: Gerar PDF de Teste
// ============================================
async function testPDFGeneration() {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📄 TESTE 2: Gerando PDF de Teste', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    return new Promise(async (resolve, reject) => {
        try {
            const voucherCode = `RM-TEST-${Date.now().toString(36).toUpperCase()}`;
            const pdfPath = path.join(__dirname, 'vouchers', `${voucherCode}.pdf`);

            // Criar diretório se não existir
            const vouchersDir = path.join(__dirname, 'vouchers');
            if (!fs.existsSync(vouchersDir)) {
                fs.mkdirSync(vouchersDir, { recursive: true });
            }

            const voucherData = {
                code: voucherCode,
                voucherName: '🧪 Teste de Sistema',
                quantity: 2,
                total: 120.00,
                buyer: {
                    name: 'Teste Automático',
                    email: CONFIG.EMAIL_USER,
                    phone: '(47) 99999-9999'
                },
                expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
            };

            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(pdfPath);

            doc.pipe(stream);

            // Header
            doc.rect(0, 0, 612, 200).fill('#E91E63');
            doc.fontSize(40).fillColor('#FFFFFF').text('🌮', 250, 50);
            doc.fontSize(28).font('Helvetica-Bold').text('JPR Móveis Rústicos', 50, 120, { align: 'center' });
            doc.fontSize(16).font('Helvetica').text('Voucher de Consumo - TESTE', 50, 155, { align: 'center' });

            // Código do voucher
            doc.rect(50, 220, 512, 100).fillAndStroke('#F5F5F5', '#E0E0E0');
            doc.fontSize(12).fillColor('#666666').text('CÓDIGO DO VOUCHER', 50, 235, { align: 'center' });
            doc.fontSize(24).font('Courier-Bold').fillColor('#E91E63').text(voucherData.code, 50, 260, { align: 'center' });

            // QR Code
            const qrCodeDataURL = await QRCode.toDataURL(voucherData.code);
            const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
            doc.image(qrCodeBuffer, 231, 340, { width: 150 });

            // Detalhes
            doc.fontSize(18).font('Helvetica-Bold').fillColor('#1A1A1A').text('Detalhes do Voucher', 50, 520);
            doc.fontSize(12).font('Helvetica').fillColor('#333333');
            doc.text(`Tipo: ${voucherData.voucherName}`, 50, 550);
            doc.text(`Quantidade: ${voucherData.quantity} pessoas`, 50, 570);
            doc.text(`Valor: R$ ${voucherData.total.toFixed(2)}`, 50, 590);
            doc.text(`Validade: ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}`, 50, 610);

            doc.end();

            stream.on('finish', () => {
                const stats = fs.statSync(pdfPath);
                log(`✅ PDF gerado com sucesso!`, 'green');
                log(`   Caminho: ${pdfPath}`, 'blue');
                log(`   Tamanho: ${(stats.size / 1024).toFixed(2)} KB`, 'blue');
                resolve({ success: true, pdfPath, voucherData });
            });

            stream.on('error', (error) => {
                log(`❌ Erro ao gerar PDF: ${error.message}`, 'red');
                reject(error);
            });

        } catch (error) {
            log(`❌ Erro ao gerar PDF: ${error.message}`, 'red');
            reject(error);
        }
    });
}

// ============================================
// TESTE 3: Testar Conexão SMTP (Email)
// ============================================
async function testEmailConnection() {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📧 TESTE 3: Testando Conexão SMTP', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    if (!CONFIG.EMAIL_USER || !CONFIG.EMAIL_PASS) {
        log('❌ Email não configurado no .env', 'red');
        return { success: false, error: 'Email não configurado' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: CONFIG.EMAIL_USER,
                pass: CONFIG.EMAIL_PASS
            }
        });

        log(`Tentando conectar ao servidor SMTP do Gmail...`, 'yellow');
        await transporter.verify();
        log(`✅ Conexão SMTP estabelecida com sucesso!`, 'green');
        log(`   Servidor: smtp.gmail.com:587`, 'blue');
        log(`   Usuário: ${CONFIG.EMAIL_USER}`, 'blue');

        return { success: true, transporter };

    } catch (error) {
        log(`❌ Erro na conexão SMTP: ${error.message}`, 'red');

        if (error.message.includes('Invalid login')) {
            log(`\n💡 Dica: Verifique se você criou uma senha de aplicativo no Gmail:`, 'yellow');
            log(`   1. Acesse: https://myaccount.google.com/apppasswords`, 'yellow');
            log(`   2. Crie uma senha para "Mail"`, 'yellow');
            log(`   3. Use essa senha (16 caracteres) no .env`, 'yellow');
        }

        return { success: false, error: error.message };
    }
}

// ============================================
// TESTE 4: Enviar Email de Teste
// ============================================
async function testEmailSending(transporter, pdfPath, voucherData) {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📮 TESTE 4: Enviando Email de Teste', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    try {
        const mailOptions = {
            from: `"JPR Móveis Rústicos - TESTE" <${CONFIG.EMAIL_USER}>`,
            to: CONFIG.EMAIL_USER, // Envia para você mesmo
            subject: `🧪 TESTE - Voucher JPR Móveis Rústicos - ${voucherData.code}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #E91E63, #9C27B0); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0;">🌮 JPR Móveis Rústicos</h1>
                        <h2 style="margin: 10px 0;">🧪 EMAIL DE TESTE</h2>
                    </div>

                    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
                        <p>Olá!</p>

                        <p>Este é um <strong>email de teste</strong> do sistema de vouchers.</p>

                        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #666; font-size: 12px;">CÓDIGO DO VOUCHER DE TESTE</p>
                            <p style="margin: 10px 0; font-size: 24px; font-weight: bold; color: #E91E63; font-family: monospace;">${voucherData.code}</p>
                        </div>

                        <h3>✅ Confirmações:</h3>
                        <ul>
                            <li>✅ Servidor SMTP conectado</li>
                            <li>✅ PDF gerado e anexado</li>
                            <li>✅ Email enviado com sucesso</li>
                        </ul>

                        <p style="margin-top: 30px; padding: 20px; background: #E8F5E9; border-left: 4px solid #4CAF50;">
                            <strong>🎉 Tudo funcionando!</strong><br>
                            Seu sistema de envio de emails está configurado corretamente.
                        </p>
                    </div>

                    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                        <p>© 2024 JPR Móveis Rústicos Blumenau - Sistema de Vouchers</p>
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

        log(`Enviando email de teste para: ${CONFIG.EMAIL_USER}`, 'yellow');
        const info = await transporter.sendMail(mailOptions);

        log(`✅ Email enviado com sucesso!`, 'green');
        log(`   Para: ${CONFIG.EMAIL_USER}`, 'blue');
        log(`   Message ID: ${info.messageId}`, 'blue');
        log(`   Anexo: voucher-${voucherData.code}.pdf`, 'blue');

        return { success: true, messageId: info.messageId };

    } catch (error) {
        log(`❌ Erro ao enviar email: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

// ============================================
// TESTE 5: Testar WhatsApp API (se configurado)
// ============================================
async function testWhatsAppConnection() {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('💬 TESTE 5: Testando WhatsApp API', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    if (!CONFIG.WHATSAPP_API_URL || !CONFIG.WHATSAPP_API_KEY) {
        log('⚠️  WhatsApp não configurado (opcional)', 'yellow');
        log('   Para configurar, adicione no .env:', 'yellow');
        log('   - WHATSAPP_API_URL', 'yellow');
        log('   - WHATSAPP_API_KEY', 'yellow');
        log('   - WHATSAPP_INSTANCE', 'yellow');
        return { success: false, error: 'Não configurado', skipped: true };
    }

    try {
        log(`Testando conexão com Evolution API...`, 'yellow');
        log(`URL: ${CONFIG.WHATSAPP_API_URL}`, 'blue');

        // Testar status da instância
        const response = await axios.get(
            `${CONFIG.WHATSAPP_API_URL}/instance/connectionState/${CONFIG.WHATSAPP_INSTANCE}`,
            {
                headers: {
                    'apikey': CONFIG.WHATSAPP_API_KEY
                }
            }
        );

        log(`✅ WhatsApp API respondendo!`, 'green');
        log(`   Status: ${response.data.state || 'conectado'}`, 'blue');

        return { success: true };

    } catch (error) {
        log(`❌ Erro ao conectar WhatsApp API: ${error.message}`, 'red');

        if (error.code === 'ECONNREFUSED') {
            log(`\n💡 Dica: Verifique se a Evolution API está rodando`, 'yellow');
        }

        return { success: false, error: error.message };
    }
}

// ============================================
// EXECUTAR TODOS OS TESTES
// ============================================
async function runAllTests() {
    log('\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓', 'bright');
    log('┃  🧪 TESTE DE CONFIGURAÇÃO - SISTEMA DE VOUCHERS  ┃', 'bright');
    log('┃     JPR Móveis Rústicos Blumenau                       ┃', 'bright');
    log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n', 'bright');

    const results = {
        environment: false,
        pdf: false,
        emailConnection: false,
        emailSending: false,
        whatsapp: false
    };

    try {
        // Teste 1: Variáveis de ambiente
        results.environment = await testEnvironmentVars();

        // Teste 2: Gerar PDF
        const pdfResult = await testPDFGeneration();
        results.pdf = pdfResult.success;

        // Teste 3: Conexão SMTP
        const emailConnResult = await testEmailConnection();
        results.emailConnection = emailConnResult.success;

        // Teste 4: Enviar email (só se conexão OK)
        if (emailConnResult.success) {
            const emailSendResult = await testEmailSending(
                emailConnResult.transporter,
                pdfResult.pdfPath,
                pdfResult.voucherData
            );
            results.emailSending = emailSendResult.success;
        }

        // Teste 5: WhatsApp
        const whatsappResult = await testWhatsAppConnection();
        results.whatsapp = whatsappResult.success || whatsappResult.skipped;

    } catch (error) {
        log(`\n❌ Erro durante os testes: ${error.message}`, 'red');
    }

    // Resumo final
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📊 RESUMO DOS TESTES', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    const tests = [
        { name: 'Variáveis de Ambiente', result: results.environment },
        { name: 'Geração de PDF', result: results.pdf },
        { name: 'Conexão Email (SMTP)', result: results.emailConnection },
        { name: 'Envio de Email', result: results.emailSending },
        { name: 'WhatsApp API', result: results.whatsapp }
    ];

    tests.forEach(test => {
        const icon = test.result ? '✅' : '❌';
        const color = test.result ? 'green' : 'red';
        log(`${icon} ${test.name}`, color);
    });

    const allPassed = Object.values(results).every(r => r === true);

    if (allPassed) {
        log('\n🎉 TODOS OS TESTES PASSARAM!', 'green');
        log('✅ Sistema pronto para uso!', 'green');
    } else {
        log('\n⚠️  Alguns testes falharam', 'yellow');
        log('Verifique as mensagens acima para corrigir', 'yellow');
    }

    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
}

// Executar testes
runAllTests().catch(error => {
    log(`\n❌ Erro fatal: ${error.message}`, 'red');
    process.exit(1);
});
