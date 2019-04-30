import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    #TODO: add resolver
    item(itemID: ID!): Item!
    #TODO: add resolver
    items(auctionID: ID): [Item!]!
  }

  extend type Mutation {
    createItem(
      auctionID: ID!
      title: String!
      description: String
      price: Int
      duration: Int
    ): Item
  }

  type Item {
    id: ID!
    auction: Auction!
    bids: [Bid!]!
    highestBid: Bid
    title: String!
    description: String
    price: Int!
    duration: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
