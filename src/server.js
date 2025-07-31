const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API Logistique - Serveur démarré !' });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
