import { User } from '../../models';

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({});
    }
  }
};
