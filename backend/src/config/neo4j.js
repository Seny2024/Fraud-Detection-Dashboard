const neo4j = require('neo4j-driver');

// Paramètres de connexion
const NEO4J_URI = process.env.NEO4J_URI || 'bolt://3.239.201.191';
const NEO4J_USERNAME = process.env.NEO4J_USERNAME || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'law-whistle-swimmer';
const NEO4J_DATABASE = process.env.NEO4J_DATABASE || 'neo4j';

// Création du driver Neo4j
const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  { disableLosslessIntegers: true } // Facilite la manipulation des chiffres
);

// Fonction pour obtenir une session
const getSession = () => {
  const session = driver.session({ database: NEO4J_DATABASE });
  return session;
};

module.exports = {
  driver,
  getSession,  // Ajout de la fonction getSession
  database: NEO4J_DATABASE,
};
