const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  currentPrice: String,
  reviews: Number,
  image: String,
  // totalPurchases: String,
  priceHistory: [{ price: Number, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Product', productSchema);
