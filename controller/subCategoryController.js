const { SubCategory } = require("../models/subCategoryModel");
const asyncError = require("../middleware/asyncError");
const { Category } = require("../models/categoryModel");
// const upload = require("./../middleware/cloudinary");

exports.createSubCategory = asyncError(async (req, res) => {
  const subCategory = await SubCategory.create({
    name: req.body.name,
    category: req.body.category,
  });
  res.status(200).json({ subCategory });
});

exports.getSubCategory = asyncError(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  console.log(filterObject)
  const subCategory = await SubCategory.find({ filterObject })
    .skip(skip)
    .limit(limit);
    console.log(subCategory)

  if (!subCategory)
    res.status(404).json({ message: "this id is not found ..! " });

  res.status(200).json({ result: subCategory.length, page, subCategory });
});
exports.getSubCategoryByID = asyncError(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory)
    res.status(404).json({ message: "this id is not found ..! " });
  res.status(200).json({ subCategory });
});

exports.updateSubCategory = asyncError(async (req, res) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!subCategory)
    res.status(404).json({ message: "this id is not found .. " });

  res.status(200).json({ subCategory });
});

exports.deleteSubCategory = asyncError(async (req, res) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id, {
    active: false,
  });
  if (!subCategory)
    res.status(404).json({ message: "this id is not found .. " });

  res.status(200).json({ message: "successfully deleted .. " });
});
