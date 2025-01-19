const { getSession } = require('../config/neo4j');

const getVisualizationData = async () => {
    const session = getSession();
    try {
      const result = await session.run(`
        // Analyse des transactions par client
        MATCH (c:Client)-[r]->(t:Transaction)
        RETURN 
          c.id AS clientId, 
          c.name AS clientName, 
          COUNT(t) AS totalTransactions, 
          SUM(t.amount) AS totalTransactionAmount, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount, 
          COLLECT(DISTINCT t.fraud) AS fraudFlags
        UNION
  
        // Analyse des clients avec transactions frauduleuses
        MATCH (c:Client)-[r]->(t:Transaction)
        WHERE t.fraud = true
        RETURN 
          c.id AS clientId, 
          c.name AS clientName, 
          COUNT(t) AS totalTransactions, 
          SUM(t.amount) AS totalTransactionAmount, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount, 
          COLLECT(DISTINCT t.fraud) AS fraudFlags
        UNION
  
        // Détection des clients avec des transactions à haute valeur
        MATCH (c:Client)-[r]->(t:Transaction)
        WHERE t.amount > 10000
        RETURN 
          c.id AS clientId, 
          c.name AS clientName, 
          COUNT(t) AS totalTransactions, 
          SUM(t.amount) AS totalTransactionAmount, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount, 
          COLLECT(DISTINCT t.fraud) AS fraudFlags
      `);
  
      // Transformation des données obtenues pour obtenir un format plus utilisable dans la suite
      const visualizationData = result.records.map(record => {
        return {
          clientId: record.get('clientId'),
          clientName: record.get('clientName'),
          totalTransactions: record.get('totalTransactions'),
          totalTransactionAmount: record.get('totalTransactionAmount'),
          avgTransactionAmount: record.get('avgTransactionAmount'),
          maxTransactionAmount: record.get('maxTransactionAmount'),
          minTransactionAmount: record.get('minTransactionAmount'),
          fraudFlags: record.get('fraudFlags') ? record.get('fraudFlags').map(fraud => fraud === true) : [],
        };
      });
  
      return visualizationData;
    } finally {
      await session.close();
    }
  };
  
  module.exports = { getVisualizationData };
  