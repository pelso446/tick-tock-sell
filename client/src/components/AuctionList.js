import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class AuctionList extends Component {
  state = {
    auctions: [
      { id: 1, name: 'Pär', items: 1, startingTime: '15:00' },
      { id: 2, name: 'Stånlis', items: 13, startingTime: '12:00' }
    ]
  };

  handleClick = () => {
    this.props.history.push('/Auction');
  };

  render() {
    const { auctions } = this.state;
    return (
      <div>
        <h2>Kommande auktioner</h2>
        <ListGroup>
          {auctions.map(({ id, name, startingTime, items }) => (
            <ListGroupItem action onClick={this.handleClick}>
              {name} {items} {startingTime}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default AuctionList;
