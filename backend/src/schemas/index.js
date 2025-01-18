// src/schemas/index.js
const { gql } = require('apollo-server');
const fraudSchema = require('./fraudSchema');
const transactionSchema = require('./transactionSchema');
const userSchema = require('./userSchema');

const typeDefs = gql`
  ${fraudSchema}
  ${transactionSchema}
  ${userSchema}
`;

module.exports = typeDefs;
