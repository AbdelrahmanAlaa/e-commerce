const {
  Product,
  // validateProduct,
  validateUpdateProduct,
} = require("../../models/productModel");
const { Category } = require("../../models/categoryModel");
const { SubCategory } = require("../../models/subCategoryModel");
const { Brand } = require("../../models/brandModel");
const { push } = require("@hapi/joi/lib/ref");
const { forEach } = require("lodash");
exports.validateProduct = async (req, res, next) => {
  try {
    // validate name and check is created before or not
    // const product = await Product.findOne({ title: req.body.title });
    // if (product)
    //   return res
    //     .status(404)
    //     .send({ message: "this name is exactly created.. " });
    // validate Joi before created
    await validateProduct(req.body);

    const category = await Category.findById({ _id: req.body.category });
    if (!category)
      return res.status(404).send({ message: " no category  like this id " });

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
};

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
