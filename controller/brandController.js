const { Brand } = require("../models/brandModel");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require("../middleware/apiFeatures");
const factory =require('./handlersFactory')
exports.createBrand = asyncError(async (req, res) => {
  let brand = new Brand({
    name: req.body.name,
  });
  await brand.save();
  res.status(200).json({ status: "true", brand });
});

exports.getBrand = asyncError(async (req, res) => {
   
  const contDocuments=await Brand.countDocuments();

  const apiFeatures = new ApiFeatures(req.query,Brand.find())
  .sort()
  .paginate(contDocuments)
  .limitFields()
  .filter()
  .search();
  const {mongooseQuery,paginationResult} = apiFeatures; 
  const brand = await mongooseQuery;
  res.status(200).json({ length: brand.length, paginationResult, brand });
});

exports.updateBrand = factory.update(Brand)

exports.deleteBrand = factory.deleteOne(Brand)
