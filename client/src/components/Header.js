import React, { Component } from 'react';
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
              <NavItem>
                <span class='glyphicon glyphicon-plus' aria-hidden='true' />{' '}
                Create Auction
              </NavItem>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
