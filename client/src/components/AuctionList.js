import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { authenticationService } from '../services/authentication.service';

const GET_AUCTIONS = gql`
  {
    auctions {
      id
      title
      description
      startTime
      seller {
        name
      }
    }
  }
`;

class AuctionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authenticationService.currentUserValue
    };
  }

  /*   componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ user: x })
    );
  }

  componentWillUnmount() {
    authenticationService.currentUser.
  } */

  render() {
    const { user } = this.state;
    return (
      <Query pollInterval={500} query={GET_AUCTIONS}>
        {({ loading, error, data }) => {
          if (loading || error) return 'Loading...';
          /* if (error) return 'Loading...'; */

          return (
            <div className='App'>
              <div className='container'>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h3 className='panel-title'>Kommande Auktioner</h3>

                    {user ? (
                      <h4>
                        <Link to={'/auctionform/'}>Lägg till auktion</Link>
                      </h4>
                    ) : (
                      <p>Logga in för att skapa en auktion</p>
                    )}
                  </div>
                  <div className='panel-body'>
                    <table className='table table-stripe'>
                      <thead>
                        <tr>
                          <th>Titel</th>
                          <th>Beskrivning</th>
                          <th>Starttid</th>
                          <th>Säljare</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.auctions.map((auction, index) => (
                          <tr key={index}>
                            <td>
                              <Link to={`/show/${auction.id}`}>
                                {auction.title}
                              </Link>
                            </td>
                            <td>{auction.description}</td>
                            <td>{auction.startTime}</td>
                            <td>{auction.seller.name}</td>
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

export default AuctionList;
