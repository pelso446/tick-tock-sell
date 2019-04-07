import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateAuction from './components/CreateAuction';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Header />
          <Route exact path='/CreateAuction' component={CreateAuction} />
        </Router>
      </div>
    );
  }
}

export default App;
