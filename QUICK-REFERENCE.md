# ROSA MEXICANO VOUCHER SYSTEM - QUICK REFERENCE

## SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                    ROSA MEXICANO VOUCHERS                   │
│          E-commerce Voucher Management Platform             │
└─────────────────────────────────────────────────────────────┘

Frontend (HTML/JS)
├── checkout.html          → Customer purchases vouchers
├── admin-login.html       → Admin authentication  
├── admin-vouchers.html    → Admin dashboard/reporting
└── validar-voucher.html   → Restaurant validates at point-of-sale

    ↓ (HTTPS)

Backend (Node.js/Express)
└── server-vouchers.js     → 1,358 lines, handles all logic
    ├── API Endpoints      → 11 REST endpoints
    ├── PDF Generation     → QR codes embedded in PDFs
    ├── Database Layer     → SQLite/PostgreSQL abstraction
    └── Asaas Integration  → Payment gateway

    ↓ (API)

External Services
├── Asaas               → Payment processing (PIX/CC/Boleto)
├── Gmail SMTP          → Email (disabled)
├── WAHA API            → WhatsApp (disabled)
└── Railway             → Production hosting
```

---

## QUICK STATS

| Metric | Value |
|--------|-------|
| Backend Lines of Code | 1,358 |
| Database Tables | 2 (orders, vouchers) |
| API Endpoints | 11 |
| Frontend HTML Pages | 14+ |
| Dependencies | 9 direct |
| Database Options | SQLite + PostgreSQL |
| Payment Gateway | Asaas |
| Voucher Expiry | 6 months |
| PDF Format | A4 with QR code |

---

## PAYMENT FLOW (SIMPLIFIED)

```
Customer fills form → POST /api/create-payment → Asaas checkout page
        ↓
Customer pays via Asaas (PIX/Card/Boleto)
        ↓
Asaas sends webhook → POST /api/webhook
        ↓
Backend generates voucher code + PDF with QR
        ↓
Customer sees success page, downloads PDF
        ↓
At restaurant: scan QR → POST /api/validate-voucher
        ↓
