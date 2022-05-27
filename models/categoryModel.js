const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,

    image: String,
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

exports.validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  return Joi.validate(category, schema);
};

exports.validateUpdate = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
  });
  return Joi.validate(category, schema);
};

exports.Category = Category;
