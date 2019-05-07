import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { AUTH_TOKEN } from './constants';
import {
  AuctionList,
  AuctionForm,
  Auction,
  Login,
  Header,
  Register,
  EditAuction
} from './components';
/* 
import AuctionForm from './components/AuctionForm';
import Auction from './components/Auction';
import EditAuction from './components/EditAuction';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register'; */

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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Header />
            <Route exact path='/' component={AuctionList} />
            <Route path='/auctionform' component={AuctionForm} />
            <Route path='/edit/:id' component={EditAuction} />
            <Route path='/show/:id' component={Auction} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

/*   render() {
    return (
      <Router>
      <div className='App'>     
          <Header />
          <Route exact path="/" component={AuctionList} />
          <Route exact path="/CreateAuction" component={CreateAuction} />    
          <Route exact path="/Auction" component={Auction} />  
      </div>
      </Router>
    );
  }
} */
