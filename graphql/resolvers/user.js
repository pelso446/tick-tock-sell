import { User, Auction } from '../../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

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
      console.log(JSON.stringify(user));

      const token = jwt.sign({ userId: user._id }, APP_SECRET);
      return { token, user };
    },
    signIn: async (root, args, { req }, info) => {
      const user = await User.find({ email: args.email });
      if (!user) {
        throw new Error('No such user found');
      }
      console.log('user: ' + typeof user);

      console.log('arg password: ' + args.password);
      console.log('user password: ' + user[email];

      const valid = await bcrypt.compare(args.password, user.password);
      console.log('valid: ' + valid);

      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user._id }, APP_SECRET);
      console.log('token: ' + token);

      return { token, user };
    }
  },
  User: {
    auctions: async (user, args, context, info) => {
      return await Auction.find({ seller: user._id });
    }
  }
};
