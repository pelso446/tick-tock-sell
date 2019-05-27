import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import { authenticationService } from '../services/authentication.service';
import { Form } from 'reactstrap';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const GET_AUCTION = gql`
  query getAuctions($sellerID: ID!) {
    auctions(sellerID: $sellerID) {
      id
      title
      description
      startTime
      auctionFinished
    }
  }
`;

const GET_ITEMS = gql`
  query {
    items {
      id
      price
      description
      title
      highestBid {
        amount
        bidder {
          id
        }
      }
    }
  }
`;

const DELETE_AUCTION = gql`
  mutation deleteAuction($auctionID: ID!) {
    deleteAuction(auctionID: $auctionID) {
      id
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

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authenticationService.currentUserValue
    };
  }

  render() {
    const { user } = this.state;
    const sellerID = user.user.id;
    return (
      <Query query={GET_ITEMS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;
          return (
            <Query query={GET_AUCTION} variables={{ sellerID: sellerID }}>
              {({ loading, error, data: { auctions }, refetch }) => {
                if (loading) return <Loader />;
                if (error) return `Error! ${error.message}`;

                return (
                  <Mutation mutation={DELETE_AUCTION}>
                    {(deleteAuction, { loading, error }) => (
                      <div>
                        <Form>
                          <div className='App'>
                            <div className='container'>
                              <div className='panel panel-default'>
                                <div className='panel-heading'>
                                  <h3 className='panel-title'>
                                    Mina Auktioner
                                  </h3>
                                </div>
                                <div className='panel-body'>
                                  <table className='table table-stripe'>
                                    <thead>
                                      <tr>
                                        <th>Titel</th>
                                        <th>Beskrivning</th>
                                        <th>Starttid</th>
                                        <th />
                                      </tr>
                                    </thead>
                                    {{ auctions }.auctions.map(
                                      (auction, index) => (
                                        <tbody>
                                          {!auction.auctionFinished ? (
                                            <tr key={auction.id}>
                                              <td>{auction.title}</td>
                                              <td>{auction.description}</td>
                                              <td>
                                                <Time
                                                  timestamp={auction.startTime}
                                                />
                                              </td>
                                              <td>
                                                <Button
                                                  color='danger'
                                                  onClick={() =>
                                                    deleteAuction({
                                                      variables: {
                                                        auctionID: auction.id
                                                      }
                                                    }).then(() => refetch())
                                                  }
                                                >
                                                  Ta bort auktion
                                                </Button>
                                              </td>
                                            </tr>
                                          ) : auction.auctionFinished ? (
                                            <tr key={auction.id}>
                                              <td>{auction.title}</td>
                                              <td>{auction.description}</td>
                                              <td>
                                                <Time
                                                  timestamp={auction.startTime}
                                                />
                                              </td>
                                              <td>
                                                <Link
                                                  to={`/myauctions/${
                                                    auction.id
                                                  }`}
                                                >
                                                  <Button color='info'>
                                                    Visa avslutad auktion
                                                  </Button>
                                                </Link>
                                              </td>
                                            </tr>
                                          ) : (
                                            ''
                                          )}
                                        </tbody>
                                      )
                                    )}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                        <div className='App'>
                          <div className='container'>
                            <div className='panel panel-default'>
                              <div className='panel-heading'>
                                <h3 className='panel-title'>
                                  Mina vunna budgivningar
                                </h3>
                              </div>
                              <div className='panel-body'>
                                <table className='table table-stripe'>
                                  <thead>
                                    <tr>
                                      <th>Titel</th>
                                      <th>Beskrivning</th>
                                      <th>Ursprungspris</th>
                                      <th>Slutpris</th>
                                    </tr>
                                  </thead>
                                  {data.items.map((item, index) => {
                                    if (item.highestBid != null) {
                                      if (
                                        item.highestBid.bidder.id ===
                                        user.user.id
                                      ) {
                                        return (
                                          <tbody>
                                            <tr key={item.id}>
                                              <td>{item.title}</td>
                                              <td>{item.description}</td>
                                              <td>{item.price}</td>
                                              <td>{item.highestBid.amount}</td>
                                            </tr>
                                          </tbody>
                                        );
                                      }
                                    }
                                    return null;
                                  })}
                                </table>
                                <div> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Mutation>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default MyPage;
