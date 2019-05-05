import express from 'express';
//import graphqlHTTP from'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';
//import schema from './graphql/schemas';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
//import expressGraphQL from 'express-graphql';
import { ApolloServer } from 'apollo-server-express';

const IN_PROD = process.env.NODE_ENV === 'production';
const app = express();

// Allow cross-origin
app.use(cors());

//Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

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
  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}${server.graphqlPath}`)
);
