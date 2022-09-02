const { Product} = require("../models/productModel");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require('../middleware/apiFeatures');
const factory = require('./handlersFactory')

exports.validReq = (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};

exports.createProduct = factory.create(Product)

exports.getProduct = asyncError(async (req, res) => {

  // Build Query
  
  const contDocuments=await Product.countDocuments();
const apiFeatures = new ApiFeatures(req.query,Product.find())
.sort()
.paginate(contDocuments)
.limitFields()
.filter()
.search('Products');

 const {mongooseQuery,paginationResult} = apiFeatures; 
  const product = await mongooseQuery;
    if (!product) res.status(404).json({ message: "this id is not found ..! " });
  
    res.status(200).json({ result: product.length,paginationResult,product });
  
});

exports.updateProduct = factory.update(Product)

exports.deleteProduct =factory.deleteOne(Product)

