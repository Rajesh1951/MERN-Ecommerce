const { Router } = require('express')
const appController = require('../controller/appController')
const router = Router();

router.post('/signup', appController.signup);
router.post('/addproduct', appController.addProduct);
router.post('/addcomment', appController.addReview);
router.get('/products', appController.getProducts);
router.post('/login', appController.login);
router.get('/logout', appController.logout);
router.get('/overview/:id',appController.overview)
router.get('/loggedIn',appController.isLoggedin)
module.exports = router