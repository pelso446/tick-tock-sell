import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { Button } from 'reactstrap';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav /* 
  NavItem,
  NavLink, */,
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

  logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history.push(`/`);
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div>
        <Navbar color='info' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>TickTockSell</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar />
              {authToken ? (
                <Button color='primary' onClick={this.logout()}>
                  Test
                </Button>
              ) : (
                <React.Fragment>
                  <Link to={`/Login`}>
                    <Button color='primary'> Logga in</Button>
                  </Link>
                  <Link to={`/Register`}>
                    <Button color='secondary'>Registrera</Button>
                  </Link>
                </React.Fragment>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
