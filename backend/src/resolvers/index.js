// src/resolvers/index.js
const fraudResolvers = require('./fraudResolvers');
const transactionResolvers = require('./transactionResolvers');
const userResolvers = require('./userResolvers');
const summaryResolvers = require('./summaryResolvers');

const resolvers = {
  Query: {
    ...fraudResolvers.Query,
    ...transactionResolvers.Query,
    ...userResolvers.Query,
    ...summaryResolvers.Query,
  },
};

module.exports = resolvers;
