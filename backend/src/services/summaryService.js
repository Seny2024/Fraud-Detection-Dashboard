const { getSession } = require('../config/neo4j');

const getSummary = async () => {
  const session = getSession();
  try {
    const result = await session.run(`
      // Analyse des nœuds et des types de labels
      MATCH (n)
      RETURN 
        'NodeAnalysis' AS queryType,
        COUNT(n) AS count,
        COLLECT(DISTINCT labels(n)) AS details
      UNION

      // Analyse des types de relations
      MATCH ()-[r]->()
      RETURN 
        'RelationshipAnalysis' AS queryType,
        COUNT(r) AS count,
        COLLECT(DISTINCT TYPE(r)) AS details
      UNION

      // Analyse des nœuds frauduleux
      MATCH (n)
      WHERE n.fraud = true
      RETURN
        'FraudNodeAnalysis' AS queryType,
        COUNT(n) AS count,
        COLLECT(DISTINCT labels(n)) AS details
      UNION

      // Détection des transactions suspectes
      MATCH (t:Transaction)
      WITH avg(t.amount) AS avgAmount
      MATCH (t:Transaction)
      WHERE t.amount > 10 * avgAmount
      RETURN
        'High10AvgTransactionAnalysis' AS queryType,
        COUNT(t) AS count,
        COLLECT(DISTINCT t.id) AS details
    `);

    const summary = result.records.map(record => {
      const details = record.get('details');
      return {
        queryType: record.get('queryType'),
        count: record.get('count'),
        details: details // directement retourner les données sous forme de JSON
      };
    }).filter(item => item.count !== null);
    
    return summary;
  } finally {
    await session.close();
  }
};

module.exports = { getSummary };
