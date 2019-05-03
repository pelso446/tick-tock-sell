import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const AuctionSchema = new Schema(
  {
    seller: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    bidders: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    startTime: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const AuctionModel = mongoose.model('Auction', AuctionSchema);
export default AuctionModel;
