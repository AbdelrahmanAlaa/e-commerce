const { SubCategory } = require("../models/subCategoryModel");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require('../middleware/apiFeatures');
const factory = require('./handlersFactory')
// const upload = require("./../middleware/cloudinary");

exports.createSubCategory = asyncError(async (req, res) => {
  const subCategory = await SubCategory.create({
    name: req.body.name,
    category: req.body.category,
  });
  res.status(200).json({ subCategory });
});

exports.getSubCategory = asyncError(async (req, res) => {
  
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
  
// const countDocuments = await SubCategory.countDocuments();
//   const apiFeatures = new ApiFeatures(req.query,SubCategory.find({ filterObject }))
//   .filter()
//   .sort()
//   .search()
//   .paginate(countDocuments)
//   .limitFields();

// const {mongooseQuery, paginationResult} = apiFeatures;
// const subCategory = await mongooseQuery ; 

  // if (!subCategory)
  //   res.status(404).json({ message: "this id is not found ..! " });

  // res.status(200).json({ result: subCategory.length, paginationResult, subCategory });
});
exports.getSubCategoryByID = asyncError(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory)
    res.status(404).json({ message: "this id is not found ..! " });
  res.status(200).json({ subCategory });
});

exports.updateSubCategory = factory.update(SubCategory)
exports.deleteSubCategory =factory.deleteOne(SubCategory)
