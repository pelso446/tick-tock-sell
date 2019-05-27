import { Item, User, Bid } from '../../models';
import { UserInputError, PubSub } from 'apollo-server-express';
import { utils } from '../utils';
const BID_ADDED = 'BID_ADDED';
const pubsub = new PubSub();

export default {
  Query: {
    bids: async (root, args, { req }, info) => {
      const { itemID, bidderID } = args;
      if (itemID && bidderID) {
        return await Bid.find({ item: itemID, bidder: bidderID });
      } else if (itemID && !bidderID) {
        return await Bid.find({ item: itemID });
      } else if (!itemID && bidderID) {
        return await Bid.find({ bidder: bidderID });
      } else {
        return await Bid.find();
      }
    },
    bid: async (root, args, context, info) => {
      return Bid.findById(args.id);
    }
  },
  Mutation: {
    putBid: async (root, args, context, info) => {
      const validationErrors = {};
      const { itemID, bidderID, amount } = args;

      //Controlls authentication for bidder
      if (context.decoded.userId !== bidderID) {
        validationErrors.badUser = 'This user is not validated';
      }

      const item = await Item.findById(itemID, function(err, docs) {
        if (err) {
          validationErrors.itemError = err;
        }
      }).populate('auction highestBid');

      if (!item) {
        validationErrors.item = 'Item not found';
      } else {
        if (item.auction) {
          if (
            item.auction.auctionStarted == false ||
            item.auction.auctionFinished == true
          ) {
            validationErrors.auction = 'Auction not active';
          }
          if (item.auction.seller == bidderID) {
            validationErrors.badBidder =
              'This user is not allowed to bid on the item';
          }
        }
        if (item.highestBid) {
          if (item.highestBid.amount >= amount) {
            validationErrors.amount = 'Higher bid already exists';
          }
          if (item.highestBid.bidder == bidderID) {
            validationErrors.badBid = 'Current user has the latest bid';
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
      pubsub.publish(BID_ADDED, { bidAdded: bid });
      return bid;
    }
  },

  Subscription: {
    bidAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([BID_ADDED])
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
