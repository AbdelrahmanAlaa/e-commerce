 const {User} = require('../models/userModel') 
 exports.admin =async function(req,res,next){   
    

       const user = await User.findOne(req.user).select('isAdmin')
     

       if(!user.isAdmin)res.status(403).json({message:'you not have access here ..'});

       next();
    
       
  
 }