const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  price: {
    type: String,
    required: true
  },
  deliveredAddress: {
    type: String,
    required: true
  },
  productIds: {
    type: [String],
    required: true
  }
})

const orderModel = new mongoose.model('Order', orderSchema);
module.exports = orderModel;