const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { Category } = require("../../models/categoryModel");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val) =>
      Category.findOne({ name: val }).then((category) => {
        if (category)
          return Promise.reject(new Error(`this name is exactly created.`));
      })
    ),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .optional()
    .custom((val) =>
      Category.findOne({ name: val }).then((category) => {
        if (category)
          return Promise.reject(new Error(`this name is exactly created.`));
      })
    ),

  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

// const {
//   Category,
//   validateCategory,
//   validateUpdate,
// } = require("../../models/categoryModel");

// exports.validateCategory = asyncHandler (async (req, res, next) => {
//   try {
//     // validate name and check is created before or not

//     const category = await Category.findOne({ name: req.body.name });
//     if (category)
//       return res
//         .status(404)
//         .send({ message: "this name is exactly created.. " });
//     await validateCategory(req.body);

//     next();

//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// })

// exports.validateUpdate = asyncHandler(async (req, res, next) => {
//   try {
//     await validateUpdate(req.body);
//     next();
//   } catch (error) {
//     if (error)
//       return res.status(400).json({
//         status: "false",
//         message: error.details[0].message,
//       });
//   }
// });
