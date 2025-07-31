const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion à la base de données réussie !');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Erreur de connexion à la base de données:', error.message);
        return false;
    }
}

module.exports = {
    pool,
    testConnection
};
