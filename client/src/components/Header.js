import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color='info' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>TickTockSell</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar />
              <Link to={`/CreateAuction`}>Create New Auction</Link>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
