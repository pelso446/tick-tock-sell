import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { authenticationService } from '../services/authentication.service';
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const buttonStyle = {
  margin: '0 0.5em'
};

const ADD_AUCTION = gql`
  mutation createAuction(
    $sellerID: ID!
    $title: String!
    $description: String!
    $startTime: String!
    $items: [itemInput!]!
  ) {
    createAuction(
      sellerID: $sellerID
      title: $title
      description: $description
      startTime: $startTime
      items: $items
    ) {
      id
    }
  }
`;
class AuctionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ itemTitle: '', itemDescription: '', itemPrice: '' }],
      user: authenticationService.currentUserValue
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addClick() {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        { itemTitle: '', itemDescription: '', itemPrice: '' }
      ]
    }));
  }

  createUI() {
    return this.state.items.map((el, i) => (
      <div key={i}>
        <Row>
          <Col>
            <FormGroup>
              <Input
                placeholder='Titel'
                name='itemTitle'
                value={el.itemTitle || ''}
                onChange={this.handleChange.bind(this, i)}
                style={{ marginLeft: '15px' }}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Input
                placeholder='Beskrivning'
                name='itemDescription'
                value={el.itemDescription || ''}
                onChange={this.handleChange.bind(this, i)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input
                placeholder='Pris'
                name='itemPrice'
                pattern='[0-9]*'
                value={parseInt(el.itemPrice) || ''}
                onChange={this.handleChange.bind(this, i)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Button color='danger' onClick={this.removeClick.bind(this, i)}>
                X
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    ));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let items = [...this.state.items];

    items[i] = {
      ...items[i],
      [name]:
        name === 'itemPrice' || name === 'duration' ? parseInt(value) : value
    };
    this.setState({ items });
  }

  removeClick(i) {
    let items = [...this.state.items];
    items.splice(i, 1);
    this.setState({ items });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state.items));
    event.preventDefault();
  }

  render() {
    let title, description, startTime;
    const { user } = this.state;
    return (
      <Mutation
        mutation={ADD_AUCTION}
        onCompleted={() => this.props.history.push('/')}
      >
        {(createAuction, { loading, error }) => (
          <Container>
            <h3 className='panel-title'>Skapa Auktion</h3>
            <Form
              onSubmit={e => {
                e.preventDefault();
                console.log(
                  user.user.id,
                  title.value,
                  description.value,
                  startTime.value,
                  this.state.items
                );

                createAuction({
                  variables: {
                    sellerID: user.user.id,
                    title: title.value,
                    description: description.value,
                    startTime: startTime.value,
                    items: this.state.items
                  }
                });
                title.value = '';
                description.value = '';
                startTime.value = '';
              }}
            >
              <Col>
                <FormGroup>
                  <Label htmlFor='title'>Titel:</Label>
                  <input
                    type='text'
                    className='form-control'
                    name='title'
                    ref={node => {
                      title = node;
                    }}
                    placeholder='Titel'
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor='description'>Beskrivning:</Label>
                  <textarea
                    className='form-control'
                    name='description'
                    ref={node => {
                      description = node;
                    }}
                    placeholder='Beskrivning'
                    cols='80'
                    rows='3'
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor='start_time'>Starttid</Label>
                  <input
                    type='text'
                    className='form-control'
                    name='start_time'
                    ref={node => {
                      startTime = node;
                    }}
                    placeholder='Starttid'
                  />
                </FormGroup>
              </Col>
              {this.createUI()}
              <Button style={buttonStyle} onClick={this.addClick.bind(this)}>
                Lägg till
              </Button>
              <Button style={buttonStyle} type='submit' color='success'>
                Skapa auktion
              </Button>
            </Form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </Container>
        )}
      </Mutation>
    );
  }
}

export default AuctionForm;
