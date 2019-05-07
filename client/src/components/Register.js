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
import { AUTH_TOKEN } from '../constants';

const REGISTER_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      token
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
    console.log(data);

    const { token } = data.signUp.token;
    this._saveUserData(token);
    this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Register;
