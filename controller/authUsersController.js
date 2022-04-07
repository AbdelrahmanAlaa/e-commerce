const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validateUser,validateLogin,creatRandomPassword,validateRestPassword} = require('../models/userModel');
const asyncError=require('../middleware/asyncError');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../middleware/email');
const crypto = require('crypto')

exports.register = asyncError(async (req, res,next) => {
    const {error} = validateUser(req.body);
    if (error)return res.status(400).json({
        status :"false",
        message :error.details[0].message
    });
    
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({
           status:"false",
            message :'That user already register!'});
            
     user = new User(req.body);
        user.confirmPassword=undefined ;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const token = jwt.sign({_id:user._id},process.env.JWTBRIVETKEY)
        res.header('x-auth-token',token)
        .status(200).json({
            status:"success",
            message: "successfully register",
            user  ,
            token  
        });
        await user.save();
});

exports.login = asyncError(async(req,res)=>{

    const {error} = validateLogin(req.body);
    if (error)return res.status(400).json({
        status :"false",
        message :error.details[0].message
    });
    
        let user = await User.findOne({email:req.body.email});
        if(!user)return res.status(404).json({
            status:'false',
            message:'check you email or password ... '
        });

        const validPassword = await bcrypt.compare(req.body.password , user.password);
        if(!validPassword)return res.status(404).json({
            status:'false',
            message:'check you email or password ... '
        });
        
        const token = jwt.sign({_id:user._id},process.env.JWTBRIVETKEY);
        res.header('x-auth-token',token)
        .status(200).json({
            status:'true',
            message: "successfully login",
            token,
            user:_.pick(user, ['_id', 'name', 'email'])
        })
});


exports.forgetPassword = asyncError(async(req,res)=>{

   let user = await User.findOne({email:req.body.email})
    if(!user)res.status(404).json({
        status :'false',
        message : 'this email is not found ..!'
 });
 
 const restToken = creatRandomPassword();
    user.passwordRestToken = passwordRestToken;
    user.passwordRestExpire= passwordRestExpire;

    await user.save()

    const restURL = `${restToken}`;

    const status = `Forgot Your password ? Submit a PATCH request with  your new password and 
    passwordConfirm to : <br>  your code : ${restURL} .<>  If you didn't forget your password , \n please ignore this email! `;
    
    try{
    await sendEmail({
        email:user.email,
        subject :`your password reset if you didn't forget your password please ignore this email`,
        status
    });
    res.status(200).json({
        status:'success',
        message: "Request was a success",
        message:'validation message sent to your email'
    })}

    catch(err){
        user.passwordRestToken =undefined;
        user.passwordRestExpires=undefined;

        return res.status(500).json('there was an error sending the email , try again later !!')
    }

});

exports.restPassword = asyncError(async(req,res)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex') ;

    const user = await User.findOne({
        passwordRestToken :hashedToken,
        passwordRestExpire:{$gt:Date.now()}
    });
    if(!user)return res.status(400).json('Token is invalid or expired ..');

     
    const {error}=validateRestPassword(req.body)
    if(error)return res.status(404).json({
        status:'failed',
        message:error.details[0].message
    })

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    

         user.confirmPassword=undefined;
        user.passwordRestToken =undefined;
        user.passwordExpires =undefined;

        await user.save();
        res.status(200).json({
        status:'success',
        message: "successfully rest password",
        user
    })
    

})




