const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    name: String,
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", schema);

exports.validateSubCategory = (subCategory) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().required(),
  });
  return Joi.validate(subCategory, schema);
};

exports.validateUpdateSubCategory = (subCategory) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    category: Joi.string(),
  });
  return Joi.validate(subCategory, schema);
};
exports.SubCategory = SubCategory;
