const {validateUser,validateLogin,creatRandomPassword,validateRestPassword}=require('./../models/userModel.js')


exports.validateRegister =async(req,res,next)=>{
    try{
        await validateUser(req.body);
    next();
}
catch(error){    
    if (error)await res.status(400).json({
        status :"false",
        message :error.details[0].message
    });
}}
exports.validateLogin =async(req,res,next)=>{
    try{
      await validateLogin(req.body);
    next();
}
catch(error){    
    if (error)await res.status(400).json({
        status :"false",
        message :error.details[0].message
    });
}}

exports.validateRestPassword =async(req,res,next)=>{
    try{
      await validateRestPassword(req.body);
    next();
}
catch(error){    
    if (error)await res.status(400).json({
        status :"false",
        message :error.details[0].message
    });
}}

