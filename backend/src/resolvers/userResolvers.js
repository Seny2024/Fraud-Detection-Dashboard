const { getUser, getUserTransactions } = require('../services/userService');

const resolvers = {
  Query: {
    getUser: async (_, { input }) => {
      return await getUser(input);
    },
    getUserTransactions: async (_, { input }) => {
      return await getUserTransactions(input);
    }
  }
};

module.exports = resolvers;
