export default `
type User {
  id: String!
  name: String!
  email: String!
  register_date: Date!
}
type Query {
  user(id: String!): User
  users: [User]
}
type Mutation {
  addUser(id: String!, name: String!, email: String!): User
  editUser(id: String, name: String, email: String): User
  deleteUser(id: String, name: String, email: String): User
}
`;
