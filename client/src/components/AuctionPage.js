import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation, Subscription } from 'react-apollo';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { authenticationService } from '../services/authentication.service';

const GET_AUCTION = gql`
  query GetAuction($id: ID!) {
    auction(id: $id) {
      id
      title
      description
      startTime
      items {
        id
        title
        description
        price
        highestBid {
          amount
          bidder {
            name
          }
        }
      }
    }
  }
`;

const PUT_BID = gql`
  mutation putBid($itemID: ID!, $bidderID: ID!, $amount: Int!) {
    putBid(itemID: $itemID, bidderID: $bidderID, amount: $amount) {
      item {
        title
      }
    }
  }
`;

const BID_SUBSCRIPTION = gql`
  subscription{
    bidAdded {
      id
    }
  }
`;

class AuctionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: authenticationService.currentUserValue
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let amount;
    const { user } = this.state;
    const auctionID = this.props.match.params.id;
    return (
      <Query query={GET_AUCTION} variables={{ id: auctionID }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <div>
                <Subscription subscription={BID_SUBSCRIPTION}>
                  {({ data, loading  }) => (
                    <h4>New comment: {!loading && data.bidAdded ? data.bidAdded.id : 'tomt'}</h4>
                  )}
                </Subscription>
              </div>
              <div className='App'>
                <div className='container'>
                  <div className='panel panel-default'>
                    <div className='panel-heading'>
                      <h3 className='panel-title'>{data.auction.title}</h3>
                    </div>
                    <div className='panel-body'>
                      <table className='table table-stripe'>
                        <thead>
                          <tr>
                            <th>Titel</th>
                            <th>Beskrivning</th>
                            <th>Utgångspris</th>
                            <th>Högsta bud</th>
                            <th>Senaste Budgivare</th>
                            <th />
                            <th />
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {data.auction.items.map((item, index) => {
                            return (
                              <Mutation mutation={PUT_BID} key={item.id}>
                                {(PutBid, { loading, error }) => (
                                  <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                      {item.highestBid
                                        ? item.highestBid.amount
                                        : 'Inget bud har lagts'}
                                    </td>
                                    <td>
                                      {item.highestBid
                                        ? item.highestBid.bidder.name
                                        : 'Inget bud har lagts'}
                                    </td>
                                    <td>
                                      <Button
                                        color='success'
                                        onClick={() =>
                                          PutBid({
                                            variables: {
                                              itemID: item.id,
                                              bidderID: user.user.id,
                                              amount: item.highestBid
                                                ? item.highestBid.amount + 5
                                                : item.price + 5
                                            }
                                          }).then(() => refetch())
                                        }
                                      >
                                        + 5 KR
                                      </Button>
                                    </td>
                                    <td>
                                      <Button
                                        color='primary'
                                        onClick={() =>
                                          PutBid({
                                            variables: {
                                              itemID: item.id,
                                              bidderID: user.user.id,
                                              amount: item.highestBid
                                                ? item.highestBid.amount + 10
                                                : item.price + 10
                                            }
                                          }).then(() => refetch())
                                        }
                                      >
                                        + 10 KR
                                      </Button>
                                    </td>
                                    <td>
                                      <Button
                                        color='danger'
                                        onClick={() =>
                                          PutBid({
                                            variables: {
                                              itemID: item.id,
                                              bidderID: user.user.id,
                                              amount: item.highestBid
                                                ? item.highestBid.amount + 20
                                                : item.price + 20
                                            }
                                          }).then(() => refetch())
                                        }
                                      >
                                        + 20 KR
                                      </Button>
                                      <div>
                                        {loading && <p>Loading...</p>}
                                        {error && (
                                          <p>Error :( Please try again</p>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Mutation>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AuctionPage;
