const asyncHandler = require("express-async-handler");

const ApiFeatures = require("../middleware/apiFeatures");
const factory = require("./handlersFactory");
const { Review } = require("../models/reviewModel");

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  console.log(req.params.productId);
  if (req.params.productId) filterObj = { productId: req.params.productId };
  req.filterObj = filterObj;
  next();
};

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.productId) {
    req.body.productId = req.params.productId;
  }
  if (!req.body.userId) {
    req.body.userId = req.user._id;
  }
  next();
};
exports.createReview = factory.createOne(Review);

exports.getReviewById = factory.getOne(Review);

exports.getReview = factory.getAll(Review);

exports.updateReview = factory.update(Review);

exports.deleteReview = factory.deleteOne(Review);
