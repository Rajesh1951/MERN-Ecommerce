const user = require('../models/user');
const userModel = require('../models/user')
const productModel = require('../models/products')
const bcrypt = require('bcrypt')

// user signup
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = new userModel({
    name,
    email,
    password,
  })
  userData.password = bcrypt.hashSync(userData.password, 10);
  const saved = await userData.save();
  res.json(saved)
}

// user login
module.exports.login = async (req, res) => {

}

// get list of products
module.exports.getProducts = async (req, res) => {
  const list = await productModel.find();
  res.json(list)
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