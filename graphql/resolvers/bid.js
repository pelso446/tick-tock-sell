import { Item, User, Bid } from '../../models';
import { UserInputError } from 'apollo-server-express';

export default {
  Query: {
    bids: async (root, args, { req }, info) => {
      //console.log(JSON.stringify(args));
      const { itemID, bidderID } = args;
      if (itemID && bidderID) {
        //console.log('if & if');
        return await Bid.find({ item: itemID, bidder: bidderID });
      } else if (itemID && !bidderID) {
        //console.log('if & not');
        return await Bid.find({ item: itemID });
      } else if (!itemID && bidderID) {
        //console.log('not & if');
        return await Bid.find({ bidder: bidderID });
      } else {
        //console.log('not & not');
        return await Bid.find();
      }
    },
    bid: async (root, args, context, info) => {
      return Bid.findById(args.id);
    }
  },
  Mutation: {
    putBid: async (root, args, { req }, info) => {
      const { itemID, bidderID, amount } = args;
      let highestBid = null;
      const item = await Item.findById(itemID);
      if (item.highestBid) {
        highestBid = await Bid.findById(item.highestBid);
      }

      const validationErrors = {};
      if (!item) {
        validationErrors.item = 'Item not found';
      }
      if (highestBid.amount >= amount) {
        validationErrors.amount = 'Higher bid already exists';
      }
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          'Failed to get events due to validation errors',
          { validationErrors }
        );
      }

      const bid = await Bid.create({
        item: itemID,
        bidder: bidderID,
        amount
      });

      item.highestBid = bid._id;
      await item.save();

      return bid;
    }
  },
  Bid: {
    item: async (bid, args, context, info) => {
      return await Item.findById(bid.item);
    },
    bidder: async (bid, args, context, info) => {
      return await User.findById(bid.bidder);
    }
  }
};
