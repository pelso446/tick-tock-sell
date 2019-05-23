import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    signUp(email: String!, name: String!, password: String!): AuthPayload
    signIn(email: String!, password: String!): AuthPayload
    signOut: Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    auctions: [Auction!]!
    createdAt: String!
    updatedAt: String!
  }
`;
