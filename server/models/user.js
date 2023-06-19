const mongoose = require('mongoose');
const {isEmail } = require('validator');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate:[isEmail,'Enter valid email']
  },
  password: {
    type: String,
    required: true
  },
})

module.exports = new mongoose.model('User', userSchema);