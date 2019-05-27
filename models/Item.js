import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const ItemSchema = new Schema(
  {
    auction: {
      type: ObjectId,
      ref: 'Auction',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    highestBid: {
      type: ObjectId,
      ref: 'Bid',
      default: null
    }
  },
  { timestamps: true }
);

const ItemModel = mongoose.model('Item', ItemSchema);
export default ItemModel;
