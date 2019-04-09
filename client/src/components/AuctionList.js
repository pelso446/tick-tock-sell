import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class AuctionList extends Component {
  state = {
    auctions: [
      { id: 1, name: 'Pär', items: 1, startingTime: '15:00' },
      { id: 2, name: 'Stånlis', items: 13, startingTime: '12:00' }
    ]
  };
  render() {
    const { auctions } = this.state;
    return (
      <div>
        <h2>Kommande auktioner ;)</h2>
        {auctions.map(({ id, name, startingTime, items }) => (
          <ListGroup>
          <ListGroup.Item>Aktionsägare: {name}</ListGroup.Item>
          <ListGroup.Item>Antal produkter: {items}</ListGroup.Item>
          <ListGroup.Item>Starttid: {startingTime}</ListGroup.Item>
        </ListGroup>
          
        ))}
      </div>
    );
  }
}

export default AuctionList;
