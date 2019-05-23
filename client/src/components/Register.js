import React, { Component } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { authenticationService } from '../services/authentication.service';

const REGISTER_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  render() {
    const { email, name, password } = this.state;
    return (
      <Container className='App'>
        <h2>Registrera</h2>
        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ email, name, password }}
          onCompleted={data => this._confirm(data)}
        >
          {(signUp, { loading, error }) => (
            <Form
              className='form'
              onSubmit={e => {
                e.preventDefault();
                signUp({
                  variables: {
                    email,
                    name,
                    password
                  }
                });
              }}
            >
              <Col>
                <FormGroup>
                  <Label>Namn</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Namn'
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Mail</Label>
                  <Input
                    type='email'
                    name='email'
                    id='exampleEmail'
                    placeholder='myemail@email.com'
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for='examplePassword'>Lösenord</Label>
                  <Input
                    type='password'
                    name='password'
                    id='examplePassword'
                    placeholder='********'
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Button>Registrera</Button>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }

  _confirm = async data => {
    const userToken = data.signIn;

    /*     this._saveUserData(userToken); */

    authenticationService.login(userToken);
    this.props.history.push(`/`);
  };
  /* 
  _saveUserData = userToken => {
    localStorage.setItem(AUTH_TOKEN, userToken);
  }; */
}

export default Register;
