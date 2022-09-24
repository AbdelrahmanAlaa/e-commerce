const express = require("express");
const {
  auth,
  forgetPassword,
  register,
  login,
} = require("../controller/authUsersController");
const router = express.Router();
const {
  LoginValidator,
  getAuthValidator,
  registerValidator,
} = require("../utils/validation/authValidation");

// routes of review controller
router.route("/register").post(registerValidator, register);

router.route("/login").post(LoginValidator, login);

// router.route("/getAllUsers").get(authUsers.getAllUsers);

// router.route("/getUserById/:id").get(authUsers.getUserById);

router.route("/forgetPassword").post(forgetPassword);

// router
//   .route("/restPassword/:token")
//   .post(validate.validateRestPassword, authUsers.restPassword);

module.exports = router;
