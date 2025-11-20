/**
 * Script de Teste - WhatsApp via WAHA
 * Sistema de Vouchers JPR Móveis Rústicos
 *
 * Este script testa o envio de vouchers por WhatsApp usando WAHA API
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const readline = require('readline');

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

// Configurações WAHA
const CONFIG = {
    WAHA_API_URL: process.env.WAHA_API_URL || 'http://localhost:3002',
    WAHA_API_KEY: process.env.WAHA_API_KEY,
    WAHA_SESSION: process.env.WAHA_SESSION || 'default'
};

// ============================================
// Funções Auxiliares
// ============================================

function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function generateTestPDF() {
    return new Promise(async (resolve, reject) => {
        try {
            const voucherCode = `RM-WHATSAPP-TEST-${Date.now().toString(36).toUpperCase()}`;
            const pdfPath = path.join(__dirname, 'vouchers', `${voucherCode}.pdf`);

            // Criar diretório se não existir
            const vouchersDir = path.join(__dirname, 'vouchers');
            if (!fs.existsSync(vouchersDir)) {
                fs.mkdirSync(vouchersDir, { recursive: true });
            }

            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(pdfPath);

            doc.pipe(stream);

            // Header
            doc.rect(0, 0, 612, 200).fill('#E91E63');
            doc.fontSize(40).fillColor('#FFFFFF').text('🌮', 250, 50);
            doc.fontSize(28).font('Helvetica-Bold').text('JPR Móveis Rústicos', 50, 120, { align: 'center' });
            doc.fontSize(16).font('Helvetica').text('Voucher de Teste - WhatsApp', 50, 155, { align: 'center' });

            // Código do voucher
            doc.rect(50, 220, 512, 100).fillAndStroke('#F5F5F5', '#E0E0E0');
            doc.fontSize(12).fillColor('#666666').text('CÓDIGO DO VOUCHER', 50, 235, { align: 'center' });
            doc.fontSize(24).font('Courier-Bold').fillColor('#E91E63').text(voucherCode, 50, 260, { align: 'center' });

            // QR Code
            const qrCodeDataURL = await QRCode.toDataURL(voucherCode);
            const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
            doc.image(qrCodeBuffer, 231, 340, { width: 150 });

            // Detalhes
            doc.fontSize(18).font('Helvetica-Bold').fillColor('#1A1A1A').text('Voucher de Teste', 50, 520);
            doc.fontSize(12).font('Helvetica').fillColor('#333333');
            doc.text(`Este é um voucher de teste para validar`, 50, 550);
            doc.text(`o envio por WhatsApp via WAHA API`, 50, 570);

            doc.fontSize(14).font('Helvetica-Bold').text('Status:', 50, 620);
            doc.fontSize(12).font('Helvetica').text('✅ Geração de PDF: OK', 50, 645);
            doc.text('✅ QR Code: OK', 50, 665);
            doc.text('⏳ Aguardando envio por WhatsApp...', 50, 685);

            doc.end();

            stream.on('finish', () => {
                resolve({ code: voucherCode, path: pdfPath });
            });

            stream.on('error', reject);

        } catch (error) {
            reject(error);
        }
    });
}

// ============================================
// TESTE 1: Verificar Status WAHA
// ============================================
async function testWAHAStatus() {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📡 TESTE 1: Verificando Status WAHA', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    if (!CONFIG.WAHA_API_KEY) {
        log('❌ WAHA_API_KEY não configurado no .env', 'red');
        return { success: false };
    }

    try {
        log(`Conectando em: ${CONFIG.WAHA_API_URL}`, 'yellow');

        const response = await axios.get(
            `${CONFIG.WAHA_API_URL}/api/sessions`,
            {
                headers: {
                    'X-Api-Key': CONFIG.WAHA_API_KEY
                }
            }
        );

        log('✅ WAHA está online!', 'green');

        if (response.data && response.data.length > 0) {
            log(`   Sessões encontradas: ${response.data.length}`, 'blue');
            response.data.forEach((session, index) => {
                log(`   ${index + 1}. ${session.name} - Status: ${session.status}`, 'blue');
            });
        } else {
            log('   ⚠️  Nenhuma sessão WhatsApp conectada', 'yellow');
            log('   Você precisa conectar o WhatsApp primeiro!', 'yellow');
            return { success: false, needsConnection: true };
        }

        return { success: true };

    } catch (error) {
        log(`❌ Erro ao conectar WAHA: ${error.message}`, 'red');

        if (error.code === 'ECONNREFUSED') {
            log('\n💡 Dica: Inicie o WAHA com:', 'yellow');
            log('   cd /Users/juanminni/meu-repositorio/waha-api-oficial', 'yellow');
            log('   docker compose up -d', 'yellow');
        }

        return { success: false };
    }
}

// ============================================
// TESTE 2: Enviar Mensagem de Texto
// ============================================
async function testSendText(phoneNumber) {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('💬 TESTE 2: Enviando Mensagem de Texto', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    try {
        const chatId = `${phoneNumber}@c.us`;

        const message = `
🧪 *TESTE - JPR Móveis Rústicos*

Olá! Este é um teste do sistema de vouchers.

Se você recebeu esta mensagem, significa que:
✅ WAHA está funcionando
✅ WhatsApp está conectado
✅ API está respondendo

Em breve você receberá um PDF de teste! 📄
        `.trim();

        log(`Enviando mensagem para: ${phoneNumber}`, 'yellow');

        await axios.post(
            `${CONFIG.WAHA_API_URL}/api/sendText`,
            {
                session: CONFIG.WAHA_SESSION,
                chatId: chatId,
                text: message
            },
            {
                headers: {
                    'X-Api-Key': CONFIG.WAHA_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        log('✅ Mensagem enviada com sucesso!', 'green');
        log('   Verifique seu WhatsApp', 'blue');

        return { success: true };

    } catch (error) {
        log(`❌ Erro ao enviar mensagem: ${error.message}`, 'red');
        if (error.response) {
            log(`   Detalhes: ${JSON.stringify(error.response.data)}`, 'red');
        }
        return { success: false, error: error.message };
    }
}

// ============================================
// TESTE 3: Enviar PDF
// ============================================
async function testSendPDF(phoneNumber, pdfData) {
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📄 TESTE 3: Enviando PDF do Voucher', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    try {
        const chatId = `${phoneNumber}@c.us`;

        log('Preparando PDF...', 'yellow');
        const pdfBuffer = fs.readFileSync(pdfData.path);
        const pdfBase64 = pdfBuffer.toString('base64');

        log(`Tamanho do PDF: ${(pdfBuffer.length / 1024).toFixed(2)} KB`, 'blue');
        log(`Enviando para: ${phoneNumber}`, 'yellow');

        await axios.post(
            `${CONFIG.WAHA_API_URL}/api/sendFile`,
            {
                session: CONFIG.WAHA_SESSION,
                chatId: chatId,
                file: {
                    mimetype: 'application/pdf',
                    filename: `voucher-${pdfData.code}.pdf`,
                    data: pdfBase64
                }
            },
            {
                headers: {
                    'X-Api-Key': CONFIG.WAHA_API_KEY,
                    'Content-Type': 'application/json'
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        log('✅ PDF enviado com sucesso!', 'green');
        log('   Verifique seu WhatsApp', 'blue');

        return { success: true };

    } catch (error) {
        log(`❌ Erro ao enviar PDF: ${error.message}`, 'red');
        if (error.response) {
            log(`   Detalhes: ${JSON.stringify(error.response.data)}`, 'red');
        }
        return { success: false, error: error.message };
    }
}

// ============================================
// EXECUTAR TODOS OS TESTES
// ============================================
async function runAllTests() {
    log('\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓', 'bright');
    log('┃  🧪 TESTE WHATSAPP - SISTEMA DE VOUCHERS     ┃', 'bright');
    log('┃     JPR Móveis Rústicos Blumenau                   ┃', 'bright');
    log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n', 'bright');

    // Teste 1: Status WAHA
    const statusResult = await testWAHAStatus();
    if (!statusResult.success) {
        if (statusResult.needsConnection) {
            log('\n📱 Você precisa conectar o WhatsApp primeiro!', 'yellow');
            log('   Acesse: http://localhost:3002/dashboard', 'yellow');
            log('   Escaneie o QR Code com seu WhatsApp', 'yellow');
        }
        return;
    }

    // Perguntar número de telefone
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('Digite o número de telefone para teste (apenas números):', 'yellow');
    log('Exemplo: 5547999999999', 'blue');

    const phoneNumber = await askQuestion('Telefone: ');

    if (!phoneNumber || phoneNumber.length < 10) {
        log('❌ Número inválido!', 'red');
        return;
    }

    log(`\nTelefone configurado: ${phoneNumber}`, 'green');
    log('Aguarde alguns segundos entre os testes...\n', 'yellow');

    // Teste 2: Enviar mensagem de texto
    const textResult = await testSendText(phoneNumber);
    if (!textResult.success) {
        return;
    }

    // Aguardar 3 segundos
    log('\n⏳ Aguardando 3 segundos...', 'yellow');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Gerar PDF de teste
    log('\n📄 Gerando PDF de teste...', 'yellow');
    const pdfData = await generateTestPDF();
    log(`✅ PDF gerado: ${pdfData.code}`, 'green');

    // Aguardar 2 segundos
    log('\n⏳ Aguardando 2 segundos...', 'yellow');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Teste 3: Enviar PDF
    const pdfResult = await testSendPDF(phoneNumber, pdfData);

    // Resumo final
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('📊 RESUMO DOS TESTES', 'bright');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

    const tests = [
        { name: 'Status WAHA', result: statusResult.success },
        { name: 'Envio de Mensagem', result: textResult.success },
        { name: 'Envio de PDF', result: pdfResult.success }
    ];

    tests.forEach(test => {
        const icon = test.result ? '✅' : '❌';
        const color = test.result ? 'green' : 'red';
        log(`${icon} ${test.name}`, color);
    });

    const allPassed = tests.every(t => t.result);

    if (allPassed) {
        log('\n🎉 TODOS OS TESTES PASSARAM!', 'green');
        log('✅ Sistema WhatsApp pronto para uso!', 'green');
        log('\n📱 Verifique seu WhatsApp para confirmar o recebimento', 'blue');
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
