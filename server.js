const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const schema = require('./schema');

const app = express();

// Allow cross-origin
app.use(cors());

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
  graphqlHTTP({
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
