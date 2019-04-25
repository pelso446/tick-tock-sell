import express from 'express';
//import graphqlHTTP from'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';
import schema from './graphql/schemas';
import expressGraphQL from 'express-graphql';

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
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected... '))
  .catch(err => console.log(err));

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
