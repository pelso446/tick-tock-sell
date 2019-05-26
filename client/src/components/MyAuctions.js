import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation, Subscription } from 'react-apollo';
import { Button, Row, Col } from 'reactstrap';
import { authenticationService } from '../services/authentication.service';
import Countdown from './Countdown';
import Loader from './Loader';

const GET_AUCTION = gql`
  query GetAuction($id: ID!) {
    auction(id: $id) {
      id
      title
      description
      startTime
      duration
      auctionStarted
      auctionFinished
      items {
        id
        title
        description
        price
        highestBid {
          amount
          bidder {
            email
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
  subscription {
    bidAdded {
      id
      amount
    }
  }
`;

class AuctionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authenticationService.currentUserValue
      // bids: [{amount: '', bidder: ''}]
    };
  }

  render() {
    const { user } = this.state;
    const auctionID = this.props.match.params.id;
    return (
      <Query query={GET_AUCTION} variables={{ id: auctionID }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;
          /* console.log('started: ' + data.auction.auctionStarted);
          console.log('finished: ' + data.auction.auctionFinished); */
          var finish = new Date(parseInt(data.auction.startTime));
          finish.setSeconds(finish.getSeconds() + data.auction.duration);
          /* console.log(finish.toISOString()); */
          return (
            <div>
              <div className='App'>
                <div className='container'>
                  <div className='panel panel-default'>
                    <Row className='panel-heading'>
                      <Col>
                        <h3 className='panel-title'>Sålda föremål</h3>
                      </Col>
                    </Row>
                    <div className='panel-body'>
                      <table className='table table-stripe'>
                        <thead>
                          <tr>
                            <th>Titel</th>
                            <th>Beskrivning</th>
                            <th>Utgångspris</th>
                            <th>Köpare</th>
                            <th>Kontakta köparen via mail</th>
                            <th />
                            <th />
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {data.auction.items.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                  {item.highestBid
                                    ? item.highestBid.amount
                                    : 'Inget bud har lagts på detta föremål'}
                                </td>
                                <td>
                                  {item.highestBid
                                    ? item.highestBid.bidder.name
                                    : 'Inget bud har lagts på detta föremål'}
                                </td>
                                <td>
                                  {item.highestBid
                                    ? item.highestBid.bidder.email
                                    : 'Inget har lagts på detta föremål'}
                                </td>

                                <div />
                              </tr>
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
