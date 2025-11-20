/**
 * Enviar PDF por WhatsApp via WAHA
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    WAHA_API_URL: 'http://localhost:3001',
    WAHA_API_KEY: 'shieldcar2024',
    WAHA_SESSION: 'default',
    PHONE_NUMBER: '554792752697' // Juan Minni
};

async function enviarPDFWhatsApp(pdfPath, voucherCode) {
    try {
        const chatId = `${CONFIG.PHONE_NUMBER}@c.us`;

        console.log(`\n📤 Enviando PDF para WhatsApp...`);
        console.log(`   Destinatário: ${CONFIG.PHONE_NUMBER}`);
        console.log(`   PDF: ${path.basename(pdfPath)}`);

        // Ler PDF e converter para base64
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfBase64 = pdfBuffer.toString('base64');
        const pdfSize = (pdfBuffer.length / 1024).toFixed(2);

        console.log(`   Tamanho: ${pdfSize} KB`);
        console.log(`   Codificando...`);

        // Enviar PDF via WAHA
        const response = await axios.post(
            `${CONFIG.WAHA_API_URL}/api/sendFile`,
            {
                session: CONFIG.WAHA_SESSION,
                chatId: chatId,
                file: {
                    mimetype: 'application/pdf',
                    filename: `voucher-${voucherCode}.pdf`,
                    data: pdfBase64
                },
                caption: `🌮 *Seu Voucher JPR Móveis Rústicos*\n\n✅ Código: ${voucherCode}\n\n📄 Voucher anexado neste PDF`
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

        console.log(`\n✅ PDF enviado com sucesso!`);
        console.log(`   Message ID: ${response.data.id?._serialized || 'N/A'}`);
        console.log(`\n📱 Verifique seu WhatsApp!`);

        return { success: true, data: response.data };

    } catch (error) {
        console.error(`\n❌ Erro ao enviar PDF:`, error.message);
        if (error.response) {
            console.error(`   Detalhes:`, JSON.stringify(error.response.data, null, 2));
        }
        return { success: false, error: error.message };
    }
}

// Buscar o PDF mais recente
const vouchersDir = path.join(__dirname, 'vouchers');
const files = fs.readdirSync(vouchersDir).filter(f => f.endsWith('.pdf'));

if (files.length === 0) {
    console.error('❌ Nenhum PDF encontrado na pasta vouchers/');
    process.exit(1);
}

// Ordenar por data de modificação (mais recente primeiro)
const pdfs = files.map(f => ({
    path: path.join(vouchersDir, f),
    name: f,
    time: fs.statSync(path.join(vouchersDir, f)).mtime.getTime()
})).sort((a, b) => b.time - a.time);

const pdfMaisRecente = pdfs[0];
const voucherCode = path.basename(pdfMaisRecente.name, '.pdf');

console.log(`\n🔍 PDF mais recente encontrado:`);
console.log(`   ${pdfMaisRecente.name}`);

// Enviar
enviarPDFWhatsApp(pdfMaisRecente.path, voucherCode)
    .then(result => {
        process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Erro fatal:', error.message);
        process.exit(1);
    });
