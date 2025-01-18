const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String
    phoneNumber: String
    ssn: String
  }

  type Transaction {
    identity: ID!
    labels: [String!]!
    properties: TransactionProperties!
    elementId: String!
  }

  type TransactionProperties {
    globalStep: Int!
    amount: Float!
    fraud: Boolean!
    step: Int!
    id: String!
    ts: Int!
  }

  type Query {
    getUser(input: UserInput!): User
    getUserTransactions(input: UserInput!): [Transaction]
  }

  input UserInput {
    userId: ID!
  }
`;

module.exports = typeDefs;
