const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { User } = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.createUserValidator = [
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

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("profileImg").optional(),

  check("role").optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .isLength({ max: 100 })
    .withMessage("too long name "),

  check("email")
    .optional()
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

  check("country").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("profileImage").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("You must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (val, { req }) => {
      // 1) Verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      // 2) Verify password confirm
      if (val !== req.body.confirmPassword) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

// const {
//   validateUser,
//   validateLogin,
//   validateRestPassword,
// } = require("../../models/userModel");

// exports.validateRegister = async (req, res, next) => {
//   try {
//     await validateUser(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// };
// exports.validateLogin = async (req, res, next) => {
//   try {
//     await validateLogin(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// };

// exports.validateRestPassword = async (req, res, next) => {
//   try {
//     await validateRestPassword(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// };
