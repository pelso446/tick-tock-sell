import express from 'express';
//import graphqlHTTP from'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';
//import schema from './graphql/schemas';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
//import expressGraphQL from 'express-graphql';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { utils } from './graphql/utils';

//Remove
/* 
process.env.NODE_ENV = 'production';
process.env.mongoURI = config.get('mongoURI'); */

const IN_PROD = process.env.NODE_ENV === 'production';
const app = express();

// Allow cross-origin
app.use(cors());

//Bodyparser Middleware
app.use(express.json());

// DB Config
let db = '';
if (IN_PROD) {
  db = process.env.mongoURI;
} else {
  db = config.get('mongoURI');
}

// Connect to MongoDB Atlas
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected... '))
  .catch(err => console.log(err));

/* app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
); */

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD
});

server.applyMiddleware({ app, cors: false });

if (IN_PROD) {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});

// Start all scheduled jobs
utils.scheduleAllAuctions();
