const {
  Product,
   validateProduct,
  validateUpdateProduct,
} = require("../../models/productModel");
const { Category } = require("../../models/categoryModel");
const { SubCategory } = require("../../models/subCategoryModel");
const { Brand } = require("../../models/brandModel");
 const upload = require('../../middleware/cloudinary')
 const asyncError = require("../../middleware/asyncError")
 const fs = require('fs')
exports.validateProduct = asyncError(async (req, res, next) => {
  try {

    // validate name and check is created before or not
    // const product = await Product.findOne({ title: req.body.title });
    // if (product)
    //   return res
    //     .status(404)
    //     .send({ message: "this name is exactly created.. " });

// console.log(req.file)

// console.log(req.body)
    // validate Joi before created

    // if (req.files.images) {
    //   req.body.images = [];
    //   await Promise.all(
    //     req.files.images.map(async (img) => {
    //       console.log(img.path)
    //       const result = await upload.uploads(img.path);
    //       console.log(result)
    //       req.body.images.push(result);
    //       fs.unlinkSync(img.path);
    //     })
    //   );
    // }
   
if (req.files.imageCover){
  req.body.imageCover = [];
  await Promise.all(
    req.files.imageCover.map(async (img) => {
      const result = await upload.uploads(img.path);
      console.log(result)
      req.body.imageCover.push(result);
      fs.unlinkSync(img.path);
    })
  );
}
await validateProduct(req.body);

  if(req.body.category){
    const category = await Category.findById({ _id: req.body.category });
    if (!category)
      return res.status(404).send({ message: " no category  like this id " });
    }

    if (req.body.brand) {
      const brand = await Brand.findById({ _id: req.body.brand });
      if (!brand)
        return res.status(404).send({ message: " No brand like this id  " });
    }

    if (req.body.subCategory) {
      const subCategory = await SubCategory.find({_id:{$exists:true , $in:req.body.subCategory} });
      if (
        subCategory.length < 1 ||
        req.body.subCategory.length != subCategory.length
      )
        return res.status(404).send({ message: "invalid subCategories ids " });

        // console.log(subCategory)
      const validateCategory = await SubCategory.find({
        category: req.body.category,
      });
      // console.log(validateCategory)
   const subCategoryId = [];
   validateCategory.forEach((subCategory)=>{
    // console.log(subCategory)
    subCategoryId.push(subCategory._id.toString())
    
   })
  //  console.log(subCategoryId)

if(!req.body.subCategory.every(x => subCategoryId.includes(x)))
return res.status(404).json({
  status:'false',
  message:'subCategories not belong to category'
})

}

    next();

  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
})

exports.validateUpdate = async (req, res, next) => {
  try {
    await validateUpdateProduct(req.body);
    next();
  } catch (error) {
    if (error)
      await res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
