import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AUTH_TOKEN } from './constants';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  AuctionList,
  AuctionForm,
  AuctionPage,
  Login,
  Header,
  Register,
  MyPage,
  EditAuction
} from './components';
import { authenticationService } from './services/authentication.service';

const httpLink = createHttpLink({
  uri: '/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
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

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
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
            <Route path='/auctionform' component={AuctionForm} />
            <Route path='/edit/:id' component={EditAuction} />
            <Route path='/show/:id' component={AuctionPage} />
            <Route path='/login' component={Login} />
            <Route path='/mypage' component={MyPage} />
            <Route path='/register' component={Register} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
