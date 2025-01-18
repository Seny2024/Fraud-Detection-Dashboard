const fraudService = require('../services/fraudService');

const resolvers = {
  Query: {
    detectFraud: async (_, { input }) => {
      return await fraudService.detectFraud(input);
    },
    detectSuspiciousEntities: async () => {
      return await fraudService.detectSuspiciousEntities();
    },
    detectHighRiskCommunities: async () => {
      return await fraudService.detectHighRiskCommunities();
    },
    detectAnomalousTransactions: async () => {
      return await fraudService.detectAnomalousTransactions();
    },
    detectRapidTransactions: async () => {  // Ajoutez cette ligne pour appeler la fonction
      return await fraudService.detectRapidTransactions();
    },
    exportGraphData: async () => {
      return await fraudService.exportGraphData();
    },
  },
};

module.exports = resolvers;
