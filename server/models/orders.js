const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date:{
    type:Date
  },
  price:{
    type:String
  }
})