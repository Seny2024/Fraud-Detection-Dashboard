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
    getTransactions(input: TransactionInput!): [Transaction]
    getTransactionChain(input: TransactionInput!): [Transaction]
  }

  input TransactionInput {
    userId: ID!
    transactionId: ID
  }
`;

module.exports = typeDefs;
