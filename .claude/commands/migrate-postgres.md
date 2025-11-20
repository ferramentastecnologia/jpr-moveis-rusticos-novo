# Comando: Migrar para PostgreSQL

Migre o banco de dados de SQLite para PostgreSQL no Railway:

## 1. Criar PostgreSQL no Railway

- Acessar Railway dashboard
- Adicionar plugin PostgreSQL ao projeto
- Copiar DATABASE_URL gerada
- Adicionar variável ao projeto

## 2. Instalar Dependências

```bash
npm install pg
npm uninstall sqlite3
```

## 3. Backup dos Dados Atuais

- Exportar todos os vouchers em CSV
- Salvar dump do SQLite atual
- Documentar estrutura das tabelas

## 4. Criar Arquivo de Migração

Criar script de migração com:

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  externalReference TEXT UNIQUE NOT NULL,
  asaasPaymentId TEXT,
  voucherId TEXT,
  voucherName TEXT,
  voucherEmoji TEXT,
  pricePerUnit DECIMAL(10,2),
  quantity INTEGER,
  total DECIMAL(10,2),
  buyerName TEXT,
  buyerEmail TEXT,
  buyerPhone TEXT,
  buyerCpf TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  voucherId TEXT,
  voucherName TEXT,
  voucherEmoji TEXT,
  pricePerUnit DECIMAL(10,2),
  quantity INTEGER,
  total DECIMAL(10,2),
  buyerName TEXT,
  buyerEmail TEXT,
  buyerPhone TEXT,
  purchaseDate TIMESTAMP,
  expiryDate TIMESTAMP,
  status TEXT DEFAULT 'active',
  used INTEGER DEFAULT 0,
  usedDate TIMESTAMP,
  paymentId TEXT,
  orderId TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_vouchers_code ON vouchers(code);
CREATE INDEX idx_vouchers_paymentId ON vouchers(paymentId);
CREATE INDEX idx_vouchers_orderId ON vouchers(orderId);
CREATE INDEX idx_orders_externalReference ON orders(externalReference);
```

## 5. Atualizar server-vouchers.js

Substituir SQLite por PostgreSQL:

```javascript
// ANTES:
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./vouchers.db');

// DEPOIS:
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Substituir queries:
// db.all() → pool.query()
// db.run() → pool.query()
// db.get() → pool.query()
```

## 6. Adaptar Todas as Queries

Atualizar sintaxe de SQLite para PostgreSQL:

- `?` → `$1, $2, $3...`
- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- `DATETIME` → `TIMESTAMP`
- `REAL` → `DECIMAL(10,2)`

## 7. Importar Dados Antigos

Criar script para importar dados do backup CSV:

```javascript
const importData = async () => {
  // Ler CSV
  // Inserir no PostgreSQL
  // Verificar integridade
};
```

## 8. Testar Completamente

- Testar criação de pedido
- Testar webhook
- Testar geração de voucher
- Testar validação
- Testar listagem no admin
- Verificar performance

## 9. Deploy

- Commit mudanças
- Push para Railway
- Verificar logs
- Testar em produção

## 10. Verificações Pós-Migração

- Confirmar que dados foram migrados
- Verificar que não há perda de informações
- Testar todos os endpoints
- Monitorar por 24h

✅ **Benefícios:**
- Dados persistentes (não reseta em deploy)
- Melhor performance
- Backup automático do Railway
- Queries mais poderosas

Sempre fazer backup antes de migrar!
