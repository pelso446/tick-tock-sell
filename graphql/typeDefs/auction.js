import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    auction(id: ID!): Auction
    auctions: [Auction!]!
  }
  extend type Mutation {
    createAuction(
      sellerID: ID!
      title: String!
      description: String!
      startTime: String!
    ): Auction
  }
  type Auction {
    id: ID!
    seller: User!
    title: String!
    description: String!
    items: [Item!]!
    startTime: String!
    createdAt: String!
    updatedAt: String!
  }
`;
