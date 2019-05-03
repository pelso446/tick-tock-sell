import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_AUCTION = gql`
  query auction($auctionId: String) {
    book(id: $bookId) {
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

const UPDATE_AUCTION = gql`
  mutation updateAuction(
    $seller: String!
    $title: String!
    $description: String!
    $start_time: String!
    $items: Int!
  ) {
    updateAuction(
      seller: $seller
      title: $title
      description: $description
      start_time: $start_time
      items: $items
    ) {
      _id
    }
  }
`;

class EditAuction extends Component {
  render() {
    let seller, title, description, items, start_time;
    return (
      <Query
        query={GET_AUCTION}
        variables={{ auctionId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_AUCTION}
              key={data.auction._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateAuction, { loading, error }) => (
                <div className='container'>
                  <div className='panel panel-default'>
                    <div className='panel-heading'>
                      <h3 className='panel-title'>EDIT AUCTION</h3>
                    </div>
                    <div className='panel-body'>
                      <h4>
                        <Link to='/' className='btn btn-primary'>
                          Auction List
                        </Link>
                      </h4>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          updateAuction({
                            variables: {
                              seller: seller.value,
                              title: title.value,
                              description: description.value,
                              start_time: start_time.value,
                              items: parseInt(items.value)
                            }
                          });
                          seller.value = '';
                          title.value = '';
                          description.value = '';
                          start_time.value = null;
                          items.value = '';
                        }}
                      >
                        <div className='form-group'>
                          <label htmlFor='isbn'>seller:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='seller'
                            ref={node => {
                              seller = node;
                            }}
                            placeholder='Seller'
                            defaultValue={data.auction.seller}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='title'>Title:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='title'
                            ref={node => {
                              title = node;
                            }}
                            placeholder='Title'
                            defaultValue={data.auction.title}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='description'>Description:</label>
                          <textarea
                            className='form-control'
                            name='description'
                            ref={node => {
                              description = node;
                            }}
                            placeholder='Description'
                            cols='80'
                            rows='3'
                            defaultValue={data.auction.description}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='start_time'>Start time:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='start_time'
                            ref={node => {
                              start_time = node;
                            }}
                            placeholder='Start time'
                            defaultValue={data.auction.start_time}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='items'>Items:</label>
                          <input
                            type='number'
                            className='form-control'
                            name='published_year'
                            ref={node => {
                              items = node;
                            }}
                            placeholder='Published Year'
                            defaultValue={data.auction.items}
                          />
                        </div>
                        <button type='submit' className='btn btn-success'>
                          Submit
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditAuction;
