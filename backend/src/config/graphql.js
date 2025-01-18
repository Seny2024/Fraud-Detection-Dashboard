// src/config/graphql.js
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('../schemas');
const resolvers = require('../resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    // Ajouter des informations de contexte si nécessaire
  }),
});

module.exports = server;
