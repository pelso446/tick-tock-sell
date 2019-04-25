const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Item = require('./Item');

const AuctionSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  /*   items: {
    type: [Item]
  },
  number_of_items: {
    type: Number,
    default: items.length
  }, */
  items: {
    type: String,
    default: 'Saker'
  },
  number_of_items: {
    type: Number,
    default: 6
  },
  start_time: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const AuctionModel = mongoose.model('auctions', AuctionSchema);
module.exports = AuctionModel;
