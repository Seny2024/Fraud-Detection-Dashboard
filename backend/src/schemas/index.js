// src/schemas/index.js
const { gql } = require('apollo-server');
const fraudSchema = require('./fraudSchema');
const transactionSchema = require('./transactionSchema');
const userSchema = require('./userSchema');
const summarySchema = require('./summarySchema');
const statisticSchema = require('./statisticSchema');
const visualizationDataSchema = require('./visualizationDataSchema');


const typeDefs = gql`
  ${fraudSchema}
  ${transactionSchema}
  ${userSchema}
  ${summarySchema}
  ${statisticSchema}
  ${visualizationDataSchema}
`;

module.exports = typeDefs;
