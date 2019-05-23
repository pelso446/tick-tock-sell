import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import { authenticationService } from '../services/authentication.service';
import { Form } from 'reactstrap';
import Loader from './Loader';

const GET_AUCTION = gql`
  query getAuctions($sellerID: ID!) {
    auctions(sellerID: $sellerID) {
      id
      seller {
        id
      }
      title
      description
      startTime
      items {
        title
        description
        price
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
      <Query query={GET_AUCTION} variables={{ sellerID: sellerID }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation mutation={DELETE_AUCTION}>
              {(deleteAuction, { loading, error }) => (
                <Form>
                  <div className='App'>
                    <div className='container'>
                      <div className='panel panel-default'>
                        <div className='panel-heading'>
                          <h3 className='panel-title'>Mina Auktioner</h3>
                        </div>
                        <div className='panel-body'>
                          <table className='table table-stripe'>
                            <thead>
                              <tr>
                                <th>Titel</th>
                                <th>Beskrivning</th>
                                <th>Starttid</th>
                                <th />
                                <th />
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {data.auctions.map((auction, index) => (
                                <tr key={index}>
                                  <td>{auction.title}</td>
                                  <td>{auction.description}</td>
                                  <td>
                                    <Time timestamp={auction.startTime} />
                                  </td>
                                  <td>{auction.seller.name}</td>
                                  <td>
                                    <Button
                                      onClick={() =>
                                        deleteAuction({
                                          variables: {
                                            auctionID: auction.id
                                          }
                                        }).then(() => refetch())
                                      }
                                    >
                                      Ta bort
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default MyPage;
