// src/resolvers/transactionResolvers.js
const { getTransactionById, getTransactionChain } = require('../services/transactionService');

const resolvers = {
  Query: {
    getTransactionChain: async (_, { input }) => {
      return getTransactionChain(input);
    },
    
    getTransactionById: async (_, { input }) => {
      return getTransactionById(input);
    }
  }
};

module.exports = resolvers;
