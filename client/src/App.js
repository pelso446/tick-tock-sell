import React, { Component } from 'react';
import './App.css'; /* 
import Header from './components/Header'; */
import 'bootstrap/dist/css/bootstrap.min.css';
/* import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateAuction from './components/CreateAuction';
import AuctionList from './components/AuctionList';
import Auction from './components/Auction'; */
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_AUCTIONS = gql`
  {
    auctions {
      title
      description
      startTime
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query pollInterval={5000} query={GET_AUCTIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className='App'>
              <div className='container'>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h3 className='panel-title'>LIST OF AUCTIONS</h3>
                    <h4>
                      <Link to='/auctionform'>Add Auction</Link>
                    </h4>
                  </div>
                  <div className='panel-body'>
                    <table className='table table-stripe'>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Start time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.auctions.map((auction, index) => (
                          <tr key={index}>
                            <td>
                              <Link to={`/show/${auction._id}`}>
                                {auction.title}
                              </Link>
                            </td>
                            <td>{auction.description}</td>
                            <td>{auction.startTime}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
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
