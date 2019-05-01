import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const BidSchema = new Schema(
  {
    item: {
      type: ObjectId,
      ref: 'Item',
      required: true
    },
    bidder: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const BidModel = mongoose.model('Bid', BidSchema);
export default BidModel;
