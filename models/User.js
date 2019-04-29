const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId,
        ref: 'Auction'
      }
    ]
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
