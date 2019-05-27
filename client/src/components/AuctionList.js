import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { authenticationService } from '../services/authentication.service';
import Loader from './Loader';

const GET_AUCTIONS = gql`
  {
    auctions {
      id
      auctionFinished
      title
      description
      startTime
      seller {
        name
      }
    }
  }
`;

function Time(props) {
  const time = new Date(parseInt(props.timestamp));
  return (
    <div>
      {time
        .toLocaleTimeString()
        .toString()
        .substr(0, 5) +
        ', ' +
        time.toLocaleDateString().toString()}
    </div>
  );
}

class AuctionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authenticationService.currentUserValue
    };
  }

  render() {
    const { user } = this.state;
    return (
      <Query pollInterval={5000} query={GET_AUCTIONS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;

          return (
            <div className='App' style={{ margin: '0 5em' }}>
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
                    {data.auctions.map((auction, index) => {
                      if (auction.auctionFinished === false) {
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`/show/${auction.id}`}>
                                {auction.title}
                              </Link>
                            </td>
                            <td>{auction.description}</td>
                            <td>
                              <Time timestamp={auction.startTime} />
                            </td>
                            <td>{auction.seller.name}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AuctionList;
