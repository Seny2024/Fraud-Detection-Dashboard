const { getSession } = require('../config/neo4j');

// Fonction de détection de fraude
const detectFraud = async (input) => {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (t:Transaction {id: $transactionId})-[:NEXT*]->(suspect:Transaction)
       RETURN suspect.id AS id, suspect.globalStep AS globalStep, suspect.amount AS amount, suspect.fraud AS fraud, suspect.step AS step, suspect.ts AS ts`,
      { transactionId: input.transactionId }
    );
    const records = result.records.map(record => ({
      id: record.get('id'),
      globalStep: record.get('globalStep'),
      amount: record.get('amount'),
      fraud: record.get('fraud'),
      step: record.get('step'),
      ts: record.get('ts'),
    }));
    if (records.length > 0) {
      return records[0]; // Retourne le premier résultat si plusieurs sont trouvés
    }
    return null; // Retourne null si aucun résultat n'est trouvé
  } finally {
    await session.close();
  }
};

// Fonction de détection des entités suspectes
const detectSuspiciousEntities = async () => {
  const session = getSession();
  try {
    // Vérification si le graphe existe déjà
    const graphExists = await session.run(`
      CALL gds.graph.exists('suspiciousGraph') YIELD exists
      RETURN exists
    `);

    const exists = graphExists.records[0].get('exists');

    if (!exists) {
      await session.run(`
        CALL gds.graph.project(
          'suspiciousGraph',
          ['Client', 'Email', 'Phone', 'SSN'],
          ['HAS_EMAIL', 'HAS_PHONE', 'HAS_SSN']
        )
      `);
    }

    // Application de l'algorithme PageRank
    await session.run(`
      CALL gds.pageRank.write(
        'suspiciousGraph',
        {
          writeProperty: 'pageRank',
          maxIterations: 20,
          dampingFactor: 0.85
        }
      )
    `);

    // Récupération des entités suspectes
    const result = await session.run(`
      MATCH (c:Client)
      WHERE c.pageRank > 0.01
      OPTIONAL MATCH (c)-[:HAS_EMAIL]->(e:Email)
      OPTIONAL MATCH (c)-[:HAS_PHONE]->(p:Phone)
      OPTIONAL MATCH (c)-[:HAS_SSN]->(s:SSN)
      RETURN 
        c.id AS id, 
        c.name AS name, 
        e.email AS email, 
        p.phoneNumber AS phoneNumber, 
        s.ssn AS ssn
    `);

    return result.records.map(record => ({
      id: record.get('id'),
      name: record.get('name'),
      email: record.get('email') || 'Non spécifié',
      phoneNumber: record.get('phoneNumber') || 'Non spécifié',
      ssn: record.get('ssn') || 'Non spécifié',
    }));
  } catch (error) {
    console.error('Error detecting suspicious entities:', error);
    throw error;
  } finally {
    await session.close();
  }
};

// Fonction de détection des communautés à haut risque
const detectHighRiskCommunities = async () => {
  const session = getSession();
  try {
    await session.run(`
      CALL gds.louvain.write(
        'suspiciousGraph',
        {
          writeProperty: 'communityId',
          maxIterations: 10
        }
      )
    `);

    const result = await session.run(`
      MATCH (c:Client)
      WHERE c.communityId IS NOT NULL
      RETURN c.id AS clientId, c.communityId AS communityId
    `);

    return result.records.map(record => ({
      clientId: record.get('clientId'),
      communityId: record.get('communityId'),
    }));
  } finally {
    await session.close();
  }
};

// Fonction de détection des transactions anormales
const detectAnomalousTransactions = async () => {
  const session = getSession();
  try {
    const result = await session.run(`
      MATCH (t:Transaction)
        WITH avg(t.amount) AS avgAmount
        MATCH (t:Transaction)
        WHERE t.amount > avgAmount
        RETURN t.id AS transactionId, t.amount AS amount, avgAmount
        LIMIT 10;

    `);

    return result.records.map(record => ({
      transactionId: record.get('transactionId'),
      amount: record.get('amount'),
      avgAmount: record.get('avgAmount'),
    }));
  } finally {
    await session.close();
  }
};



const exportGraphData = async () => {
  const session = getSession();
  try {
    const nodes = await session.run(`
      MATCH (n)
      RETURN n.id AS id, labels(n) AS labels, properties(n) AS properties limit 200
    `);

    const edges = await session.run(`
      MATCH (n)-[r]->(m)
      RETURN n.id AS source, m.id AS target, type(r) AS relationship limit 200
    `);

    return {
      nodes: nodes.records.map(record => ({
        id: record.get('id'),
        labels: record.get('labels'),
        properties: JSON.stringify(record.get('properties')), // Convertir les propriétés en chaîne JSON
      })),
      edges: edges.records.map(record => ({
        source: record.get('source'),
        target: record.get('target'),
        relationship: record.get('relationship'),
      })),
    };
  } finally {
    await session.close();
  }
};




// Fonction de détection des transactions rapides
const detectRapidTransactions = async () => {
  const session = getSession();
  try {
    const result = await session.run(`
      MATCH (t:Transaction)-[:NEXT*]->(next:Transaction)
      WHERE duration.between(
        datetime({epochMillis: t.ts * 1000}),
        datetime({epochMillis: next.ts * 1000})
      ).minutes < 10
      WITH t, COUNT(next) AS rapidCount
      WHERE rapidCount > 5
      RETURN t.id AS transactionId, rapidCount
    `);

    return result.records.map(record => ({
      transactionId: record.get('transactionId'),
      rapidCount: record.get('rapidCount'),
    }));
  } finally {
    await session.close();
  }
};

// Création des index pour améliorer les performances
const createIndexes = async () => {
  const session = getSession();
  try {
    await session.run(`
      CREATE INDEX FOR (t:Transaction) ON (t.id);
      CREATE INDEX FOR (c:Client) ON (c.pageRank);
    `);
    return true; // Retourne true pour indiquer que les indexes ont été créés avec succès
  } finally {
    await session.close();
  }
};

module.exports = { 
  detectRapidTransactions, 
  exportGraphData, 
  detectAnomalousTransactions, 
  detectFraud, 
  detectSuspiciousEntities, 
  detectHighRiskCommunities, 
  createIndexes 
};
