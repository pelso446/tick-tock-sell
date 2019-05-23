import { User, Auction } from '../../models';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { utils } from '../utils';

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
      const { name, email } = args;
      const password = await bcrypt.hash(args.password, 10);
      const user = await User.create({
        name,
        email,
        password
      });

      const token = sign({ userId: user._id }, utils.APP_SECRET);
      return { token, user };
    },
    signIn: async (root, args, { req }, info) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error('No such user found');
      }
      const valid = await bcrypt.compare(args.password, user.password);

      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = sign({ userId: user._id }, utils.APP_SECRET);
      return { token, user };
    }
  },
  User: {
    auctions: async (user, args, context, info) => {
      return await Auction.find({ seller: user._id });
    }
  }
};
