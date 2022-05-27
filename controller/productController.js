const { Product, validateProduct } = require("../models/productModel");
const asyncError = require("../middleware/asyncError");
const { Category } = require("../models/categoryModel");

exports.validReq = (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};

exports.createProduct = asyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
});

exports.getProduct = asyncError(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  // let filterObject = {};
  // if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const product = await Product.find().skip(skip).limit(limit);

  if (!product) res.status(404).json({ message: "this id is not found ..! " });

  res.status(200).json({ result: product.length, page, product });
});

exports.updateProduct = asyncError(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) res.status(404).json({ message: "this id is not found .. " });

  res.status(200).json({ product });
});

exports.deleteProduct = asyncError(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id, {
    active: false,
  });
  if (!product) res.status(404).json({ message: "this id is not found .. " });

  res.status(200).json({ message: "successfully deleted .. " });
});
