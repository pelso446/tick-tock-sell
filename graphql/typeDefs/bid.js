import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    bid(id: ID!): Bid
    bids(itemID: ID, bidderID: ID): [Bid!]!
  }

  extend type Mutation {
    putBid(itemID: ID!, bidderID: ID!, amount: Int!): Bid
  }
  type Bid {
    id: ID!
    item: Item!
    bidder: User!
    amount: Int!
    createdAt: String!
    updatedAt: String!
  }

  extend type Subscription{
    bidAdded: Bid!
  }
`;
