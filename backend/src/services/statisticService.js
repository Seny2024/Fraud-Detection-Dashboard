const { getSession } = require('../config/neo4j');

const getStatistics = async () => {
    const session = getSession();
    try {
      const result = await session.run(`
        // Analyse des transactions globales
        MATCH (t:Transaction)
        RETURN 
          'Global' AS queryLabel,
          COUNT(t) AS totalTransactions, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount,
          SUM(t.amount) AS totalAmount
        UNION
  
        // Analyse des transactions frauduleuses
        MATCH (t:Transaction)
        WHERE t.fraud = true 
        RETURN
          'Fraudulent' AS queryLabel,
          COUNT(t) AS totalTransactions, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount,
          SUM(t.amount) AS totalAmount
        UNION
  
        // Détection des transactions avec des montants élevés
        MATCH (t:Transaction)
        WITH avg(t.amount) AS avgAmount
        MATCH (t:Transaction)
        WHERE t.amount > 10 * avgAmount
        RETURN
          'High 10 Value AVG' AS queryLabel,
          COUNT(t) AS totalTransactions, 
          AVG(t.amount) AS avgTransactionAmount, 
          MAX(t.amount) AS maxTransactionAmount, 
          MIN(t.amount) AS minTransactionAmount,
          SUM(t.amount) AS totalAmount
        UNION
  
        // Détection de transactions répétées
        MATCH (t1:Transaction)-[:NEXT]->(t2:Transaction)
        WHERE t1.amount = t2.amount 
        RETURN
          'Repeated' AS queryLabel,
          COUNT(t1) AS totalTransactions, 
          COALESCE(AVG(t1.amount), 0) AS avgTransactionAmount, // Remplacer null par 0
          COALESCE(MAX(t1.amount), 0) AS maxTransactionAmount,  // Remplacer null par 0
          COALESCE(MIN(t1.amount), 0) AS minTransactionAmount,  // Remplacer null par 0
          COALESCE(SUM(t1.amount), 0) AS totalAmount           // Remplacer null par 0
      `);
      const statistics = result.records.map(record => record.toObject());
      return statistics;
    } finally {
      await session.close();
    }
  };
  
  module.exports = { getStatistics };
  