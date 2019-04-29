import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    auctions: [
      {
        type: ObjectId,
        ref: 'Auction'
      }
    ]
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