Check validity (not used, not expired) → Mark as used
```

---

## CRITICAL VULNERABILITIES (MUST FIX)

| # | Issue | Severity | Impact | Fix Time |
|---|-------|----------|--------|----------|
| 1 | No auth on /api/vouchers | CRITICAL | Data breach (all vouchers leaked) | 1 hour |
| 2 | Weak admin auth | HIGH | Unauthorized access to admin panel | 4 hours |
| 3 | No webhook validation | HIGH | Fake payments, vouchers without payment | 2 hours |
| 4 | No input validation | MEDIUM | Invalid data in DB, API errors | 3 hours |
| 5 | XSS in admin dashboard | MEDIUM | Admin account compromise | 2 hours |
| 6 | CORS open to all | MEDIUM | CSRF attacks, API abuse | 1 hour |
| 7 | No rate limiting | MEDIUM | Brute force attacks, DDoS | 2 hours |
| 8 | Hardcoded weak password | MEDIUM | Obvious admin password | 30 min |

**Total Critical Fixes**: ~15 hours of development

---

## KEY FILES TO MODIFY

### Backend
```
✓ server-vouchers.js      [CRITICAL] Add auth middleware, input validation
✓ database.js             [LOW] Add transaction support
✓ package.json            [MEDIUM] Add new security packages
```

### Frontend
```
✓ admin-vouchers.html     [CRITICAL] Fix XSS, send auth tokens
✓ checkout.html           [MEDIUM] Add CSRF tokens
✓ validar-voucher.html    [MEDIUM] Same improvements
```

### Config
```
✓ .env.example            [LOW] Document all variables
✓ TECHNICAL-ANALYSIS.md   [REFERENCE] This document
```

---

## API ENDPOINTS SUMMARY

| Method | Endpoint | Auth? | Purpose | Risk |
|--------|----------|-------|---------|------|
| POST | /api/admin-login | No | Get admin token | LOW |
| GET | /api/vouchers | **NO** | List all vouchers | **CRITICAL** |
| POST | /api/validate-voucher | No | Check voucher validity | LOW |
| POST | /api/create-payment | No | Create Asaas payment | MEDIUM |
| POST | /api/webhook | **NO** | Asaas callback | **HIGH** |
| GET | /api/pix-qrcode/:id | No | Get PIX QR code | LOW |
| GET | /api/download-pdf | **NO** | Download voucher PDF | **MEDIUM** |
| POST | /api/process-payment-manually | No | Manual webhook retry | LOW |
| GET | /health | No | Server status | NONE |
| GET | /api/test-pdf | No | Test PDF generation | LOW |
| GET | /api/test-email | No | Test email sending | LOW |

**Red flags:**
- Endpoints marked **BOLD** have NO authentication
- /api/vouchers leaks entire customer database
- /api/webhook vulnerable to replay attacks

---

## DATABASE SCHEMA

### ORDERS Table
```sql
├─ id (PK)
├─ externalReference (UNIQUE) - Unique order ID
├─ asaasPaymentId - Payment gateway reference
├─ voucherId, voucherName, voucherEmoji
├─ pricePerUnit, quantity, total
├─ buyerName, buyerEmail, buyerPhone, buyerCpf
└─ createdAt
```

### VOUCHERS Table
```sql
├─ id (PK)
├─ code (UNIQUE) - Redemption code (RM-XXXX-YYYY)
├─ voucherId, voucherName, voucherEmoji
├─ pricePerUnit, quantity, total
├─ buyerName, buyerEmail, buyerPhone
├─ purchaseDate, expiryDate (+6 months)
├─ status ('active' | 'used' | 'expired')
├─ used (0/1), usedDate
├─ paymentId, orderId
└─ createdAt
```

---

## ENVIRONMENT VARIABLES

### REQUIRED (Critical)
```bash
ASAAS_API_KEY=xxx                # Must have for payments
PORT=3000                         # Server port
NODE_ENV=production/development   # Environment
```

### REQUIRED (Admin)
```bash
ADMIN_USERNAME=admin              # Change this!
ADMIN_PASSWORD=strong_pass        # Must be strong!
```

### OPTIONAL (Currently Disabled)
```bash
EMAIL_USER=xxx@gmail.com          # Email delivery
EMAIL_PASS=app_password           # Gmail app password
WAHA_API_URL=http://localhost:3001 # WhatsApp
WAHA_API_KEY=xxx                  # WhatsApp API key
```

### PRODUCTION REQUIRED
```bash
DATABASE_URL=postgresql://...     # PostgreSQL on Railway
APP_URL=https://...               # Public app URL
```

### DEFAULT (if not provided)
```bash
ASAAS_API_URL=https://api.asaas.com/v3
ASAAS_SANDBOX=false
PORT=3000
```

---

## DEPLOYMENT CHECKLIST

### Before Production
- [ ] Change admin password in .env (not code)
- [ ] Add token validation to protected endpoints
- [ ] Implement webhook signature verification
- [ ] Add rate limiting
- [ ] Enable HTTPS only (Railway does this)
- [ ] Restrict CORS to known origins
- [ ] Set up error logging/monitoring
- [ ] Backup database regularly
- [ ] Test payment flow end-to-end
- [ ] Security audit by third party

### On Deployment
- [ ] Use PostgreSQL (not SQLite)
- [ ] Set NODE_ENV=production
- [ ] Use strong ADMIN_PASSWORD
- [ ] Keep dependencies updated
- [ ] Enable HTTP/2
- [ ] Set up SSL/TLS
- [ ] Configure firewall rules
- [ ] Monitor logs for errors
- [ ] Set up alerts for failures

---

## DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Run production server
npm start

# Create test payment
curl -X POST http://localhost:3000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{"voucherId":"v1","voucherName":"Test","buyer":{"name":"John","email":"john@test.com"}}'

# Check server health
curl http://localhost:3000/health

# List all vouchers
curl http://localhost:3000/api/vouchers

# Validate a voucher
curl -X POST http://localhost:3000/api/validate-voucher \
  -H "Content-Type: application/json" \
  -d '{"code":"RM-XXXX"}'
```

---

## SECURITY FIXES PRIORITY

### Priority 1 (Do Today)
1. Add middleware to validate token on /api/vouchers
2. Add Asaas webhook signature verification  
3. Add HTTPS-only enforcement
4. Change default admin password

### Priority 2 (Do This Week)
1. Implement JWT authentication
2. Add rate limiting middleware
3. Validate and sanitize all inputs
4. Fix XSS vulnerabilities in admin pages

### Priority 3 (Do Next Week)
1. Add structured logging
2. Implement caching
3. Add database backups
4. Set up monitoring/alerts

### Priority 4 (Plan for Future)
1. Multi-factor authentication
2. OAuth for admin access
3. API versioning
4. GraphQL alternative

---

## TESTING ENDPOINTS

```bash
# Test PDF generation (creates dummy PDF)
GET /api/test-pdf

# Test email sending (uses configured email)
GET /api/test-email

# Manually process payment (for webhook failures)
POST /api/process-payment-manually
Body: {"paymentId": "pay_xxx"}

# Check server is running
GET /health
```

---

## USEFUL LINKS

- Asaas API Docs: https://asaas.com/api/
- Express.js: https://expressjs.com/
- PDFKit: http://pdfkit.org/
- QRCode.js: https://davidshimjs.github.io/qrcodejs/
- Railway Hosting: https://railway.app/

---

## CONTACT & SUPPORT

JPR Móveis Rústicos: (47) 3288-3096  
WhatsApp: (47) 99233-4348  
Address: Rua Carlos Rischbieter, 64, Blumenau - SC

---

**Generated:** November 7, 2025  
**Analysis Version:** 1.0  
**Status:** NEEDS SECURITY HARDENING BEFORE PRODUCTION USE

