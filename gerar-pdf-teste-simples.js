/**
 * Gerar PDF de teste simples para enviar por WhatsApp
 */

const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function gerarPDFTeste() {
    return new Promise(async (resolve, reject) => {
        try {
            const voucherCode = `RM-WHATSAPP-${Date.now().toString(36).toUpperCase()}`;
            const vouchersDir = path.join(__dirname, 'vouchers');

            if (!fs.existsSync(vouchersDir)) {
                fs.mkdirSync(vouchersDir, { recursive: true });
            }

            const pdfPath = path.join(vouchersDir, `${voucherCode}.pdf`);

            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(pdfPath);

            doc.pipe(stream);

            // Header com fundo rosa
            doc.rect(0, 0, 612, 200).fill('#E91E63');
            doc.fontSize(40).fillColor('#FFFFFF').text('🌮', 250, 50);
            doc.fontSize(28).font('Helvetica-Bold').text('JPR Móveis Rústicos', 50, 120, { align: 'center' });
            doc.fontSize(16).font('Helvetica').text('Voucher de Teste - WhatsApp', 50, 155, { align: 'center' });

            // Código do voucher
            doc.rect(50, 220, 512, 100).fillAndStroke('#F5F5F5', '#E0E0E0');
            doc.fontSize(12).fillColor('#666666').text('CÓDIGO DO VOUCHER', 50, 235, { align: 'center' });
            doc.fontSize(20).font('Courier-Bold').fillColor('#E91E63').text(voucherCode, 50, 260, { align: 'center' });

            // QR Code
            const qrCodeDataURL = await QRCode.toDataURL(voucherCode);
            const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
            doc.image(qrCodeBuffer, 231, 340, { width: 150 });

            // Detalhes
            doc.fontSize(16).font('Helvetica-Bold').fillColor('#1A1A1A').text('Voucher de Teste', 50, 520);
            doc.fontSize(12).font('Helvetica').fillColor('#333333');
            doc.text('🎉 Parabéns! O sistema de vouchers está funcionando!', 50, 550);
            doc.text('✅ WhatsApp conectado', 50, 580);
            doc.text('✅ PDF gerado com sucesso', 50, 600);
            doc.text('✅ Envio de arquivo funcionando', 50, 620);

            // Footer
            doc.fontSize(10).fillColor('#666666');
            doc.text('JPR Móveis Rústicos Blumenau', 50, 750, { align: 'center' });
            doc.text('Rua Carlos Rischbieter, 64, Victor Konder', 50, 765, { align: 'center' });
            doc.text('(47) 3288-3096 | (47) 99233-4348', 50, 780, { align: 'center' });

            doc.end();

            stream.on('finish', () => {
                console.log('✅ PDF gerado:', pdfPath);
                console.log('📄 Código:', voucherCode);
                resolve({ path: pdfPath, code: voucherCode });
            });

            stream.on('error', reject);

        } catch (error) {
            reject(error);
        }
    });
}

// Executar
gerarPDFTeste()
    .then(result => {
        console.log('✅ Sucesso!');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    });
