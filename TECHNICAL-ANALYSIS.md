# ROSA MEXICANO VOUCHER SYSTEM - COMPREHENSIVE TECHNICAL ANALYSIS

**Date:** November 7, 2025  
**Project:** JPR Móveis Rústicos Blumenau - Voucher Management System  
**Tech Stack:** Node.js/Express + SQLite/PostgreSQL + Asaas Payment Gateway

---

## 1. PROJECT STRUCTURE & KEY FILES

### Root Level Files
```
jpr-moveis-dashboard/
├── server-vouchers.js (1,358 lines) - Main backend server
├── database.js (236 lines) - Database abstraction layer
├── backend-vouchers.js (400+ lines) - Legacy/additional backend
├── package.json - Project dependencies
├── .env.example - Environment variables template
│
├── HTML Frontend Pages:
│   ├── checkout.html (1,100+ lines) - Main payment interface
│   ├── admin-login.html (250 lines) - Admin authentication
│   ├── admin-vouchers.html (900+ lines) - Admin dashboard
│   ├── validar-voucher.html (800+ lines) - Voucher validation page
│   ├── sucesso-voucher.html - Success page after payment
│   ├── index-vouchers-black-november.html - Special promotional version
│   └── Other variants (legacy versions)
│
├── Database:
│   └── vouchers.db (SQLite for development)
│
├── Utilities:
│   ├── test-infinity-pay.js - Payment gateway testing
│   ├── test-whatsapp-waha.js - WhatsApp API testing
│   ├── test-email-whatsapp.js - Communication testing
│   └── gerar-pdf-teste-simples.js - PDF generation test
│
└── images/ - Logo and branding assets
    ├── logo.png (28KB)
    └── logo-branco.png (29KB)
```

### Key Dependencies
- **express** ^4.18.2 - Web server framework
- **sqlite3** ^5.1.7 - SQLite driver (development)
- **pg** ^8.16.3 - PostgreSQL driver (production)
- **nodemailer** ^6.9.7 - Email sending
- **axios** ^1.6.2 - HTTP client for external APIs
- **pdfkit** ^0.13.0 - PDF generation
- **qrcode** ^1.5.3 - QR code generation
- **mercadopago** ^1.5.17 - Mercado Pago integration (legacy)
- **dotenv** ^16.3.1 - Environment variable management

---

## 2. DATABASE SCHEMA

### Tables Created

