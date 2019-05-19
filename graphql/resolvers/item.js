import { Item, Auction, Bid } from '../../models';

export default {
  Query: {
    items: async (root, args, { req }, info) => {
      //console.log(JSON.stringify(args));
      if (args.auctionID) {
        //console.log('if');
        return await Item.find({ auction: args.auctionID });
      } else {
        //console.log('else');
        return await Item.find();
      }
    },
    item: async (root, args, context, info) => {
      //console.log(JSON.stringify(args));
      return Item.findById(args.itemID);
    }
  },
  Mutation: {
    createItem: async (root, args, { req }, info) => {
      const { auctionID, title, description, price, duration } = args;
      const item = await Item.create({
        auction: auctionID,
        title,
        description,
        price,
        duration
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
