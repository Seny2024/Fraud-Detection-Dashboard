// src/services_graphql/queriesUserTransactions.js
import { gql } from '@apollo/client';

export const GET_TRANSACTION_BY_ID = gql`
  query GetTransactionById($transactionId: ID!) {
    getTransactionById(input: { transactionId: $transactionId }) {
      id
      amount
      fraud
      step
      globalStep
      ts
      labels
    }
  }
`;

export const GET_TRANSACTION_CHAIN = gql`
  query GetTransactionChain($transactionId: ID!) {
    getTransactionChain(input: { transactionId: $transactionId }) {
      id
      amount
      fraud
      step
      globalStep
      ts
      labels
    }
  }
`;
