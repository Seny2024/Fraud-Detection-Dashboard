// src/schemas/transactionSchema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Transaction {
    id: ID!
    amount: Float!
    fraud: Boolean!
    step: Int!
    globalStep: Int!
    ts: Int!
    labels: [String]!
  }

  type Query {
    getTransactionChain(input: TransactionInput!): [Transaction]
    getTransactionById(input: TransactionInput!): Transaction
  }

  input TransactionInput {
    transactionId: ID
  }
`;

module.exports = typeDefs;
