// src/services/transactionService.js
const neo4j = require('../config/neo4j');

const getTransactionById = async (input) => {
  const session = neo4j.getSession();
  try {
    const result = await session.run(
      `MATCH (t:Transaction {id: $transactionId})
       RETURN t`,
      { transactionId: input.transactionId }
    );
    if (result.records.length > 0) {
      const transaction = result.records[0].get('t');
      return {
        id: transaction.properties.id,
        amount: transaction.properties.amount,
        fraud: transaction.properties.fraud,
        step: transaction.properties.step,
        globalStep: transaction.properties.globalStep,
        ts: transaction.properties.ts,
        labels: transaction.labels
      };
    } else {
      return null; // Si aucune transaction n'est trouvée
    }
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
    return result.records.map(record => {
      const transaction = record.get('nextTx');
      return {
        id: transaction.properties.id,
        amount: transaction.properties.amount,
        fraud: transaction.properties.fraud,
        step: transaction.properties.step,
        globalStep: transaction.properties.globalStep,
        ts: transaction.properties.ts,
        labels: transaction.labels
      };
    });
  } finally {
    await session.close();
  }
};

module.exports = { getTransactionById, getTransactionChain };
