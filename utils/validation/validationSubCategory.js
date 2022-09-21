const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { Category } = require("../../models/categoryModel");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format")
    .custom((val) =>
      Category.findById(val).then((category) => {
        if (!category)
          return Promise.reject(
            new Error(`no id like this in category ${val}`)
          );
      })
    ),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),

  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];

// const {
//   SubCategory,
//   validateSubCategory,
//   validateUpdateSubCategory,
// } = require("../../models/subCategoryModel");
// const {Category} = require('../../models/categoryModel')

// exports.ValidateCreateSubCategory = async (req, res, next) => {
//   try {

//     //  check if categoryId send params or body if in params stored in req.body.category
//     if (!req.body.category) req.body.category = req.params.categoryId;

//     // check is name is found in dateBase or not
//     const subCategory = await SubCategory.findOne({ name: req.body.name });
//     if (subCategory)
//       return res
//         .status(404)
//         .json({ status: false, message: "this name is created before" });

// if(req.body.category){
// const category = await Category.findOne({_id:req.body.category});
// if(!category)return res.status(404).json({
//   status:"false",
//   message:"invalid in id"
// })
// }
//         // validate before created
//     await validateSubCategory(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// };
// exports.validateUpdateSubCategory = async (req, res, next) => {
//   try {
//     await validateUpdateSubCategory(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// };
