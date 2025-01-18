// src/services_graphql/queriesFraudDetection.js
import { gql } from '@apollo/client';

export const GET_FRAUD_DETECTION = gql`
  query DetectFraud($transactionId: ID!) {
    detectFraud(input: { transactionId: $transactionId }) {
      id
      globalStep
      amount
      fraud
      step
      ts
    }
  }
`;

export const GET_SUSPICIOUS_ENTITIES = gql`
  query DetectSuspiciousEntities {
    detectSuspiciousEntities {
      id
      name
      email
      phoneNumber
      ssn
    }
  }
`;

export const GET_HIGH_RISK_COMMUNITIES = gql`
  query DetectHighRiskCommunities {
    detectHighRiskCommunities {
      clientId
      communityId
    }
  }
`;

export const GET_ANOMALOUS_TRANSACTIONS = gql`
  query DetectAnomalousTransactions {
    detectAnomalousTransactions {
      transactionId
      amount
      avgAmount
    }
  }
`;

export const EXPORT_GRAPH_DATA = gql`
  query ExportGraphData {
    exportGraphData {
      nodes {
        id
        labels
        properties
      }
      edges {
        source
        target
        relationship
      }
    }
  }
`;

export const GET_RAPID_TRANSACTIONS = gql`
  query DetectRapidTransactions {
    detectRapidTransactions {
      transactionId
      rapidCount
    }
  }
`;

export const CREATE_INDEXES = gql`
  mutation CreateIndexes {
    createIndexes
  }
`;
