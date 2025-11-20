/**
 * JWT Authentication Middleware
 * Valida tokens JWT em requisições protegidas
 */

const jwt = require('jsonwebtoken');

/**
 * Verify JWT token
 */
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Token não fornecido',
            message: 'Inclua o token JWT no header Authorization'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        res.status(401).json({
            error: 'Token inválido',
            message: error.message
        });
    }
}

/**
 * Verify admin role
 */
function verifyAdmin(req, res, next) {
    if (req.user?.role !== 'admin' && req.user?.role !== 'gerente') {
        return res.status(403).json({
            error: 'Acesso negado',
            message: 'Apenas administradores podem acessar este recurso'
        });
    }
    next();
}

/**
 * Verify customer
 */
function verifyCustomer(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            error: 'Não autenticado',
            message: 'Faça login para acessar este recurso'
        });
    }
    next();
}

/**
 * Rate limiting middleware (simples)
 */
const rateLimit = {};

function rateLimitMiddleware(limit = 100, windowMs = 60000) {
    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now();

        if (!rateLimit[key]) {
            rateLimit[key] = [];
        }

        // Limpar requisições antigas
        rateLimit[key] = rateLimit[key].filter(time => now - time < windowMs);

        if (rateLimit[key].length >= limit) {
            return res.status(429).json({
                error: 'Too Many Requests',
                message: 'Muitas requisições. Tente novamente mais tarde.'
            });
        }

        rateLimit[key].push(now);
        next();
    };
}

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyCustomer,
    rateLimitMiddleware
};
