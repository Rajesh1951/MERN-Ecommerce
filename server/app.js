const express = require('express')
const mongoose = require('mongoose')
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
app.use(router)
app.listen(800, (e) => console.log('listening @ 800'))