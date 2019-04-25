import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_AUCTION = gql`
    mutation AddAuction(
        $seller: String!,
        $title: String!,
        $description: String!,
        $start_time: String!,
        $items: Int!) {
        addAuction(
            seller: $seller,
            title: $title,
            description: $description,
            start_time: $start_time,
            items: $items) {
            _id
        }
    }
`;

class Create extends Component {
  
    render() {
      let seller, title, description, items, start_time;
      return (
        <Mutation mutation={ADD_AUCTION} onCompleted={() => this.props.history.push('/')}>
            {(addAuction, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD AUCTION
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">Auction List</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                addAuction({ variables: { seller: seller.value, title: title.value, description: description.value, start_time: start_time.value, items: parseInt(items.value) } });
                                seller.value = "";
                                title.value = "";
                                description.value = "";
                                start_time.value = null;
                                items.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="seller">seller:</label>
                                    <input type="text" className="form-control" name="seller" ref={node => {
                                        seller = node;
                                    }} placeholder="seller" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" className="form-control" name="title" ref={node => {
                                        title = node;
                                    }} placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <textarea className="form-control" name="description" ref={node => {
                                        description = node;
                                    }} placeholder="Description" cols="80" rows="3" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">start_time:</label>
                                    <input type="text" className="form-control" name="start_time" ref={node => {
                                        start_time = node;
                                    }} placeholder="start_time" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Published Year:</label>
                                    <input type="number" className="form-control" name="items" ref={node => {
                                        items = node;
                                    }} placeholder="Published Year" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;