#### **ORDERS Table**
Purpose: Tracks payment orders before voucher generation
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    externalReference TEXT UNIQUE NOT NULL,      -- Unique order ID (RM-timestamp)
    asaasPaymentId TEXT,                         -- Payment gateway ID
    voucherId TEXT,                              -- Voucher type ID
    voucherName TEXT,                            -- Voucher name/description
    voucherEmoji TEXT,                           -- Emoji representation
    pricePerUnit REAL,                           -- Unit price
    quantity INTEGER,                            -- Quantity purchased
    total REAL,                                  -- Total value
    buyerName TEXT,                              -- Customer name
    buyerEmail TEXT,                             -- Customer email
    buyerPhone TEXT,                             -- Customer phone
    buyerCpf TEXT,                               -- Customer CPF/tax ID
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### **VOUCHERS Table**
Purpose: Stores generated vouchers for validation and redemption
```sql
CREATE TABLE vouchers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,                   -- Voucher code (RM-XXXXXX-TIMESTAMP)
    voucherId TEXT,                              -- Voucher type reference
    voucherName TEXT,                            -- Type name
    voucherEmoji TEXT,                           -- Visual identifier
    pricePerUnit REAL,                           -- Unit price
    quantity INTEGER,                            -- Quantity in this voucher
    total REAL,                                  -- Total value
    buyerName TEXT,                              -- Purchaser name
    buyerEmail TEXT,                             -- Purchaser email
    buyerPhone TEXT,                             -- Purchaser phone
    purchaseDate TEXT,                           -- ISO 8601 timestamp
    expiryDate TEXT,                             -- Expiration date (6 months)
    status TEXT DEFAULT 'active',                -- 'active', 'used', 'expired'
    used INTEGER DEFAULT 0,                      -- 0 = not used, 1 = used
    usedDate TEXT,                               -- When voucher was redeemed
    paymentId TEXT,                              -- Asaas payment reference
    orderId TEXT,                                -- Related order ID
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Database Strategy
- **SQLite**: Used for local development (vouchers.db)
- **PostgreSQL**: Used for production deployment (Railway)
- **Dual Support**: Implemented in database.js with automatic detection via DATABASE_URL env var

**Migration Layer**: Custom abstraction in database.js converts SQLite syntax (?) to PostgreSQL syntax ($1, $2, etc)

---

## 3. API ENDPOINTS

### Authentication
```
POST /api/admin-login
├─ Purpose: Admin panel authentication
├─ Input: { username, password }
├─ Output: { success, token, username }
├─ Security: Basic auth (no JWT, plaintext comparison)
└─ Note: Token is stored in localStorage (browser)
```

### Health Check
```
GET /health
├─ Purpose: Server status monitoring
├─ Output: { status, env, port, time }
└─ No authentication required
```

### Payment Processing
```
POST /api/create-payment
├─ Purpose: Create payment order via Asaas gateway
├─ Input: {
│   voucherId, voucherName, voucherEmoji,
│   pricePerUnit, quantity, total,
│   buyer: { name, email, phone, cpf }
│ }
├─ Process:
│   1. Validate buyer data (name, email required)
│   2. Create/fetch customer in Asaas
│   3. Create payment with PIX billing type
│   4. Store order in database
│   5. Return checkout URL and payment ID
├─ Output: {
│   success, paymentUrl, paymentId,
│   asaasPaymentId, externalReference, orderId
│ }
└─ Error Handling: Returns Asaas error details
```

```
POST /api/process-card-payment
├─ Purpose: Deprecated (returns error)
├─ Note: Infinity Pay not supported for transparent checkout
└─ Deprecated: Use /api/create-payment instead
```

### Webhook Processing
```
POST /api/webhook
├─ Purpose: Asaas payment confirmation webhook
├─ Input: Asaas webhook payload {
│   event: "PAYMENT_CONFIRMED" | "PAYMENT_RECEIVED",
│   payment: { id, externalReference, value, status, billingType }
│ }
├─ Process:
│   1. Respond immediately with 200 (Asaas requirement)
│   2. Find order by externalReference
│   3. Check if voucher already created (idempotency)
│   4. Generate unique voucher code (RM-XXXXXX-TIMESTAMP)
│   5. Calculate expiry date (+6 months)
│   6. Save voucher to database
│   7. Generate PDF with QR Code
│   8. (Optional) Send email/WhatsApp (currently disabled)
├─ Security: Processes events asynchronously after response
├─ Error Handling: Silent failures after 200 response
└─ Note: Email/WhatsApp disabled - client downloads PDF directly
```

### Voucher Retrieval
```
GET /api/download-pdf?code=RM-XXXX
├─ Purpose: Download voucher PDF
├─ Input: code query parameter
├─ Process:
│   1. Find PDF file in vouchers/ directory
│   2. Set headers for file download
│   3. Stream PDF to client
├─ Error: Returns 404 if file not found
└─ Security: No authentication on download
```

### Voucher Operations
```
GET /api/vouchers
├─ Purpose: List all vouchers (admin)
├─ Authentication: None (should be protected!)
├─ Output: { success, vouchers: [...] }
├─ Data: Transforms database records to API format
└─ SECURITY ISSUE: No token verification

