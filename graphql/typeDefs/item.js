import { gql } from 'apollo-server-express';

export default gql`
  type Item {
    id: ID!
    auction: Auction!
    title: String!
    description: String!
    price: Int!
    duration: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
