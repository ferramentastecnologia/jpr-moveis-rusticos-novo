/**
 * PostgreSQL Database Configuration e Initialization
 * Cria tables automáticamente na primeira execução
 */

const { Pool } = require('pg');

// Connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'jpr_moveis_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('❌ Erro inesperado no pool:', err);
    process.exit(-1);
});

/**
 * Initialize database schema
 * Cria todas as tabelas necessárias
 */
async function initializeDatabase() {
    try {
        // Test connection
        const client = await pool.connect();
        console.log('✅ Conexão com PostgreSQL estabelecida');
        client.release();

        // Create tables
        await pool.query(`
            -- Users table
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha_hash VARCHAR(255) NOT NULL,
                nome VARCHAR(255) NOT NULL,
                telefone VARCHAR(20),
                endereco TEXT,
                cidade VARCHAR(100),
                estado VARCHAR(2),
                cep VARCHAR(10),
                role VARCHAR(50) DEFAULT 'customer',
                ativo BOOLEAN DEFAULT true,
                data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Produtos table
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                preco DECIMAL(10, 2) NOT NULL,
                desconto DECIMAL(5, 2) DEFAULT 0,
                categoria VARCHAR(100),
                imagem_url VARCHAR(255),
                estoque INT DEFAULT 0,
                ativo BOOLEAN DEFAULT true,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Pedidos table
            CREATE TABLE IF NOT EXISTS pedidos (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id),
                numero_pedido VARCHAR(50) UNIQUE NOT NULL,
                status VARCHAR(50) DEFAULT 'pendente',
                total DECIMAL(10, 2) NOT NULL,
                cupom_desconto VARCHAR(50),
                desconto_percentual DECIMAL(5, 2) DEFAULT 0,
                valor_desconto DECIMAL(10, 2) DEFAULT 0,
                data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_entrega TIMESTAMP,
                rastreamento_codigo VARCHAR(50),
                observacoes TEXT
            );

            -- Itens do pedido
            CREATE TABLE IF NOT EXISTS itens_pedido (
                id SERIAL PRIMARY KEY,
                pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
                produto_id INT REFERENCES produtos(id),
                quantidade INT NOT NULL,
                preco_unitario DECIMAL(10, 2) NOT NULL,
                subtotal DECIMAL(10, 2) NOT NULL
            );

            -- Pagamentos (Asaas integration)
            CREATE TABLE IF NOT EXISTS pagamentos (
                id SERIAL PRIMARY KEY,
                pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
                asaas_id VARCHAR(255) UNIQUE,
                usuario_id INT REFERENCES usuarios(id),
                metodo VARCHAR(50),
                valor DECIMAL(10, 2) NOT NULL,
                status VARCHAR(50) DEFAULT 'pendente',
                descricao TEXT,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_vencimento DATE,
                data_pagamento TIMESTAMP
            );

            -- Avaliações
            CREATE TABLE IF NOT EXISTS avaliacoes (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id),
                produto_id INT REFERENCES produtos(id),
                rating INT CHECK (rating >= 1 AND rating <= 5),
                titulo VARCHAR(255),
                comentario TEXT,
                util_count INT DEFAULT 0,
                nao_util_count INT DEFAULT 0,
                resposta_empresa TEXT,
                data_resposta TIMESTAMP,
                status VARCHAR(50) DEFAULT 'pendente',
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Cupons de desconto
            CREATE TABLE IF NOT EXISTS cupons (
                id SERIAL PRIMARY KEY,
                codigo VARCHAR(50) UNIQUE NOT NULL,
                descricao TEXT,
                tipo VARCHAR(50),
                valor DECIMAL(10, 2),
                percentual DECIMAL(5, 2),
                data_inicio DATE,
                data_fim DATE,
                uso_maximo INT,
                uso_atual INT DEFAULT 0,
                ativo BOOLEAN DEFAULT true,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Newsletter subscribers
            CREATE TABLE IF NOT EXISTS newsletter (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                nome VARCHAR(255),
                ativo BOOLEAN DEFAULT true,
                data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Admin logs
            CREATE TABLE IF NOT EXISTS logs_admin (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id),
                acao VARCHAR(255),
                tabela_afetada VARCHAR(100),
                registro_id INT,
                dados_anteriores JSONB,
                dados_novos JSONB,
                ip_address VARCHAR(50),
                data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create indexes for performance
            CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
            CREATE INDEX IF NOT EXISTS idx_pedidos_usuario_id ON pedidos(usuario_id);
            CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
            CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
            CREATE INDEX IF NOT EXISTS idx_avaliacoes_produto ON avaliacoes(produto_id);
            CREATE INDEX IF NOT EXISTS idx_pagamentos_pedido ON pagamentos(pedido_id);
            CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON pagamentos(status);
        `);

        console.log('✅ Schema do banco de dados criado/atualizado');

    } catch (error) {
        console.error('❌ Erro ao inicializar banco de dados:', error);
        throw error;
    }
}

module.exports = {
    pool,
    initializeDatabase
};