POST /api/validate-voucher
├─ Purpose: Check if voucher is valid
├─ Input: { code }
├─ Output: { valid, voucher, reason }
├─ Validation:
│   1. Check if code exists
│   2. Check if already used
│   3. Check if expired
├─ Reasons: 'not_found', 'already_used', 'expired'
└─ No authentication required
```

### QR Code Retrieval
```
GET /api/pix-qrcode/:paymentId
├─ Purpose: Get PIX QR code after payment creation
├─ Input: paymentId from /api/create-payment
├─ Process:
│   1. Query Asaas API for payment details
│   2. Check if billingType is PIX or UNDEFINED
│   3. Return QR code in format required by frontend
├─ Output: {
│   success, qrCode: {
│     format, qr_code_url, qr_code
│   }
│ }
└─ Error: 400 if not PIX payment
```

### Manual Processing
```
POST /api/process-payment-manually
├─ Purpose: Process payment when webhook fails
├─ Input: { paymentId }
├─ Process:
│   1. Fetch payment from Asaas
│   2. Validate payment is received/confirmed
│   3. Create order if missing
│   4. Check if voucher already created
│   5. Generate voucher code
│   6. Save voucher
│   7. Generate PDF
├─ Output: { success, message, code, pdfUrl }
└─ Note: Useful for webhook debugging
```

### Testing Endpoints
```
GET /api/test-pdf
GET /api/test-email
├─ Purpose: Test PDF generation and email sending
├─ Authentication: None
└─ Used for development/debugging
```

---

## 4. PAYMENT FLOW (DETAILED)

### Complete Purchase to Voucher Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CUSTOMER INTERACTION                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  checkout.html:                                            │
│  - Customer selects voucher type (emoji, name, price)     │
│  - Enters buyer information (name, email, phone, CPF)     │
│  - Clicks "Finalizar Compra" (Complete Purchase)          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. CREATE PAYMENT REQUEST (Frontend)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  const paymentData = {                                      │
│    voucherId: "voucher-id",                               │
│    voucherName: "Crédito Dobrado R5R10",                 │
│    voucherEmoji: "🎁",                                     │
│    pricePerUnit: 50.00,                                    │
│    quantity: 2,                                            │
│    total: 100.00,                                          │
│    buyer: {                                                │
│      name: "João Silva",                                   │
│      email: "joao@example.com",                           │
│      phone: "(47) 9999-9999",                             │
│      cpf: "123.456.789-00"                                │
│    }                                                        │
│  }                                                          │
│                                                              │
│  fetch('/api/create-payment', { method: 'POST', ... })   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. PAYMENT CREATION (Backend)                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  app.post('/api/create-payment'):                          │
│                                                              │
│  Step A: Validate buyer data (name, email required)        │
│  Step B: Create customer in Asaas                          │
│          POST /customers with buyer details               │
│          Response: customer.id                             │
│  Step C: Create payment in Asaas                           │
│          POST /payments with:                              │
│          - customer ID                                      │
│          - billingType: "PIX"                              │
│          - value: 100.00                                    │
│          - description: "Crédito Dobrado R5R10 - 2x"      │
│          - externalReference: "RM-{timestamp}"             │
│          Response: invoiceUrl, paymentId                   │
│  Step D: Save order to database                            │
│          INSERT INTO orders {...}                          │
│  Step E: Return payment URL to frontend                    │
│          { paymentUrl, paymentId, externalReference }      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. CUSTOMER PAYMENT (Asaas Gateway)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Customer is redirected to Asaas checkout page            │
│  Options:                                                   │
│  - PIX: Scan QR code, confirm in app                      │
│  - Credit Card: Enter card details                         │
│  - Boleto: Generate boleto code                            │
│                                                              │
│  After successful payment:                                 │
│  - Asaas updates payment status to "RECEIVED"             │
│  - Customer redirected to success page with URL:          │
│    {APP_URL}/sucesso-voucher.html?code=RM-...           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. WEBHOOK NOTIFICATION (Asaas → Backend)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Asaas sends POST /api/webhook:                            │
│  {                                                          │
│    event: "PAYMENT_CONFIRMED",                             │
│    payment: {                                               │
│      id: "pay_xxx...",                                     │
│      externalReference: "RM-1730953200000",               │
│      value: 100.00,                                        │
│      status: "RECEIVED",                                   │
│      billingType: "PIX"                                    │
│    }                                                        │
│  }                                                          │
│                                                              │
│  Backend app.post('/api/webhook'):                         │
│  1. Respond immediately with 200                           │
│  2. Find order by externalReference                        │
│  3. Check if voucher already exists (idempotency)         │
│  4. If not, continue to voucher creation                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. VOUCHER GENERATION                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Generate voucher code:                                    │
│  - Format: RM-{randomChars}-{timestamp}                    │
│  - Example: RM-ABCD1234-ZZZZZZZZ                           │
│                                                              │
│  Calculate expiry:                                         │
│  - Current date + 6 months                                 │
│                                                              │
│  Insert into vouchers table:                               │
│  INSERT INTO vouchers (                                     │
│    code, voucherId, voucherName, pricePerUnit,            │
│    quantity, total, buyerName, buyerEmail,               │
│    buyerPhone, purchaseDate, expiryDate,                 │
│    status, used, paymentId, orderId                       │
│  ) VALUES (...)                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. PDF GENERATION                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  async generateVoucherPDF():                               │
│                                                              │
│  1. Create PDF document (A4, PDFKit)                        │
│  2. Add header with gradient (pink → purple)              │
│  3. Add JPR Móveis Rústicos logo (or taco emoji fallback)       │
│  4. Add main voucher code in large font                    │
│  5. Add expiry date                                        │
│  6. Generate QR code from voucher code                     │
│  7. Add QR code to PDF                                     │
│  8. Add buyer information                                  │
│  9. Add restaurant contact info                            │
│  10. Save to /vouchers/{code}.pdf                          │
│                                                              │
│  File location: /Users/.../vouchers/RM-XXXX.pdf           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. SUCCESS PAGE (Frontend)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  sucesso-voucher.html:                                     │
│  - Displays success message with confetti animation      │
│  - Shows voucher code prominently                          │
│  - Provides "Download PDF" button                          │
│  - Shows expiry date and usage instructions               │
│  - Button link: /api/download-pdf?code=RM-XXXX           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. PDF DOWNLOAD                                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GET /api/download-pdf?code=RM-XXXX:                       │
│  1. Find file: /vouchers/RM-XXXX.pdf                      │
│  2. Set Content-Type: application/pdf                      │
│  3. Set Content-Disposition: attachment                    │
│  4. Stream file to client                                  │
│  5. Client browser downloads PDF                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. VOUCHER VALIDATION (At Restaurant)                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Staff uses validar-voucher.html:                          │
│  1. Scan QR code or manually enter code                    │
│  2. POST /api/validate-voucher { code }                    │
│  3. Backend checks:                                         │
│     - Voucher exists                                        │
│     - Not already used                                      │
│     - Not expired                                           │
│  4. Returns voucher details if valid                       │
│  5. Display green checkmark if valid                       │
│  6. Mark as used in database                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Points in Flow

1. **Order Created**: When payment is initiated (BEFORE payment)
2. **Voucher Created**: When webhook confirms payment (AFTER payment)
3. **Idempotency**: Webhook handler checks if voucher already exists
4. **Expiry Calculation**: Fixed at +6 months from purchase
5. **No Email/WhatsApp**: Currently disabled, customer downloads PDF manually
6. **QR Code**: Embedded in PDF for scanning at validation

---

## 5. ENVIRONMENT VARIABLES REQUIRED

```bash
# ASAAS Payment Gateway
ASAAS_API_KEY=your_asaas_api_key           # Required for payment processing
ASAAS_API_URL=https://api.asaas.com/v3     # Default value
ASAAS_SANDBOX=false                         # Use production (true for sandbox)

