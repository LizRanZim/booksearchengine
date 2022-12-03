const express = require('express');
const path = require('path');
//** start Liz added ***
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
//** end Liz added ***

const db = require('./config/connection');
// const routes = require('./routes'); //Liz commented out as it does not exist in example file

const app = express();
const PORT = process.env.PORT || 3001;

//** Liz added */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
//** end Liz added ***

app.use(express.urlencoded({ extended: false })); //in example this is false on activity 22-25 in server.js, Liz matched this
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


//** start Liz added ***
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//** end Liz added ***


// This was in original app Liz commented out because it does not exist in the example
// app.use(routes); 

//This was in original app but Liz commented out because it's duplicated below
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
// });


// ** Liz added > Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);

  //** end Liz added ***