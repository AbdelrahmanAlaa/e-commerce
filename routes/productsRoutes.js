const express = require('express');
const products = require('../controller/productsController');
const router = express.Router();
const multerConfig = require('./../middleware/multer')


router
.route('/creatProducts')
.post(
    multerConfig,
    products.createProducts) 


module.exports = router ; 
