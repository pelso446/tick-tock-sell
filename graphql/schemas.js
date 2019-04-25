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
import AuctionModel from '../models/Auction';

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

var auctionType = new GraphQLObjectType({
  name: 'Auction',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      seller: {
        type: userType
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      items: {
        type: GraphQLString
      },
      number_of_items: {
        type: GraphQLInt
      },
      start_time: {
        type: GraphQLDate
      },
      created_at: {
        type: GraphQLDate
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function() {
    return {
      // User
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
      },

      // Auction
      auctions: {
        type: new GraphQLList(auctionType),
        resolve: function() {
          const auctions = AuctionModel.find().exec();
          if (!auctions) {
            throw new Error('Error');
          }
          return auctions;
        }
      },
      auction: {
        type: auctionType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const auctionDetails = AuctionModel.findById(params.id).exec();
          if (!auctionDetails) {
            throw new Error('Error');
          }
          return auctionDetails;
        }
      }
    };
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function() {
    return {
      // User
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
      },

      // Auction
      addAuction: {
        type: auctionType,
        args: {
          /* 
          seller: {
            type: new GraphQLNonNull(userType)
          }, */
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          items: {
            type: new GraphQLNonNull(GraphQLString)
          },
          number_of_items: {
            type: new GraphQLNonNull(GraphQLInt)
          } /* ,
          start_time: {
            type: new GraphQLNonNull(GraphQLDate)
          } */
        },
        resolve: function(root, params) {
          const auctionModel = new AuctionModel(params);
          const newAuction = auctionModel.save();
          if (!newAuction) {
            throw new Error('Error');
          }
          return newAuction;
        }
      },
      updateAuction: {
        type: auctionType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          } /* 
          seller: {
            type: new GraphQLNonNull(userType)
          }, */,
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          items: {
            type: new GraphQLNonNull(GraphQLString)
          },
          number_of_items: {
            type: new GraphQLNonNull(GraphQLInt)
          } /* ,
          start_time: {
            type: new GraphQLNonNull(GraphQLDate)
          } */
        },
        resolve(root, params) {
          return AuctionModel.findByIdAndUpdate(
            params.id,
            {
              seller: params.seller,
              title: params.title,
              description: params.description,
              items: params.items,
              number_of_items: params.number_of_items,
              start_time: params.start_time
            },
            function(err) {
              if (err) return next(err);
            }
          );
        }
      },
      removeAuction: {
        type: auctionType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remAuction = AuctionModel.findByIdAndRemove(params.id).exec();
          if (!remAuction) {
            throw new Error('Error');
          }
          return remAuction;
        }
      }
    };
  }
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutation
});
