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
import { authenticationService } from './services/authentication.service';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const userToken = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  return {
    headers: {
      ...headers,
      authorization: userToken.token ? `Bearer ${userToken.token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ user: x })
    );
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Header />
            <Route exact path='/' component={AuctionList} />
            <Route path='/auctionform/:id' component={AuctionForm} />
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
