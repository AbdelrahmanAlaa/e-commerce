const Joi = require('@hapi/joi');
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    picture:{
        type:[String]
    },
    url:{
           type:[String]
        }
   ,
    name: {
        type: String,
    },
    
    sellingPrice: {
        type: Number,
    },
    
    buyPrice: {
        type: Number,
    },
    
    size:{
        type:[String]
    },
    color:{
        type:[String]
    },
    brand:{
        type:String
    },
    description:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    rating:{
        type:Number
    },
    Quantity:{
        type:String
    }
})
const Products = mongoose.model('Products', schema);



exports.validateProducts = (products)=>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        sellingPrice: Joi.number().min(2).max(255).required(),
        buyPrice: Joi.number().min(2).max(255).required(),
        size: Joi.string().min(1).max(50).required(),
        color: Joi.string().min(2).max(50).required(),
        brand: Joi.string().min(2).max(50),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.string().min(2).max(50),
        description: Joi.string().max(1000),
        rating: Joi.string(),
       
        quantity:Joi.number().min(0).max(10000).required()
        
    });
    return Joi.validate(products, schema);
}
exports.Products = Products ;