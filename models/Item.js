const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auction = require('./Auction');

const ItemSchema = new Schema({
  Auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Auction,
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
    required: true
  },
  duration: {
    type: Number,
    default: 30
  }
});

const ItemModel = mongoose.model('items', ItemSchema);
module.exports = ItemModel;
