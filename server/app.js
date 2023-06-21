const express = require('express')
const axios = require('axios')
const productModel =require('./models/products')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/approutes')
const mongoConnect = 'mongodb+srv://raj:Jl0F9kB8GH9lWcgv@cluster0.btmzq2e.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoConnect)
  .then(() => console.log('mongoDB connected'))
  .catch((error) => console.log('mongoDB conection failed', error))
const app = express();
app.get('/', (req, res) => {
  res.send("Jai Shri Ram")
})
app.use(express.json())
app.use(cors())
app.use(router)
let data = []
async function fetch() {
  const { data } = await axios.get('http://localhost:800/products');
  console.log(data)
  for (let i of data) {
    const { name, price, description, category, images, stock, sellingUser, rating } = i;
    const productData = new productModel({
      name, price: Number(price), description, category, images, stock, sellingUser, rating: Number(rating)
    })
    const saved = await productData.save();
  }
}

app.listen(800, (e) => console.log('listening @ 800'))