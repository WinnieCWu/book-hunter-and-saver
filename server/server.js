const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

// const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

 // Serve up static assets
 if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
//wildcard Get route for server; respond with React front code if requested location not explicitly defined
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
  
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  // server.listen().then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`);
  // });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
    })
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
