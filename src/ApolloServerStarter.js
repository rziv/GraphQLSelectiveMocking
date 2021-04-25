const express = require('express');
const { ApolloServer } = require('apollo-server-express');

async function startApolloServer(settings, port) {
  // Construct a schema, using GraphQL schema language
  const server = new ApolloServer(settings)   
  await server.start();

  const app = express();

  server.applyMiddleware({ app });


  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return { server, app };
}

module.exports = startApolloServer

