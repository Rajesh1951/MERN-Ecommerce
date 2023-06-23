const userModel = require('../models/user')
const productModel = require('../models/products')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const createToken = (id) => {
  return jsonwebtoken.sign({ id }, 'secret')
}
// user signup
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = new userModel({
      name,
      email,
      password,
    })
    userData.password = bcrypt.hashSync(userData.password, 10);
    const saved = await userData.save();
    res.json({ saved })
  }
  catch (error) {
    res.json({ "error": error.message })
  }
}

// user login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      sameSite: 'lax',
      secure: false,
      httpOnly: true
    });
    res.json(user);
  }
  catch (error) {
    res.json({ "error": error.message })
  }
}

// get list of products
module.exports.getProducts = async (req, res) => {
  const list = await productModel.find();
  res.send(list)
}

// add new product to DB
module.exports.addProduct = async (req, res) => {
  const { name, price, description, category, images, stock, sellingUser, rating } = req.body;
  const productData = new productModel({
    name, price, description, category, images, stock, sellingUser, rating
  })
  const saved = await productData.save();
  res.json(saved)
}

// adding review
module.exports.addReview = async (req, res) => {
  const { id, review } = req.body;
  const product = await productModel.findById(id);
  product.reviews = [...product.reviews, review];
  await product.save();
  res.json(product);
}

// get overview
module.exports.overview = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await productModel.findById(id);
    res.json(user);
  }
  catch (error) {
    res.json("Product not found")
  }
}