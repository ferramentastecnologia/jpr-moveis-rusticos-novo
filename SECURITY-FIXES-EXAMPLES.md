# ROSA MEXICANO - SECURITY FIXES WITH CODE EXAMPLES

This document provides code examples for fixing the critical security issues identified in the technical analysis.

---

## FIX #1: ADD AUTHENTICATION MIDDLEWARE

### Problem
The `/api/vouchers` endpoint returns all vouchers without any authentication, exposing customer data.

### Solution: Create Auth Middleware

**File: server-vouchers.js**

Add this at the top after imports:

```javascript
// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

function verifyAdminToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1] || 
                  req.query.token || 
                  req.body.token;
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token de autenticação não fornecido'
        });
    }
    
    // TODO: Implement JWT verification
    // For now, check if token exists in valid tokens list
    // In production, use jsonwebtoken package
    
    if (!isValidToken(token)) {
        return res.status(401).json({
            success: false,
            error: 'Token inválido ou expirado'
        });
    }
    
    req.adminToken = token;
    next();
}

// Store valid tokens (TODO: use database in production)
const validTokens = new Set();

function isValidToken(token) {
    return validTokens.has(token);
}
```

Update the admin login endpoint to store tokens:

```javascript
app.post('/api/admin-login', (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Usuário e senha são obrigatórios'
            });
        }
        
        if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
            const token = crypto.randomBytes(32).toString('hex');
            
            // Store token (valid for 24 hours)
            validTokens.add(token);
            setTimeout(() => validTokens.delete(token), 24 * 60 * 60 * 1000);
            
            console.log('✅ Login bem-sucedido:', username);
            
            return res.json({
                success: true,
                token,
                username,
                expiresIn: 86400 // 24 hours in seconds
            });
        } else {
            console.log('❌ Login falhou: credenciais inválidas');
            return res.status(401).json({
                success: false,
                error: 'Usuário ou senha incorretos'
            });
        }
    } catch (error) {
        console.error('❌ Erro no login:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });
    }
});
```

Update the vouchers endpoint to require authentication:

```javascript
/**
 * GET /api/vouchers
 * Listar vouchers (PROTEGIDO - requer autenticação)
 */
app.get('/api/vouchers', verifyAdminToken, async (req, res) => {
    try {
        const vouchers = await dbAll(`SELECT * FROM vouchers ORDER BY createdAt DESC`);
        
        const formattedVouchers = vouchers.map(v => ({
            ...v,
            buyer: {
                name: v.buyerName,
                email: v.buyerEmail,
                phone: v.buyerPhone
            },
            used: v.used === 1
        }));
        
        res.json({
            success: true,
            vouchers: formattedVouchers
        });
    } catch (error) {
        console.error('❌ Erro ao listar vouchers:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
```

---

## FIX #2: WEBHOOK SIGNATURE VERIFICATION

### Problem
Anyone can send a fake webhook to create vouchers without payment.

### Solution: Implement Signature Verification

**File: server-vouchers.js**

Add this function before the webhook endpoint:

```javascript
// ============================================
// WEBHOOK SECURITY
// ============================================

function verifyAsaasWebhook(req) {
    // Asaas sends a signature header
    // Format: 'sha256={hex_hash}'
    
    const signature = req.headers['asaas-webhook-signature'];
    if (!signature) {
        console.warn('⚠️ Webhook sem assinatura');
        return false;
    }
    
    // Your webhook token from Asaas settings
    const webhookToken = process.env.ASAAS_WEBHOOK_TOKEN || '';
    if (!webhookToken) {
        console.error('❌ ASAAS_WEBHOOK_TOKEN não configurado');
        return false;
    }
    
    // Verify signature
    const crypto = require('crypto');
    const body = JSON.stringify(req.body);
    const hash = crypto
        .createHmac('sha256', webhookToken)
        .update(body)
        .digest('hex');
    
    const expectedSignature = `sha256=${hash}`;
    
    const isValid = expectedSignature === signature;
    
    if (!isValid) {
        console.error('❌ Assinatura do webhook inválida');
    }
    
    return isValid;
}

// IP Whitelist for Asaas servers
const ASAAS_IPS = [
    '200.174.88.0',  // Example Asaas IP
    '200.174.89.0',  // Add actual Asaas IPs
    '127.0.0.1'      // localhost for testing
];

function isAsaasIP(ip) {
    // In production, check against actual Asaas IP list
    return ASAAS_IPS.includes(ip);
}

function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0].trim() || 
           req.socket.remoteAddress;
}
```

