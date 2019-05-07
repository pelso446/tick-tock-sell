import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AuctionForm from './components/AuctionForm';
import Auction from './components/Auction';
import EditAuction from './components/EditAuction';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import { AUTH_TOKEN } from './constants';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  /*  uri: '/graphql', */
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={App} />
        <Route path='/auctionform' component={AuctionForm} />
        <Route path='/edit/:id' component={EditAuction} />
        <Route path='/show/:id' component={Auction} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
