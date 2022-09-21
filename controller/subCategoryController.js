const asyncHandler = require('express-async-handler')

const { SubCategory } = require("../models/subCategoryModel");
const ApiFeatures = require('../middleware/apiFeatures');
const factory = require('./handlersFactory')
// const upload = require("./../middleware/cloudinary");

exports.createSubCategory = factory.createOne(SubCategory)

exports.getSubCategory = asyncHandler(async (req, res) => {
  
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const contDocuments=await SubCategory.countDocuments();
const apiFeatures = new ApiFeatures(req.query,SubCategory.find({filterObject}))
.sort()
.paginate(contDocuments)
.limitFields()
.filter()
.search();

 const {mongooseQuery,paginationResult} = apiFeatures; 
  const subCategory = await mongooseQuery;
    if (!subCategory) res.status(404).json({ message: "this id is not found ..! " });
  
    res.status(200).json({ result: subCategory.length,paginationResult,subCategory });
})
exports.getSubCategoryByID = factory.getOne(SubCategory)

exports.updateSubCategory = factory.update(SubCategory)
exports.deleteSubCategory =factory.deleteOne(SubCategory)
