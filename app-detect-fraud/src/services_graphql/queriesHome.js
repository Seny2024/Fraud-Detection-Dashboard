// src/services_graphql/queriesHome.js
import { gql } from '@apollo/client';

export const GET_SUMMARY = gql`
  query GetSummary {
    getSummary {
      queryType
      count
      details
    }
  }
`;

export const GET_STATISTICS = gql`
  query GetStatistics {
    getStatistics {
      queryLabel
      totalTransactions
      avgTransactionAmount
      maxTransactionAmount
      minTransactionAmount
      totalAmount
    }
  }
`;