# Email (Optional - currently disabled)
EMAIL_USER=vouchers@rosamexicano.com.br     # Gmail address
EMAIL_PASS=your_app_password                # Gmail app-specific password

# WhatsApp (Optional - currently disabled)
WAHA_API_URL=http://localhost:3001          # WAHA server URL
WAHA_API_KEY=your_waha_api_key              # WAHA authentication
WAHA_SESSION=default                        # Session identifier

# Application
APP_URL=https://jpr-moveis-vouchers-production.up.railway.app
PORT=3000                                    # Server port
NODE_ENV=production                          # Environment type

# Database (Production - PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database
# If not set, defaults to SQLite (vouchers.db)

# Admin Authentication
ADMIN_USERNAME=admin                         # Admin panel username
ADMIN_PASSWORD=rosa2025                      # Admin panel password (CHANGE!)

# Restaurant Info (Hardcoded in server-vouchers.js)
RESTAURANT_NAME=JPR Móveis Rústicos Blumenau
RESTAURANT_PHONE=(47) 3288-3096
RESTAURANT_WHATSAPP=(47) 99233-4348
RESTAURANT_ADDRESS=Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
```

### Configuration Detection Strategy

```javascript
// database.js automatic detection
if (process.env.DATABASE_URL) {
    use PostgreSQL (production on Railway)
} else {
    use SQLite (local development)
}
```

---

## 6. IDENTIFIED ISSUES & VULNERABILITIES

### CRITICAL SECURITY ISSUES

#### 1. **No Authentication on Admin Endpoints**
```
STATUS: CRITICAL
LOCATION: server-vouchers.js lines 1026-1049
ISSUE: GET /api/vouchers endpoint has NO token verification
IMPACT: Anyone can download entire voucher database including buyer emails/phones
RISK: Privacy breach, data leakage
SEVERITY: High

