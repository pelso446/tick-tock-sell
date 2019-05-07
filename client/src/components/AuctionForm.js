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
    $items: [itemInput!]!
  ) {
    createAuction(
      sellerID: $sellerID
      title: $title
      description: $description
      startTime: $startTime
      items: $items
    ) {
      id
    }
  }
`;
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ itemTitle: '', itemDescription: '' }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addClick() {
    this.setState(prevState => ({
      items: [...prevState.items, { itemTitle: '', itemDescription: '' }]
    }));
  }

  createUI() {
    return this.state.items.map((el, i) => (
      <div key={i}>
        <input
          placeholder='Title'
          name='itemTitle'
          value={el.itemTitle || ''}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          placeholder='Price'
          name='itemDescription'
          value={el.itemDescription || ''}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type='button'
          value='remove'
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let items = [...this.state.items];
    items[i] = { ...items[i], [name]: value };
    this.setState({ items });
  }

  removeClick(i) {
    let items = [...this.state.items];
    items.splice(i, 1);
    this.setState({ items });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state.items));
    event.preventDefault();
  }

  render() {
    let title, description, startTime;
    return (
      <Mutation
        mutation={ADD_AUCTION}
        onCompleted={() => this.props.history.push('/')}
      >
        {(createAuction, { loading, error }) => (
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
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createAuction({
                      variables: {
                        sellerID: '5ccabaf90ae5a1153a0f5e14',
                        title: title.value,
                        description: description.value,
                        startTime: startTime.value,
                        items: this.state.items
                      }
                    });
                    title.value = '';
                    description.value = '';
                    startTime.value = '';
                  }}
                >
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
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='start_time'>Start TIME</label>
                    <input
                      type='text'
                      className='form-control'
                      name='start_time'
                      ref={node => {
                        startTime = node;
                      }}
                      placeholder='Start time'
                    />
                  </div>
                  {this.createUI()}
                  <input
                    type='button'
                    value='add more'
                    onClick={this.addClick.bind(this)}
                  />
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
  }
}

export default Create;
