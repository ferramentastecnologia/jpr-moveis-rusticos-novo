/**
 * JPR MÓVEIS RÚSTICOS - BACKEND SERVER
 * Express.js + PostgreSQL + Asaas Integration
 *
 * Estrutura:
 * - Express server com CORS
 * - PostgreSQL database connection
 * - JWT authentication
 * - Asaas payment integration
 * - SendGrid email integration
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ path: '../.env' });

const { initializeDatabase } = require('./config/database');
const { connectPool } = require('./models/db');

// Import routes
const authRoutes = require('./routes/auth');
const produtosRoutes = require('./routes/produtos');
const pedidosRoutes = require('./routes/pedidos');
const usuariosRoutes = require('./routes/usuarios');
const pagamentosRoutes = require('./routes/pagamentos');
const avaliacoesRoutes = require('./routes/avaliacoes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// ===========================
// MIDDLEWARE
// ===========================

// Security headers
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware (desenvolvimento)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// ===========================
// HEALTH CHECK
// ===========================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});

// ===========================
// API ROUTES
// ===========================
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pagamentos', pagamentosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// ===========================
// ERROR HANDLING
// ===========================
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token',
            message: err.message
        });
    }

    // Database errors
    if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
            error: 'Database connection failed',
            message: 'PostgreSQL is not running'
        });
    }

    // Default error
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.path,
        method: req.method
    });
});

// ===========================
// DATABASE & SERVER STARTUP
// ===========================
async function startServer() {
    try {
        console.log('🗄️  Inicializando banco de dados...');
        try {
            await initializeDatabase();
            console.log('✅ Banco de dados inicializado');
        } catch (dbError) {
            console.warn('⚠️  Aviso ao inicializar banco:', dbError.message);
            // Continua mesmo se banco falhar (para testes)
        }

        console.log('📦 Conectando ao PostgreSQL...');
        try {
            await connectPool();
            console.log('✅ Conectado ao PostgreSQL');
        } catch (connError) {
            console.warn('⚠️  Aviso ao conectar ao PostgreSQL:', connError.message);
            // Continua mesmo se conexão falhar
        }

        app.listen(PORT, () => {
            console.log(`\n✅ Servidor JPR Móveis rodando na porta ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV}`);
            console.log(`🌐 CORS habilitado para: ${process.env.FRONTEND_URL}`);
            console.log(`\n🎉 Backend pronto para receber requisições!\n`);
        });
    } catch (error) {
        console.error('❌ Erro crítico ao iniciar servidor:', error);
        process.exit(1);
    }
}

// ===========================
// GRACEFUL SHUTDOWN
// ===========================
process.on('SIGINT', async () => {
    console.log('\n🛑 Encerrando servidor gracefully...');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 SIGTERM recebido, encerrando...');
    process.exit(0);
});

// Start the server
startServer();

module.exports = app;
