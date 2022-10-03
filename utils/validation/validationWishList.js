const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { Product } = require("../../models/productModel");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("invalid Review id format "),
  validatorMiddleware,
];

exports.createWishListValidator = [
  check("productId")
    .notEmpty()
    .withMessage(" Product of Review required")
    .isMongoId()
    .withMessage("Invalid Id formate ")
    .custom(async (val, { req }) => {
      const product = await Product.findById(req.body.productId);
      console.log(product);
      if (!product)
        return Promise.reject(new Error(`No product for this id: ${val}`));
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