CURRENT CODE:
app.get('/api/vouchers', async (req, res) => {
    const vouchers = await dbAll(`SELECT * FROM vouchers ORDER BY createdAt DESC`);
    res.json({ success: true, vouchers: formattedVouchers });
});

FIX NEEDED: Add token verification middleware
```

#### 2. **Weak Admin Authentication**
```
STATUS: HIGH
LOCATION: server-vouchers.js lines 529-569
ISSUE: 
- Plaintext password comparison
- Token stored in localStorage (vulnerable to XSS)
- Token is NOT validated on protected endpoints
- No JWT or signature verification
IMPACT: Compromised admin access, no audit trail
RISK: Unauthorized voucher creation/modification

CURRENT CODE:
if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    return res.json({ success: true, token, username });
}
// Token is generated but never validated!

FIX NEEDED:
- Use JWT (jsonwebtoken package)
- Implement token verification middleware
- Add token expiration
- Use secure password hashing
```

#### 3. **No Input Validation on Payment Creation**
```
STATUS: MEDIUM
LOCATION: server-vouchers.js lines 715-825
ISSUE: Limited validation on buyer data
- Email format not validated
- Phone format partially sanitized (only removes non-digits)
- CPF validation missing
- Quantity and price not validated for reasonableness

EXAMPLE ISSUE:
buyerEmail could be anything, Asaas API fails silently
buyerPhone: "abc" → becomes "" after sanitization

FIX NEEDED:
- Use validator library (npm install validator)
- Validate email format (RFC 5322)
- Validate phone format (Brazil standard)
- Validate CPF format and check digit
- Validate quantity > 0 and reasonable price range
```

#### 4. **Unprotected PDF Download**
```
STATUS: MEDIUM
LOCATION: server-vouchers.js lines 589-612
ISSUE:
- Anyone can download any PDF by guessing voucher code
- No authentication required
- Code format is predictable: RM-{randomChars}-{timestamp}

EXAMPLE ATTACK:
GET /api/download-pdf?code=RM-AAAA-ZZZZ
GET /api/download-pdf?code=RM-BBBB-ZZZZ
(brute force possible)

FIX NEEDED:
- Require authentication
- Validate requestor owns the voucher
- Add rate limiting
```

#### 5. **Webhook Not Validated**
```
STATUS: HIGH
LOCATION: server-vouchers.js lines 857-1020
ISSUE:
- No signature verification from Asaas
- No IP whitelisting
- Anyone can send fake webhook to create vouchers
- No webhook security token check

IMPACT: Voucher creation without payment

FIX NEEDED:
- Implement Asaas webhook signature verification
- Add IP whitelist for Asaas servers
- Add webhook security token check (hmac-sha256)
```

#### 6. **Hardcoded Admin Credentials**
```
STATUS: MEDIUM
LOCATION: server-vouchers.js lines 46-48
ISSUE:
ADMIN_PASSWORD default is 'rosa2025' (weak)
Config suggests changing in production but:
- Must be changed in .env file (not in code)
- No password complexity requirements
- Password transmitted in plain JSON

CURRENT:
ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'rosa2025'

