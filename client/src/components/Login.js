import React, { Component } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback
} from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { authenticationService } from '../services/authentication.service';

const LOGIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
    formError: false
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
                if (error) {
                  this.setState({ formError: true });
                }
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
                    invalid={this.state.formError}
                  />
                  <FormFeedback>Email eller lösenord är felaktigt</FormFeedback>
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
                    invalid={this.state.formError}
                  />
                  <FormFeedback>Email eller lösenord är felaktigt</FormFeedback>
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
    const userToken = data.signIn;
    authenticationService.login(userToken);
    this.props.history.push(`/`);
  };
}

export default Login;
