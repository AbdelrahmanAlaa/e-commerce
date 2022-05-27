const { Brand } = require("../models/brandModel");
const asyncError = require("../middleware/asyncError");

exports.creatBrand = asyncError(async (req, res) => {
  let brand = new Brand({
    name: req.body.name,
  });
  await brand.save();
  res.status(200).json({ status: "true", brand });
});

exports.getBrand = asyncError(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const brand = await Brand.find().limit(limit).skip(skip);
  res.status(200).json({ length: brand.length, page, brand });
});

exports.updateBrand = asyncError(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand)
    res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });

  res.status(200).json({ status: "true", brand });
});
exports.deleteBrand = asyncError(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand)
    res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });
  res
    .status(200)
    .json({ status: "true", message: "this Brand is deleted successfully" });
});
