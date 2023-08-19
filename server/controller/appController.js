const userModel = require('../models/user')
const productModel = require('../models/products')
const orderModel = require('../models/orders')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const axios = require('axios')

// create token
const createToken = (id) => {
  return jsonwebtoken.sign({ id }, 'secret')
}

// handle errors
const handleErrors = (error) => {
  // E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "asd@gmail.com" }
  if (error?.code === 11000) {
    return { error: "Email is registered" }
  }

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
    const token = createToken(saved._id)
    res.json({ token })
  }
  catch (error) {
    res.json(handleErrors(error))
  }
}

// user login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.json(token);
  }
  catch (error) {
    res.json({ "error": error.message })
  }
}

module.exports.logout = (req, res) => {
  res.send('logged out')
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

// get loggedIn status
module.exports.isLoggedin = async (req, res) => {
  const authHeader = req.headers?.authorization;
  if (authHeader) {
    const token=authHeader.split(' ')[1]
    jsonwebtoken.verify(token, 'secret', (error, decodeToken) => {
      if (error) {
        console.log(error)
        res.send(false)
      }
      else {
        res.send(true)
      }
    })
  }
  else {
    res.send(false)
  }
}

// create order
module.exports.createOrder = async (req, res) => {
  const { orderName, price, productIds, address } = req.body;
  const jwt = req.headers.authorisation.split(' ')[1];
  const decodedToken = jsonwebtoken.decode(jwt);
  const id = decodedToken.id;
  const data = new orderModel({
    orderName, price, date: new Date().getTime(), userId: id, productIds, deliveredAddress: address
  })
  const result = await data.save();
  res.json(result)
}

module.exports.orders = async (req, res) => {
  try {
    const authHeader = req.headers.authorisation;
    const jwt = authHeader.split(' ')[1];
    const backend = 'http://localhost:800'
    const decodedToken = jsonwebtoken.decode(jwt);
    const id = decodedToken.id;
    const ordersList = await orderModel.find({ userId: id });
    const promises = ordersList.map(async (ele) => {
      const productPromises = ele.productIds.map(async (id) => {
        const response = await axios.get(`${backend}/overview/${id}`);
        return response.data;
      });
      const products = await Promise.all(productPromises);
      return {
        orderId: ele._id,
        products: products,
        price: ele.price,
        name: ele.orderName,
        date: ele.date
      };
    });
    const results = await Promise.all(promises);
    res.json(results);
  }
  catch (error) {
    res.json(error)
  }
};
