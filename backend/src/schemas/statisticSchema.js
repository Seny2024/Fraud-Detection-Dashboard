
// src/schemas/statistcSchema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Statistics {
    queryLabel: String!
    totalTransactions: Int!
    avgTransactionAmount: Float!
    maxTransactionAmount: Float!
    minTransactionAmount: Float!
    totalAmount: Float!
  }

  type Query {
    getStatistics: [Statistics]
  }
`;

module.exports = typeDefs;
