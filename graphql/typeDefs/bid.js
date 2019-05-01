import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    #TODO: add resolver
    bid(id: ID!): Bid
    #TODO: add resolver
    bids(itemID: ID, auctionID: ID): Bid
  }

  extend type Mutation {
    #TODO: add resolver
    putBid(itemID: ID!, bidderID: ID!, amount: Int!): Bid
  }
  type Bid {
    id: ID!
    #auction: Auction! #Necessary?
    item: Item!
    bidder: User!
    amount: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
