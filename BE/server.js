require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const connection = require('./db.js');
const { auth } = require('./Middleware/auth.middleware.js');
const typeDefs = require('./schemas/typeDef.js');
const resolvers = require('./schemas/resolvers.js');
const cors = require('cors')
//const { consumeCreateLecture,consumeCreateAssignment } = require('./utils/consumerabbitmq.js');
const PORT = process.env.PORT || 3000;

const {app,server} = require('./socket')

const Apolloserver = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: auth,
});
app.use(cors())
app.use(express.json());
//consumeCreateLecture();
//consumeCreateAssignment()
const startApolloServer = async () => {
  try {
    await Apolloserver.start();
    Apolloserver.applyMiddleware({ app });
    
    server.listen(PORT, async () => {
      await connection;
      console.log('Connected to the database');
      console.log(`API Apolloserver running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${Apolloserver.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
  }
};

startApolloServer();
 