FIX NEEDED:
- Remove default password
- Require environment variable to be set
- Use bcrypt for password hashing
```

#### 7. **XSS Vulnerability in Admin Dashboard**
```
STATUS: MEDIUM
LOCATION: admin-vouchers.html
ISSUE:
- User input (voucher names, buyer names) rendered without escaping
- Could inject JavaScript through voucher names

EXAMPLE:
voucherName: "<img src=x onerror=alert('hacked')>"

FIX NEEDED:
- Use textContent instead of innerHTML
- Sanitize/escape all user input
- Use DOMPurify library
```

### ARCHITECTURAL ISSUES

#### 8. **Email and WhatsApp Disabled**
```
STATUS: DESIGN FLAW
LOCATION: server-vouchers.js lines 976-1005
ISSUE:
All email/WhatsApp sending code is commented out
Client must manually download PDF
User experience: Friction point

CURRENT STATE:
// 2. Enviar por email (DESABILITADO)
// try { ... } catch { ... }

IMPACT:
- No automatic notification to customer
- No backup delivery method
- Customer might forget to download PDF

FIX: Implement email/WhatsApp or document why disabled
```

#### 9. **No Rate Limiting**
```
STATUS: MEDIUM
LOCATION: All endpoints
ISSUE:
- No rate limiting on any endpoint
- Vulnerable to brute force attacks
- /api/validate-voucher could be spammed
- /api/create-payment could be flooded

FIX NEEDED:
npm install express-rate-limit
Apply to sensitive endpoints:
- /api/create-payment (1 per IP per minute)
- /api/validate-voucher (10 per IP per minute)
- /api/admin-login (5 per IP per 15 minutes)
```

#### 10. **CORS Open to All Origins**
```
STATUS: MEDIUM
LOCATION: server-vouchers.js lines 66-74
ISSUE:
CORS allows all origins (*)
Anyone can call API from any website

CURRENT CODE:
res.header('Access-Control-Allow-Origin', '*');

IMPACT:
- CSRF attacks possible
- API can be called from malicious sites

FIX NEEDED:
const allowedOrigins = [
    'https://jpr-moveis-vouchers-production.up.railway.app',
    'http://localhost:3000'
];
res.header('Access-Control-Allow-Origin', allowedOrigins[...]);
```

#### 11. **Async Error in Webhook**
```
STATUS: LOW
LOCATION: server-vouchers.js lines 857-1020
ISSUE:
Webhook responds with 200 immediately (good)
But async operations have no error tracking
If PDF generation fails, customer has no voucher PDF
No retry mechanism

FIX NEEDED:
Implement job queue (Bull.js or Bee-Queue)
Retry failed PDF generations
Store failure logs
```

#### 12. **No Logging/Monitoring**
```
STATUS: MEDIUM
LOCATION: Throughout server
ISSUE:
- Only console.log() used
- No structured logging
- No log aggregation
- No error tracking (Sentry, LogRocket)
- Console output lost on server restart

FIX NEEDED:
npm install winston pino
Use structured JSON logs
Send to log aggregation service
```

#### 13. **Database Not Parameterized (Partial)**
```
STATUS: LOW
LOCATION: server-vouchers.js
ISSUE:
- Using parameterized queries ✓ Good
- But database.js converts manually (fragile)
- Parameter conversion could have edge cases

EXAMPLE RISKY CODE:
let index = 1;
const pgSql = sql.replace(/\?/g, () => `$${index++}`);
// This assumes ? are in order, doesn't handle escaped ?

FIX NEEDED:
Use better conversion or:
npm install pg-promise (handles conversion)
```

#### 14. **No Pagination on Vouchers List**
```
STATUS: LOW
LOCATION: server-vouchers.js lines 1026-1049
ISSUE:
GET /api/vouchers returns ALL vouchers
If thousands of vouchers exist, response is huge
Slow query, memory issues

FIX NEEDED:
Add pagination parameters:
GET /api/vouchers?page=1&limit=50
Implement LIMIT and OFFSET in SQL
```

#### 15. **Voucher Code Generation Not Cryptographically Secure**
```
STATUS: MEDIUM
LOCATION: server-vouchers.js lines 111-116
ISSUE:
generateVoucherCode() uses Math.random()
Not cryptographically secure
Could be predictable

