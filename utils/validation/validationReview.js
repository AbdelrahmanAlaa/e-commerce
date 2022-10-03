const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { Product } = require("../../models/productModel");
const { Review } = require("../../models/reviewModel");
const { User } = require("../../models/userModel");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("invalid Review id format "),
  validatorMiddleware,
];

exports.createReviewValidator = [
  check("title")
    .notEmpty()
    .withMessage(" title of Review required")
    .isLength({ min: 3 })
    .withMessage("Too short Review title")
    .isLength({ max: 500 })
    .withMessage("Too long Review title"),

  check("rating")
    .notEmpty()
    .withMessage(" rating of Review required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating value must be between 1 to 5"),

  check("productId")
    .notEmpty()
    .withMessage(" Product of Review required")
    .isMongoId()
    .withMessage("Invalid Id formate ")
    .custom(async (val, { req }) => {
      const review = await Review.findOne({
        userId: req.user._id,
        productId: req.body.productId,
      });
      if (review)
        return Promise.reject(
          new Error("you already reviewed this product before ")
        );
    }),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format ")
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        return Promise.reject(new Error("there is no review for this id "));
      }

      if (review.userId._id.toString() != req.user._id.toString()) {
        return Promise.reject(
          new Error("Your are not allowed to perform this action  ")
        );
      }
    }),
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short Review title")
    .isLength({ max: 500 })
    .withMessage("Too long Review title"),
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating value must be between 1 to 5"),

  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .custom(async (val, { req }) => {
      if (req.user.role == "user") {
        const review = await Review.findById(val);
        if (!review) {
          return Promise.reject(new Error("there is no review for this id "));
        }
        if (review.userId._id.toString() != req.user._id.toString()) {
          return Promise.reject(
            new Error("Your are not allowed to perform this action  ")
          );
        }
      }
    }),
  validatorMiddleware,
];
