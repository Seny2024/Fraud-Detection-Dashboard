const transactionService = require('../services/transactionService');

const resolvers = {
  Query: {
    getTransactions: async (_, { input }) => {
      return await transactionService.getTransactions(input);
    },
    getTransactionChain: async (_, { input }) => {
      return await transactionService.getTransactionChain(input);
    },
  },
};

module.exports = resolvers;
