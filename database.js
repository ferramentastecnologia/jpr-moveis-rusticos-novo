/**
 * Database Configuration
 * Suporta SQLite (desenvolvimento) e PostgreSQL (produção)
 */

const path = require('path');

// Detecta qual banco usar baseado na variável de ambiente
const USE_POSTGRES = process.env.DATABASE_URL ? true : false;

let db;

if (USE_POSTGRES) {
    // ============================================
    // POSTGRESQL (Produção - Railway)
    // ============================================
    const { Pool } = require('pg');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false
    });

    console.log('🐘 Usando PostgreSQL');

    // Criar tabelas PostgreSQL
    const initPostgres = async () => {
        try {
            // Tabela de pedidos
            await pool.query(`
                CREATE TABLE IF NOT EXISTS orders (
                    id SERIAL PRIMARY KEY,
                    externalReference TEXT UNIQUE NOT NULL,
                    asaasPaymentId TEXT,
                    voucherId TEXT,
                    voucherName TEXT,
                    voucherEmoji TEXT,
                    pricePerUnit REAL,
                    quantity INTEGER,
                    total REAL,
                    buyerName TEXT,
                    buyerEmail TEXT,
                    buyerPhone TEXT,
                    buyerCpf TEXT,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Tabela de vouchers
            await pool.query(`
                CREATE TABLE IF NOT EXISTS vouchers (
                    id SERIAL PRIMARY KEY,
                    code TEXT UNIQUE NOT NULL,
                    voucherId TEXT,
                    voucherName TEXT,
                    voucherEmoji TEXT,
                    pricePerUnit REAL,
                    quantity INTEGER,
                    total REAL,
                    buyerName TEXT,
                    buyerEmail TEXT,
                    buyerPhone TEXT,
                    purchaseDate TEXT,
                    expiryDate TEXT,
                    status TEXT DEFAULT 'active',
                    used INTEGER DEFAULT 0,
                    usedDate TEXT,
                    paymentId TEXT,
                    orderId TEXT,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            console.log('✅ Tabelas PostgreSQL criadas/verificadas');
        } catch (err) {
            console.error('❌ Erro ao criar tabelas PostgreSQL:', err);
        }
    };

    initPostgres();

    // Funções auxiliares para PostgreSQL
    db = {
        get: async (sql, params = []) => {
            // Converter ? para $1, $2, etc
            let index = 1;
            const pgSql = sql.replace(/\?/g, () => `$${index++}`);
            const result = await pool.query(pgSql, params);
            return result.rows[0];
        },

        all: async (sql, params = []) => {
            // Converter ? para $1, $2, etc
            let index = 1;
            const pgSql = sql.replace(/\?/g, () => `$${index++}`);
            const result = await pool.query(pgSql, params);
            return result.rows;
        },

        run: async (sql, params = []) => {
            // Converter ? para $1, $2, etc
            let index = 1;
            const pgSql = sql.replace(/\?/g, () => `$${index++}`);
            const result = await pool.query(pgSql, params);
            return {
                lastID: result.rows[0]?.id || null,
                changes: result.rowCount
            };
        },

        // Para queries que retornam RETURNING
        insert: async (sql, params = []) => {
            // Converter ? para $1, $2, etc
            let index = 1;
            const pgSql = sql.replace(/\?/g, () => `$${index++}`);
            const result = await pool.query(pgSql, params);
            return {
                lastID: result.rows[0]?.id || null,
                changes: result.rowCount,
                rows: result.rows
            };
        }
    };

} else {
    // ============================================
    // SQLITE (Desenvolvimento local)
    // ============================================
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(__dirname, 'vouchers.db');

    const sqliteDb = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Erro ao conectar no SQLite:', err);
        } else {
            console.log('✅ Conectado ao banco SQLite:', dbPath);
        }
    });

    console.log('📦 Usando SQLite');

    // Criar tabelas SQLite
    sqliteDb.serialize(() => {
        sqliteDb.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                externalReference TEXT UNIQUE NOT NULL,
                asaasPaymentId TEXT,
                voucherId TEXT,
                voucherName TEXT,
                voucherEmoji TEXT,
                pricePerUnit REAL,
                quantity INTEGER,
                total REAL,
                buyerName TEXT,
                buyerEmail TEXT,
                buyerPhone TEXT,
                buyerCpf TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        sqliteDb.run(`
            CREATE TABLE IF NOT EXISTS vouchers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT UNIQUE NOT NULL,
                voucherId TEXT,
                voucherName TEXT,
                voucherEmoji TEXT,
                pricePerUnit REAL,
                quantity INTEGER,
                total REAL,
                buyerName TEXT,
                buyerEmail TEXT,
                buyerPhone TEXT,
                purchaseDate TEXT,
                expiryDate TEXT,
                status TEXT DEFAULT 'active',
                used INTEGER DEFAULT 0,
                usedDate TEXT,
                paymentId TEXT,
                orderId TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('❌ Erro ao criar tabelas SQLite:', err);
            } else {
                console.log('✅ Tabelas SQLite criadas/verificadas');
            }
        });
    });

    // Funções auxiliares para SQLite (promisify)
    db = {
        get: (sql, params = []) => {
            return new Promise((resolve, reject) => {
                sqliteDb.get(sql, params, (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
        },

        all: (sql, params = []) => {
            return new Promise((resolve, reject) => {
                sqliteDb.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        },

        run: (sql, params = []) => {
            return new Promise((resolve, reject) => {
                sqliteDb.run(sql, params, function(err) {
                    if (err) reject(err);
                    else resolve({ lastID: this.lastID, changes: this.changes });
                });
            });
        },

        insert: (sql, params = []) => {
            return new Promise((resolve, reject) => {
                sqliteDb.run(sql, params, function(err) {
                    if (err) reject(err);
                    else resolve({ lastID: this.lastID, changes: this.changes });
                });
            });
        }
    };
}

module.exports = { db, USE_POSTGRES };
