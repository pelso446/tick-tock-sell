import { Item, Auction } from '../../models';

export default {
  Query: {
    items: async (root, args, { req }, info) => {
      console.log(JSON.stringify(args));
      if (args.auctionID) {
        console.log('if');
        //Might not yet be working, try with auction populated with items
        return await Item.findById({ auction: args.auctionID });
      } else {
        console.log('else');
        return await Item.find();
      }
    },
    item: async (root, args, context, info) => {
      console.log(JSON.stringify(args));
      return Auction.findById(args.itemID);
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
    auction: async (item, args, context, info) => {
      console.log(JSON.stringify(item));
      return await Auction.findById(item.auction);
    }
  }
};
