const express = require('express');
const authUsers = require('../controller/authUsersController');
const router = express.Router();
const validate = require('./../middleware/validationError')

// routes of review controller
router
.route('/register')
.post(validate.validateRegister,
    authUsers.register) 

router
.route('/login')
.post(validate.validateLogin,
    authUsers.login) 

router
.route('/forgetPassword')
.post(authUsers.forgetPassword) 

router
.route('/restPassword/:token')
.post(validate.validateRestPassword,
    authUsers.restPassword) 




module.exports = router ; 
