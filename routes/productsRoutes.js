const express = require('express');
const products = require('../controller/productsController');
const authUser = require('../controller/authUsersController')
const admin = require('../middleware/admin');
const router = express.Router();
const multerConfig = require('./../middleware/multer')


router
.route('/creatProducts')
.post(
    authUser.auth,
    admin.admin,
    multerConfig,
    products.createProducts) 


module.exports = router ; 
