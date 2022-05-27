const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: String,

    image: String,
  },
  { timestamps: true }
);
const Brand = mongoose.model("Brand", brandSchema);

exports.validateBrand = (brand) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return Joi.validate(brand, schema);
};

exports.validateUpdateBrand = (brand) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
  });
  return Joi.validate(brand, schema);
};

exports.Brand = Brand;
