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
      type: Date,
      required: true,
      default: Date.now() + 0.2
    },
    duration: {
      type: Number,
      required: true,
      default: 360
    },
    auctionStarted: {
      type: Boolean,
      require: true,
      default: false
    },
    auctionFinished: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  { timestamps: true }
);

const AuctionModel = mongoose.model('Auction', AuctionSchema);
export default AuctionModel;
