import { Auction, Item } from '../../models';

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
    }
  },
  Auction: {
    seller: async (auction, args, context, info) => {
      return (await auction.populate('seller').execPopulate()).seller;
    },
    items: async (auction, args, context, info) => {
      return await Item.find({ auction: auction._id });
    }
  }
};
