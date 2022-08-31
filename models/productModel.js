const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subCategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    title: { type: String },

    description: { type: String },

    quantity: { type: String },

    sold: { type: Number, default: "0" },

    price: { type: Number },

    priceAfterDiscount: { type: Number },

    colors: [{ type: String }],

    imageCover: { type: String },

    images: [{ type: String }],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", schema);

exports.validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(20).max(255).required(),
    quantity: Joi.number().min(1).max(500).required(),
    sold: Joi.number(),
    price: Joi.number().min(1).max(1000000).required(),
    priceAfterDiscount: Joi.number().max(100000),
    colors: Joi.array().min(1).max(50).required(),
    imageCover: Joi.string().min(2).max(50).required(),
    image: Joi.string(),
    category: Joi.string().required(),
    brand: Joi.string(),
    subCategory: Joi.array().max(50),
  });
  return Joi.validate(product, schema);
};

exports.validateUpdateProduct = (product)=>{
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(20).max(255),
    quantity: Joi.number().min(1).max(500),
    price: Joi.number().min(1).max(1000000),
    priceAfterDiscount: Joi.number().max(100000),
    colors: Joi.array().min(1).max(50),
    imageCover: Joi.string().min(2).max(50),
    image: Joi.string(),
    category: Joi.string(),
    brand: Joi.string(),
    subCategory: Joi.array().max(50),
  })
}

exports.Product = Product;
