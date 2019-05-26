import { Item, Auction, Bid } from '../../models';

export default {
  Query: {
    items: async (root, args, { req }, info) => {
      if (args.auctionID) {
        return await Item.find({ auction: args.auctionID });
      } else {
        return await Item.find();
      }
    },
    item: async (root, args, context, info) => {
      return Item.findById(args.itemID);
    }
  },
  Mutation: {
    createItem: async (root, args, { req }, info) => {
      const { auctionID, title, description, price } = args;
      const item = await Item.create({
        auction: auctionID,
        title,
        description,
        price
      });

      return item;
    }
  },
  Item: {
    //Use populate
    auction: async (item, args, context, info) => {
      //console.log(JSON.stringify(item));
      return await Auction.findById(item.auction);
    },
    bids: async (item, args, context, info) => {
      return await Bid.find({ item: item._id });
    },
    highestBid: async (item, args, context, info) => {
      return (await item.populate('highestBid').execPopulate()).highestBid;
    }
  }
};
