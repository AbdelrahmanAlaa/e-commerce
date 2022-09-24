const asyncHandler = require("express-async-handler");

const ApiFeatures = require("../middleware/apiFeatures");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/multer");
const { Brand } = require("../models/brandModel");

exports.uploadImage = uploadSingleImage("image");

exports.resizeImage = factory.resizeImage("brand", 600, 600);

exports.createBrand = factory.createOne(Brand);
exports.getBrandById = factory.getOne(Brand);

exports.getBrand = asyncHandler(async (req, res) => {
  const contDocuments = await Brand.countDocuments();

  const apiFeatures = new ApiFeatures(req.query, Brand.find())
    .sort()
    .paginate(contDocuments)
    .limitFields()
    .filter()
    .search();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brand = await mongooseQuery;
  res.status(200).json({ length: brand.length, paginationResult, brand });
});

exports.updateBrand = factory.update(Brand);

exports.deleteBrand = factory.deleteOne(Brand);
