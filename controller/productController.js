const { Product} = require("../models/productModel");
const factory = require('./handlersFactory')

exports.validReq = (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};

exports.createProduct = factory.createOne(Product,"Products")

exports.getOne  =factory.getOne(Product)

exports.getProduct = factory.getAll(Product)

exports.updateProduct = factory.update(Product)

exports.deleteProduct =factory.deleteOne(Product)

