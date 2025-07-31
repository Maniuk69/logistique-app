# 🗄️ Structure Base de Données - Système Logistique

## 📊 Schéma général des tables

### Vue d'ensemble
```
PRODUITS ─────┐
├── STOCK     │
├── PRIX      │
└── CATEGORIES│
              │
CLIENTS ──────┼─── COMMANDES ─── COMMANDES_ITEMS
              │
FOURNISSEURS ─┼─── APPROVISIONNEMENTS ─── APPRO_ITEMS
              │
EMPLACEMENTS ─┘
```

## 📋 Tables principales

### 1. CATEGORIES
```sql
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);
```

### 2. PRODUITS
```sql
CREATE TABLE produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    code_barre VARCHAR(50) UNIQUE,
    code_interne VARCHAR(50) UNIQUE,
    categorie_id INT,
    prix_achat DECIMAL(10,2),
    prix_vente DECIMAL(10,2),
    tva_taux DECIMAL(5,2) DEFAULT 20.00,
    date_peremption DATE,
    poids DECIMAL(8,3),
    dimensions VARCHAR(50),
    unite VARCHAR(20) DEFAULT 'pièce',
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);
```

### 3. EMPLACEMENTS
```sql
CREATE TABLE emplacements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    zone VARCHAR(50),
    allee VARCHAR(10),
    etagere VARCHAR(10),
    niveau VARCHAR(10),
    capacite_max INT,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. STOCK
```sql
CREATE TABLE stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    emplacement_id INT NOT NULL,
    quantite INT NOT NULL DEFAULT 0,
    quantite_reservee INT DEFAULT 0,
    seuil_alerte INT DEFAULT 5,
    date_derniere_entree DATE,
    date_derniere_sortie DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(id),
    FOREIGN KEY (emplacement_id) REFERENCES emplacements(id),
    UNIQUE KEY unique_produit_emplacement (produit_id, emplacement_id)
);
```

### 5. CLIENTS
```sql
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(100),
    entreprise VARCHAR(200),
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20),
    adresse TEXT,
    code_postal VARCHAR(10),
    ville VARCHAR(100),
    pays VARCHAR(50) DEFAULT 'Suisse',
    remise_globale DECIMAL(5,2) DEFAULT 0,
    limite_credit DECIMAL(10,2),
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 6. PRIX_CLIENTS
```sql
CREATE TABLE prix_clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    produit_id INT NOT NULL,
    prix_special DECIMAL(10,2) NOT NULL,
    quantite_min INT DEFAULT 1,
    date_debut DATE,
    date_fin DATE,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);
```

### 7. FOURNISSEURS
```sql
CREATE TABLE fournisseurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    contact_nom VARCHAR(100),
    email VARCHAR(150),
    telephone VARCHAR(20),
    adresse TEXT,
    conditions_paiement VARCHAR(100),
    delai_livraison INT DEFAULT 7,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 8. COMMANDES
```sql
CREATE TABLE commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(50) UNIQUE NOT NULL,
    client_id INT NOT NULL,
    date_commande DATE NOT NULL,
    date_livraison_prevue DATE,
    date_livraison_reelle DATE,
    statut ENUM('en_attente', 'confirmee', 'preparee', 'livree', 'annulee') DEFAULT 'en_attente',
    montant_ht DECIMAL(10,2) DEFAULT 0,
    montant_tva DECIMAL(10,2) DEFAULT 0,
    montant_ttc DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

### 9. COMMANDES_ITEMS
```sql
CREATE TABLE commandes_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    tva_taux DECIMAL(5,2) NOT NULL,
    montant_ht DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);
```

### 10. MOUVEMENTS_STOCK
```sql
CREATE TABLE mouvements_stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    emplacement_id INT NOT NULL,
    type_mouvement ENUM('entree', 'sortie', 'transfert', 'inventaire', 'ajustement') NOT NULL,
    quantite INT NOT NULL,
    quantite_avant INT NOT NULL,
    quantite_apres INT NOT NULL,
    reference VARCHAR(100),
    motif VARCHAR(200),
    utilisateur VARCHAR(100),
    date_mouvement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(id),
    FOREIGN KEY (emplacement_id) REFERENCES emplacements(id)
);
```

### 11. CONSIGNES
```sql
CREATE TABLE consignes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    description TEXT,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produits_consignes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    consigne_id INT NOT NULL,
    quantite_consigne INT DEFAULT 1,
    FOREIGN KEY (produit_id) REFERENCES produits(id),
    FOREIGN KEY (consigne_id) REFERENCES consignes(id),
    UNIQUE KEY unique_produit_consigne (produit_id, consigne_id)
);
```

## 📝 Données d'exemple

### Catégories
```sql
INSERT INTO categories (nom, description) VALUES
('Alimentation', 'Produits alimentaires'),
('Boissons', 'Boissons diverses'),
('Hygiène', 'Produits d\'hygiène'),
('Entretien', 'Produits d\'entretien');
```

### Emplacements
```sql
INSERT INTO emplacements (nom, zone, allee, etagere, niveau) VALUES
('A-01-A-1', 'Zone A', '01', 'A', '1'),
('A-01-A-2', 'Zone A', '01', 'A', '2'),
('B-02-B-1', 'Zone B', '02', 'B', '1'),
('FRIGO-01', 'Froid', '01', 'FRIGO', '1');
```

## 🔍 Index recommandés

```sql
-- Index pour les recherches fréquentes
CREATE INDEX idx_produits_code_barre ON produits(code_barre);
CREATE INDEX idx_produits_nom ON produits(nom);
CREATE INDEX idx_stock_produit ON stock(produit_id);
CREATE INDEX idx_stock_alerte ON stock(quantite, seuil_alerte);
CREATE INDEX idx_commandes_client ON commandes(client_id);
CREATE INDEX idx_commandes_date ON commandes(date_commande);
CREATE INDEX idx_mouvements_date ON mouvements_stock(date_mouvement);
```

## 🔐 Utilisateurs et permissions

```sql
-- Créer utilisateur pour l'application
CREATE USER 'logistique_app'@'%' IDENTIFIED BY 'mot_de_passe_fort';
GRANT SELECT, INSERT, UPDATE, DELETE ON logistique_db.* TO 'logistique_app'@'%';
FLUSH PRIVILEGES;
```

## 📊 Vues utiles

### Vue stock avec alertes
```sql
CREATE VIEW vue_stock_alertes AS
SELECT 
    p.nom as produit,
    p.code_barre,
    s.quantite,
    s.seuil_alerte,
    e.nom as emplacement,
    CASE 
        WHEN s.quantite <= s.seuil_alerte THEN 'ALERTE'
        WHEN s.quantite <= (s.seuil_alerte * 1.5) THEN 'ATTENTION'
        ELSE 'OK'
    END as statut
FROM stock s
JOIN produits p ON s.produit_id = p.id
JOIN emplacements e ON s.emplacement_id = e.id
WHERE p.actif = TRUE;
```

---

*Cette structure peut être adaptée selon les besoins spécifiques de l'entreprise*