CURRENT CODE:
function generateVoucherCode() {
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    return `RM-${random}-${timestamp}`;
}

BETTER:
const crypto = require('crypto');
const random = crypto.randomBytes(8).toString('hex').toUpperCase();
```

### DATA INTEGRITY ISSUES

#### 16. **No Concurrent Request Handling**
```
STATUS: MEDIUM
ISSUE:
Multiple webhooks for same payment could create multiple vouchers
No row-level locking in SQLite
Race condition possible

FIX NEEDED:
Add database transaction/locking:
- SQLite: pragma journal_mode=WAL
- PostgreSQL: BEGIN TRANSACTION, LOCK
```

#### 17. **Expiry Date Hardcoded to 6 Months**
```
STATUS: LOW
LOCATION: server-vouchers.js lines 914-915, 1261-1262
ISSUE:
Expiry always +6 months from creation
No configuration option per voucher type
Not business requirement flexible

FIX NEEDED:
Add expiryMonths field to voucher config
Allow different expiry per voucher type
```

---

## 7. FRONTEND ARCHITECTURE

### Page Interactions

#### checkout.html (1,100+ lines)
```
Purpose: Main payment interface
Flow:
1. Customer selects voucher from grid/list
2. Selects quantity
3. Enters buyer information (name, email, phone, CPF)
4. Selects payment method (will go to Asaas checkout)
5. Submits → calls /api/create-payment
6. Redirected to Asaas payment page

Key Features:
- Real-time total calculation
- Form validation (basic)
- Loading states with spinner
- Error messages
- Responsive design (mobile-first)
- Black November special design available

Backend URL: Hardcoded to Railway production URL
BACKEND_URL = 'https://jpr-moveis-vouchers-production.up.railway.app'
Problem: Can't test locally without changing code
```

#### admin-login.html (250 lines)
```
Purpose: Admin authentication
Flow:
1. Admin enters username and password
2. POST /api/admin-login
3. Receives token
4. Stores in localStorage
5. Redirects to admin-vouchers.html

Security Issues:
- No token expiration check
- No HTTPS enforcement message
- Token persisted forever
```

#### admin-vouchers.html (900+ lines)
```
Purpose: Admin dashboard to manage vouchers
Features:
- List all vouchers (paginated)
- Filter by status (active, used, expired)
- Search by code or buyer name
- Download individual PDFs
- Mark as used/unused
- Delete (commented out)
- Export data

Backend Integration:
- GET /api/vouchers → Load all vouchers
- GET /api/download-pdf?code=X → Download PDF
- Token stored in localStorage (not validated!)

ISSUE: No token verification on requests!
Admin token is generated but never validated on subsequent calls
```

#### validar-voucher.html (800+ lines)
```
Purpose: Voucher validation at restaurant
Features:
- Scan QR code or enter code manually
- POST /api/validate-voucher { code }
- Shows:
  - Voucher details (name, price, quantity)
  - Buyer information (name, email, phone)
  - Validity status with color coding
  - Green check if valid, red X if invalid

Design:
- Large buttons for fast operation
- Text-to-speech for result notification
- Sound effects for feedback

Validation Response Handling:
- valid: true → Green checkmark + success sound
- valid: false with reason:
  - 'not_found' → Red X, "Voucher not found"
  - 'already_used' → Orange warning, "Already redeemed"
  - 'expired' → Orange warning, "Voucher expired"
```

#### Other HTML Files

**index-vouchers-black-november.html**
- Special promotional version with Black November branding
- Same functionality as checkout.html
- Different styling/colors

**sucesso-voucher.html**
- Success page shown after payment
- Displays voucher code prominently
- Shows expiry date and usage instructions
- Provides download button

**sucesso.html**
- Legacy success page (Mercado Pago era)

**vouchers.html**
- Customer-facing voucher listing/validation
- Show available vouchers for purchase

### Frontend Security Issues

1. **Hardcoded Backend URL**
   - Can't switch between dev/prod without code changes
   - Should use dynamic detection or config

2. **Sensitive Data in localStorage**
   - Admin token stored plaintext in localStorage
   - Vulnerable to XSS attacks
   - Should use httpOnly cookies

3. **No CSRF Protection**
   - No CSRF tokens on forms
   - POST requests have no validation

4. **Input Validation Only on Frontend**
   - Client-side validation can be bypassed
   - Must validate on backend (partially done)

---

## 8. DEPLOYMENT & CONFIGURATION

### Production Deployment (Railway)

```
Platform: Railway
Database: PostgreSQL (auto-provisioned)
Node Environment: NODE_ENV=production
Entry Point: npm start → node server-vouchers.js
Port: Assigned by Railway, use $PORT env var

