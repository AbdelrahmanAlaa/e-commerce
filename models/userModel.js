const Joi = require('@hapi/joi');
const Joia = require('joi');
const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = new mongoose.Schema({
   

    name: {
        type: String,
    },
    phone:{
        type:Number
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String

    },
    companyName:{
        type:String
    },
    firstAddress:{
        type:String
    },
    secondAddress:{
        type:String
    },
    zipCode:{
        type:Number
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    passwordRestToken:String,
    passwordRestExpire:String
})
const User = mongoose.model('User', schema);



exports.validateUser = (user)=>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
        confirmPassword: Joi.string().min(8).max(255).required().valid(user.password),
        phone:Joi.string().required(),
        companyName: Joi.string().min(5).max(50).required(),
        firstAddress: Joi.string().min(5).max(50).required(),
        secondAddress: Joi.string().min(5).max(50).required(),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.string().min(2).max(50).required(),
        zipCode: Joi.string().min(2).max(50).required()
        
    });
    return Joi.validate(user, schema);
}

exports.validateLogin = async(user)=>{
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required(),
    
    });
     
    return await Joi.validate(user, schema);
    
     
}

exports.validateRestPassword = (user)=> {
    const schema = {
         password: Joi.string().min(5).max(255).required() , 
         confirmPassword:Joi.string().min(8).max(255).required().equal(user.password)
        };

    return Joi.validate(user, schema);
} 

exports.creatRandomPassword = function(){
    const restToken = crypto.randomBytes(3).toString('hex');
    
   passwordRestToken= crypto 
    .createHash('sha256')
    .update(restToken)
    .digest('hex');
    
    passwordRestExpire= Date.now() + 10 * 60 * 1000
 
 
    return restToken;
}

exports.validateSearch = async (req, res, next) => {
    const schema = {
        password: Joi.string().min(5).max(255).required() , 
        confirmPassword:Joi.string().min(8).max(255).required().equal(user.password)
       };

    await Joi.validateAsync(user, schema);
    return next();
}

exports.User = User;
exports.schemaUser = schema;
