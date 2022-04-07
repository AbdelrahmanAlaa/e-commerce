const {validateUser}=require('./../models/userModel.js')
const asyncError = require('./asyncError');


exports.validateMessage =asyncError( async(req,res)=>{

    const {error} = validateUser(req);
    if (error) return ({
        status:'false',
        message:error.details[0].message
    })
})

