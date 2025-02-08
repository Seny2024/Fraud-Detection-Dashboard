# HelpPage - Système de Détection de Fraude

Ce projet est une interface utilisateur d'aide pour un système de détection de fraude. Il fournit un guide des fonctionnalités essentielles permettant d'analyser les transactions suspectes à l'aide d'algorithmes de graphes et de détection d'anomalies.

## Fonctionnalités Principales

### 1. Détection de Transactions Frauduleuses
- Identification des transactions suspectes basées sur leur **fréquence élevée** dans un court laps de temps.

### 2. Visualisation des Réseaux de Transactions
- Cartographie des interactions entre **entités et transactions** (maximum **200 nœuds et relations**).

### 3. Détection de Communautés (Louvain)
- Segmentation des clients selon des comportements similaires en utilisant l'algorithme **Louvain**.

### 4. Analyse des Transactions Anormales
- Identification des transactions dont le **montant dépasse la moyenne globale**.

### 5. Création et Analyse du Graphe "suspiciousGraph"
- Construction d’un graphe des relations clients et exécution de l’algorithme **PageRank** pour détecter les entités centrales.

### 6. Suivi des Transactions Suspectes
- Analyse des relations entre transactions pour identifier des **chaînes de fraude**.

### 7. Analyse Avancée des Transactions
- Statistiques globales, transactions frauduleuses, montants élevés, transactions répétées.

### 8. Analyse des Éléments Clés et Anomalies du Graphe
- Étude des **nœuds, relations et transactions suspectes**.

### 9. Récupération des Transactions Liées
- Extraction des transactions passées d’un **client** ou d’une **transaction spécifique**.

## Technologies Utilisées
- **React.js** (Interface utilisateur)
- **Neo4j / Graph Data Science** (Analyse des transactions et détection de fraude)
- **Graphes et Algorithmes** (Louvain, PageRank, etc.)

## Contribution
Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations.

---

Ce système offre une **analyse avancée des comportements frauduleux** à l'aide d'**algorithmes de graphes et de détection d'anomalies**. 🚀

