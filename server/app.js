const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')
const router = require('./routes/approutes')
const cookieParser = require('cookie-parser')
const mongoConnect = `${process.env.MONGO_URI}`
mongoose.connect(mongoConnect)
  .then(() => console.log('mongoDB connected'
  ))
  .catch((error) => console.log('mongoDB conection failed', error))
const app = express();
app.get('/', (req, res) => {
  res.send("Jai Shri Ram")
})
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ urlencoded: true }));

const corsOptions = {
  origin: ['http://localhost:3000', 'https://merncommerce.netlify.app'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(router)
app.listen(800, (e) => console.log('listening @ 800'))
