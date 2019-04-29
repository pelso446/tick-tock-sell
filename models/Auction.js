import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const AuctionSchema = new Schema(
  {
    seller: {
      type: ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    items: [
      {
        type: ObjectId,
        ref: 'Item'
      }
    ],
    startTime: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const AuctionModel = mongoose.model('auctions', AuctionSchema);
export default AuctionModel;
