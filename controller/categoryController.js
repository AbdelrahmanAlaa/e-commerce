const sharp = require('sharp')
const asyncHandler = require('express-async-handler')

const ApiFeatures = require('../middleware/apiFeatures')
const factory = require('./handlersFactory.js')
const {uploadSingleImage} = require('../middleware/multer') 
const { Category } = require("../models/categoryModel");



  exports.uploadImage = uploadSingleImage('image')

exports.resizeImage = factory.resizeImage('category',600 , 600)


exports.createCategory = factory.createOne(Category)

exports.getCategory = asyncHandler(async (req, res) => {
 
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
