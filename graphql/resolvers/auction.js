import { Auction, Item, User } from '../../models';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Query: {
    auctions: (root, args, context, info) => {
      return Auction.find({});
    },
    auction: async (root, args, context, info) => {
      return Auction.findById(args.id);
    }
  },
  Mutation: {
    createAuction: async (root, args, { req }, info) => {
      const { sellerID, title, description, startTime, items } = args;

      const auction = await Auction.create({
        seller: sellerID,
        title,
        description,
        startTime
      });

      if (items) {
        items.map(async item => {
          await Item.create({
            auction: auction._id,
            title: item.itemTitle,
            description: item.itemDescription,
            price: item.itemPrice,
            duration: item.itemDuration
          });
        });
      }

      return auction;
    },
    joinAuction: async (root, args, { req }, info) => {
      const validationErrors = {};
      const { auctionID, bidderID } = args;
      const auction = await Auction.findById(auctionID, function(err, docs) {
        if (err) {
          validationErrors.err = err;
        }
      });

      auction.bidders.forEach(element => {
        if (element.toString() === bidderID) {
          validationErrors.bidders = 'Bidder is already part of auction';
        }
      });

      if (Object.keys(validationErrors).length > 0) {
        throw new AuthenticationError(
          'Failed to get events due to validation errors',
          { validationErrors }
        );
      }

      auction.bidders.push(bidderID);
      await auction.save();

      return auction;
    },
    leaveAuction: async (root, args, { req }, info) => {
      const validationErrors = {};
      const { auctionID, removeBidderID } = args;
      const auction = await Auction.findById(auctionID, function(err, docs) {
        if (err) {
          ValidationError.err = err;
        }
      });

      if (Object.keys(validationErrors).length > 0) {
        throw new AuthenticationError(
          'Failed to get events due to validation errors',
          { validationErrors }
        );
      }

      auction.bidders.pull(removeBidderID);
      await auction.save();

      return auction;
    }
  },
  Auction: {
    seller: async (auction, args, context, info) => {
      return (await auction.populate('seller').execPopulate()).seller;
    },
    items: async (auction, args, context, info) => {
      return await Item.find({ auction: auction._id });
    },
    bidders: async (auction, args, context, info) => {
      return (await auction.populate('bidders').execPopulate()).bidders;
    }
  }
};
