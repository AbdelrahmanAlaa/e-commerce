const express = require('express');
const authUsers = require('../controller/authUsersController');
const router = express.Router();


// routes of review controller
router
.route('/register')
.post(authUsers.register) 

router
.route('/login')
.post(authUsers.login) 

router
.route('/forgetPassword')
.post(authUsers.forgetPassword) 



module.exports = router ; 
