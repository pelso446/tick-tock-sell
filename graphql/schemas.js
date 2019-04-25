import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import GraphQLDate from 'graphql-date';
import UserModel from '../models/User';

var userType = new GraphQLObjectType({
  name: 'User',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      register_date: {
        type: GraphQLDate
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function() {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function() {
          const users = UserModel.find().exec();
          if (!users) {
            throw new Error('Error');
          }
          return users;
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const userDetails = UserModel.findById(params.id).exec();
          if (!userDetails) {
            throw new Error('Error');
          }
          return userDetails;
        }
      }
    };
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function() {
    return {
      addUser: {
        type: userType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('Error');
          }
          return newUser;
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return UserModel.findByIdAndUpdate(
            params.id,
            {
              name: params.name,
              email: params.email,
              password: params.password
            },
            function(err) {
              if (err) return next(err);
            }
          );
        }
      },
      removeUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remUser = UserModel.findByIdAndRemove(params.id).exec();
          if (!remUser) {
            throw new Error('Error');
          }
          return remUser;
        }
      }
    };
  }
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutation
});
