const { gql } = require('apollo-server');

const typeDefs = gql`
  type FraudDetection {
    id: ID!
    globalStep: Int!
    amount: Float!
    fraud: Boolean!
    step: Int!
    ts: Int!
  }

  type SuspiciousEntity {
    id: ID
    name: String!
    email: String
    phoneNumber: String
    ssn: String
  }

  type CommunityRisk {
    clientId: ID!
    communityId: String!
  }

  type AnomalousTransaction {
    transactionId: ID!
    rapidCount: Int!
    amount: Float
    avgAmount: Float
  }
  
  type RapidTransaction {
    transactionId: ID!
    rapidCount: Int!
  }

  type GraphData {
    nodes: [GraphNode]
    edges: [GraphEdge]
  }

  type GraphNode {
    id: ID!
    labels: [String]
    properties: String!
  }

  type GraphEdge {
    source: ID!
    target: ID!
    relationship: String!
  }

  type Query {
    detectFraud(input: FraudInput!): FraudDetection
    detectSuspiciousEntities: [SuspiciousEntity]
    detectHighRiskCommunities: [CommunityRisk]
    detectAnomalousTransactions: [AnomalousTransaction]
    detectRapidTransactions: [RapidTransaction] 
    exportGraphData: GraphData
  }

  type Mutation {
    createIndexes: Boolean
  }

  input FraudInput {
    transactionId: ID!
  }
`;

module.exports = typeDefs;
