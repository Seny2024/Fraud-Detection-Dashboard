const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar JSON

  type Summary {
    queryType: String!
    count: Int!
    details: JSON!
  }

  type Query {
    getSummary: [Summary]
  }
`;

module.exports = typeDefs;
