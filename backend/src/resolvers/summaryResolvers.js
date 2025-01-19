// src/resolvers/transactionResolvers.js
const { getSummary } = require('../services/summaryService');
const { getStatistics } = require('../services/statisticService');
const { getVisualizationData } = require('../services/visualizationDataService');

const resolvers = {
  Query: {
    getSummary: async () => {
      return getSummary();
    },
    getStatistics: async () => {
        return getStatistics();
    },

    getVisualizationData: async () => {
      return getVisualizationData();
    }
  }
};

module.exports = resolvers;
