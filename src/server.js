const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Test de la base de données au démarrage
async function initializeApp() {
    console.log('🚀 Démarrage de l\'application...');
    
    // Test de connexion à la base de données
    const dbConnected = await testConnection();
    if (!dbConnected) {
        console.error('⚠️ L\'application démarre sans base de données');
    }
}

// Route de test
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Logistique - Serveur démarré !',
        database: 'Connexion testée au démarrage'
    });
});

// Route de test base de données
app.get('/api/test-db', async (req, res) => {
    const { pool } = require('./config/database');
    try {
        const [rows] = await pool.execute('SELECT 1 as test');
        res.json({ 
            success: true, 
            message: 'Base de données connectée !',
            test: rows[0]
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Erreur de connexion à la base de données',
            error: error.message 
        });
    }
});

// Initialisation et démarrage du serveur
initializeApp().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Serveur démarré sur le port ${PORT}`);
        console.log(`🌐 URL locale: http://localhost:${PORT}`);
        console.log(`🔗 Test DB: http://localhost:${PORT}/api/test-db`);
    });
});
console.log('🔄 Version mise à jour - jeu. 31 juil. 2025 16:17:35 CEST');
