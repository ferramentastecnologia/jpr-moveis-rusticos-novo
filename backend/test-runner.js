/**
 * JPR MÓVEIS - TEST RUNNER
 * Executa testes contra o mock server
 */

const http = require('http');

const API = 'http://localhost:3000';
let globalToken = '';
let testsPassed = 0;
let testsFailed = 0;

// ===========================
// Helper functions
// ===========================

async function makeRequest(method, path, data = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(API + path);

        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({
                        status: res.statusCode,
                        data: parsed
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: responseData
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function test(name, fn) {
    try {
        await fn();
        console.log(`✅ ${name}`);
        testsPassed++;
    } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   Erro: ${error.message}`);
        testsFailed++;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// ===========================
// TESTS
// ===========================

async function runTests() {
    console.log('\n' + '='.repeat(50));
    console.log('JPR MÓVEIS - TESTES MOCK SERVER');
    console.log('='.repeat(50) + '\n');

    // Test 1: Health Check
    await test('Health Check', async () => {
        const res = await makeRequest('GET', '/health');
        assert(res.status === 200, `Status code ${res.status}, esperado 200`);
        assert(res.data.status === 'OK', 'Status não é OK');
    });

    // Test 2: Register
    let response;
    const testEmail = `user-${Date.now()}@example.com`;
    await test('Autenticação - Registro', async () => {
        response = await makeRequest('POST', '/api/auth/register', {
            email: testEmail,
            senha: 'senha123',
            nome: 'Teste Silva',
            telefone: '11999999999'
        });
        assert(response.status === 201, `Status ${response.status}, esperado 201`);
        assert(response.data.token, 'Token não fornecido');
        assert(response.data.user, 'User não fornecido');
        globalToken = response.data.token;
    });

    // Test 3: Login
    await test('Autenticação - Login', async () => {
        const res = await makeRequest('POST', '/api/auth/login', {
            email: testEmail,
            senha: 'senha123'
        });
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(res.data.token, 'Token não fornecido');
        globalToken = res.data.token; // Update token para garantir que é válido
    });

    // Test 4: Get Me
    await test('Autenticação - GET /me', async () => {
        const res = await makeRequest('GET', '/api/auth/me', null, globalToken);
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(res.data.email === testEmail, `Email incorreto, esperado ${testEmail}`);
        assert(res.data.role === 'customer', 'Role deveria ser customer');
    });

    // Test 5: List Products
    await test('Produtos - Listar', async () => {
        const res = await makeRequest('GET', '/api/produtos');
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(res.data.total > 0, 'Nenhum produto retornado');
        assert(Array.isArray(res.data.produtos), 'Produtos não é array');
    });

    // Test 6: Get Product
    await test('Produtos - GET específico', async () => {
        const res = await makeRequest('GET', '/api/produtos/1');
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(res.data.id === 1, 'ID do produto incorreto');
        assert(res.data.nome, 'Nome do produto faltando');
    });

    // Test 7: Create Order
    let orderId;
    await test('Pedidos - Criar', async () => {
        const res = await makeRequest('POST', '/api/pedidos', {
            itens: [
                { produto_id: 1, quantidade: 2 }
            ]
        }, globalToken);
        assert(res.status === 201, `Status ${res.status}, esperado 201`);
        assert(res.data.pedido, 'Pedido não retornado');
        assert(res.data.pedido.id, 'ID do pedido faltando');
        orderId = res.data.pedido.id;
    });

    // Test 8: List Orders
    await test('Pedidos - Listar meus pedidos', async () => {
        const res = await makeRequest('GET', '/api/pedidos', null, globalToken);
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(Array.isArray(res.data), 'Resposta não é array');
        assert(res.data.length > 0, 'Nenhum pedido retornado');
    });

    // Test 9: Get Order
    await test('Pedidos - Detalhes do pedido', async () => {
        const res = await makeRequest('GET', `/api/pedidos/${orderId}`, null, globalToken);
        assert(res.status === 200, `Status ${res.status}, esperado 200`);
        assert(res.data.id === orderId, 'ID do pedido incorreto');
        assert(res.data.itens, 'Itens do pedido faltando');
    });

    // Test 10: Create Review
    await test('Avaliações - Criar', async () => {
        const res = await makeRequest('POST', '/api/avaliacoes', {
            produto_id: 1,
            rating: 5,
            titulo: 'Excelente qualidade!',
            comentario: 'Produto chegou conforme esperado'
        }, globalToken);
        assert(res.status === 201, `Status ${res.status}, esperado 201`);
        assert(res.data.avaliacao, 'Avaliação não retornada');
    });

    // Test 11: Create Product (Should fail - not admin)
    await test('Produtos - Criar (should fail - not admin)', async () => {
        const res = await makeRequest('POST', '/api/produtos', {
            nome: 'Estante Madeira',
            descricao: 'Estante rústica',
            preco: 2100.00,
            estoque: 8
        }, globalToken);
        assert(res.status === 403, `Status ${res.status}, esperado 403`);
        assert(res.data.error, 'Mensagem de erro faltando');
    });

    // Test 12: Error - No Token
    await test('Erro - Acessar sem token', async () => {
        const res = await makeRequest('GET', '/api/auth/me');
        assert(res.status === 401, `Status ${res.status}, esperado 401`);
    });

    // Test 13: Error - Product Not Found
    await test('Erro - Produto não existe', async () => {
        const res = await makeRequest('GET', '/api/produtos/9999');
        assert(res.status === 404, `Status ${res.status}, esperado 404`);
    });

    // ===========================
    // SUMMARY
    // ===========================
    console.log('\n' + '='.repeat(50));
    console.log('RESUMO DOS TESTES');
    console.log('='.repeat(50));
    console.log(`✅ Passaram: ${testsPassed}`);
    console.log(`❌ Falharam: ${testsFailed}`);
    console.log(`📊 Total: ${testsPassed + testsFailed}`);
    console.log(`🎯 Taxa de sucesso: ${(testsPassed / (testsPassed + testsFailed) * 100).toFixed(0)}%`);

    if (testsFailed === 0) {
        console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO!');
    } else {
        console.log(`\n⚠️  ${testsFailed} testes falharam`);
    }

    console.log('='.repeat(50) + '\n');

    process.exit(testsFailed > 0 ? 1 : 0);
}

// Start tests
runTests().catch(error => {
    console.error('Erro ao executar testes:', error);
    process.exit(1);
});
