const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
//the  IDs shouls be read dynamically (from file system or env vars) in real scenario
const mocks = require('./mocks')
const startApolloServer = require('./ApolloServerStarter')

//Start GraphQL without mocks on port 4006
startApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req, res }) => ({
    req,
    res,
    mocks:false
  })
}, 4006)



//Start GraphQL without mocks on port 4005
startApolloServer({ 
  typeDefs, 
  mocks
}, 4005)