import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

const ADD_AUCTION = gql`
mutation createAuction(
  $sellerID: ID!
  $title: String!
  $description: String!
  $startTime: String!
) {
  createAuction(
    sellerID: $sellerID
    title: $title
    description: $description
    startTime: $startTime
  ) {
    id
  }
}
`;


class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      startTime: ''
    };
  }

  createAuction(data) {
  
    //TODO: set id to created auction ID
    const id = null;

    return id;
  }

  //createItems(auctionID, data) {
    //Mutation, create items
  //}

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    const getAuctionData = from => {
      const { title, description, startTime } = from;
      return { title, description, startTime };
    };
    //const getItemsData = from => {
    //  const { itemsTitle, description, startTime } = from;
    // return { title, description, startTime };
    //};

    const auctionData = getAuctionData(this.state);

    //const itemsData = getItemsData(this.state)
    //TODO: fix itemsData

    const auctionId = await this.createAuction(auctionId);
    //await this.createItems(auctionId, itemsData);
  }

  render() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>ADD AUCTION</h3>
          </div>
          <div className='panel-body'>
            <h4>
              <Link to='/' className='btn btn-primary'>
                Auction List
              </Link>
            </h4>

            <form onSubmit={e => this.handleSubmit(e)}>
              <div className='form-group'>
                <label htmlFor='title'>Title:</label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  value={this.state.title}
                  placeholder='Title'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <textarea
                  className='form-control'
                  name='description'
                  value={this.state.description}
                  placeholder='Description'
                  cols='80'
                  rows='3'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='start_time'>Start TIME</label>
                <input
                  type='text'
                  className='form-control'
                  name='start_time'
                  value={this.state.startTime}
                  placeholder='Start time'
                />
              </div>

              <button type='submit' className='btn btn-success'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
