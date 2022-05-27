const { Category } = require("../models/categoryModel");
const asyncError = require("../middleware/asyncError");

exports.creatCategory = asyncError(async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(200).json({ status: "true", category });
});

exports.getCategory = asyncError(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const category = await Category.find().limit(limit).skip(skip);
  res.status(200).json({ length: category.length, page, category });
});

exports.updateCategory = asyncError(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category)
    res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });

  res.status(200).json({ status: "true", category });
});

exports.deleteCategory = asyncError(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!category)
    res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });
  res
    .status(200)
    .json({ status: "true", message: "this category is deleted successfully" });
});
