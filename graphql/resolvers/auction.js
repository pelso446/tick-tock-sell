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
      const { sellerID, title, description, startTime } = args;
      const auction = await Auction.create({
        seller: sellerID,
        title,
        description,
        startTime
      });

      return auction;
    },
    joinAuction: async (root, args, { req }, info) => {
      const validationErrors = {};
      const { auctionID, bidderID } = args;
      const auction = await Auction.findById(auctionID, function(err, docs) {
        if (err) {
          ValidationError.err = err;
        }
      }).populate('seller');

      if (auction.seller._id == bidderID) {
        validationErrors.badInput =
          'An auction owner can not join their own auction';
      }

      if (Object.keys(validationErrors).length > 0) {
        throw new AuthenticationError(
          'Failed to get events due to validation errors',
          { validationErrors }
        );
      }

      await Auction.findOne({ '_id': auctionID }, async function(err, auction) {
        auction.bidders.push(bidderID);
        await auction.save();
      });

      return auction;
    },
    leaveAuction: async (root, args, { req }, info) => {
      const validationErrors = {};
      const { auctionID, bidderID } = args;
      const auction = await Auction.findById(auctionID, function(err, docs) {
        if (err) {
          ValidationError.err = err;
        }
      }).populate('seller');

      //Remove??
      if (auction.seller._id == bidderID) {
        validationErrors.badInput =
          'An auction owner can not join their own auction';
      }

      if (Object.keys(validationErrors).length > 0) {
        throw new AuthenticationError(
          'Failed to get events due to validation errors',
          { validationErrors }
        );
      }

      await Auction.findOne({ '_id': auctionID }, async function(err, auction) {
        auction.bidders.push(bidderID);
        await auction.save();
      });

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
