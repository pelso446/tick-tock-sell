import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

const ADD_AUCTION = gql`
  mutation createAuction(
    $sellerID: ID!
    $title: String!
    $description: String!
    $startTime: String!
  ) {
    createAuction(
      sellerID: $sellerID
      title: $title
      description: $description
      startTime: $startTime
    ) {
      id
    }
  }
`;
class Create extends Component {
    constructor() {
        super();
        this.state = {
          title: null,
          description: null,
          startTime: null
        };
        
        this.publish = this.publish.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      
      handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
      }
    
      publish() {
        console.log( this.state.title, this.state.description, this.state.startTime );
      }
      
      render() {
        return (
          <Loader loading={this.state.isLoading}>
            <h1 className="title has-text-white">
              {this.state.edit ? 'Redigera hem' : 'Lägg till hem'}
            </h1>
            <p className="subtitle has-text-white">Vänligen fyll i formuläret nedan</p>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <TextField
                label="Namn"
                name="name"
                placeholder="Namn"
                type="text"
                value={this.state.name}
                error={this.state.nameError}
                handleChange={this.handleChange}
              />
              <div className="field">
                <label className="label">Län</label>
                <div className="control">
                  <div className="select">
                    <select name="county" value={this.state.county} onChange={this.handleChange}>
                      <option>Välj län</option>
                      {this.state.counties.map(({ id, name }) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                    </select>
                  </div>              
                </div>
                {this.renderCountyError()}
              </div>
              <TextField
                label="Pris per dygn"
                name="price"
                placeholder="Pris per dygn"
                type="text"
                value={this.state.price}
                error={this.state.priceError}
                handleChange={this.handleChange}
              />
              <TextField
                label="Antal platser"
                name="capacity"
                placeholder="Antal platser"
                type="text"
                error={this.state.capacityError}
                value={this.state.capacity}
                handleChange={this.handleChange}
              />
              <div className="field">
                <label className="label">Beskrivning</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    name="description"
                    placeholder="Beskrivning"
                    value={this.state.description}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="field">
                <Button
                  primary
                  type="submit"
                >
                  Nästa steg
                </Button>
              </div>
              <FormMessage visible={this.state.error} children={this.state.errorMessage} />
            </Form>
          </Loader>
        );
      }
     
      renderCountyError() {
        if (this.state.countyError) {
          return (
            <p className="help is-danger">Välj län</p>
          );
        }
      }
     
    }
     
     
    export default Create;