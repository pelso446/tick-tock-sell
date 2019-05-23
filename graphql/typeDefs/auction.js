import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    auction(id: ID!): Auction
    auctions(sellerID: ID): [Auction!]!
  }
  extend type Mutation {
    createAuction(
      sellerID: ID!
      title: String!
      description: String
      startTime: String!
      duration: Int
      items: [itemInput]
    ): Auction
    joinAuction(auctionID: ID!, bidderID: ID!): Auction
    leaveAuction(auctionID: ID!, removeBidderID: ID!): Auction
    deleteAuction(auctionID: ID!): Auction
  }
  type Auction {
    id: ID!
    seller: User!
    bidders: [User!]!
    title: String!
    description: String!
    items: [Item!]!
    startTime: String!
    duration: Int!
    auctionStarted: Boolean!
    auctionFinished: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input itemInput {
    itemTitle: String!
    itemDescription: String
    itemPrice: Int
    itemDuration: Int
  }
`;
