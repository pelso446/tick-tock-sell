import { User, Auction } from '../../models';

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({});
    },
    user: async (root, args, context, info) => {
      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      const user = await User.create(args);
      return user;
    }
  },
  User: {
    auctions: async (user, args, context, info) => {
      return await Auction.find({ seller: user._id });
    }
  }
};
