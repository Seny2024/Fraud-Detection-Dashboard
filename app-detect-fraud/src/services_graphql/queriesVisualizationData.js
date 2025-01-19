// src/services_graphql/queriesVisualizationData.js
import { gql } from '@apollo/client';

export const GET_VISUALIZATION_DATA = gql`
  query GetVisualizationData {
    getVisualizationData {
      clientId
      clientName
      totalTransactions
      totalTransactionAmount
      avgTransactionAmount
      maxTransactionAmount
      minTransactionAmount
      fraudFlags
    }
  }
`;
