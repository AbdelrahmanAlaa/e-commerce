const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
require('dotenv').config();

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

    imageCover: {type:String},

    images: [{ type: String }],
  },
  { timestamps: true }
);

const setUrlImages = (doc)=>{
  
 if(doc.imageCover ){
  const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`
  doc.imageCover = imageUrl
}
if(doc.images){
images = [];
   doc.images.forEach((doc)=>{
    console.log(doc)
  const imageUrl = `${process.env.BASE_URL}/products/${doc}`
images.push(imageUrl)
  })
  doc.images = images;

}
}
// for find and update 
schema.post('init',(doc)=>{
  setUrlImages(doc)
 })
//  for post 
 schema.post('save',(doc)=>{
  setUrlImages(doc)
 })
const Product = mongoose.model("Product", schema);

exports.validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(20).max(10000).required(),
    quantity: Joi.number().min(1).max(500).required(),
    sold: Joi.number(),
    price: Joi.number().min(1).max(1000000).required(),
    priceAfterDiscount: Joi.number().max(100000),
    colors: Joi.array().min(1).max(50).required(),
    imageCover: Joi,
    images: Joi,
    category: Joi.string().required(),
    brand: Joi.string(),
    subCategory: Joi.array().max(50),
  });
  return Joi.validate(product, schema);
};

exports.validateUpdateProduct = (product)=>{
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(20).max(10000),
    quantity: Joi.number().min(1).max(500),
    price: Joi.number().min(1).max(1000000),
    priceAfterDiscount: Joi.number().max(100000),
    colors: Joi.array().min(1).max(50),
    imageCover: Joi.string().min(2).max(50),
    images: Joi.string(),
    category: Joi.string(),
    brand: Joi.string(),
    subCategory: Joi.array().max(50),
  })
  return Joi.validate(product, schema);
}



exports.Product = Product;
