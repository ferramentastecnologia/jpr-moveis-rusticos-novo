const axios = require('axios');

console.log('🧪 Teste simples da API Infinity Pay\n');

const payload = {
    "handle": "juliana-pereira-merini",
    "redirect_url": "https://example.com/sucesso",
    "webhook_url": "https://example.com/webhook",
    "order_nsu": "TEST-" + Date.now(),
    "items": [{
        "description": "Teste",
        "quantity": 1,
        "price": 1000
    }]
};

console.log('📤 Enviando:\n', JSON.stringify(payload, null, 2), '\n');

axios.post(
    'https://api.infinitepay.io/invoices/public/checkout/links',
    payload,
    {
        timeout: 30000,
        headers: { 'Content-Type': 'application/json' }
    }
)
.then(response => {
    console.log('✅ SUCESSO!\n');
    console.log('Status:', response.status);
    console.log('Resposta:\n', JSON.stringify(response.data, null, 2));
})
.catch(error => {
    console.log('❌ ERRO!\n');
    if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Dados:\n', JSON.stringify(error.response.data, null, 2));
    } else if (error.code) {
        console.log('Código de erro:', error.code);
        console.log('Mensagem:', error.message);
    } else {
        console.log('Erro:', error.message);
    }
});
