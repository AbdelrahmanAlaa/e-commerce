const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
 require('dotenv').config()

const categorySchema = new mongoose.Schema(
  {
    name: String,

    image: String,
  },
  { timestamps: true }
);

// for find and update 
categorySchema.post('init', (doc)=>{
  if(doc.image){
    const imageUrl = `${process.env.BASE_URL}/category/${doc.image}`;
    doc.image = imageUrl
  }
});
// for post 
categorySchema.post('save', (doc)=>{
  if(doc.image){
    const imageUrl = `${process.env.BASE_URL}/category/${doc.image}`;
    doc.image = imageUrl
  }
});

const Category = mongoose.model("Category", categorySchema);

exports.validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    image: Joi.string(),
  
  });
  return Joi.validate(category, schema);
};

exports.validateUpdate = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    image: Joi.string(),

  });
  return Joi.validate(category, schema);
};







exports.Category = Category;
