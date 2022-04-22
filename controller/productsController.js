const {Products,validateProducts} = require('./../models/productsModel');
const asyncError = require('./../middleware/asyncError');
const upload = require('./../middleware/cloudinary')


exports.createProducts = asyncError(async(req,res)=>{
    

    const {error} = validateProducts(req.body);
    if (error)return res.status(400).json({
        status :"false",
        message :error.details[0].message
    });

   let products =await Products.findOne({name:req.body.name});
   if(products) res.status(404).json({
    status:false,   
    message:"this name is created before" })
    const result = await upload.uploads(req.file.path);

     products = new Products({
        name:req.body.name, 
        buyPrice:req.body.buyPrice ,
        sellingPrice:req.body.sellingBrice ,
        size:req.body.size ,
        color:req.body.color ,
        brand:req.body.brand ,
        country:req.body.country ,
        city:req.body.city ,
        description:req.body.description ,
        picture:req.file.originalname,
        url:result.url ,
     });

     
    
     await products.save();


    res.status(200).json({
        message:'true',
        products
    })


})