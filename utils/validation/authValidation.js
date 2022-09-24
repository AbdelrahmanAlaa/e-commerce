const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { User } = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required ")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .isLength({ max: 100 })
    .withMessage("too long name "),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(
            new Error("this Email already register before ")
          );
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),

  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required"),

  validatorMiddleware,
];

exports.LoginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];

exports.getAuthValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
