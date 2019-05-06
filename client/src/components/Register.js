import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <Container className="App">
        <h2>Registrera</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Namn</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Namn"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button>Registrera</Button>
        </Form>
      </Container>
    );
  }
}

export default Register;