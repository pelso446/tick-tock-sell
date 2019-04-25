import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_AUCTION = gql`
    query auction($auctionId: String) {
        auction(id: $auctionId) {
            _id
            seller
            title
            description
            items
            start_time
            updated_date
        }
    }
`;

const DELETE_AUCTION = gql`
  mutation removeAuction($id: String!) {
    removeAuction(id:$id) {
      _id
    }
  }
`;

class Auction extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_AUCTION} variables={{ auctionId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4><Link to="/">Auction List</Link></h4>
                                <h3 className="panel-title">
                                {data.auction.title}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>Seller:</dt>
                                    <dd>{data.auction.seller}</dd>
                                    <dt>Description:</dt>
                                    <dd>{data.auction.description}</dd>
                                    <dt>Items:</dt>
                                    <dd>{data.auction.items}</dd>
                                    <dt>Start_time:</dt>
                                    <dd>{data.auction.start_time}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{data.auctions.updated_date}</dd>
                                </dl>
                                <Mutation mutation={DELETE_AUCTION} key={data.auctions._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeAuctions, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeAuctions({ variables: { id: data.auction._id } });
                                                }}>
                                                <Link to={`/edit/${data.auction._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Auction;