Connected Services:
- Asaas Payment Gateway (API)
- Gmail SMTP (optional, disabled)
- WAHA WhatsApp API (optional, disabled)

URL: https://jpr-moveis-vouchers-production.up.railway.app
```

### Development Deployment (Local)

```
Database: SQLite (vouchers.db in root)
Command: npm run dev → nodemon server-vouchers.js
Port: 3000
Frontend: localhost:3000/checkout.html
Admin: localhost:3000/admin-login.html

NOTE: Must set all environment variables in .env file
```

### File Structure on Disk
```
/vouchers/ - Generated PDFs
├── RM-XXXX.pdf
├── RM-YYYY.pdf
└── ...

./vouchers.db - SQLite database (dev only)
./node_modules/ - npm dependencies
./images/ - Logo assets
```

---

## 9. TESTING & VALIDATION

### Test Files Available
```
test-infinity-pay.js - Payment gateway testing (deprecated)
test-whatsapp-waha.js - WhatsApp API testing
test-email-whatsapp.js - Email/WhatsApp integration
gerar-pdf-teste-simples.js - PDF generation test
simple-test.js - Basic functionality test
testar-envio-completo.js - End-to-end testing
```

### API Testing Endpoints
```
GET /health - Server status check
GET /api/test-pdf - Generate test PDF
GET /api/test-email - Send test email
POST /api/process-payment-manually - Debug webhook issues
```

---

## 10. SYSTEM DEPENDENCIES & COMPATIBILITY

### Node.js Requirements
- Node.js 14+ (ES6 async/await support)
- npm 6+

### Database Compatibility
- SQLite 3.x (local development)
- PostgreSQL 12+ (production on Railway)

### Browser Requirements
- Modern browser with ES6 support
- Fetch API support
- localStorage support
- WebRTC for WebAuthn (optional for future)

---

## SUMMARY: CRITICAL ACTIONS NEEDED

### Priority 1 (Critical - Do Immediately)
1. Add authentication token validation to all protected endpoints
2. Implement webhook signature verification (Asaas)
3. Add input validation on payment creation
4. Fix XSS vulnerabilities in admin dashboard
5. Change default admin password

### Priority 2 (High - Do Soon)
1. Implement JWT authentication instead of random tokens
2. Add rate limiting to all endpoints
3. Restrict CORS to known origins
4. Add structured logging
5. Implement proper error handling in webhook

### Priority 3 (Medium - Schedule)
1. Add database migrations system
2. Implement pagination on vouchers list
3. Add audit logging for admin actions
4. Enable email/WhatsApp or document why disabled
5. Add monitoring and alerting

### Priority 4 (Low - Plan for Future)
1. Use cryptographically secure token generation
2. Add database transaction support
3. Implement caching layer
4. Add API documentation (Swagger/OpenAPI)
5. Add integration tests

---

## CONCLUSION

The JPR Móveis Rústicos Voucher System is a functional e-commerce platform for selling and validating restaurant vouchers. It successfully integrates with the Asaas payment gateway and generates PDF vouchers with QR codes.

However, the system has **several critical security vulnerabilities** that must be addressed before production use:
- Missing authentication on protected endpoints
- Weak admin authentication without token validation
- No webhook signature verification
- Multiple input validation issues
- XSS vulnerabilities in admin interface

The codebase is well-structured with good separation of concerns (database abstraction, async/await patterns, CORS handling), but security must be prioritized before accepting real payments.

**Estimated Remediation Time**: 2-3 weeks for critical issues, 6-8 weeks for full security hardening.

