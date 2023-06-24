const express = require('express')
const productModel = require('./models/products')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/approutes')
const cookieParser = require('cookie-parser')
const mongoConnect = 'mongodb+srv://raj:Jl0F9kB8GH9lWcgv@cluster0.btmzq2e.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoConnect)
  .then(() => console.log('mongoDB connected'
    // ,storeData()
  ))
  .catch((error) => console.log('mongoDB conection failed', error))
const app = express();
app.get('/', (req, res) => {
  res.send("Jai Shri Ram")
})
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ urlencoded: true }));

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
// async function fetch() {
//   const { data } = await axios.get('http://localhost:800/products');
//   console.log(data)
//   for (let i of data) {
//     const { name, price, description, category, images, stock, sellingUser, rating } = i;
//     const productData = new productModel({
//       name, price: Number(price), description, category, images, stock, sellingUser, rating: Number(rating)
//     })
//     const saved = await productData.save();
//   }
// }

app.use(router)
app.listen(800, (e) => console.log('listening @ 800',))
// let images = [], prices = [], names = [], description = [], ratings = [];
// function arrays() {
//   const fs = require('fs');
//   const cheerio = require('cheerio');

//   const htmlContent = fs.readFileSync('tv.html', 'utf8');

//   const $ = cheerio.load(htmlContent);

//   const criteria = {
//     class: '_396cs4',
//   };
//   const criteria1 = {
//     class: '_30jeq3 _1_WHN1'
//   }
//   const descCriteria = {
//     class: '_1xgFaf'
//   }
//   // to get list of images
//   const matchingImages = $('img').filter((_, el) => {
//     if ($(el).attr('class') !== criteria['class']) {
//       return false;
//     }
//     return true;
//   });

//   // list of prices
//   const matchingSpan = $('div').filter((_, el) => {
//     if ($(el).attr('class') !== criteria1['class']) {
//       return false;
//     }
//     return true;
//   });
//   let counter = 0;
//   matchingImages.each((_, el) => {
//     if (counter >= 10) {
//       return false;
//     }
//     // console.log($(el).attr('src'), $(el).attr('alt'));
//     images.push($(el).attr('src'));
//     names.push($(el).attr('alt'));
//     counter++;
//   });
//   matchingSpan.each((_, el) => {
//     if (prices.length >= 10) {
//       return false;
//     }
//     // console.log($(el).text())
//     prices.push($(el).text())
//   });


//   // to get description
//   const divClass = '_1xgFaf';

//   const selectedDivs = $(`ul.${divClass}`);

//   selectedDivs.each((_, divElement) => {
//     const liElements = $(divElement).find('li').slice(0, 3);
//     let desc = []
//     liElements.each((_, liElement) => {
//       desc.push($(liElement).text());
//       // console.log($(liElement).text())
//     });
//     description.push(desc.join('. '));
//   });

//   // to get ratings
//   const rateClass = '_3LWZlK';
//   const ratingDiv = $(`div.${rateClass}`)
//   ratingDiv.each((_, ele) => {
//     if (ratings.length >= 10)
//       return false;
//     ratings.push($(ele).text())
//   })

//   // IRpwTa name <a>.text
//   // _2r_T1I img src
//   // _30jeq3 price div text
// }
// function clothArray() {
//   const fs = require('fs');
//   const cheerio = require('cheerio');

//   const htmlContent = fs.readFileSync('mibile.html', 'utf8');

//   const $ = cheerio.load(htmlContent);
//   // to get name
//   const nameClass = 'IRpwTa';
//   const nameDiv = $(`a.${nameClass}`)
//   nameDiv.each((_, ele) => {
//     if (names.length >= 10)
//       return false;
//     names.push($(ele).attr('title'))
//   })
//   // to get ratings
//   const imgDiv = $(`img.${'_2r_T1I'}`)
//   imgDiv.each((_, ele) => {
//     if (images.length >= 10)
//       return false;
//     images.push($(ele).attr('src'))
//   })

//   const priceDiv = $(`div.${'_30jeq3'}`)
//   priceDiv.each((_, ele) => {
//     if (prices.length >= 10) {
//       return false;
//     }
//     prices.push($(ele).text());
//   })
// }
// arrays()
// let sellers = ['Rajesh', 'Shivaraj', 'Ramesh', 'Sudeep', 'Darshan', 'Manoj'];

// console.log(description)
// clothArray()
// for (let i = 0; i < 10; i++) {
//   console.log(names[i], prices[i], images[i], description[i], ratings[i])
// }
// async function storeData() {
//   for (let i = 0; i < images.length; i++) {
//     const data = await productModel({
//       name: names[i],
//       price: prices[i],
//       description: names[i],
//       category: 'tv',
//       images: [images[i]],
//       stock: String(Math.floor(Math.random() * 50)),
//       sellingUser: sellers[Math.floor(Math.random() * 6)],
//       verfied: true,
//       rating: ratings[i],
//     })
//     const result = await data.save()
//   }
// }