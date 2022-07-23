const {
  SubCategory,
  validateSubCategory,
  validateUpdateSubCategory,
} = require("../../models/subCategoryModel");

exports.ValidateCreateSubCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    //  check if categoryId send params or body if in params stored in req.body.category
    if (!req.body.category) req.body.category = req.params.categoryId;

    // check is name is found in dateBase or not
    const subCategory = await SubCategory.findOne({ name: req.body.name });
    if (subCategory)
      return res
        .status(404)
        .json({ status: false, message: "this name is created before" });
    // validate before created
    await validateSubCategory(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
exports.validateUpdateSubCategory = async (req, res, next) => {
  try {
    await validateUpdateSubCategory(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