Update the webhook endpoint to use verification:

```javascript
app.post('/api/webhook', (req, res) => {
    try {
        console.log('📥 Webhook recebido:', req.body);
        
        // Verify signature
        if (!verifyAsaasWebhook(req)) {
            console.error('❌ Webhook falhou verificação de assinatura');
            return res.status(401).json({ error: 'Signature verification failed' });
        }
        
        // Verify IP (optional but recommended)
        const clientIP = getClientIP(req);
        if (!isAsaasIP(clientIP)) {
            console.warn(`⚠️ Webhook de IP não autorizado: ${clientIP}`);
            // In production, could reject here
            // return res.status(403).json({ error: 'IP not authorized' });
        }
        
        // Respond immediately with 200
        res.status(200).send('OK');
        
        // Process webhook asynchronously
        processAsaasWebhook(req.body).catch(err => {
            console.error('❌ Erro ao processar webhook:', err);
        });
        
    } catch (error) {
        console.error('❌ Erro no webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function processAsaasWebhook(webhookData) {
    const event = webhookData.event;
    const payment = webhookData.payment;
    
    if (!event || !payment) {
        console.error('❌ Webhook inválido');
        return;
    }
    
    if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
        console.log(`ℹ️ Evento ignorado: ${event}`);
        return;
    }
    
    // ... rest of webhook processing
}
```

---

## FIX #3: INPUT VALIDATION

### Problem
No validation on payment creation input.

### Solution: Use Validator Library

**Step 1: Install package**
```bash
npm install validator
```

**Step 2: Add validation function**

```javascript
// ============================================
// INPUT VALIDATION
// ============================================

const validator = require('validator');

function validatePaymentInput(data) {
    const errors = [];
    
    // Validate buyer data
    if (!data.buyer) {
        errors.push('Dados do comprador ausentes');
        return errors;
    }
    
    // Name validation
    if (!data.buyer.name || !validator.trim(data.buyer.name)) {
        errors.push('Nome do comprador é obrigatório');
    }
    if (data.buyer.name && !validator.isLength(data.buyer.name, { min: 2, max: 100 })) {
        errors.push('Nome deve ter entre 2 e 100 caracteres');
    }
    
    // Email validation
    if (!data.buyer.email || !validator.isEmail(data.buyer.email)) {
        errors.push('Email do comprador é inválido');
    }
    
    // Phone validation (Brazil format)
    if (data.buyer.phone) {
        const phoneDigits = validator.trim(data.buyer.phone).replace(/\D/g, '');
        if (phoneDigits.length !== 11 && phoneDigits.length !== 10) {
            errors.push('Telefone deve ter 10 ou 11 dígitos');
        }
    }
    
    // CPF validation (optional but recommended)
    if (data.buyer.cpf) {
        const cpf = data.buyer.cpf.replace(/\D/g, '');
        if (cpf.length !== 11) {
            errors.push('CPF deve ter 11 dígitos');
        }
        if (!validateCPF(cpf)) {
            errors.push('CPF inválido');
        }
    }
    
    // Price validation
    if (!data.pricePerUnit || data.pricePerUnit <= 0) {
        errors.push('Preço por unidade deve ser maior que zero');
    }
    if (data.pricePerUnit > 10000) {
        errors.push('Preço por unidade muito alto');
    }
    
    // Quantity validation
    if (!data.quantity || data.quantity < 1) {
        errors.push('Quantidade deve ser maior que zero');
    }
    if (data.quantity > 1000) {
        errors.push('Quantidade máxima é 1000');
    }
    
    // Total validation
    const expectedTotal = (data.pricePerUnit * data.quantity).toFixed(2);
    if (Math.abs(parseFloat(data.total) - parseFloat(expectedTotal)) > 0.01) {
        errors.push('Total não corresponde ao cálculo (pricePerUnit × quantity)');
    }
    
    return errors;
}

function validateCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // All same digits
    
    // Check first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;
    
    // Check second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;
    
    return true;
}
```

**Step 3: Use in payment creation endpoint**

```javascript
app.post('/api/create-payment', async (req, res) => {
    try {
        const { voucherId, voucherName, pricePerUnit, quantity, total, buyer } = req.body;
        
        // Validate input
        const validationErrors = validatePaymentInput(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: validationErrors
            });
        }
        
        // Rest of function...
    } catch (error) {
        console.error('❌ Erro ao criar pagamento:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
```

---

## FIX #4: ADD RATE LIMITING

### Problem
No rate limiting allows brute force attacks.

### Solution: Use Express Rate Limit

