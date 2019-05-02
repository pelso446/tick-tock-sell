import { Item, User, Bid } from '../../models';

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
      //console.log(JSON.stringify(args));
      return Bid.findById(args.id);
    }
  },
  Mutation: {
    putBid: async (root, args, { req }, info) => {
      const { itemID, bidderID, amount } = args;
      const item = await Item.findById(itemID).then(value => {
        console.log(value);
      });
      const highestBid = Bid.findById(item.highestBid);

      // TODO: Add error handling
      //console.log(item);

      if (!item) {
        console.log('Item missing');
        return null;
      }
      if (highestBid.amount > amount) {
        console.log('Higher bid exists');
        return null;
      }
      const bid = await Bid.create({
        item: itemID,
        bidder: bidderID,
        amount
      });
      //item.highestbid = amount;
      console.log(JSON.stringify(bid));

      try {
        Item.updateOne(
          itemID,
          { $set: { highestBid: bid._id } },
          { new: true }
        );
      } catch (e) {
        console.log('New bid on item' + e);
      }

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
