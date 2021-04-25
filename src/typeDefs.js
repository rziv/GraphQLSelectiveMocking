const {gql}  = require('apollo-server-express');

const typeDefs = gql`
  
  type Citizen {
    id: Int!
    firstName: String
    lastName: String     
    status: CitizenshipStatus
  }  

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    citizen(id: Int!): Citizen,
    citizens(status: CitizenshipStatus): [Citizen]
  }  

  enum CitizenshipStatus { 	PERMANENT TEMPORARY FOREIGNER }
`;

module.exports = typeDefs