const userModel = require('../models/user')
const productModel = require('../models/products')
const orderModel = require('../models/orders')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const axios = require('axios')

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
    // console.log(token)
    res.json(user);
  }
  catch (error) {
    res.json({ "error": error.message })
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 1 })
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
  const token = req.cookies?.jwt;
  if (token) {
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
  const { jwt } = req.cookies;
  const decodedToken = jsonwebtoken.decode(jwt);
  const id = decodedToken.id;
  const data = new orderModel({
    orderName, price, date: new Date().getTime(), userId: id, productIds, deliveredAddress: address
  })
  const result = await data.save();
  res.json(result)
}

// orders 
// module.exports.orders = async (req, res) => {
//   const { jwt } = req.cookies;
//   const decodedToken = jsonwebtoken.decode(jwt);
//   const id = decodedToken.id;
//   const ordersList = await orderModel.find({ userId: id });
//   const promises = ordersList.map(async (ele) => {
//     let l = []
//     const productPromises = ele.productIds.map(async (id) => {
//       return { data } = await axios.get(`http://localhost:800/overview/${id}`)
//     })

//     // console.log(productPromises)
//     productPromises.then((result) => {
//       return {
//         orderId: ele._id,
//         products: result
//       }
//     })

//     Promise.all(productPromises)
//       .then((result) => {
//         console.log(result.data)
//         l.push(result.data)
//       })
//   })
//   console.log(promises)
// }
module.exports.orders = async (req, res) => {
  const { jwt } = req.cookies;
  const decodedToken = jsonwebtoken.decode(jwt);
  const id = decodedToken.id;
  const ordersList = await orderModel.find({ userId: id });
  const promises = ordersList.map(async (ele) => {
    const productPromises = ele.productIds.map(async (id) => {
      const response = await axios.get(`http://localhost:800/overview/${id}`);
      return response.data;
    });
    const products = await Promise.all(productPromises);
    return {
      orderId: ele._id,
      products: products,
      price: ele.price,
      name: ele.orderName,
      date:ele.date
    };
  });
  const results = await Promise.all(promises);
  res.json(results);
};