/**
 * Database connection and query helpers
 */

const { pool } = require('../config/database');

/**
 * Execute a database query
 * @param {string} query - SQL query
 * @param {array} params - Query parameters
 * @returns {Promise} Query result
 */
async function query(text, params = []) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`✓ Query executada em ${duration}ms`);
        return res;
    } catch (error) {
        console.error('❌ Database query error:', error);
        throw error;
    }
}

/**
 * Get connection from pool
 */
async function getConnection() {
    return await pool.connect();
}

/**
 * Connect to database pool
 */
async function connectPool() {
    try {
        const client = await pool.connect();
        client.release();
        console.log('✅ Pool de conexões pronto');
    } catch (error) {
        console.error('❌ Erro ao conectar ao pool:', error);
        throw error;
    }
}

/**
 * Execute transaction
 * @param {Function} callback - Transaction callback
 */
async function transaction(callback) {
    const client = await getConnection();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    query,
    getConnection,
    connectPool,
    transaction,
    pool
};
