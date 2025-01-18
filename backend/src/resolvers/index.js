// src/resolvers/index.js
const fraudResolvers = require('./fraudResolvers');
const transactionResolvers = require('./transactionResolvers');
const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    ...fraudResolvers.Query,
    ...transactionResolvers.Query,
    ...userResolvers.Query,
  },
};

module.exports = resolvers;
