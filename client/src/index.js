import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateAuction from './components/CreateAuction';
import Auction from './components/Auction';
import EditAuction from './components/EditAuction';

const client = new ApolloClient();
ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/create' component={CreateAuction} />
                <Route path='/edit/:id' component={EditAuction} />
                <Route path='/show/:id' component={Auction} />
            </div>
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
