const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"please enter name"]
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Enter valid email']
  },
  password: {
    type: String,
    required: true
  },
})

userSchema.statics.login = async function login(email, password) {
  try {
    const user = await this.findOne({email});
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return user;
      }
      else {
        throw new Error("Wrong Password")
      }
    }
    throw new Error("Email not Registered");
  } catch (error) {
    throw error;
  }
}
module.exports = new mongoose.model('User', userSchema);