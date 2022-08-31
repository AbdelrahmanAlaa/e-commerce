const { Category } = require("../models/categoryModel");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require('../middleware/apiFeatures')
const factory = require('./handlersFactory.js')

exports.createCategory = asyncError(async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(200).json({ status: "true", category });
});

exports.getCategory = asyncError(async (req, res) => {
 
  const contDocuments=await Category.countDocuments();

  const apiFeatures = new ApiFeatures(req.query , Category.find())
  .sort()
  .paginate(contDocuments)
  .limitFields()
  .filter()
  .search();
  const {mongooseQuery,paginationResult} = apiFeatures; 
  const category = await mongooseQuery;
  res.status(200).json({ length: category.length, paginationResult, category });
});

exports.updateCategory = factory.update(Category)

exports.deleteCategory = factory.deleteOne(Category)