**Step 1: Install package**
```bash
npm install express-rate-limit
```

**Step 2: Create rate limiters**

```javascript
// ============================================
// RATE LIMITING
// ============================================

const rateLimit = require('express-rate-limit');

// Limit login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 attempts
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false
});

// Limit payment creation
const paymentLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // max 10 payments per minute per IP
    message: 'Muitas requisições de pagamento. Tente novamente em 1 minuto.',
    standardHeaders: true,
    legacyHeaders: false
});

// Limit voucher validation
const validateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // max 30 validations per minute
    message: 'Muitas tentativas de validação. Tente novamente em 1 minuto.',
    standardHeaders: true,
    legacyHeaders: false
});

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per 15 minutes
    message: 'Muitas requisições. Tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false
});
```

**Step 3: Apply to endpoints**

```javascript
// Apply general limiter to all API routes
app.use('/api/', apiLimiter);

// Apply specific limiters
app.post('/api/admin-login', loginLimiter, (req, res) => {
    // ... login code
});

app.post('/api/create-payment', paymentLimiter, async (req, res) => {
    // ... payment code
});

app.post('/api/validate-voucher', validateLimiter, async (req, res) => {
    // ... validation code
});
```

---

## FIX #5: FIX XSS IN ADMIN DASHBOARD

### Problem
Voucher names and buyer information rendered without escaping.

### Solution: Use Safe DOM Methods

**File: admin-vouchers.html**

Instead of:
```javascript
// WRONG - Vulnerable to XSS
document.getElementById('voucherName').innerHTML = voucher.voucherName;
```

Use:
```javascript
// CORRECT - Safe from XSS
document.getElementById('voucherName').textContent = voucher.voucherName;
```

Or with HTML escaping:

```javascript
// Helper function
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Use when you need HTML
document.getElementById('voucherName').innerHTML = `
    <span>${escapeHTML(voucher.voucherName)}</span>
    <span>${escapeHTML(voucher.buyerName)}</span>
`;
```

Or use DOMPurify library (recommended):

```javascript
// Install: npm install dompurify
// Use in HTML: <script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>

const clean = DOMPurify.sanitize(userInput);
document.getElementById('output').innerHTML = clean;
```

---

## FIX #6: RESTRICT CORS

### Problem
CORS open to all origins allows CSRF attacks.

### Solution: Whitelist Known Origins

**File: server-vouchers.js**

```javascript
// ============================================
// CORS CONFIGURATION
// ============================================

const allowedOrigins = [
    'https://jpr-moveis-vouchers-production.up.railway.app',
    'http://localhost:3000',
    'http://localhost:3001'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Check if origin is in whitelist
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    } else if (process.env.NODE_ENV !== 'production') {
        // Allow all origins in development
        res.header('Access-Control-Allow-Origin', '*');
    }
    
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
```

---

## FIX #7: UPDATE ADMIN DASHBOARD

### Problem
Admin dashboard doesn't send auth token with requests.

### Solution: Update Frontend

**File: admin-vouchers.html**

```javascript
// Get token from localStorage
const token = localStorage.getItem('adminToken');

// Load vouchers with token
async function loadVouchers() {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_URL}/api/vouchers`, {
            headers
        });
        
        if (response.status === 401) {
            // Token expired, redirect to login
            window.location.href = 'admin-login.html';
            return;
        }
        
        if (!response.ok) {
            throw new Error('Erro ao carregar vouchers');
        }
        
        const data = await response.json();
        displayVouchers(data.vouchers);
    } catch (error) {
        console.error('Erro:', error);
        showError('Erro ao carregar vouchers');
    }
}
```

---

## SUMMARY OF ALL FIXES

1. **Add Auth Middleware** - 1 hour
2. **Webhook Signature Verification** - 2 hours
3. **Input Validation** - 3 hours
4. **Rate Limiting** - 1 hour
5. **Fix XSS** - 2 hours
6. **Restrict CORS** - 30 minutes
7. **Update Frontend** - 1 hour

**Total: ~10-11 hours**

---

## TESTING THE FIXES

```bash
# Test missing auth token
curl http://localhost:3000/api/vouchers
# Should return 401 Unauthorized

# Test with token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/vouchers
# Should return vouchers list

# Test rate limiting
for i in {1..15}; do curl http://localhost:3000/api/admin-login; done
# Should start blocking after 5 attempts

# Test webhook signature
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -H "asaas-webhook-signature: invalid" \
  -d '{...}'
# Should return 401
```

---

**Generated:** November 7, 2025
**Status:** Ready for Implementation

