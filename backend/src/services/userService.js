const { getSession } = require('../config/neo4j');

const getUser = async (input) => {
  const session = getSession();
  try {
    // Requête Cypher pour récupérer les informations de l'utilisateur
    const result = await session.run(
      `MATCH (u:Client {id: $userId})
        OPTIONAL MATCH (u)-[:HAS_EMAIL]->(e:Email)
        OPTIONAL MATCH (u)-[:HAS_PHONE]->(p:Phone)
        OPTIONAL MATCH (u)-[:HAS_SSN]->(s:SSN)
        RETURN u.id AS userId, u.name AS name, e.email AS email, p.phoneNumber AS phoneNumber, s.ssn AS ssn`,
      { userId: input.userId } 
    );
    
    // Si un utilisateur est trouvé, on retourne ses propriétés, sinon on retourne null
    if (result.records.length > 0) {
      const record = result.records[0];
      return {
        id: record.get('userId'),
        name: record.get('name'),
        email: record.get('email') || null,
        phoneNumber: record.get('phoneNumber') || null,
        ssn: record.get('ssn') || null,
      };
    }
    return null; // Si aucun utilisateur n'est trouvé
  } finally {
    await session.close(); // Fermeture de la session
  }
}; 

const getUserTransactions = async (input) => {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (u:Client {id: $userId})-[:PERFORMED]->(t:Transaction)
       RETURN t`,
      { userId: input.userId }
    );

    // Ajoutez des logs pour vérifier les données retournées
    console.log(result.records);

    return result.records.map(record => {
      const transaction = record.get('t');
      return {
        identity: transaction.identity,
        labels: transaction.labels,
        properties: transaction.properties,
        elementId: transaction.elementId
      };
    });
  } finally {
    await session.close();
  }
};

module.exports = { getUser, getUserTransactions };
