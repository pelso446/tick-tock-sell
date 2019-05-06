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

const LOGIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container className='App'>
        <h2>Logga in</h2>
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email, password }}
          onCompleted={data => this._confirm(data)}
        >
          {(signIn, { loading, error }) => (
            <Form
              className='form'
              onSubmit={e => {
                e.preventDefault();
                signIn({
                  variables: {
                    email,
                    password
                  }
                });
              }}
            >
              <Col>
                <FormGroup>
                  <Label>Email</Label>
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
                  <Label for='examplePassword'>Password</Label>
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
              <Button>Login</Button>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }

  _confirm = async data => {
    const { token } = data.signIn.token;
    console.log(token);

    this._saveUserData(token);
    this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
