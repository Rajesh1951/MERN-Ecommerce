const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    sellingUser: {
      // id of seller
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
      required: false,
    }
  }
)

module.exports = new mongoose.model('Product', productSchema);