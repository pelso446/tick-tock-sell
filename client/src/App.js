import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateAuction from './components/CreateAuction';
import AuctionList from './components/AuctionList';
import Auction from './components/Auction';

class App extends Component {
  render() {
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
}

export default App;
