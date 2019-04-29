import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    createAuction(
      sellerID: ID!
      title: String!
      description: String!
      start_time: String!
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
