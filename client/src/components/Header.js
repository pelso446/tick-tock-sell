import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { authenticationService } from '../services/authentication.service';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  Button
} from 'reactstrap';

const buttonStyle = {
  margin: '0 0.5em'
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ user: x })
    );
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        <Navbar color='info' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>TickTockSell</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar />
              {user ? (               
                <NavbarBrand color='light'> <Link to={`/MyPage`}> {user.user.name} </Link></NavbarBrand>
              ) : (
                ''
              )}
              {user ? (
                <Button
                  color='primary'
                  onClick={() => {
                    authenticationService.logout();
                    this.props.history.push('/');
                  }}
                >
                  Logga ut
                </Button>
              ) : (
                <React.Fragment>
                  <Link to={`/Login`}>
                    <Button color='primary' style={buttonStyle}>
                      {' '}
                      Logga in
                    </Button>
                  </Link>
                  <Link to={`/Register`}>
                    <Button color='secondary' style={buttonStyle}>
                      Registrera
                    </Button>
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

export default withRouter(Header);
