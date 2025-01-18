// queries.js
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(input: { userId: $userId }) {
      id
      name
      email
      phoneNumber
      ssn
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($userId: ID!) {
    getUserTransactions(input: { userId: $userId }) {
      identity
      labels
      properties {
        globalStep
        amount
        fraud
        step
        id
        ts
      }
      elementId
    }
  }
`;
