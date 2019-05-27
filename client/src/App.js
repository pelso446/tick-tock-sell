import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { split, ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
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
  MyAuctions,
  EditAuction
} from './components';
import { authenticationService } from './services/authentication.service';

let wsUrl = '';
let httpUrl = '';
if (window.location.host === 'localhost:3000') {
  httpUrl = 'http://localhost:5000/graphql';
  wsUrl = 'ws://localhost:5000/graphql';
} else {
  httpUrl = `https://${window.location.host}/graphql`;
  wsUrl = `wss://${window.location.host}/graphql`;
}

const httpLink = createHttpLink({
  uri: httpUrl,
  fetch
});

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true
  }
});

const userToken = JSON.parse(localStorage.getItem(AUTH_TOKEN));
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken.token}` : ''
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
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
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
            <Route path='/myauctions/:id' component={MyAuctions} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
