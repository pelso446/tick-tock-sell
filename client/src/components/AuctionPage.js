import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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
        title
        description
        price
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
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation mutation={PUT_BID}
            onCompleted={() => this.props.history.push('/')}>
              {(PutBid, { loading, error }) => (
                <div>
                  <Form
                    onSubmit={e => {
                      console.log(
                        amount.value,
                        user.user.id,
                      );
                      e.preventDefault();
                      PutBid({
                        variables: {
                          itemID: '5cd27f3dd160de3c985a1c7d',
                          bidderID: user.user.id,
                          amount: 50 //SATAN why validationerror?+??????
                        }
                      });
                      amount.value = '';
                    }}
                  >
                    <div className='App'>
                      <div className='container'>
                        <div className='panel panel-default'>
                          <div className='panel-heading'>
                            <h3 className='panel-title'>
                              {data.auction.title}
                            </h3>
                          </div>
                          <div className='panel-body'>
                            <table className='table table-stripe'>
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Description</th>
                                  <th>Price</th>
                                  <th>Highest Bid</th>
                                  <th>Bidder</th>
                                  <th />
                                  <th />
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                {data.auction.items.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>Highest bid</td>
                                    <td>Bidder</td>
                                    <td>
                                      <FormGroup>
                                        <Label htmlFor='amount'>amount:</Label>
                                        <textarea
                                          className='form-control'
                                          name='amount'
                                          ref={node => {
                                            amount = node;
                                          }}
                                          placeholder='Beskrivning'
                                          cols='80'
                                          rows='3'
                                        />
                                      </FormGroup>
                                      <Button color='success' type='submit'>
                                        + 5 KR
                                      </Button>
                                    </td>
                                    <td>
                                      <Button color='primary'>+ 10 KR</Button>
                                    </td>
                                    <td>
                                      <Button color='danger'>+ 50 KR</Button>
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
                  {loading && <p>Loading...</p>}
                  {error && <p>Error :( Please try again</p>}
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AuctionPage;
