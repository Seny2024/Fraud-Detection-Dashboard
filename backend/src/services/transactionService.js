// src/services/transactionService.js
const neo4j = require('../config/neo4j');

const getTransactions = async (input) => {
  const session = neo4j.getSession();  // Utilisation de la méthode getSession()
  try {
    const result = await session.run(
      `MATCH (u:Client {id: $userId})-[:PERFORMED]->(t:Transaction)
       RETURN t`,
      { userId: input.userId }
    );
    return result.records.map(record => record.get('t').properties);
  } finally {
    await session.close();
  }
};

const getTransactionChain = async (input) => {
  const session = neo4j.getSession();  // Utilisation de la méthode getSession()
  try {
    const result = await session.run(
      `MATCH (t:Transaction {id: $transactionId})-[:NEXT*]->(nextTx:Transaction)
       RETURN nextTx`,
      { transactionId: input.transactionId }
    );
    return result.records.map(record => record.get('nextTx').properties);
  } finally {
    await session.close();
  }
};

module.exports = { getTransactions, getTransactionChain };
