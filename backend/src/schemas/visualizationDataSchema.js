// src/schemas/visualizationDataSchema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type VisualizationData {
    clientId: ID!
    clientName: String!
    totalTransactions: Int!
    totalTransactionAmount: Float!
    avgTransactionAmount: Float!
    maxTransactionAmount: Float!
    minTransactionAmount: Float!
    fraudFlags: [Boolean]!
  }

  type Query {
    getVisualizationData: [VisualizationData]
  }
`;

module.exports = typeDefs;
