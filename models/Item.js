import mongoonse, { Schema } from 'mongoose';
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
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    duration: {
      type: Number,
      default: 30
    }
  },
  { timestamps: true }
);

const ItemModel = mongoonse.model('items', ItemSchema);
export default ItemModel;
