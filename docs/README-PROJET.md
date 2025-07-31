# 🏭 Système de Logistique - Documentation Projet

## 📋 Vue d'ensemble du projet

**Objectif :** Développer une solution informatique simple et efficace pour répondre aux besoins logistiques de l'entreprise, évitant la complexité des ERP traditionnels.

**Status actuel :** ✅ Base fonctionnelle déployée et accessible en ligne

## 🏗️ Architecture technique

### Stack technologique
- **Backend :** Node.js 22 + Express.js
- **Frontend :** HTML/CSS/JavaScript vanilla (responsive)
- **Base de données :** MySQL (à configurer)
- **Hébergement :** Infomaniak Cloud
- **Versioning :** Git + GitHub

### URL et accès
- **GitHub :** https://github.com/Maniuk69/logistique-app.git
- **URL Production :** https://logistique.nausaikraft.ch
- **Environnement local :** http://localhost:3000

## 📁 Structure des fichiers

```
logistique-app/
├── src/
│   ├── server.js          # Serveur principal Express
│   ├── routes/           # Routes API (à développer)
│   ├── models/           # Modèles de données (à développer)
│   └── controllers/      # Contrôleurs (à développer)
├── public/
│   ├── index.html        # Interface web principale
│   ├── styles.css        # CSS responsive
│   └── app.js           # JavaScript frontend
├── package.json          # Dépendances et scripts
├── .env                 # Variables d'environnement
├── .gitignore           # Fichiers ignorés par Git
└── README.md            # Documentation
```

## 📦 Dépendances installées

### Packages principaux
- `express` - Framework web
- `mysql2` - Driver MySQL
- `bcryptjs` - Hashage mots de passe
- `jsonwebtoken` - Authentification JWT
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Variables d'environnement

### Packages de développement
- `nodemon` - Rechargement automatique en dev

## ⚙️ Configuration actuelle

### Scripts NPM
- `npm start` - Démarrage production (node src/server.js)
- `npm run dev` - Développement local (nodemon src/server.js)

### Variables d'environnement (.env)
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=logistique_db
JWT_SECRET=votre_secret_jwt_tres_long_et_securise
```

### Configuration Infomaniak
- **Version Node.js :** 22
- **Commande build :** `npm install`
- **Commande start :** `npm start`
- **Port :** 3000
- **Auto-deploy :** Activé

## 🎯 Fonctionnalités à développer

### Phase 1 - Base de données (SUIVANT)
- [ ] Configuration MySQL sur Infomaniak
- [ ] Création des tables principales
- [ ] Scripts de migration
- [ ] Connexion DB dans l'application

### Phase 2 - Gestion des produits
- [ ] Table produits (nom, caractéristiques, catégorie, prix, etc.)
- [ ] API CRUD produits
- [ ] Interface d'administration produits
- [ ] Système de codes-barres

### Phase 3 - Gestion du stock
- [ ] Table stock et emplacements
- [ ] Mouvements d'entrée/sortie
- [ ] Alertes stock bas
- [ ] Interface de gestion stock

### Phase 4 - Gestion clients
- [ ] Table clients
- [ ] Tarification personnalisée
- [ ] Historique commandes
- [ ] Gestion des impayés

### Phase 5 - Commandes et factures
- [ ] Système de commandes fournisseurs
- [ ] Réception marchandises
- [ ] Facturation automatisée
- [ ] Export PDF

### Phase 6 - Interface client web
- [ ] Catalogue en ligne
- [ ] Système de panier
- [ ] Espace client
- [ ] Commandes en ligne

### Phase 7 - Modules avancés
- [ ] Gestion consignes
- [ ] Statistiques et rapports
- [ ] Relances automatiques
- [ ] Exports Excel

## 🚀 Déploiement et workflow

### Développement local
```bash
# Cloner le projet
git clone https://github.com/Maniuk69/logistique-app.git
cd logistique-app

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Déploiement sur Infomaniak
```bash
# Après modifications locales
git add .
git commit -m "Description des changements"
git push origin main

# Infomaniak déploie automatiquement
```

## 🛠️ Commandes utiles

### Git
```bash
git status                    # Voir l'état des fichiers
git add .                     # Ajouter tous les changements
git commit -m "message"       # Créer un commit
git push origin main          # Envoyer sur GitHub
```

### NPM
```bash
npm install package-name      # Installer un nouveau package
npm run dev                   # Mode développement
npm start                     # Mode production
```

### Base de données (à venir)
```bash
# Commandes SQL à définir
```

## 📞 Informations de contact technique

### Environnement de développement
- **OS :** Ubuntu Linux
- **Node.js :** v22.17.1
- **NPM :** v10.9.2
- **Git :** v2.43.0

### GitHub
- **Username :** Maniuk69
- **Repository :** logistique-app
- **Branch principale :** main

## 📝 Notes pour les prochaines sessions

### Pour continuer le travail avec Claude :
1. Mentionner : "Je travaille sur le système logistique Node.js documenté"
2. Préciser l'étape actuelle : "Nous en sommes à la Phase X"
3. Partager cette documentation si nécessaire

### État actuel (Date : 31/07/2025)
- ✅ Infrastructure Node.js fonctionnelle
- ✅ Interface web de base opérationnelle
- ✅ Déploiement Infomaniak réussi
- 🔄 **PROCHAINE ÉTAPE :** Configuration base de données MySQL

### Problèmes résolus
- Authentification GitHub avec CLI
- Configuration Infomaniak Node.js
- Déploiement automatique depuis Git

---

*Document créé le 31/07/2025 - À maintenir à jour à chaque étape*
