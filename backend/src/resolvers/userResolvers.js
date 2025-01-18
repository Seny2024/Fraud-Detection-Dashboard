const userService = require('../services/userService');

const resolvers = {
  Query: {
    getUser: async (_, { input }) => {
      return await userService.getUser(input);
    },
    getUserTransactions: async (_, { input }) => {
      return await userService.getUserTransactions(input);
    },
  },
};

module.exports = resolvers;
