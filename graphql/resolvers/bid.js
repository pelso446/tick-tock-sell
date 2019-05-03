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
      const validationErrors = {};
      const { itemID, bidderID, amount } = args;
      //let highestBid = null;
      const item = await Item.findById(itemID, function(err, docs) {
        if (err) {
          validationErrors.itemError = err;
        }
      }).populate('auction highestBid');

      if (!item) {
        validationErrors.item = 'Item not found';
      } else {
        if (item.auction) {
          if (item.auction.seller == bidderID) {
            validationErrors.badBidder =
              'This user is not allowed to bid on the item';
          }
          if (item.highestBid) {
            if (item.highestBid.amount >= amount) {
              validationErrors.amount = 'Higher bid already exists';
            }
          }
        }
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
    //Use populate
    item: async (bid, args, context, info) => {
      return await Item.findById(bid.item);
    },
    //Use populate
    bidder: async (bid, args, context, info) => {
      return await User.findById(bid.bidder);
    }
  }
};
