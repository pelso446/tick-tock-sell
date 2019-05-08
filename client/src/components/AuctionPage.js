import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'reactstrap';

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

class AuctionPage extends Component {
  render() {
    const auctionID = this.props.match.params.id;
    return (
      <Query query={GET_AUCTION} variables={{ id: auctionID }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
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
                              <Button color='success'>+ 5 KR</Button>
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
          );
        }}
      </Query>
    );
  }
}

export default AuctionPage;
