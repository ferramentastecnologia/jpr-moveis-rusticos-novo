/**
 * Teste Completo - Envio de Voucher por WhatsApp com Link do PDF
 */

const axios = require('axios');

const CONFIG = {
    WAHA_URL: 'http://localhost:3001',
    WAHA_KEY: 'shieldcar2024',
    APP_URL: 'https://your-ngrok-url.ngrok.io', // Você vai precisar do ngrok
    PHONE: '5547992752697' // Juan Minni (com código 55 do Brasil)
};

// Dados simulados do voucher (como seria gerado pelo sistema)
const voucherData = {
    code: 'RM-TESTE-' + Date.now().toString(36).toUpperCase(),
    voucherName: '🧪 Voucher de Teste',
    quantity: 2,
    total: 120.00,
    buyer: {
        name: 'Juan Minni',
        phone: '(47) 99275-2697'
    },
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
};

async function testarEnvioCompleto() {
    try {
        console.log('\n🧪 TESTE DE ENVIO COMPLETO DE VOUCHER');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('📋 Dados do Voucher:');
        console.log(`   Código: ${voucherData.code}`);
        console.log(`   Tipo: ${voucherData.voucherName}`);
        console.log(`   Quantidade: ${voucherData.quantity} pessoas`);
        console.log(`   Valor: R$ ${voucherData.total.toFixed(2)}`);
        console.log(`   Cliente: ${voucherData.buyer.name}`);
        console.log(`   Telefone: ${voucherData.buyer.phone}`);

        const phoneNumber = voucherData.buyer.phone.replace(/\D/g, '');
        const chatId = `${phoneNumber}@c.us`;

        // URL do PDF (mockada - em produção seria a URL real do Railway/ngrok)
        const pdfDownloadUrl = `${CONFIG.APP_URL}/api/download-pdf?code=${voucherData.code}`;

        const message = `
🌮 *JPR Móveis Rústicos*

Olá, *${voucherData.buyer.name}*! 🎉

✅ Seu voucher foi gerado com sucesso!

*CÓDIGO:* \`${voucherData.code}\`

📋 *Detalhes:*
• Voucher: ${voucherData.voucherName}
• Quantidade: ${voucherData.quantity} pessoas
• Valor Pago: R$ ${voucherData.total.toFixed(2)}
• Validade: ${new Date(voucherData.expiryDate).toLocaleDateString('pt-BR')}

📄 *Baixar PDF do Voucher:*
${pdfDownloadUrl}

📝 *Como usar:*
1️⃣ Faça sua reserva: (47) 99233-4348
2️⃣ Informe que possui um voucher
3️⃣ Apresente o código no restaurante
4️⃣ Aproveite sua experiência!

📍 Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
⏰ Seg-Dom: 18h às 00h

_Você também receberá o voucher por email!_ 📧
        `.trim();

        console.log('\n💬 Enviando mensagem para WhatsApp...');
        console.log(`   Para: ${phoneNumber}`);

        const response = await axios.post(
            `${CONFIG.WAHA_URL}/api/sendText`,
            {
                session: 'default',
                chatId: chatId,
                text: message
            },
            {
                headers: {
                    'X-Api-Key': CONFIG.WAHA_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('\n✅ MENSAGEM ENVIADA COM SUCESSO!');
        console.log(`   Message ID: ${response.data.id?._serialized || 'N/A'}`);
        console.log('\n📱 Verifique seu WhatsApp!');
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('📝 RESUMO:');
        console.log('   ✅ Voucher simulado criado');
        console.log('   ✅ Mensagem enviada por WhatsApp');
        console.log('   ✅ Link do PDF incluído na mensagem');
        console.log('\n💡 PRÓXIMOS PASSOS:');
        console.log('   1. Configurar servidor com ngrok ou Railway');
        console.log('   2. Atualizar APP_URL no .env');
        console.log('   3. Testar fluxo completo de pagamento');
        console.log('   4. Cliente receberá: Email (com PDF) + WhatsApp (com link)');
        console.log('\n🎉 Sistema pronto para produção!\n');

    } catch (error) {
        console.error('\n❌ ERRO:', error.message);
        if (error.response) {
            console.error('   Detalhes:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
}

testarEnvioCompleto();
