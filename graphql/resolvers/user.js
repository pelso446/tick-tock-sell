import { User } from '../../models';

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

      //req.session.userId = user.id;

      return user;
    }
  }
};
